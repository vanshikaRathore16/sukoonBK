import {submitTodayMood,getMoodOptions,submitNote,submitGratitudes, Moodlist, Notelist,getMetidationByLastMood,getAtticleByLastMood} from "../controller/mood.controller.js";
import express from "express";
const router = express.Router();
router.post("/create",submitTodayMood);
router.post("/note",submitNote);
router.post("/submitGratitudes",submitGratitudes);
router.get("/getMetidationByLastMood/:userId",getMetidationByLastMood)
router.get("/getArticlesByLastMood/:userId",getAtticleByLastMood)
router.get("/getMood/:id",Moodlist)
router.get("/getNote/:id",Notelist)
router.get("/getMoodOptions",getMoodOptions);

// router.get("/mood-base-sugggestion/:id,",moodBaseSuggesation);

export default router;