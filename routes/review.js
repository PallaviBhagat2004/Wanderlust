const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const { reviewSchema}=require("../../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");


const validatereview=(req,res,next)=>{    //function to validate the schema 
  let {error}=reviewSchema.validate(req.body);
  if(error)
    {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

///POST route 
//Reviews
router.post("/",validatereview,wrapAsync(async(req,res)=>{
   let listing= await Listing.findById(req.params.id);
   let newreview= new Review(req.body.review);

   listing.reviews.push(newreview._id);

   await newreview.save();
   await listing.save();

   res.redirect(`/listings/${listing._id}`);
}));

///delete reviews
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
      let {id, reviewId}= req.params;

      await Listing.findByIdAndUpdate(id,{$pull:{ reviews:reviewId}});
      await Review.findByIdAndDelete(reviewId);

     res.redirect(`/listings/${id}`);
}));


module.exports=router;