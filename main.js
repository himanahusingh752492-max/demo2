let ex=require("express");
let app=ex();
app.use(ex.json());
require('dotenv').config();

let mongoose=require("mongoose");
let model =require("./DB");
mongoose.connect(process.env.DBURL).then(console.log("connected to DATABASE - " + process.env.DBURL));
app.post('/',async(req,res)=>{
 
    
    let Model= new model(req.body);
    await Model.save();      

    res.send("hello");
})
app.listen(8000,()=>{
    console.log("connected to SERVER - "  + process.env.PORT);
});