const express = require("express");
const router = express.Router();
const authWare = require("../../middleware/auth");

//ITEM MODEL
const Item = require("../../models/Item");

// @route GET api/items
// GET ALL ITEMS
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// Create ITEM
// @access Private
router.post("/", authWare, (req, res) => {
  const { name, price, username, creator } = req.body;
  if (!name || !price) {
    return res.status(400).json({ msg: "Enter all fields!" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ msg: "Item name must be more than 3 letters" });
  }
  if (price < 1) {
    return res.status(400).json({ msg: "Item price must be at least 1 euro." });
  }
  const newItem = new Item({
    name,
    price,
    username,
    creator
  });

  newItem.save().then(item => res.json(item));
});

// @route POST api/items
// DELETE ITEM
// @access Private
router.delete("/:id", authWare, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.statusCode(404).json({ success: false }));
});
module.exports = router;
