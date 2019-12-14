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
  const newItem = new Item({
    name: req.body.name
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
