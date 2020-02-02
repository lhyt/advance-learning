module.exports = function(content, map, meta) {
  console.log("console loader");
  this.callback(
    null,
    `${content}
  console.log('loader', this)
`,
    map,
    meta
  );
  return;
};
