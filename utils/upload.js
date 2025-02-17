const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "events",
    });
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { upload, uploadToCloudinary };
