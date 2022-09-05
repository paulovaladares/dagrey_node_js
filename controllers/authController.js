const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const data = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const handleLogin = async (req, res) => { 
    const { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({ 'message': 'User and password is required.' });
    const foundUser = data.users.find( person => person.username === user)
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // Create the JWTs
        const accessToken = jwt.sign(
            { 
                UserInfo: {
                    username: foundUser.username,
                    roles,
                }
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: '30s' }
        )
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: '1d' }
        )
        // Add / Update refreshToken to specifique user and save in json
        const filteredUsers = data.users.filter( theOne => theOne.username !== foundUser.username );
        const currentUser = { ...foundUser, refreshToken };
        data.setUsers([ ...filteredUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(data.users)
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
 } 

 module.exports = { handleLogin }