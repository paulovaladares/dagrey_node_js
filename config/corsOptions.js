const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (originCall, callback) => {
        if (allowedOrigins.indexOf(originCall) !== -1 || !originCall) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;