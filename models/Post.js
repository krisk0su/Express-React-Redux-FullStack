const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const PostSchema = new Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  likes: {
    type: mongoose.Schema.Types.Number,
    default: 0
  }
});

//   var storySchema = Schema({
//     _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
//     title    : String,
//     fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });
module.exports = Post = mongoose.model("post", PostSchema);
