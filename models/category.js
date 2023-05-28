const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const categorySchemna = new Schema({
    name: {type: String, require: true},
    thumbnail: {type: String},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("User", userSchemna)