const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const spendingSchemna = new Schema({
    money: {type: String},
    category: {type:String},
    transactionAt: {type: Date},
    note: {type:String},
    image: {type: String},
    time: {type: Date, default: Date.now},
    updateAt: {type: Date},
    deletedAt: {type: Date}
})

module.exports = mongoose.model("Spending", spendingSchemna)