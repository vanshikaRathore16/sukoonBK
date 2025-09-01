import mongoose from "mongoose";
const personalPlanSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    mood:{
        type : String,
        require : true
    },
    timeAvailble : {
        type : Number,
        require : true
    },
    level:{
        type : String,
        enum : ["beginner", "intermediate", "advanced"],
        require : true
    },
    poseList:[{
        pose:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "pose"
        },
        idCompleted:{
        type : Boolean,
        default : false
    },
       isSkiped:{
        type : Boolean,
        default : false
       },
    feedBack:{
        type : String
    }
    }],
     date:{
        type : Date,
        default : Date.now,
        expires: 60 * 60 * 24 
     }
},{
    timestamps : true
})
// personalPlanSchema.index({userId : 1,Date : 1},{unique : true});
const PersonalPlan = mongoose.model("personalplan",personalPlanSchema);
export default PersonalPlan;