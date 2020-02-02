module.exports = function(content, map, meta) {
  console.log("add html loader");
  this.callback(
    null,
    `${content}
  document.body.innerHTML += 'this is innerhtml added'
`,
    map,
    meta
  );
  return;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  console.log(remainingRequest, "remainingRequest>>>");
  return (
    "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");"
  );
};
