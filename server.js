// console.log(global);

// It uses commonJS instead of ES6 modules

const os = require('os')
const path = require('path')
const math = require('./math');

console.log(os.type())
console.log(os.version())
console.log(os.homedir())
console.log('--------------------------------------------')
console.log(__dirname)
console.log(__filename)
console.log('--------------------------------------------')
console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))
console.log('--------------------------------------------')
console.log(math.add(2, 5))
console.log(math.subtract(2, 5))
console.log(math.multiply(2, 5))
console.log(math.divide(2, 5))
console.log('--------------------------------------------')