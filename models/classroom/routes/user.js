const express= require("express");
const router=express.Router();

//Index - users
router.get("/",(req,res)=>{
    res.send("Get the user");
})

//Show -userid
router.get("/:id",(req,res)=>{
    res.send("Get the user show at the route");
})

//post -user
router.post("/",(req,res)=>{
    res.send("The post for users");
})

//delete- user
router.delete("/:id",(req,res)=>{
    req.send("The delete user is working");
})


module.exports= router;