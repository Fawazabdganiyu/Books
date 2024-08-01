import { FileFilterCallback } from "multer";
import path from "path";

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback): void => {
  const filetypes = /jpeg|jpg|png|pdf|epub/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, EPUB or Image files are allowed'));
  }
};

export default checkFileType;
