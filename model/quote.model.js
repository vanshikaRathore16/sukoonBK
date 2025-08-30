import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Quote text is required"]
  },
  author: {
    type: String,
    default: "Unknown"
  },
  mood: {
    type: String,
    default: "neutral"
  },
  category: {
    type: String,
    default: "motivational"
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quote = mongoose.model("quote", quoteSchema);

export default Quote;
