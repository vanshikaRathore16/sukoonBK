import express, { response } from "express";
import bodyParser from "body-parser";
import userRouter from "./router/user.router.js";
import poseRouter from "./router/pose.router.js";
import favoriteRouter from "./router/favorite.router.js";
import routineRouter from "./router/routine.router.js"
import userRoutineRouter from "./router/userRoutine.router.js";
import personalPlanRoutine from "./router/personalPlan.router.js";
import quoteRouter from"./router/quotes.router.js";
import moodRouter from "./router/mood.router.js";
import stremRouter from "./router/stream.router.js";
import feedbackRouter from "./router/feedback.router.js";
import medidationRouter from "./router/medidation.router.js";
import articleRouter from "./router/article.router.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
const app = express();
mongoose.connect(process.env.DBURL)
.then(result=>{
    console.log("server cannected to atlas");
    app.use(express.static("public"));
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use("/user",userRouter);
    app.use("/pose",poseRouter);
    app.use("/favorite",favoriteRouter);
    app.use("/routine",routineRouter);
    app.use("/userRoutine",userRoutineRouter);
    app.use("/personalPlan",personalPlanRoutine);
    app.use("/quote",quoteRouter);
    app.use("/mood",moodRouter);
    app.use("/medidation",medidationRouter);
    app.use("/stream",stremRouter);
    app.use("/feedback",feedbackRouter);
    app.use("/article",articleRouter)
    
    app.listen(process.env.PORT || 3000,()=>{
    console.log("server running on port");
 })
})
.catch(err=>{
    console.log(err);
    console.log( "database cannection failed");
})