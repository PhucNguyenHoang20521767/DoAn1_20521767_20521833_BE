const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
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

    if (decoded.privilege === "STAFF")
      if (!req.staffAccess)
        return next(new ErrorResponse("Unauthorized user!", 401));

    const user = decoded.staff
      ? await Staff.findOne({
          _id: decoded.id,
          staffStatus: 0
        })
      : await Customer.findOne({
          _id: decoded.id,
          isVerified: true,
          isActive: true
        });

    if (!user) return next(new ErrorResponse("Unauthorized user!", 401));

    // Send current user
    req.user = user;
    req.isStaff = decoded.staff;
    if (decoded.staff) { req.privilege = decoded.privilege; }
    
    next();
  } catch (error) {
    return next(new ErrorResponse(error));
  }
};

exports.staffAndAdminProtect = async (req, res, next) => {
  req.staff = true;
  req.staffAccess = true;
  next();
};

exports.adminProtect = async (req, res, next) => {
  req.staff = true;
  req.staffAccess = false;
  next();
};