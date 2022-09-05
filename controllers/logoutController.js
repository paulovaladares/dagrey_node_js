
const fsPromises = require('fs').promises;
const path = require('path');

const data = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const handleLogout = async (req, res) => { 
    // IMPORTANT: On client, also delete the accessToken
    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(204); // No content 
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = data.users.find( person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
    const filteredUsers = data.users.filter( theOne => theOne.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' }
    data.setUsers([ ...filteredUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'), 
        JSON.stringify(data.users)
    );
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only server on https
    res.sendStatus(204);
 } 

 module.exports = { handleLogout }