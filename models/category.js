const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const categorySchemna = new Schema({
    name: {type: String, require: true},
    icon: {type: String},
    typeCategory: {type: String}
})

module.exports = mongoose.model("Category", categorySchemna)