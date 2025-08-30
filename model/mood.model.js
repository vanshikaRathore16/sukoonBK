import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    mood: {
        type: String
    },
    note: {
        type: String,
        default: "",
        maxlength: 200 // optional character limit
    },
    // Gratitude as a simple array without validation
    gratitudes: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        default: () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today;
        }
    }
});

// Optional: unique index to prevent multiple moods per user per day
// moodSchema.index({ userId: 1, date: 1 }, { unique: true });

const Mood = mongoose.model("mood", moodSchema);
export default Mood;
