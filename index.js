const logEvents = require('./logEvents')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {};

// init object
const myEmitter = new MyEmitter()

// add listeners

myEmitter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted!')
}, 2000)