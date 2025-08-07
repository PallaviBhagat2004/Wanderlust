const express= require("express");
const router=express.Router();

//Posts
//Index - posts
router.get("/",(req,res)=>{
    res.send("Get the  posts");
})

//Show postsid
router.get("/:id",(req,res)=>{
    res.send("Get the  posts show at the route");
})

//post posts
router.post("/",(req,res)=>{
    res.send("The post for   posts");
})

//delete-posts
router.delete("/:id",(req,res)=>{
    req.send("The delete post is working");
})

module.exports=router;