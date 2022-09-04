const whiteList = [
    'https://www.yoursite.com',
    'https://www.google.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
];

const corsOptions = {
    origin: (originCall, callback) => {
        if (whiteList.indexOf(originCall) !== -1 || !originCall) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;