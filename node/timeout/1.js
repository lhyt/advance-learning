function timeout(fn, time) {
  var timer;
  if (timer) {
    clearTimeout(timer);
  }
  return function() {
    timer = setTimeout(function() {
      fn();
      timeout(fn, time)();
    }, time);
  };
}
function interval(fn, time) {
  timeout(fn, time)();
}

console.time("cost time");
const timer = setInterval(() => {
  console.time('1')
  for (let i = 0; i < 1000000000; i++) {}// 不到1000ms
  console.timeEnd('1')
  console.log("before 1000ms");
}, 100);

setTimeout(() => {
  clearInterval(timer)
  console.timeEnd("cost time");
}, 1000);
