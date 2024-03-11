import { AsyncMiddleware } from "../../Middlewares/catchAsyncErrors.js";
import { Task } from "../../Models/Task/taskModel.js";
import { User } from "../../Models/User/userModel.js";
import ErrorHandler from "../../Utils/ErrorHandler.js";

export const handleCreateNewTask = AsyncMiddleware(async (req, res, next) => {

    let { title, description, duedate, priority, status } = req.body;

    if (!title || !description) {
        return next(new ErrorHandler("Both Title and Description Must be Provided", 400))
    }

    // Default due date after 3 days
    if (!duedate) {
        const currentDate = new Date();
        const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
        duedate = new Date(currentDate.getTime() + threeDaysInMillis);
    } else {
        duedate = new Date(duedate);
    }

    if (isNaN(duedate.getTime())) {
        return next(new ErrorHandler("Invalid Due Date", 400))
    }

    // userId
    const createdby = req.user._id

    // create task
    const task = await Task.create({ title, description, duedate, priority, status, createdby })

    return res.status(201).json({
        success: true,
        message: "Task Created Successfully",
        task,
    })

})



export const handelUpdateTask = AsyncMiddleware(async (req, res, next) => {

    // extract id from url
    const { taskid } = req.params

    // check if todo exist in db
    let foundedtask = await Task.findById(taskid);

    // if todo not exist throw error
    if (!foundedtask) {
        return next(new ErrorHandler(`No such task found with id ${taskid}`), 404);
    }


    // check for all values changed given in req.body
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            if (key === "duedate") {
                foundedtask[key] = new Date(req.body[key])
            } else {
                foundedtask[key] = req.body[key];
            }

        }
    }

    // save updations
    foundedtask = await foundedtask.save();

    // return response
    return res.status(200).json({
        success: true,
        message: "Task Updated Successfully",
        foundedtask,
    })


})


// Delete Task
export const handelDeleteTask = AsyncMiddleware(async (req, res, next) => {

    const {taskid} = req.params;

    const findtodo = await Task.findById(taskid)
    if (!findtodo) {
        return next(new ErrorHandler(`No such task found with id ${taskid}`), 404);
    }

    const result = await Task.findByIdAndDelete(taskid)
    
    res.status(200).json({
        success: true,
        message: `Deleted successfully! Task id: ${result._id}`
    })

})



// Get My All Task
export const handleGetMyAllTasks = AsyncMiddleware( async(req,res,next) => {

    const createdby = req.user._id

    const filterQuery = {createdby};

    if(req.query.status){
        filterQuery.status = req.query.status
    }

    if(req.query.priority){
        filterQuery.priority = req.query.priority
    }

    // default limit is 100
    const defaultlimit = 100;
    const limit = ( 
        (req.query.limit &&  parseInt(req.query.limit) > defaultlimit) // if true - restrict limit to 100
        ? 100 // if not true, take limit from below
        : parseInt(req.query.limit) || defaultlimit 
    )
    
    const currentpage = parseInt(req.query.page) || 1;
    const skip = limit * (currentpage-1);
    
    const tasks = await Task.find(filterQuery).skip(skip).limit(limit);
    const tasksArraySize = tasks.length;

    res.json({
        success:true,
        message: `These are all tasks matching above filters!`,
        limit,
        skip,
        tasksArraySize,
        tasks
    })

} )

export const handleGetMyOneTask = AsyncMiddleware( async(req,res,next) => {
    
    const taskid = req.params.id
    if(!taskid){
        return next(new ErrorHandler(`ID must be provided`), 400);
    }
    
    const task = await Task.findById(taskid);
    if(!task){
        return next(new ErrorHandler(`No such task found with id ${taskid}`), 404);
    }

    res.json({
        success:true,
        message: `This is your task with id ${taskid}`,
        task
    })

} )