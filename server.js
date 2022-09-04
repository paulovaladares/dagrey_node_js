const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

// Custom middleware LOGGER
app.use(logger);

const whiteList = ['https://www.yoursite.com', 'https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (originCall, callback) => {
        if (whiteList.indexOf(originCall) !== -1 || !originCall) {
            callback(null, true); // no error, can access
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
// app.use(cors()) // allow all
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.use(express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

// app.all('/*(.html)?', (req, res) => {
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": '404 not found' })
    } else {
      res.type('txt').send('404 not found');  
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));