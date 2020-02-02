module.exports = function(content, map, meta) {
  const callback = this.async();
  this.loadModule("../src/api.js", (err, source, sourceMap, module) => {
    callback(
      null,
      `const api = ${source.split("=")[1]};
${content};`,
      sourceMap,
      meta
    );
  });
  return;
};
