const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    const date = new Date()
    let fileName = date.getTime() + file.originalname
    cb(null, fileName);
  }
})

const fileFilter = (req, file, cb) => {
  if  (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3 // 3mb
  },
  fileFilter: fileFilter
})


module.exports = upload;