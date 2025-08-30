import { request, response } from "express";
import Favorite  from "../model/favorite.model.js";
import { Pose } from "../model/pose.model.js";


export const addtofav = async(request,response,next)=>{
    try{
      const {itemId,itemType,userId} = request.body;
      console.log(itemId + " " + itemType+" "+userId)
      let user = await Favorite.findOne({userId,itemId,itemType});
      if(user)
        return response.status(404).json({message : "added"});
        let fav = await Favorite.create({userId,itemId,itemType});
        return response.status(200).json({message : "added in fav",fav});
    }catch(err){
        console.log(err);
        return response.status(500).json({err : "internal server error"});
    }
}


//  see fav list
export const list = async (req, res) => {
  try {
    const {userId} = req.params;

    const favorites = await Favorite.find({ userId }).populate("itemId");

    res.status(200).json({
      success: true,
      favorites: favorites,
    });
  } catch (err) {
    console.error("Error getting favorites:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};



// export const getFavorites = async (req, res) => {
//   try {
//     const { userId, itemType } = req.query;
//     const filter = { userId };
//     if (itemType) 
//     filter.itemType = itemType;
//     const favorites = await Favorite.find(filter).populate("itemId");
//     res.status(200).json({ success: true, count: favorites.length, favorites });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// remoce from favorite

export const removeFromFavorites = async (req, res) => {
  try {
    const {userId} = req.params;
    const {  itemId, itemType } = req.body;

    const result = await Favorite.findOneAndDelete({
      userId,
      itemId,
      itemType
    });
    if (!result) {
      return res.status(404).json({ success: false, message: "Favorite not found." });
    }
res.status(200).json({ success: true, message: "Removed from favorites." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
//  get qoute routine list
export const routineList = async(request,response,next)=>{
  try{ 
    const {userId} = request.params;
    let list = await Favorite.find({userId, itemType : "routine"}).populate("itemId");
    return response.status(200).json({list : list});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}

//  get favorite qoute list
export const quoteList = async(request,response,next)=>{
  try{
   const {userId} = request.params;
   let list = await Favorite.find({userId, itemType : "quote"}).populate("itemId");
   return response.status(201).json({list : list});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}


// get favrite pose
export const poseList = async(request,response,next)=>{
  try{
  const {userId} = request.params;
  let list = await Favorite.find({userId,itemType : "pose"}).populate("itemId");
  console.log("Populated list:", JSON.stringify(list, null, 2));
  return response.status(201).json({list : list});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"})
  }
}
// get favorite by id
export const favById = async(request,response,next)=>{
  try{
      let {id} = request.params;
     let favorite = await Favorite.findById(id).populate({
  path: "itemId",
  populate: {
    path: "poseId",
  },
});
      return response.status(200).json({favorite : favorite});
  }catch(err){
    console.log(err);
    return response.status(500).json({err : "internal server error"});
  }
}