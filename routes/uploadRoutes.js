import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, res, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//Function to restrict upload only jpg,jpegand png files

function checkFileType(file, cb) {
  //using REGEX
  const filetypes = /jpg|jpeg|png/;
  const extensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if ((extensionName, mimetype)) {
    return cb(null, true);
  } else {
    cb('Invalid File Type');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
