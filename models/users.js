const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const userSchemna = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("User", userSchemna)