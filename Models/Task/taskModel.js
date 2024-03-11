import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required : [true, "Title Must be Provided!"],
        minLength: [4, "Title must be longer than 4 characters"]
    },
    description: {
        type: String,
        required : [true, "Description Must be Provided!"],
    },
    duedate: {
        type: Date,
    },
    priority: {
        type: String,
        enum : ["Low", "Medium", "High"],
        default: "Medium"
    },
    status: {
        type: String,
        enum : ["Pending", "InProgress", "Completed"],
        default: "Pending"
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "Userid Must be provided to create a Todo"]
    }

}, {timestamps:true})

export const Task = mongoose.model("Task", taskSchema)