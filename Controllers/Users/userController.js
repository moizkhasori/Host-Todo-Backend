import { AsyncMiddleware } from "../../Middlewares/catchAsyncErrors.js";
import { User } from "../../Models/User/userModel.js";
import { generateTokenAndSendCookie } from "../../Utils/CookieAndToken.js";
import ErrorHandler from "../../Utils/ErrorHandler.js";


// Registering a User
export const handleSignupUser = AsyncMiddleware(async (req, res, next) => {
    const { fullname, email, password } = req.body;
    if(!fullname || !email || !password){
        return next(new ErrorHandler("Please Fill all fields Fullname, Email, Password!", 400))
    }
    let user = await User.create({fullname, email, password});
    generateTokenAndSendCookie(user, 201, res)
})



// SigningIn a User
export const handleLoginUser = AsyncMiddleware(async (req,res,next) => {

    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter both Email and Password!", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Credentials!", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Password!", 401))
    }

    generateTokenAndSendCookie(user, 200, res)

})


// SigningOut User

export const handleLogoutUser = AsyncMiddleware(async (req,res,next) => {

    const options = {
        expires: new Date(0), // Set expiration date to a past date
        httpOnly: true, // Include any other cookie options you originally used
        secure: true, // Include if the cookie was originally set with secure: true
        sameSite: 'None' // Include if the cookie was originally set with SameSite=None
        // Add any other options you used when setting the cookie
    }

    res.status(200).cookie("token",null,options).json({
        success: true,
        message: "User LoggedOut Successfully!"
    })

})

// getting loggedin user profile
export const handleCurrentUserDetails = AsyncMiddleware(async(req,res,next) => {

    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })

})
