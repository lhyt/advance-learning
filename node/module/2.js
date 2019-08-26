delete require.cache[require.resolve('./3.js')];
const { a } = require('./3');
console.log('2>>>>>');
a();
console.log('>>>>2');
module.exports = 2;