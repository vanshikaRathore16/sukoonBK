import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendDailyEmail = ({to,subject,html})=>{
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
              from : `"sukoon"<${process.env.EMAIL}>`,
              to,
              subject,
              html
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