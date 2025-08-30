import mongoose from "mongoose";
const streamschema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    poseId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "pose"
    },
    date : {
        type :  Date,
        default : Date.now
    },
    status:{
        type : String,
        enum : ["complete","skip"]
    }
})
const Stream = mongoose.model("stream",streamschema);
export default Stream;