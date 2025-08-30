import express from "express";
import multer from "multer";
import {
  getMedidationFromDB,
  categoryList,
  saveDataMeditation,
  getRondomMeditationSleepStory,
  getRondomSoundscapes,
  getRondomPadcast
} from "../controller/meditation.controller.js";

const router = express.Router();

// Multer disk storage (files will be saved temporarily in uploads/)
const upload = multer({ dest: "uploads/" });

router.post(
  "/add",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]),
  saveDataMeditation
);

// router.get("/fatchAndSaveMedidation", fatchAnsSaveMedidation);
router.get("/getMedidationFromDB", getMedidationFromDB);
router.get("/category", categoryList);
router.get("/getRondomMeditationSleepStory",getRondomMeditationSleepStory);
router.get("/getRondomSoundscapes",getRondomSoundscapes);
router.get("/getRondomPadcast",getRondomPadcast)

export default router;
