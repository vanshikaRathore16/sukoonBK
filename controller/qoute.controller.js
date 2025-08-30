import { request, response } from "express";
import Quote from "../model/quote.model.js";
const ALLOWED_TAGS = [

  "morning", "night", "evening", "afternoon",


  "calm", "focus", "motivation", "happiness", "healing", 
  "relaxation", "confidence", "positivity", "gratitude", 
  "hope", "inner peace", "energy", "resilience", "self-love",

  "breathing", "meditation", "mindfulness", "balance", 
  "awareness", "stress relief", "mental clarity", "emotional balance",

  "post-session", "yoga", "asana", "stretching", "flexibility",

  "growth", "discipline", "success", "determination", 
  "courage", "strength", "wellness", "focus", "inspiration",
  "nature", "spirituality", "stillness", "presence", "transformation"
];
const themeCategories = [
  "Positive",
  "Peace",
  "Focus",
  "Joy",
  "Calm",
  "Gratitude",
  "Energy",
  "Love",
  "Growth",
  "Kindness",
  "Motivation",
  "Inspiration",
  "Spiritual",
  "Wisdom",
  "Reflection",
  "Strength",
  "Self-Love",
  "Courage",
  "Healing",
  "Hope"
];

export const QouteCategory = async(request,response,next)=>{
    try{
       return response.status(201).json({Category : themeCategories});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const saveInBulk = async(request,response,next)=>{
    try{
     let quotes = request.body;
     const validquote = quotes.every(quote=> Array.isArray(quote.tags) && quote.tags.every(tag => ALLOWED_TAGS.includes(tag)));
    //  if(!validquote)
    //     return response.status(401).json({message : "problame in tags"});
    const quotelist = await Quote.insertMany(quotes);
    return response.status(200).json({message : "quotes inserted"});
    }catch(err){
        console.log(err);
        return Response.status(500).json({err : "internal server error"});
    }
}
export const listOfAll = async(request,response,next)=>{
    try{
       let list = await Quote.find();
       return response.status(200).json({list : list});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}

export const rondomQuote = async(request,response,next)=>{
  try{
     let qeote = await Quote.aggregate([{ $sample : {size : 1}}]);
     return response.status(200).json({ rondomQuote : qeote[0]});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}

export const moodBaseQuote = async(request,response,next)=>{
    try{
        let {mood} = request.body;
        let moodFind = await Quote.find({mood :{$regex : new RegExp(`^${mood}$`,"i")}});
        return response.status(200).json({messahe :moodFind});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"})
    }
}
export const qouteByCategory = async (request, response, next) => {
  try {
     let category = request.query.category;
     if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    category = category.trim();
    let qouteByCategory = await Quote.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    });

    return response.status(200).json({ category: qouteByCategory });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "Internal server error" });
  }
};
