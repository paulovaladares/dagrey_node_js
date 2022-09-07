const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => { 
    const { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({ 'message': 'User and password is required.' });

    const duplicated = await User.findOne({ username: user }).exec();
    if (duplicated) return res.sendStatus(409);
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        /*         
            const newUser = new User();
            newUser.username = user;
            newUser.password = hashedPassword;
        or
            const newUser = new User({ 
            username: user, 
            password: hashedPassword
            });
        then
            const result = await newUser.save();
        */
       const request = await User.create({ 
           username: user, 
           password: hashedPassword
       });

        console.log(request);
        
        res.status(201).json({ 'success': `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
 } 

 module.exports = { handleNewUser }