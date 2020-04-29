function getChunkNameFromRemainingRequest(r) {
  const paths = r.split('/');
  let cursor = paths.length - 1;
  if (/^index\./.test(paths[cursor])) {
    cursor--;
  }
  return paths[cursor];
}

module.exports = function() {};

module.exports.pitch = function(remainingRequest, r) {
  console.log(remainingRequest, 'remainingRequest<<<<<');
  const s = JSON.stringify(`-!${remainingRequest}`);
  return `export default function(cb) {
  return cb(import(/* webpackChunkName: "my-lazy-${getChunkNameFromRemainingRequest(this.resource)}" */${s}));
}`;
};
