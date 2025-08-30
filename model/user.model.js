import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true,
        trim : true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    password:{
        type :String,
        require : true
    },
    
    profile:{
        contact : String,
        imageaname : String,
        address : String,
        age : Number,
        gender : {type : String,enum : ["female","male","othere"]},
        level : {type : String,enum : ["beginner", "intermediate", "advanced"]}
    },
    joinAt:{
        type : Date,
        default : Date.now
    },
    isverified:{
        type : Boolean,
        default : false
    },
    role:{
        type : String,
        enum : ["user","admin"],
        default : "user"
    }

})
export const User = mongoose.model("user",userSchema);