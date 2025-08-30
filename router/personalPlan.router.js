import {create,list,deletePlan,isCompelete} from "../controller/personalPlan.controller.js";
import express from "express";
const router = express.Router();
router.post("/create",create);
router.get("/list/:userId",list);
router.delete("/delete/:userId",deletePlan);
router.post("/compelete/:userId",isCompelete);
export default router;