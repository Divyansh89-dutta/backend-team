const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "backend",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

exports.upload = multer({ storage });

exports.uploadToCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, { folder: "backend" });
};
