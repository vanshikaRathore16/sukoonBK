
import express from "express";
import { listOfUserRoutine ,userAddRoutine,factchRoutine,removeRoutine} from "../controller/userRoutine.controller.js";
const router = express.Router();
router.post("/:userId",userAddRoutine);
router.get("/:userId",listOfUserRoutine);
router.post("/fatchRoutine/:userid",factchRoutine);
router.delete("/:userId",removeRoutine);
export default router;