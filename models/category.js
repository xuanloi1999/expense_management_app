const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const categorySchemna = new Schema({
    name: {type: String, require: true},
    color: {type:String},
    thumbnail: {type: String},
    slug: {type: String},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("Category", categorySchemna)