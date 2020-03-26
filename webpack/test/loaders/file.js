const { getOptions } = require('loader-utils');

module.exports = function(content) {
  const opts = getOptions(this) || {};
  const name = `${Math.random()
    .toString(36)
    .slice(2)}-pic.png`;
  const path = `./${opts.publicPath || 'dist'}/${name}`;

  this.emitFile(path, content);
  return `export default "${path}"`;
};

module.exports.raw = true;
