const express = require("express");
const router = express.Router();
const authWare = require("../../middleware/auth");

//Require the posts
const Post = require("../../models/Post");

// @route GET api/posts
// GET ALL POSTS
router.get("/", (req, res) => {
  Post.find().then(posts => res.json(posts));
});

// @route GET api/posts/:id
// @GET ONE POST
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => res.json(post))
    .catch(err => res.json(`The id: ${id} does not exist in the database`));
});

// @route POST api/posts
// Create POST
// @access Private
router.post("/", authWare, (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator
  });

  newPost.save().then(post => res.json(post));
});

// @route POST api/posts
// DELETE POST
// @access Private
router.delete("/:id", authWare, (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.statusCode(404).json({ success: false }));
});
module.exports = router;
