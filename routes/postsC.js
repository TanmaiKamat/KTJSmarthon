const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Post = require("../models/Post");
const User=require("../models/User")
//Get Method for all Notes.
router.get("/allPublicPosts", async (req, res) => {
  try{
    console.log(req.user);
  const posts = await Post.find();
  res.json({posts,success:true});
  }catch(e){
    console.log(e);
    res.status(401).json({succss:false,error:e.message});
  }
});


router.get("/allPrivatePosts", fetchUser, async (req, res) => {
  try{
    console.log(req.user);
  const posts = await Post.find({ user: req.user.id });
  res.json({posts,success:true});
  }catch(e){
    console.log(e);
    res.status(401).json({success:false,error:e.message});
  }
});




//Add New Note . Login Required
router.post(
  "/addPost",
  fetchUser,
  [
   
  ],
  async (req, res) => {
    const { name,requiredTeamMembers } = req.body;
    let success=false;
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array(),success });
      }

      const post = await Post.create({
        name:name,
        requiredTeamMembers:requiredTeamMembers,
        user: req.user.id,
      });

      res.status(200).json({post,success:true});
    } catch (e) {
      console.error(e.message);
      res.status(500).send({ InternalError: "Internal Error" ,success});
    }
  }
);







//Joining request
router.put("/requestJoin/:id",  async (req, res) => {
  let success=false;
  try {
    let curPost = await Post.findById(req.params.id);
    
    const { userId } = req.body;
 
   
    if (!curPost) {
      return res.status(404).json({error:"Not Found",success});
    }
    
    curPost["joiningRequest"].push(userId)

    curPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: curPost },
      
      { new: true }
    );
    // const note=Note.findByIdAndUpdate()

    res.status(200).json({curPost,success});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});




//Update Note . Login Required
router.put("/select/:id", fetchUser, async (req, res) => {
  let success=false;
  try {
    const { userId } = req.body;
    
    let curPost = await Post.findById(req.params.id);
    let user1 = await User.findById(req.params.id);
    if (!curPost) {
      return res.status(404).json({error:"No Post Found",success});
    }
    if (!user1) {
      return res.status(404).json({error:"User Not Found",success});
    }
    if (curPost.user.toString() !== req.user.id) {
      return res.status(401).send({error:"Access denied",success});
    }

    curPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: curPost },
      { new: true }
    );
    // const note=Note.findByIdAndUpdate()

    res.status(200).json({curPost,success});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});

//Delete  Note. DELETE Method . Login Required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let curNote = await Note.findById(req.params.id);
    if (!curNote) {
      return res.status(404).send("Not Found");
    }
    if (curNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    curNote = await Note.findByIdAndDelete(req.params.id);
    // const note=Note.findByIdAndUpdate()

    res.status(200).json({ Success: "Successfully deleted", note: curNote });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});

module.exports = router;
