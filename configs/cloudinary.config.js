const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const storage = cloudinaryStorage({
    cloudinary,
    folder: 'avatar',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        let fileName = res.originalname.split(".");
        cb(null, fileName[0]);
    }
});

const uploader = multer({storage});
module.exports = uploader;