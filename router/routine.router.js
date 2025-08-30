import express from "express";
import { craeteRoutine,list,routineCategory,getById, userRoutine} from "../controller/routine.controller.js";
// import { list } from "../controller/favorite.controller.js";
const router = express.Router();
router.post("/create",craeteRoutine);
router.get("/list",list)
router.get("/routineCategory",routineCategory);
router.get("/getById",getById);
router.get("/userList/:userId",userRoutine);
export default router;

