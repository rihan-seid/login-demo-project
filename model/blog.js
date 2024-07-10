const mongoose =require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:[String]
    },
    catagory:{type:String}


});

module.exports=mongoose.model("Product" ,ProductSchema);