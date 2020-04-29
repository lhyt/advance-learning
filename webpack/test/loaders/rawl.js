const { getOptions } = require('loader-utils');

module.exports = function(content, map, meta) {
  console.log(content instanceof Buffer, 'is buffer?');
  const opts = getOptions(this) || {};

  const code = JSON.stringify(content);
  const isESM = typeof opts.esModule !== 'undefined' ? options.esModule : true;
  return `${isESM ? 'export default' : 'module.exports ='} ${code}`;
};

// module.exports.raw = true;
