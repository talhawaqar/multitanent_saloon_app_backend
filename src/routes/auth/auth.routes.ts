import { Router } from "express";
import multer from "multer";
import { registerUser, loginUser } from "../../controllers/auth.controller";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "my-uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fields = Array.from({ length: 10 }, (_, i) => ({
  name: `images_location_${i}`,
  maxCount: 5, // adjust based on your per-location image limit
}));

const upload = multer({ storage: storage });

router.post("/register", upload.fields(fields), registerUser);
router.post("/login", loginUser);

export default router;
