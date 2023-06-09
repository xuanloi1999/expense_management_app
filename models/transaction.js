const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const TransactionSchemna = new Schema({
    expense: {type: String, require: true},
    category: {type: String, require: true},
    transactionAt: {type: Date, require: true},
    note: {type: String},
    typeTransaction: {type: String},
    accountID: {type: String},
    groupID: {type: String},
})
