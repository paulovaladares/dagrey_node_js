const fs = require('fs')
const path = require('path')

// fs.readFile('./files/starter.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// })

// fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {
    if (err) throw err;
    console.log('Write complete');
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is.', (err) => {
        if (err) throw err;
        console.log('Append complete');
    })

})

fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Just a test...', (err) => {
    if (err) throw err;
    console.log('Append complete');
    fs.rename(path.join(__dirname, 'files', 'test.txt'), path.join(__dirname, 'files', 'append.txt'), (err) => {
        if (err) throw err;
        console.log('Append complete');
    })
})

console.log('Will load soon...');

process.on('uncaughtException', err => {
    console.log(`There as an uncaught error: ${err.stack}`);
    process.exit(1);
})
