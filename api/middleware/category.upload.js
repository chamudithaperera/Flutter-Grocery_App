const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,"../uploads/categories");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-"+ file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const acceptableExt = [".jpg", ".jpeg", ".png"];
    if(!acceptableExt.includes(path.extname(file.originalname))) {
        return callback(new Error("Only .jpg, .jpeg and .png file formats are allowed!"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if(fileSize > 1048576) {
        return callback(new Error("File size is too large, should be less than 5MB"));
    }
    callback(null, true);
};
