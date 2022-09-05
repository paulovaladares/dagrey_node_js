const jwt = require('jsonwebtoken');
require('dotenv').config();

const data = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const handleRefreshToken = (req, res) => { 
    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(401);    
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = data.users.find( person => person.refreshToken === refreshToken)
    if (!foundUser) return res.sendStatus(403); // forbidden
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        ( err, decoded ) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    UserInfo: {
                        username: foundUser.username,
                        roles,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    )
 
 } 

 module.exports = { handleRefreshToken }