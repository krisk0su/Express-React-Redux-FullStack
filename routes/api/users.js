const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//USER MODEL
const User = require("../../models/User");

// @route GET api/users
// CREATE NEW USER
router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  //SIMPLE VALIDATION
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ msg: "This email already exists in the database" });
    }
    const newUser = new User({
      username,
      email,
      password
    });

    //CREATE SALT
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});
// @router GET api/users:id
// GET USERNAME BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .select("username -_id")
    .then(user => res.json(user));
});
// @route GET api/users
// GET ALL USERS
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

module.exports = router;
