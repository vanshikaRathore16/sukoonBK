import express from "express";
import { addtofav ,favById,list,poseList,quoteList,removeFromFavorites,routineList} from "../controller/favorite.controller.js";
// import { list } from "../controller/pose.controller.js";
const router = express.Router();
router.post("/create",addtofav);
router.get("/list/:userId",list);
// router.get("/serach",getFavorites);
router.delete("/delete/:userId",removeFromFavorites);
router.get("/routineList/:userId",routineList);
router.get("/favorite/:id",favById)
router.get("/favorite/quote/:userId",quoteList);
router.get("/pose/:userId",poseList);
export default router;