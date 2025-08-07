const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js");
const reviews= require("./routes/review.js");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(()=>{
    console.log("connection success to db");
})
.catch(err=>{
    console.log("there is the error in db");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.listen(8080,()=>{
    console.log("the port is working");
})

app.get("/",(req,res)=>{
    res.send("the page is working properly");
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)



//commom page ke liye error middleware
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

///middleware to handle the error 
app.use((err, req,res,next)=>{
    let{status=500, message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{err});
})