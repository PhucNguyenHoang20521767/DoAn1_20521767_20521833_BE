const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

exports.uploadDiskStorage = multer({
	storage: multer.diskStorage({
		destination: "C:/NGUYEN'S HOME Furniture/Attachments",
		filename: (_req, _file, cb) => {
			let name = uuidv4() + "_" + Date.now();
			cb(null, name.replace(/-/g, "_"));
		}
	})
});

exports.uploadMemoryStorage = multer({ storage: multer.memoryStorage() });