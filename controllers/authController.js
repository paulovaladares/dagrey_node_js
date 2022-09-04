const bcrypt = require('bcrypt');

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
        res.json({ 'success': `User ${user} is logged in!`});
    } else {
        res.sendStatus(401);
    }
 } 

 module.exports = { handleLogin }