import mongoose from "mongoose";

const poseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  instructions: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  duration: { type: Number, min: 5, max: 600, required: true },

  // Extra details
  sanskritName: { type: String, required: true, trim: true },
  steps: { type: [String], default: [] }, // fixed typo: "stype" → "type"
  preparation: { type: String, trim: true },
  benefits: { type: [String], default: [] },
  contraindications: { type: [String], default: [] },
  focusAreas: { type: [String], default: [] },
  caloriesBurned: { type: Number },
  difficultyScore: { type: Number, min: 1, max: 10, default: 1 }
});

export const Pose = mongoose.model("pose", poseSchema);
