import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// const dbUrl = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.i2oefwm.mongodb.net/`;
const dbUrl = `mongodb+srv://shshwtkpr:shashwat7755@cluster0.i2oefwm.mongodb.net/;`;

const storage = new GridFsStorage({
  url: dbUrl,
  file: (req, file) => {
    const match = ["image/jpeg", "image/png", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }
    return {
      bucketName: "fs",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
