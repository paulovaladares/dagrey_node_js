const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const data = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const handleNewUser = async (req, res) => { 
    const { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({ 'message': 'User and password is required.' });
    const duplicated = data.users.find( person => person.username === user)
    if (duplicated) return res.sendStatus(409);
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = { username: user, password: hashedPassword};
        data.setUsers([...data.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'), 
            JSON.stringify(data.users)
        );
        res.status(201).json({ 'success': `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
 } 

 module.exports = { handleNewUser }