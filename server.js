const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;

const app = express();

app.get('^/$|/index(.html)?', (req, res) => {
    // res.send('Hello World!!!')
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html') // 302 by default
})

// route handler
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('HELLO WORLD!')
})


const one = (req, res, next) => { 
    console.log('try one...');
    next()
}

const two = (req, res, next) => { 
    console.log('try two...');
    next()
}

const three = (req, res, next) => { 
    console.log('try three...');
    res.send('Finished!')
}

app.get('/chain(.html)?', [one, two, three])

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));