const mongoose=require("mongoose");

const dbConnectionString=process.env.MONGO_URI;
mongoose.connect(dbConnectionString)
.then(()=>{
    console.log("connected successfully")
})
.catch((error)=>{
    console.log("error while connecting "+error);
    process.exit();
});

module.exports=mongoose;