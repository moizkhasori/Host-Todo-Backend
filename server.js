import express from "express"
import dotenv from "dotenv"
import app from "./app.js"
import { connectMongoDB } from "./Config/connectMongoDB.js"

// config
dotenv.config({
    path:"config/config.env"
})


// db connection
connectMongoDB()

app.listen(process.env.PORT, () => {
    console.log(`Server Started at Port ${process.env.PORT}!`);
})