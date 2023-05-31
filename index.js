require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/users")
const Category = require("./models/category")
const Spending = require("./models/spending")
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

//spending



app.post('/spending/update', async (req, res) => {
    const spendingParams = req.body
    try {
        await Spending.findByIdAndUpdate({_id: spendingParams.id}, {...spendingParams, updateAt: Date.now()})
        const spending = await Spending.find({_id: spendingParams.id});
        return spending? res.json(spending): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.post('/spending', async (req, res) => {
    const spendingParams = req.body
    try {
        await Spending.insertMany([spendingParams])
        const spending = await Spending.find().sort({_id: -1}).limit(1);
        return spending? res.json(spending): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.delete('/spending', async (req, res) => {
    const spendingID = req.query.id
    try {
        await Spending.findByIdAndUpdate({_id: spendingID}, {deletedAt: Date.now()})
        const spending = await Spending.find({_id: spendingID});
        return spending? res.json(spending): res.send("Something error")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/spending/all', async (req, res) => {
    const spending = await Spending.find();
    let spendings = []
    spending.map(s => {
        if(s.deletedAt === undefined){
            spendings.push(s)
        }
    })
    return spendings !== []? res.json(spendings): res.send("spending was deleted all")
})

app.get('/spending', async (req, res) => {
    const spendingId = req.query.id
    const spending = await Spending.find({_id: spendingId});
    return spending[0].deletedAt === undefined? res.json(spending): res.send("spending was deleted")
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