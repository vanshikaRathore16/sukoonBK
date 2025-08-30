// models/Article.js
import mongoose from "mongoose";
const allowedTags = [
  "stress",
  "anxiety",
  "depression",
  "self-care",
  "emotional balance",
  "mental clarity",
  "relaxation",
  "happiness",
  "sleep",
  "beginner",
  "daily practice",
  "breathing",
  "focus",
  "mindfulness",
  "time management",
  "productivity",
  "routine",
  "concentration",
  "neuroscience",
  "brain health",
  "psychology",
  "evidence-based",
  "research",
  "hormones",
  "cognitive function",
  "relaxation response",
  "Buddhism",
  "Zen",
  "Vedanta",
  "mantra",
  "prayer",
  "energy healing",
  "chakras",
  "silence",
  "inner peace",
  "workplace stress",
  "leadership",
  "decision-making",
  "burnout",
  "corporate wellness",
  "focus at work",
  "teamwork",
  "motivation",
  "yoga",
  "pranayama",
  "asanas",
  "mindfulness meditation",
  "vipassana",
  "guided meditation",
  "yoga nidra",
  "transcendental meditation"
];
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String, 
    required: true
  },
  content: {
    type: String, 
    required: true
  },
  author: {
    type: String,
    default: "Anonymous"
  },
  category: {
  type: String,
  required: true,
  enum: [
    "Mental Health & Wellbeing",
    "Tips & Guides",
    "Science & Research",
    "Tradition",
    "Spirituality",
    "At Work",
    "Yoga"
  ]
}
,
  Image: {
    type: String
  },
   tags: [{
    type: String,
    enum: allowedTags, // only these tags are allowed
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
   language: { type: String, default: "English" },
  updatedAt: {
    type: Date
  }
});

// Auto-update `updatedAt` before save
ArticleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

 const Article =  mongoose.model("Article", ArticleSchema);
 export default Article;
