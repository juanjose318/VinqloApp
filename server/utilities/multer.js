const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), "server/public", "images"));
  },
  filename(req, file, cb) {
    const temp = file.originalname;
    file.originalname = file.originalname.replace(/ /g, '');
    cb(null, Date.now() + "-" + file.originalname);
    file.originalname = temp;
  }
});

module.exports = multer({storage});