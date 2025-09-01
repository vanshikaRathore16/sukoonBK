
import { request, response } from "express";
import { Pose } from "../model/pose.model.js";
import { query } from "express-validator";
// insert pose in model
const typeofpose = [
   {type : "Library", image : "https://media.istockphoto.com/id/2213080347/photo/3d-character-girl-practicing-yoga.webp?a=1&b=1&s=612x612&w=0&k=20&c=l-MPTxN06vjMwqMYyFNCUmDscGjQGD7vygCwLOAFQvA="},
   {type : "pose by type " ,image : "https://static.vecteezy.com/system/resources/previews/008/251/852/non_2x/woman-in-yoga-poses-illustration-in-cartoon-style-vector.jpg"},
   {type : "begginers", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaih5pLzTR5kBnp9o9i4L8DN_5fCtPUTGwzw&s"},
   {type : "healing pose", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikwFWr9Olz8UbKA2Q8M8j5fEho64GeAEf-g&s"}
]
export const typeOfPose = async(request,response,next)=>{
    try{
        return response.status(200).json({Type : typeofpose})
    }catch(err){
      console.log(err);
    }
}
// export const craetePose = async(request,response,next)=>{
//     try{
//         console.log(request.body);
//          const tags = (() => {
//       try {
//         const parsed = JSON.parse(request.body.tags);
//         return Array.isArray(parsed) ? parsed.map(tag => tag.trim()) : [];
//       } catch {
//         return typeof request.body.tags === "string"
//           ? request.body.tags.split(",").map(tag => tag.trim())
//           : [];
//       }
//     })();

//         const newpose = new Pose({
//         name : request.body.name,
//         image : request.file.filename,
//         instructions : request.body.instructions,
//         tags,
//         level : request.body.level,
//         duration : request.body.duration
//        });
//        await newpose.save();
//        return response.status(200).json({message : "pose inserted"});
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({err : "internal server error"});
//     }
// }


 export const createPose = async (request, response, next) => {
  try {
    console.log(request.body);

    // Parse tags
    const tags = (() => {
      try {
        const parsed = JSON.parse(request.body.tags);
        return Array.isArray(parsed) ? parsed.map(tag => tag.trim()) : [];
      } catch {
        return typeof request.body.tags === "string"
          ? request.body.tags.split(",").map(tag => tag.trim())
          : [];
      }
    })();

    // Parse steps
    const steps = (() => {
      try {
        const parsed = JSON.parse(request.body.steps);
        return Array.isArray(parsed) ? parsed.map(step => step.trim()) : [];
      } catch {
        return typeof request.body.steps === "string"
          ? request.body.steps.split(",").map(step => step.trim())
          : [];
      }
    })();

    const newPose = new Pose({
      name: request.body.name,
      image: request.file.filename,
      instructions: request.body.instructions,
      tags,
      level: request.body.level,
      duration: request.body.duration,
      sanskritName: request.body.sanskritName,
      steps,
      preparation: request.body.preparation,
      benefits: request.body.benefits ? request.body.benefits.split(",").map(b => b.trim()) : [],
      contraindications: request.body.contraindications ? request.body.contraindications.split(",").map(c => c.trim()) : [],
      focusAreas: request.body.focusAreas ? request.body.focusAreas.split(",").map(f => f.trim()) : [],
      caloriesBurned: request.body.caloriesBurned,
      difficultyScore: request.body.difficultyScore
    });

    await newPose.save();
    return response.status(200).json({ message: "Pose inserted" });

  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "Internal server error" });
  }
};

//  fet list of all 

export const list = async(request,response,next)=>{
    try{
      let list = await Pose.find();
      return response.status(200).json({list : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

//  fatch  single pose

export const fatchPose = async(request,response,next)=>{
    try{
      let {id } = request.params;
      console.log("Pose ID received:", id);
      let pose = await Pose.findById(id);
      return response.status(200).json(pose);
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
//  update the pose 
export const updatePose = async(request,response,next)=>{
    try{
       let {id } = request.params;
    //    let {name,instructions,tags,level} = request.body;
       let pose = await Pose.findByIdAndUpdate(id,request.body,{new : true});
       return response.status(200).json({meesage : pose});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server  error"});
    }
}
// delete the pose
 export const deletePose = async(request,response,next)=>{
     try{
       let {id} = request.params;
       let pose = await Pose.findByIdAndDelete({_id : id});
       return response.status(200).json({message : "deleted"}); 
     }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
     }
 }

//  search product 
export const searchPose = async(request,response,next)=>{
    try{
       let {name,level,tags} = request.query;
       let query = {};
       if(name)
        query.name = {$regex : name,$options : "i"}
       if(level)
        query.level = {$regex : level,$options : "i"}
      if(tags)
        query.tags = {$regex : tags,$options : "i"}
      const pose = await Pose.find(query);
      return response.status(200).json({message : pose});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

//  rondom pose

export const rondomPose = async(request,response,next)=>{
    try{
      const rondom = await Pose.aggregate([{ $sample : {size : 1}}])
      return response.status(200).json({data : rondom[0]});
    }catch(err){
        console.log(err);
        return response.status(500).josn({err : "internal server error"});
    }
}
