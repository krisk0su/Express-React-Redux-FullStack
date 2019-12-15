const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const ItemSchema = new Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
