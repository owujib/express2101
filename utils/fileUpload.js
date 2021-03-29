const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/product-img/');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * @type{}
 */

const upload = multer({
  storage: storage,
  limits: (req, file, callback) => {}, //assignment is to make sure file size is not more than 5mb
  fileFilter: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    console.log(fileExtension);
    if (
      fileExtension == '.jpg' ||
      fileExtension == '.png' ||
      fileExtension == '.jpeg'
    ) {
      callback(null, true);
    } else {
      callback('error file not supported please upload png, jpeg, jpg');
    }
  },
});

module.exports = upload;
