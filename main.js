let ex=require("express");
let app=ex();
app.use(ex.json());
require('dotenv').config();

let mongoose=require("mongoose");
mongoose.connect(process.env.DBURL).then(console.log("connected to DATABASE"))
app.post('/',(req,res)=>{
    res.send("hello");
})
app.listen(8000,()=>{
    console.log("connected to SERVER")
});