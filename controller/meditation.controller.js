import { request, response } from "express";
import dotenv from "dotenv";
import Medidation from "../model/medidation.model.js";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const categories = [
  "Sleep",
  "Meditation",
  "Soundscapes",
  "kids",
  "Sleep_Stories",
  "Mindfulness",
  "Podcast"
  
];
export const categoryList = async(request,response,next)=>{
    try{
       return response.status(200).json({list : categories});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

// ✅ Get all meditations without filter
export const getMedidationFromDB = async (req, res) => {
  try {
    const meditations = await Medidation.find().sort({ createdAt: -1 });
    return res.status(200).json({ list: meditations });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Internal server error" });
  }
};


export const saveDataMeditation = async (request, response, next) => {
    try {
        // Upload audio
        const audioUpload = await cloudinary.uploader.upload(request.files["audio"][0].path, {
            resource_type: "auto",
            folder: "audio_file"
        });

        // Upload image
        const imageUpload = await cloudinary.uploader.upload(request.files["image"][0].path, {
            resource_type: "auto",
            folder: "meditation_images"
        });

        // Ensure type and mood are arrays
        let types = request.body.type;
        let moods = request.body.mood;

        // If a single string is sent, convert it to array
        if (typeof types === "string") {
            types = types.split(",").map(t => t.trim());
        }

        if (typeof moods === "string") {
            moods = moods.split(",").map(m => m.trim());
        }

        const meditation = new Medidation({
            title: request.body.title,
            podcast: request.body.poscast,
            description: request.body.description,
            type: types,  // array
            mood: moods,  // array
            // author: request.body.author, // add author
            audioURL: audioUpload.secure_url,
            imageURL: imageUpload.secure_url
        });

        await meditation.save();
        response.json({ success: true, data: meditation });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error" });
    }
};

export const getRondomMeditationSleepStory = async(request,response,next)=>{
  try{
         let category = "sleep_stories";
         const rondom = await Medidation.aggregate([
          {$match : { type: { $in: [category] } }},
          {$sample : {size : 1}}
         ])
        if (!rondom || rondom.length === 0) {
      return response.status(404).json({ message: "No meditation found in this category" });
    }
         console.log(rondom[0])
        return response.status(200).json(rondom[0]);

  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}

export const getRondomPadcast = async(request,response,next)=>{
  try{
         let category = "podcast";
         const rondom = await Medidation.aggregate([
          {$match : { type: { $in: [category] } }},
          {$sample : {size : 1}}
         ])
         console.log(rondom);
        if (!rondom || rondom.length === 0) {
      return response.status(404).json({ message: "No podcast found in this category" });
    }
         console.log(rondom[0])
        return response.status(200).json(rondom[0]);

  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}

export const getRondomSoundscapes = async(request,response,next)=>{
  try{
         let category = "soundscapes";
         const rondom = await Medidation.aggregate([
          {$match : { type: { $in: [category] } }},
          {$sample : {size : 1}}
         ])
         console.log(rondom);
        if (!rondom || rondom.length === 0) {
      return response.status(404).json({ message: "No podcast found in this category" });
    }
         console.log(rondom[0])
        return response.status(200).json(rondom[0]);

  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});