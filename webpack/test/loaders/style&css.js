function appendScript(content) {
  return `${JSON.stringify(`
const style = document.createElement('style');
style.innerContent = ${content};
document.head.appendChild(style);
`)}`;
}

module.exports = function() {};

module.exports.pitch = function(remainingRequest, r) {
  const s = JSON.stringify(`-!${remainingRequest}`);
  console.error(remainingRequest);
  return appendScript(s);
};
