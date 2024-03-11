import express from "express"
import { handleCurrentUserDetails, handleLoginUser, handleLogoutUser, handleSignupUser } from "../../Controllers/Users/userController.js";
import { restrictToLoggedinUserOnly } from "../../Middlewares/RestrictToLoginUserOnly.js";

const router = express.Router()

router.post("/signup", handleSignupUser)
router.post("/login", handleLoginUser)
router.get("/logout", handleLogoutUser)
router.get("/currentloggedinuser", restrictToLoggedinUserOnly ,handleCurrentUserDetails)

export default router;