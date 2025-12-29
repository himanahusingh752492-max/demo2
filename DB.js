let mongoose = require("mongoose");
let sodel =mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    }
})
let model=mongoose.model("DB",sodel);
module.exports=model;