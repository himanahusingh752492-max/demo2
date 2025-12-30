let ex=require("express");
let app=ex();

app.use(ex.urlencoded({ extended: true })); 
app.use(ex.json());
require('dotenv').config();
let path =require('path');
let mongoose=require("mongoose");
let model =require("./DB");
let bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
app.use(ex.static(path.join(__dirname,"public")))
mongoose.connect(process.env.DBURL).then(console.log("connected to DATABASE - " + process.env.DBURL));

app.get("/",(req,res)=>{
   res.sendFile(__dirname+ '/public/index.html');
    res.sendFile(__dirname+ '/public/index1.html');

})
//SIGNUP
app.post('/submit',async(req,res)=>{
    //console.log(req.body);
   
   const { username, email, password } = req.body||{};
   
try {
    const user = new model({ username, email, password });
    await user.save();
     res.redirect('/home')
 
   // res.redirect('/home');
    
  } catch (err) {
      console.error("MONGOOSE ERROR:", err);
    res.status(500).send("Database error");
  }



})
//LOGIN

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body||{};
      console.log(req.body);
  const user = await model.findOne({email});
     console.log( user );
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
  return res.status(400).json({ message: "Invalid password" });
}
   res.redirect('/home')
  
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//HOME
app.get('/home',async (req, res) => {

  res.sendFile(__dirname + '/public/home.html');

});

app.listen(8000,()=>{
    console.log("connected to SERVER - "+ process.env.PORT);
});




