console.log('timer1');

Promise.resolve().then(function() {
  console.log('promise1');
});
process.nextTick(() => {
  console.log('nextTick');
});
