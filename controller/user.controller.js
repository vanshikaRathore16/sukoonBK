import { request, response } from "express";
import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from"dotenv";
dotenv.config();

// create user api 
export const create = async(request,response,next)=>{
    try{
        let error = validationResult(request);
        if(!error.isEmpty())
        return response.status(400).json({mesage :  "bad requiest",err : error.array()})
        let {name,email,password,role}  = request.body;
        let salt = bcrypt.genSaltSync(12);
        password = bcrypt.hashSync(password,salt);
        let user = await User.create({name,email,password,role});
        await sendEmail(email,name);
        return response.status(200).json({message : "user created"});
    }catch(err){
        console.log(err);
        return response.status(500).json("internal server error");
    }
}

export const verifyAccount = async(request,response,next)=>{
    try{
       let {email} = request.body;
       let result = await User.updateOne({email},{$set:{isverified : true}});
       return response.status(500).json({message : "account verify successfully"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "Interna server error"});
    }
}
//  sign in api
export const authUser = async(request,response,next)=>{
    try{
       let{ email,password} = request.body;
       let user = await User.findOne({email});
       if(!user)
        return response.status(404).json({message:"email are not valid"});
       if(!user.isverified)
        return response.status(404).json({message : "your account not verify"});
        console.log(password + " " + user.password);
        let status = bcrypt.compareSync(password,user.password);
        user.password = undefined;
        response.cookie("token",generateToken(user._id,user.email,user.role));
        return status ? response.status(201).json({message : user}) : response.status(401).json({message : "passwrd is not valid"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

//  create profile 
// export const updateProfile = async(request,response,next)=>{
//     try{
//       let { userId } = request.query || request.body;
//       let user = await User.findOne(userId);
//       user.profile.imageaname = request.file.filename;
//       user.profile.contact = request.body.contact;
//     //   user.profile.address = request.body.address;
//       user.profile.gender = request.body.gender;
//       user.profile.level = request.body.level;
//       console.log(user);
//       await user.save();
//       return response.status(200).json({message : "profile updated"});
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({err : "internal server error"});
//     }
// }

export const updateProfile = async (req, res) => {
  try {
    const { contact, gender, level, userId } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file); 

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.profile.contact = contact;
    user.profile.gender = gender;
    user.profile.level = level;

    if (req.file) {
      user.profile.imageaname = req.file.filename;
    }

    await user.save();
   res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const getProfile = async(request,response,next)=>{
    try{
      let {userId} = request.params;
      let profile = await User.findOne({_id : userId});
      if(!profile)
        return response.status(404).json({message : "user not found"});
     return response.status(200).json({message : "profle details" , name : profile.name , email : profile.email,profile : profile.profile , joinIndate : profile.joinAt})
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const logOut = (request,response,next)=>{
    try{
        response.clearCookie("token");
        return response.status(200).json({message : "logout successfully"});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}
const sendEmail = (email,name)=>{
     return new Promise((resolve,reject)=>{
        // console.log("ENV EMAIL:", process.env.EMAIL);
        // console.log("ENV EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
    
        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Account Verification',
            html: `<h4>Dear ${name}</h4>
            <p>Thank you for registration. To verify account please click on below button</p>
            <form method="post" action="http://localhost:3000/user/verification">
              <input type="hidden" name="email" value="${email}"/>
              <button type="submit" style="background-color: blue; color:white; width:200px; border: none; border: 1px solid grey; border-radius:10px;">Verify</button>
            </form>
            <p>
               <h6>Thank you</h6>
               sukoon Team.
            </p>
            `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
              resolve();
            }
        });
    });
    
}
export const generateToken = (userId,email,role)=>{
   let payload = {userId,email,role}
   let token = jwt.sign(payload,process.env.SECRET_KEY);
   console.log(token);
   return token;
}