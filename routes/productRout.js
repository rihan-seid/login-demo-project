const express = require('express');

const multer = require ("multer");  // file upload
const path = require ("path"); 

const router = express.Router();

const { createPosts, getAllPosts, getPostsById } = require("../controllers/productController");
const { route } = require('express/lib/router');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
      cb(null, 'uploads/'); 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    } 
  }); 
  const upload = multer({ storage: storage });
  router.post("/", upload.array("image", 3), createPosts);
  router.get("/", getAllPosts);
  router.get("/:id", getPostsById);  

  module .exports=router
  