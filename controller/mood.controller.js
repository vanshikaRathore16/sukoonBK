import { request, response } from "express";
import Mood from "../model/mood.model.js";
import Medidation from "../model/medidation.model.js";
import Article from "../model/article.model.js";
export const moodArray = [
  "stressed",
  "tired",
  "energized",
  "back pain",
  "calm",
  "neutral",
  "anxious",
  "content",
  "overwhelmed",
  "restless",
  "inspired",
  "achy",
  "relaxed",
  "irritable",
  "motivated",
  "drained",
  "hopeful",
  "sore",
  "focused",
  "lonely"
];

const moodMapping = {
  stressed: ["Calm", "Relaxed"],
  tired: ["Relaxed", "Energized"],
  energized: ["Energized", "Focused"],
  "back pain": ["Relaxed"],
  calm: ["Calm", "Focused"],
  neutral: ["Relaxed", "Focused"],
  anxious: ["Calm", "Relaxed"],
  content: ["Happy", "Relaxed"],
  overwhelmed: ["Calm", "Relaxed"],
  restless: ["Focused", "Calm"],
  inspired: ["Focused", "Happy"],
  achy: ["Relaxed"],
  relaxed: ["Relaxed", "Calm"],
  irritable: ["Calm", "Happy"],
  motivated: ["Focused", "Energized"],
  drained: ["Relaxed", "Calm"],
  hopeful: ["Happy", "Focused"],
  sore: ["Relaxed"],
  focused: ["Focused", "Calm"],
  lonely: ["Happy", "Calm"]
};

const moodToTagsArticle = {
  happy: ["happiness", "motivation", "mindfulness", "yoga"],
  sad: ["depression", "self-care", "relaxation", "sleep"],
  anxious: ["anxiety", "focus", "mindfulness meditation", "breathing"],
  stressed: ["stress", "relaxation", "workplace stress", "burnout"],
  calm: ["inner peace", "meditation", "silence", "yoga nidra"],
  energetic: ["productivity", "concentration", "focus at work", "routine"],
  drained: ["self-care", "relaxation", "sleep", "mindfulness"],
  tired: ["sleep", "self-care", "relaxation", "mindfulness"],
  neutral: ["mindfulness", "meditation", "routine", "mental clarity"],
  content: ["happiness", "mindfulness", "yoga", "inner peace"],
  overwhelmed: ["stress", "relaxation", "breathing", "mindfulness meditation"],
  restless: ["focus", "meditation", "mindfulness", "relaxation"],
  inspired: ["motivation", "mindfulness", "yoga", "mental clarity"],
  achy: ["self-care", "yoga", "relaxation", "mindfulness"],
  relaxed: ["relaxation", "inner peace", "yoga nidra", "meditation"],
  irritable: ["self-care", "breathing", "mindfulness", "relaxation"],
  motivated: ["productivity", "focus at work", "motivation", "routine"],
  hopeful: ["happiness", "mindfulness", "motivation", "inner peace"],
  sore: ["yoga", "relaxation", "self-care", "mindfulness"],
  focused: ["concentration", "productivity", "focus at work", "meditation"],
  lonely: ["self-care", "mindfulness", "relaxation", "depression"],
};


export const getMetidationByLastMood = async (request,response,next)=>{
  try{
      let {userId}  = request.params;
      let lastMood = await Mood.findOne({userId}).sort({date : -1});
      console.log(lastMood);
      if(!lastMood)
      return response.status(202).json({message : "mood not found"});
      const medidationMood = moodMapping[lastMood.mood.toLowerCase()] || ["calm"];
      const medidation = await Medidation.find({
        mood : {$in : medidationMood}
      }).limit(4);
      console.log(medidationMood);
      if (!medidation || medidation.length === 0) {
      return res.status(404).json({
        message: `No meditations found for moods: ${medidationMood.join(", ")}`
      });
    }
     return response.status(200).json({recommendedMeditations: medidation});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server  error"});
  }
}
export const getMoodOptions = (request, response) => {
  return response.status(200).json({ moods: moodArray });
};


