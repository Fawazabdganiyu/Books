import { FileFilterCallback } from "multer";
import path from "path";

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback): void => {
  const filetype = /pdf|epub|jpg|png/;

  const extname = filetype.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetype.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and EPUB files are allowed'));
  }
};

export default checkFileType;
