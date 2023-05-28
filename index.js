require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/users")


const app = express()
const PORT = process.env.PORT || 3000

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
    res.send({title: 'Test'})
})

app.get('/add-user', async (req, res) => {
    const user = {username: "xuanloi", password: "123"}
    try {
        await User.insertOne(user)
        res.send("Data Added..")
    } catch (error) {
        console.log("err" + error);
    }
})

app.get('/user', async (req, res) => {
    const book = await User.find();
    return book? res.json(book): res.send("Something error")
})



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listen on port ${PORT}`);
    })
})