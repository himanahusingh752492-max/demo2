let ex=require("express");
let app=ex();

app.use(ex.urlencoded({ extended: true })); 
app.use(ex.json());
require('dotenv').config();
let path =require('path');
let mongoose=require("mongoose");
let model =require("./DB");
let bodyparser = require("body-parser");
app.use(ex.static(path.join(__dirname,"public")))
mongoose.connect(process.env.DBURL).then(console.log("connected to DATABASE - " + process.env.DBURL));

app.get("/",(req,res)=>{
   res.sendFile(__dirname+ '/public/index.html');
 

})

app.post('/submit',async(req,res)=>{
    //console.log(req.body);
   
   const { username, email, password } = req.body||{};
   
try {
    const user = new model({ username, email, password });
    await user.save();
    res.send("User registered successfully! "+ `${username}`);
 
   // res.redirect('/home');
    
  } catch (err) {
      console.error("MONGOOSE ERROR:", err);
    res.status(500).send("Database error");
  }



})
// app.get('/home',(req,res)=>{
//       const username = req.query.username; 
      
//       res.send(`User registered successfully! ${username} `);
// })
app.listen(8000,()=>{
    console.log("connected to SERVER - "+ process.env.PORT);
});




