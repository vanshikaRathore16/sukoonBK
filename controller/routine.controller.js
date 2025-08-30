import { request, response } from "express";
import Routine from "../model/routine.model.js";
import { Pose } from "../model/pose.model.js";

export const craeteRoutine =async(request,response,next)=>{
    try{
        // let {userId} = request.params;
       let {title,category,timeAvailable,level,description} = request.body;
       timeAvailable = parseInt(timeAvailable) * 60;
       level = level?.toLowerCase();
       console.log("Time Available (seconds):", timeAvailable);
       console.log("Looking for category:", category);
       console.log("Looking for category:", level);
       const poses = await Pose.find({
        tags : {$in : [category]},
       duration : {$lte : timeAvailable},
        level : level || {$in:["beginner", "intermediate", "advanced"]}
       }).sort({duration : 1});
       console.log("Matching poses found:", poses.length);
       if(!poses.length)
        return response.status(404).json({message : "not suitable pose found"});
       const selected = [];
       let totalTime = 0;
        for(let pose of poses){
        if(totalTime + pose.duration <= timeAvailable){
            selected.push(pose._id);
            totalTime += pose.duration;
        }else{
            break;
        }
      }

      console.log("Selected poses:", selected);
     console.log("Total time used:", totalTime);
      const createRoutine = await Routine.create({title,category,level,description,poseId : selected,timeAvailable : totalTime});
      return response.status(200).json({message : "routine create successfully", routine: createRoutine});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }  
}
export const list = async(request,response,next)=>{
    try{
        let list = await Routine.find().populate("poseId");
        return response.status(200).json({list : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : 'internal server error'});
    }
}

export const routineCategory = async(request,response,next)=>{
    try{
        let { category } = request.query;
    if (!category)
     return response.status(400).json({ message: "Category is required" });
      const routine = await Routine.find({
        category :{$regex : new RegExp(`^${category}$`,"i")}
      }).populate("poseId");
      if(!routine)
        return response.status(402).json({message : "no routine founded in that category"});
     return response.status(200).json({message :  routine});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const getById = async(request,response,next)=>{
    try{
         let {id} = request.query;
          console.log("ID from query:", id); 
         let routine = await Routine.findOne({_id : id}).populate("poseId");
         return response.status(200).json({message : routine});
    }catch(err){
        console.log(err);
        return  response.status(500).json({err : "internal server error"});
    }
}

export const userRoutine = async(request,response,next)=>{
    try{
         let {userId} = request.params;
         let list = await Routine.find({userId});
         return response.status(201).json({list : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
 
