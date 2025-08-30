import { request, response } from "express";
import personalPlan from "../model/personalPlan.model.js";
import {Pose} from "../model/pose.model.js";
import mongoose from "mongoose";
export const create = async (request, response, next) => {
  try {
    let { mood, level, timeAvailbe, userId } = request.body;

    if (!userId) {
      return response.status(400).json({ message: "User ID is required" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    const exitUser = await personalPlan.findOne({
      userId: objectId,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (exitUser) {
      return response.status(409).json({ message: "Plan already exists for today" });
    }

    const moodToMap = {
      stressed: ["calm", "breathing", "relax"],
      tired: ["stretch", "energy"],
      sad: ["gentle", "open-heart"],
      energetic: ["strength", "flow"],
    };

    const tags = moodToMap[mood] || [];
    const timeInSeconds = parseInt(timeAvailbe) * 60;

    const query = {
      duration: { $lte: timeInSeconds },
      level: level,
      tags: { $in: tags },
    };

    let poses = await Pose.find(query);
    const poselist = poses.map((p) => ({ pose: p._id }));

    let plan = new personalPlan({
      userId: objectId,
      mood,
      level,
      timeAvailbe,
      poseList: poselist,
    });

    await plan.save();
    return response.status(200).json({ message: "Plan created" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "Internal server error" });
  }
};

export const list = async(request,response,next)=>{
    try{
        let { userId} = request.params;
        console.log(userId);
        let list = await personalPlan.find({userId}).populate("poseList.pose");
        return response.status(200).json({message : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}



export const deletePlan = async(request,response,next)=>{
    try{
       let {userId} = request.params;
       let {planId} = request.body;
       let plan = await personalPlan.updateOne({userId},{
        $pull : {poseList : {_id : planId}}
       })
       return response.status(200).json({message : "plan remove succfully"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server erroe"});
    }
}

export const isCompelete = async(request,response,next)=>{
    try{
       let {userId} = request.params;
       let {planId,action} = request.body;
       let plan = await personalPlan.findOne({userId});
       let sPlan = plan.poseList.find(item=>item._id.toString()=== planId);
       if(!sPlan)
        return response.status(404).json({message : "plan not found"});
       if(action === "complete"){
        sPlan.idCompleted = true;
        sPlan.isSkiped = false
       }else if(action === "skip"){
        sPlan.isSkiped = true;
        sPlan.idCompleted = false
       }else
        return response.status(402).json({message : "action is not valid"});
       await plan.save();
       return response.status(200).json({message : action === "complete"  ? "plan compelte " : "plan skipped"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}