require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/users")
const Category = require("./models/category")

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
        await User.insertMany([user])
        res.send("Data Added..")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/user', async (req, res) => {
    const username = req.query.username
    const user = await User.find({username: username});
    return user? res.json(user): res.send("Something error")
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

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listen on port ${PORT}`);
    })
})