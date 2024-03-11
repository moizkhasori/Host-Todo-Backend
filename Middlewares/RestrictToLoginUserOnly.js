import { User } from "../Models/User/userModel.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { AsyncMiddleware } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken"

export const restrictToLoggedinUserOnly = AsyncMiddleware(async (req,res,next) => {


    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler("Login First", 401))
    }

    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedUserId.id)

    next()

})