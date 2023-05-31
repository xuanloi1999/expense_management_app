require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/users")
const Category = require("./models/category")
const Transaction = require("./models/transaction")
const Income = require("./models/income")
const Account = require("./models/account")

const app = express()
const PORT = process.env.PORT || 3000

//setup parames always return runtime
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("strictQuery", false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connect successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send({App: 'Expensive Management App'})
})

//User
app.post('/user/add', async (req, res) => {
    const user = req.body
    try {
        const userExist = await User.find({username: user.username});
        if(accountExist[0] == null){
            await Account.insertMany([user])
            users = await User.find().sort({_id: -1}).limit(1);;
            return users? res.json(users): res.send("Something error")
        }
        else{
            res.send("Account was exits")
        }
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/user', async (req, res) => {
    const username = req.query.username
    const user = await User.find({username: username});
    return user? res.json(user): res.send("Something error")
})

//account 
app.post('/account/update', async (req, res) => {
    const accountParams = req.body
    await Account.findByIdAndUpdate({_id: accountParams.id}, {...accountParams, updateAt: Date.now()});
    const account = await Account.find({_id: accountParams.id});
    return account? res.json(account): res.send("Something error")
})

app.delete('/account', async (req, res) => {
    const id = req.query.id
    const account = await Account.findByIdAndUpdate({_id: id}, { deletedAt: Date.now()});
    return account? res.json(account): res.send("Something error")
})

app.post('/account', async (req, res) => {
    const account = req.body
    try {
        const accountExist = await Account.find({username: account.username});
        if(accountExist[0] == null){
            await Account.insertMany([account])
            accounts = await Account.find().sort({_id: -1}).limit(1);;
            return accounts? res.json(accounts): res.send("Something error")
        }
        else{
            res.send("Account was exits")
        }
        
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/account', async (req, res) => {
    const id = req.query.id
    const account = await Account.find({_id: id});
    return account? res.json(account): res.send("Something error")
})

//category
app.post('/category/update', async (req, res) => {
    const categoryParams = req.body
    try {
        await Category.findByIdAndUpdate({_id: categoryParams.id}, {...categoryParams, updateAt: Date.now()})
        const category = await Category.find({_id: categoryParams.id});
        return category? res.json(category): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.delete('/category', async (req, res) => {
    const id = req.query.id
    try {
        await Category.findByIdAndUpdate({_id: id}, { deletedAt: Date.now()})
        const category = await Category.find({_id: id});
        return category? res.json(category): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.post('/category', async (req, res) => {
    const categoryParams = req.body
    try {
        await Category.insertMany([categoryParams])
        const category = await Category.find().sort({_id: -1}).limit(1);
        return category? res.json(category): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})



app.get('/category', async (req, res) => {
    const categoryName = req.query.name
    const regex = new RegExp(`.*${categoryName}\\w*`);
    const category = await Category.find({name: {$regex: regex}});
    return category? res.json(category): res.send("Something error")
})

//Transaction

app.post('/transaction/add', async (req, res) => {
    const transactionParams = req.body
    try {
        await Transaction.insertMany([transactionParams])
        res.send("Add transaction completely")
    } catch (error) {
        console.log("err" + error);
    }
})

app.post('/transaction/update', async (req, res) => {
    const transactionParams = req.body
    const transactionId = req.body.id
    transactionParams.id = transactionId
    transactionParams.updateAt = Date.now()
    try {
        await Transaction.updateOne({_id: transactionId}, transactionParams)
        res.send("Update transaction completely")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/transaction/delete', async (req, res) => {
    const transactionID = req.query.id
    try {
        await Transaction.updateOne({id: transactionID}, {deletedAt: Date.now()})
        res.send("Delete transaction completely")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/transaction', async (req, res) => {
    const transactionId = req.query.id
    const transaction = await Transaction.find({_id: transactionId});
    console.log(transaction[0].deletedAt);
    return transaction[0].deletedAt === undefined? res.json(transaction): res.send("Transaction was deleted")
})

//Income

app.post('/income/add', async (req, res) => {
    const incomeParams = req.body
    try {
        await Income.insertMany([incomeParams])
        const income = await Income.find().sort({_id: -1}).limit(1);
        return income? res.json(income): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/income/user', async (req, res) => {
    const userId = req.query.userId
    const income = await Income.find({account: userId});
    return income? res.json(income): res.send("Something error")
})

app.post('/income', async (req, res) => {
    const incomeParams = req.body
    try {
        await Income.findByIdAndUpdate({_id: incomeParams.id}, {...incomeParams,updateAt: Date.now()})
        const income = await Income.find({_id: incomeParams.id});
        return income? res.json(income): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.delete('/income', async (req, res) => {
    const id = req.query.id
    try {
        await Income.findByIdAndUpdate({_id: id}, {deletedAt: Date.now()})
        const income = await Income.find({_id: id});
        return income? res.json(income): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/income', async (req, res) => {
    const id = req.query.id
    const income = await Income.find({_id: id});
    return income? res.json(income): res.send("Something error")
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listen on port ${PORT}`);
    })
})