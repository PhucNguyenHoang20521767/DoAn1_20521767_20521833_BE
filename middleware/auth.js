const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const Staff = require("../models/staff");
const Customer = require("../models/customer");

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(new ErrorResponse("Unauthorized user!", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || !mongoose.Types.ObjectId.isValid(decoded.id) || !!req.staff !== !!decoded.staff)
      return next(new ErrorResponse("Unauthorized user!", 401));

    const user = decoded.staff
      ? await Staff.findOne({
          _id: decoded.id
        })
      : await Customer.findOne({
          _id: decoded.id
        });

    if (!user) return next(new ErrorResponse("Unauthorized user!", 401));

    req.user = user;
    req.isStaff = decoded.staff;

    if (decoded.staff) { req.privilege = decoded.privilege; }
    
    next();
  } catch (error) {
    return next(new ErrorResponse(error));
  }
};

exports.adminProtect = async (req, res, next) => {
  req.staff = true;
  req.privilege = "ADMIN";
  next();
};