const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const accountSchemna = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    money: {type: String, require:true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Account", accountSchemna)