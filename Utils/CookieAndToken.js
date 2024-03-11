export const generateTokenAndSendCookie = (user, statusCode, res) => {

    const token = user.getJwtToken();

    res.status(statusCode).cookie("token",token).json({
        success:true,
        user
    })


}