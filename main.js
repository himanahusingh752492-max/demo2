let ex=require("express");
let app=ex();
app.use(ex.json());
require('dotenv').config();
let path =require('path');
let mongoose=require("mongoose");
let model =require("./DB");

mongoose.connect(process.env.DBURL).then(console.log("connected to DATABASE - " + process.env.DBURL));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+ '/index.html');
   // res.send(__dirname + '/index.html');
    console.log(__dirname + '/index.html');

})

app.post('/',async(req,res)=>{
   
    res.sendFile(__dirname + '/index.html')
    
    let Model= new model(req.body);
    await Model.save();       
     
    res.send("helo");
})
app.listen(8000,()=>{
    console.log("connected to SERVER - "+ process.env.PORT);
});