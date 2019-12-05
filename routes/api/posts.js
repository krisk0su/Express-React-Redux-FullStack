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
router.post("/", (req, res) => {
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

// @route POST api/posts/like/:id
// LIKE POST
// @access Private
router.post("/like/", (req, res) => {
  const { postId, userId } = req.body;

  Post.findById(postId).then(post => {
    let hasLiked = post.fans.some(fan => fan == userId);

    try {
      if (hasLiked) {
        throw new Error("You aleady liked this post.");
      } else {
        post.fans.push(userId);
        post.likes += 1;
        post.save().then(post => res.json(post));
      }
    } catch (err) {
      res.statusCode = 404;
      res.json({ msg: err.message });
    }
  });
});
module.exports = router;
