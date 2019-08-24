require('./3')
require('./2')

// console.log(require.cache);
exports.a = '123';
exports = '指向其他内存区';
console.log(module);
console.log(module.exports);
console.log(exports);