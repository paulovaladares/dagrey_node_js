const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401);

    console.log('Bearer token:', authHeader);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        ( err, decoded ) => {
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.user;
            next();
        }
    )
}

module.exports = verifyJwt;