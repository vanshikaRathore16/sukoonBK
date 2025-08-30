import mongoose from "mongoose";
const userRoutineschema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    savedRoutine:[{
        routineId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "routine"
        }
    }],
    craeteAt:{
        type : Date,
        default : Date.now()
    }
})
const UserRoutine = mongoose.model("userRoutine",userRoutineschema);
export default UserRoutine;