import { request, response } from "express";
import UserRoutine from "../model/userRoutine.model.js";
import mongoose, { model } from "mongoose";
export const userAddRoutine = async(request,response,next)=>{
    try{
       let {userId} = request.params;
       let {routineId} = request.body;
       let userRoutine = await UserRoutine.updateOne({userId},{$push : {savedRoutine : {routineId}}},{upsert : true});
       return response.status(200).json({message : "routine added"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
//  user want to see all routine

export const listOfUserRoutine = async(request,response,next)=>{
    try{
        let {userId} = request.params;
    //   console.log(Id);
    //  const userId = new mongoose.Types.ObjectId(request.params.userId);
       console.log(userId)

       let list = await UserRoutine.find({userId}).populate({path : "savedRoutine.routineId",
        populate : {
                   path : "poseId",
                   model : "pose",
                }});
       return response.status(200).json({message : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
//  factch specific routine
export const factchRoutine = async(request,response,next)=>{
    try{
        let {userId} = request.params;
        let { routineId} = request.body;
        let list = await UserRoutine.findOne({userId}).populate({path : "savedRoutine.routineId",
        populate : {
                   path : "poseId",
                   model : "pose",
                }});
       let SR = list.savedRoutine.find((item)=> item.routineId._id.toString() === routineId);
       if(!SR)
       return response.status(404).json({ message: "Routine not found" });
      return response.status(200).json({ success: true, data: SR.routineId });
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

//  remove any routine 
export const removeRoutine =  async(request,response,next)=>{
    try{
       let {userId} = request.params;
        let { Id} = request.body;
       let routineId = new mongoose.Types.ObjectId(Id);
       let result = await UserRoutine.updateOne({userId},{
        $pull : {savedRoutine : { routineId}}
       });
       if(result.modifiedCount === 0)
        return response.status(404).json({messge : "user deleted or not found"});
    return response.status(200).json({message : "deleted"});
        
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal srver error"});
    }
}