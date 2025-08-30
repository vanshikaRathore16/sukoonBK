
import {compeletDaysList,skipDayList} from "../controller/stream.controller.js"
import express from "express";
let router = express.Router();
router.get("/complete-stream/:userId",compeletDaysList);
router.get("/skip-stream/:userId",skipDayList);

export default router;