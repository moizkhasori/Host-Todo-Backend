export const generateTokenAndSendCookie = (user, statusCode, res) => {

    const token = user.getJwtToken();

    res.status(statusCode).cookie("token",token,{
        // Other cookie options...
        sameSite: 'None',
        secure: true // Required when using SameSite=None
    }).json({
        success:true,
        user
    })


}
