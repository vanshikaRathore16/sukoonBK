import { authUser, updateProfile, create ,getProfile ,logOut,verifyAccount} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";
import express from "express";
import {body} from "express-validator";
import multer from "multer";
const upload = multer({dest : "public/profile"});
const router = express.Router();
router.post("/create",
    body("name","name is required").notEmpty(),
    body("name","only letter are allow").isAlpha(),
    body("email","email is required").notEmpty(),
     body("email","not valid format").isEmail(),
     body("password","password min length is 5 and max id 8").isLength({min : 5,max : 8})
    ,create);
router.post("/authUser",authUser);
router.put("/profile",upload.single("imageaname"),updateProfile);
router.get("/get-profile/:userId",getProfile);
router.post("/logout",logOut);
router.post("/verification",verifyAccount);
export default router;