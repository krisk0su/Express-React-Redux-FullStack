const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema 

const ItemSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model("item", ItemSchema);