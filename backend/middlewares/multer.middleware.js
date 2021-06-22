const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const fileFilter = (req, file, cb) => {
  if ((file.mimetype).includes('jpeg') ||
    (file.mimetype).includes('png') ||
    (file.mimetype).includes('jpg') ||
    (file.mimetype).includes('gif')) {
    cb(null, true);
  } else {
    cb(new Error('Mauvais format d\'image'));
  }
};

let upload = multer({ storage: storage, fileFilter: fileFilter, });

module.exports = upload.single('image');