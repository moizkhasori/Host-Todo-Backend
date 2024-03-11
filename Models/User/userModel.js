import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: [true, "Please Enter Your Full-Name"],
        minLength: [4, "Fullname should have a minimum length of 4 characters!"],
        maxLength: [30, "Fullname should have a maximum length of 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [validator.isEmail, "Please Enter a valid Email"],

    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have a minimun length of 8 characters!"],
        select: false,
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })



// encrypt password before saving
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)

})



// JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
}



// Compare Password
userSchema.methods.comparePassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password)
}



export const User = mongoose.model("User", userSchema)
