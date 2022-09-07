const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        ( err, decoded ) => {
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJwt;