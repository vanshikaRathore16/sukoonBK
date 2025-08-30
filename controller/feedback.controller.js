import Feedback from "../model/feedback.model.js";
export const create = async(request,response,next)=>{
    try{
       let {userId} = request.params;
       let {feedback,rating,name}  = request.body;
       if(!feedback || !rating || !name)
        return response.status(404).json({mesage : "feefback ot rating is required"});
       const userFeedback = await Feedback.create({userId,feedback,rating,name});
       return response.status(200).json({message : "thank you for your responces"});
     }catch(err){
        console.log(err);
        return  response.status(500).json({err : "internal server error"})
    }
}
export const approveFeedback = async (req, res) => {
  try {
      const _id = req.params.id;
    const update = await Feedback.findByIdAndUpdate( _id, { isApprove: true });
     if (!update) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback approved!" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const  listOfApproveFeedBack = async(request,response,next)=>{
    try{
        
        let feedbackList = await Feedback.find({isApprove : true}).sort({date : -1}).limit(10);
        return response.status(200).json({message : feedbackList});

    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json({ list: feedbacks });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
