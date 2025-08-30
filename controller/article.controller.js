import Article from "../model/article.model.js";
import { v2 as cloudinary } from "cloudinary";
import { request, response } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "articles",
     resource_type: "auto",
  },
});


export const upload = multer({ storage });

 const allowedTags = [
      "stress","anxiety","depression","self-care","emotional balance","mental clarity",
      "relaxation","happiness","sleep","beginner","daily practice","breathing","focus",
      "mindfulness","time management","productivity","routine","concentration","neuroscience",
      "brain health","psychology","evidence-based","research","hormones","cognitive function",
      "relaxation response","Buddhism","Zen","Vedanta","mantra","prayer","energy healing",
      "chakras","silence","inner peace","workplace stress","leadership","decision-making",
      "burnout","corporate wellness","focus at work","teamwork","motivation","yoga","pranayama",
      "asanas","mindfulness meditation","vipassana","guided meditation","yoga nidra",
      "transcendental meditation"
    ]; 

export const allowsTag = async(request,response,next)=>{
  try{
      return response.status(200).json({tags : allowedTags});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}

export const createArticle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // 1️⃣ Get tags from request and clean them
    const allowedTags = [
      "stress","anxiety","depression","self-care","emotional balance","mental clarity",
      "relaxation","happiness","sleep","beginner","daily practice","breathing","focus",
      "mindfulness","time management","productivity","routine","concentration","neuroscience",
      "brain health","psychology","evidence-based","research","hormones","cognitive function",
      "relaxation response","Buddhism","Zen","Vedanta","mantra","prayer","energy healing",
      "chakras","silence","inner peace","workplace stress","leadership","decision-making",
      "burnout","corporate wellness","focus at work","teamwork","motivation","yoga","pranayama",
      "asanas","mindfulness meditation","vipassana","guided meditation","yoga nidra",
      "transcendental meditation"
    ];

    let tags = req.body.tags ? req.body.tags.split(",") : [];
    // Trim spaces and filter only allowed tags
    tags = tags.map(tag => tag.trim()).filter(tag => allowedTags.includes(tag));

    // 2️⃣ Create the new article
    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.author || "Anonymous",
      category: req.body.category,
      Image: req.file.path,
      tags: tags, // use cleaned tags
    });

    // 3️⃣ Save to DB
    await newArticle.save();
    res.status(201).json({ message: "Article created", article: newArticle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const articleById = async(request,response)=>{
  try{
     let {id} = request.params;
     const article = await Article.findById(id);
     return response.status(201).json(article);
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}


export const articleByTags = async(request,response,next)=>{
  try{
      let {tag} = request.params;
      if(!tag){
        return response.status(400).json({message : "tag is reeuired"});
      }
      const articles = await Article.find({ tags: { $in: [tag] } }).sort({ createdAt: -1 });

      if (!articles.length) {
      return response.status(404).json({ message: "No articles found for this tag" });
    }

    response.json(articles);
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}
