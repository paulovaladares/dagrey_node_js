const User = require("../model/User");

const handleLogout = async (req, res) => { 
    // IMPORTANT: On client, also delete the accessToken
    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(204); // No content 
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
   foundUser.accessToken = '';
   const result = await foundUser.save();
   console.log(result);
   
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only server on https
    res.sendStatus(204);
 } 

 module.exports = { handleLogout }