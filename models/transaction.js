const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const transactionSchemna = new Schema({
    id: {type: String, default: new mongoose.mongo.ObjectId()},
    money: {type: String, require: true},
    category: {type:String},
    transactionAt: {type: Date},
    note: {type:String},
    thubnail: {type: String},
    slug: {type: String},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("Transaction", transactionSchemna)