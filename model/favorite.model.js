import mongoose from "mongoose";
const favoriteSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
   itemId:{
    type : mongoose.Schema.Types.ObjectId,
    refPath : "itemType"
   },
    itemType:{
       type : String,
       enum :["pose", "meditation", "quote", "routine"]
    },
    createAt:{
        type : Date,
        default : Date.now()
    }
})
const Favorite = mongoose.model("favorite",favoriteSchema);
export default Favorite;