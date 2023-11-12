import multer from "multer";
import { Router } from "express";

import { saveFile, getTransactions } from "./controller";

const upload = multer();
const router = Router();

router.get("/", getTransactions);
router.post("/", upload.single("file"), saveFile);

export default router;
