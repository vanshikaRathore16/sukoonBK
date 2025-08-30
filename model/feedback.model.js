
import mongoose from "mongoose";
const feedbackSchema = mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    feedback:{
        type :  "String",
        required : true
    },
    rating:{
        type : Number,
        min: 1,
        max : 5,
        required : true
    },
    date:{
        type : Date,
        default : Date.now()
    },
    name :{
        type : String,
        
    },
    isApprove:{
        type : Boolean,
        default : false
    }

})
 const Feedback = mongoose.model("feedback",feedbackSchema);
 export default Feedback;