export const getAtticleByLastMood = async(request,response,next)=>{
  try{
      let {userId}  = request.params;
      let lastMood = await Mood.findOne({userId}).sort({date : -1});
      console.log(lastMood);
      if(!lastMood)
      return response.status(202).json({message : "mood not found"});
      const mood = lastMood.mood.toLowerCase();
      const relatedTags = moodToTagsArticle[mood];
      if (!relatedTags || relatedTags.length === 0) {
      return response.status(404).json({ message: "No related tags for this mood" });
    } 
      const articles = await Article.find({
      tags: { $in: relatedTags }
    }).sort({ createdAt: -1 });

   return response.status(201).json({article : articles})

  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal serber error"});
  }
}

export const submitTodayMood = async (request, response, next) => {
    try {
        let { mood, userId } = request.body; 

        const today = new Date();
        today.setHours(0, 0, 0, 0);

      
        const existingMood = await Mood.findOne({ userId, date: today });
        if (existingMood)
            return response.status(202).json({ message: "You already submitted today's mood." });

      
        const createMood = await Mood.create({ userId, mood, date: today });

        return response.status(201).json({ message: "Thank you for sharing." });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internal server error" });
    }
};




export const submitNote = async (request, response, next) => {
  try {
    const { note, userId } = request.body;

    // Set today's date with 0 time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find if mood document for today exists
    const existingMood = await Mood.findOne({ userId, date: today });

    if (existingMood) {
      // Update existing document by adding/updating note
      existingMood.note = note; // overwrite or push if it's an array
      await existingMood.save();
      return response.status(200).json({ message: "Note updated successfully" });
    } else {
      // Create new mood document
      const createNote = await Mood.create({ userId, note, date: today });
      return response.status(201).json({ message: "Note submitted successfully" });
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "Internal server error" });
  }
};


export const Moodlist = async (request, response, next) => {
  try {
    const { id } = request.params;
    const moods = await Mood.find({ userId: id }).sort({ date: 1 });
    const moodHistory = moods.map((item) => ({
      mood: item.mood,
      date: item.date
    })); 
    return response.status(200).json({ mood_history: moodHistory });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "Internal server error" });
  }
};

export const Notelist = async (request, response, next) => {
  try {
    const { id } = request.params;
    const moods = await Mood.find({ userId: id }).sort({ date: 1 });
    const notesHistory = moods.map((item) => ({
      note: item.note,
      date: item.date
    })); 
    return response.status(200).json({ note_history: notesHistory });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "Internal server error" });
  }
};


export const submitGratitudes = async (request, response, next) => {
  try {
    const { userId, gratitude } = request.body;
     console.log(userId);
     console.log(gratitude);
    if (!userId || !gratitude || !Array.isArray(gratitude)) {
      return response.status(400).json({ message: "userId and gratitudes array are required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's mood for this user
    let mood = await Mood.findOne({ userId, date: today });

    if (!mood) {
      // If no mood yet, create one with gratitude
      mood = await Mood.create({
        userId,
        gratitudes: [gratitude],
        date: today,
      });
    } else {
      // If mood exists, push gratitude into array
      mood.gratitudes.push(gratitude);
      await mood.save();
    }

    return response.status(200).json({
      message: "Gratitude added successfully",
      mood,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: "internal server error" });
  }
}


// export const moodBaseSuggesation = async(request,response,next)=>{
//     try{
//       let {userId} = request.params;
//       let lastMood = await Mood.findOne({userId}).sort({date : -1});
//       if(!lastMood)
//         return response.status(404).json({message : "no history for mood"});
//         const mood = lastMood.mood.toLowerCase();
//         const moodMap = {
//       tired: ["energize", "stretch"],
//       stressed: ["calm", "breathe"],
//       anxious: ["focus", "relax"],
//       sad: ["open-heart", "gentle"],
//       happy: ["flow", "strength"]
//     };
//      const tags = moodMap[mood] || [calm];
//     let pose = await Pose.find({tags : {$in : tags}}).limit(3);
//     let routine = await Routine.find({category : {$in : tags}}).limit(3);
//     return response.status(200).json({message : `suggested contanet best on your mood ${mood}`,pose,routine});
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({err : "internal serve error"});
//     }
// }