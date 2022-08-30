const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

// const uuid = require('uuid')
// uuid.v4();

console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));

console.log(uuid());