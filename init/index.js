const mongoose=require("mongoose");
const intiaData=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("connection success to db");
})
.catch(err=>{
    console.log("there is the error in db");
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


const inhitDb = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(intiaData.data);
    console.log("the data was intialized");
}

inhitDb();