const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = 'uploads/';


if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile'); // Change 'myImage' to 'myFile' for consistency

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const allowedFiletypes = /\.(pdf|png|jpeg|jpg)$/i; // Case-insensitive match
    // Check ext
    const extname = path.extname(file.originalname).toLowerCase();
    // Check mime
    const mimetype = allowedFiletypes.test(extname);

    if (mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Supported file types are PDF, PNG, JPEG, JPG!');
    }
}



module.exports = upload;
