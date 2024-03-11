import express from "express"
import { restrictToLoggedinUserOnly } from "../../Middlewares/RestrictToLoginUserOnly.js";
import { handelDeleteTask, handelUpdateTask, handleCreateNewTask, handleGetMyAllTasks, handleGetMyOneTask } from "../../Controllers/Tasks/taskController.js";

const router = express.Router()

router.post("/createtask",restrictToLoggedinUserOnly, handleCreateNewTask)
router.patch("/updatetask/:taskid",restrictToLoggedinUserOnly, handelUpdateTask)
router.get("/deletetask/:taskid",restrictToLoggedinUserOnly, handelDeleteTask)
router.get("/getmyalltasks",restrictToLoggedinUserOnly, handleGetMyAllTasks)
router.get("/getmyonetask/:id",restrictToLoggedinUserOnly, handleGetMyOneTask)


export default router;