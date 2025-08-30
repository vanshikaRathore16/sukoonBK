
import PersonalPlan from "../model/personalPlan.model.js";
import Stream from "../model/stream.model.js";

export const compeletDaysList = async(request,response,next)=>{
    try{
        const {userId} = request.params;
        const plan = await PersonalPlan.find({userId});
        if(!plan)
            return response.status(404).json({message : "user not found"});
        // let stream = plan.poseList.map(item=>({
        //       date: item.date.toISOString().split("T")[0],
        //       details: item.pose,
        //       status: item.idCompleted ? "complete" : "skip"
        // }))
        let stream = [];
        plan.forEach(plans=>{
         if(Array.isArray(plans.poseList)){
            plans.poseList.forEach(item=>{
                 if(item.idCompleted ===  true){
                stream.push({
                       date: item.date.toISOString().split("T")[0],
                    // details: item.pose,
                    status: "complete"
                 })}
            })
         }
        })
        return response.status(200).json({message : stream})
    }catch(err){
        console.log(err);
        return response.status(500).json({err : 'internal server error'});
    }
}
// skip days 
export const skipDayList = async(request,response,next)=>{
    try{
        const {userId} = request.params;
        const plan = await PersonalPlan.find({userId});
        if(!plan)
            return response.status(404).json({message : "user not found"});
         let stream = [];
        plan.forEach(plans=>{
         if(Array.isArray(plans.poseList)){
            plans.poseList.forEach(item=>{
                 if(item.idCompleted ===  false){
                stream.push({
                     date: item.date.toISOString().split("T")[0],
                    // details: item.pose,
                    status: "skip"
                 })}
            })
         }
        })
        return response.status(200).json({message : stream})
    }catch(err){
        console.log(err);
        return response.status(500).json({err : 'internal server error'});
    }
}
