const { getOptions } = require("loader-utils");

module.exports = function(content) {
  const options = getOptions(this) || {};
  console.log(options);
  const mimetype = options.mimetype;

  const esModule =
    typeof options.esModule !== "undefined" ? options.esModule : true;

  return `${esModule ? "export default" : "module.exports ="} ${JSON.stringify(
    `data:${mimetype || ""};base64,${content.toString("base64")}`
  )}`;
};

module.exports.raw = true;
