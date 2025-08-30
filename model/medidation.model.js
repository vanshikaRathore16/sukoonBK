import mongoose from "mongoose";

const medidationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    type: [{ type: String }], // multiple types/categories
    mood: [{ type: String }], // multiple moods
    author: { type: String}, // author's name
    audioURL: { type: String },
    imageURL: { type: String },
    podcast : {type : String},
    createdAt: { type: Date, default: Date.now }
});

const Medidation = mongoose.model("medidation", medidationSchema);
export default Medidation;
