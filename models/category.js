const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const categorySchemna = new Schema({
    name: {type: String, require: true},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("Category", categorySchemna)