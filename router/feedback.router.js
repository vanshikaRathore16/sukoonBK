import { create, approveFeedback,getAllFeedback, listOfApproveFeedBack} from "../controller/feedback.controller.js";
import express from "express";
const router = express.Router();
router.post("/create/:userId",create);
router.patch("/feedBack-approve/:id",approveFeedback);
router.get("/listOfApproveFeedback", listOfApproveFeedBack);
router.get("/getAllFeedback",getAllFeedback)
export default router;