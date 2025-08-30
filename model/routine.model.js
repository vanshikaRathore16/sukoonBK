import mongoose from "mongoose";
const routineSchema = new mongoose.Schema({
    title : String,
    poseId:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "pose"
    }],
    timeAvailable:{
        type : Number,
    },
    level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
   },
    category:{
        type : String,
        enum :[ "morning",
      "night",
      "desk",
      "mental peace",
      "posture reset",
      "weight loss",
      "flexibility",
      "back pain relief",
      "stress relief",
      "pre-sleep relaxation",
      "energy booster"],

    },
    description:{
        type : String
    },
    createAt:{
        type : Date,
        default : Date.now()
    }
})
const Routine = mongoose.model("routine",routineSchema);
export default Routine;