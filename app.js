import express from "express"
import cookieParser from "cookie-parser"
import errorMiddleware from "./Middlewares/error.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://main--fabulous-paletas-de85bb.netlify.app',
    credentials:true
}))

// routes import
import userRouter from "./Routes/Users/userRoute.js"
import taskRouter from "./Routes/Tasks/taskRoute.js"

// routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)

// error middleware
app.use(errorMiddleware)

export default app;
