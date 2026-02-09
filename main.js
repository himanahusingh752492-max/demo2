let ex=require("express");
const { v4: uuidv4 } = require('uuid');
let app=ex();
//let {setuser}=require('./auth.js')
app.use(ex.urlencoded({ extended: true })); 
app.use(ex.json());
require('dotenv').config();
let path =require('path');
let mongoose=require("mongoose");
let model =require("./DB");
let bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const cookie=require('cookie-parser')
app.use(ex.static(path.join(__dirname,"public")))
mongoose.connect(process.env.DBURL).then(console.log("connected to DATABASE - " + process.env.DBURL));

app.use(cookie());

 const {auth}=require('./middleware.js');
const Parser = require("parser");
const { redirect } = require("react-router-dom");



app.get("/",(req,res)=>{
   res.sendFile(__dirname+ '/public/index.html');
    res.sendFile(__dirname+ '/public/index1.html');

})
//SIGNUP
app.post('/submit',async(req,res,)=>{
  
   
   const { username, email, password } = req.body||{};
   
try {
    const user = new model({ username, email, password });
    await user.save();




     res.redirect('/home')
 

    
  } catch (err) {
      console.error("MONGOOSE ERROR:", err);
    res.status(500).send("Database error");
  }



})

//



//LOGIN

app.post('/login', async (req, res,) => {
  try {
    const { email, password } = req.body||{};
      console.log(req.body);
  const user = await model.findOne({email});
     console.log( user );
    if (!user) {
    
res.redirect('/index1.html');


    }
    if (user.password !== password) {
    

res.redirect('/index1.html');

}
  
  res.cookie("user",user.id);
   res.redirect('/home')
  } 

 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
   
   
});


//HOME
app.get('/home',async (req,res) => {
console.log("Cookie:", req.cookies.user);

  return res.sendFile(__dirname + '/public/home.html');
 
});
// app.get('/phone',auth,(req,res)=>{
//   return res.sendFile(__dirname + '/public/home.html');
 
// })



app.listen(8000,()=>{
    console.log("connected to SERVER - "+ process.env.PORT);
});




