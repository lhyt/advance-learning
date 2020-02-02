const everyPorts = [];
onconnect = function({ ports }) {
  everyPorts.push(...ports);
  [...ports].forEach(port => {
    port.onmessage = function(event) {
      everyPorts.forEach(singlePort => {
        if (port !== singlePort) {
          singlePort.postMessage(event.data.data);
        }
      });
    };
  });
};

function rewrite(v) {
  return [null, undefined].includes(v) ? "" : v;
}

function mergeObject(target, source) {
  return Object.entries(source).reduce(
    (acc, [k, v]) => (
      (acc[k] = typeof v === "object" ? mergeObject(acc[k], v) : rewrite(v)),
      acc
    ),
    Array.isArray(target) ? [...target] : { ...target }
  );
}
