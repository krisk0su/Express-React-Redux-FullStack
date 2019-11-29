const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

// var personSchema = Schema({
//     _id     : Schema.Types.ObjectId,
//     name    : String,
//     age     : Number,
//     stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
//   });
module.exports = User = mongoose.model("user", UserSchema);
