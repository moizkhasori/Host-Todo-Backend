import mongoose from "mongoose";

export const connectMongoDB = () => {
    mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then( (data) => {console.log(`MongoDB Connected with server: ${data.connection.host}`)} )
    .catch((error) => { console.log(`MongoDB Connection Failed! Error Message - ${error.message}`); })
}

