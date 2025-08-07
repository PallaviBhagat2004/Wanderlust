const express= require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../../schema.js");

const validateListing=(req,res,next)=>{    //function to validate the schema 
  let {error}=listingSchema.validate(req.body);
  if(error)
    {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

///index route
router.get("/",wrapAsync(async(req,res)=>{
    const all_list= await Listing.find({});
    res.render("listing/index.ejs",{all_list});
}));

//create new route
router.get("/new",(req,res)=>{
    res.render("listing/new.ejs");
})


router.post("/",validateListing,wrapAsync(async(req,res,next)=>{  
    const listing=new Listing(req.body.listing);
    await listing.save();
    console.log("the data is saved");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});
}));

//update route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));


//delete route 
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const deletedlist= await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const list= await Listing.findById(id).populate("reviews");
    res.render("listing/show.ejs",{list});
}));


module.exports=router;