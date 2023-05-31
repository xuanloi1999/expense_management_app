const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const incomeSchemna = new Schema({
    money: {type: String, require: true},
    category: {type:String},
    note: {type: String},
    image: {type: String},
    account: {type: String},
    time: {type: Date, default: Date.now},
    updateAt: {type: Date},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("Income", incomeSchemna)