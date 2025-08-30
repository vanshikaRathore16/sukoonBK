import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { request, response } from "express";
dotenv.config();
export const auth = async(request,response,next)=>{
    try{
     let { token } = request.cookies;
     if(!token)
        throw new error("unauthrize user");
    let decode = jwt.verify("token",process.env.SECRET_KEY);
    request.user = {
        userId : decode.userId,
        email : decode.email,
        role : decode.role
    }
    console.log(decode.userId + " " + decode.email + " " + decode.role);
    next();
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
export const adminOnly = async(request,response,next)=>{
    if(request.user.role !== "admin"){
      return response.status(404).json({message : "only for admin"});
    }
    next();
}