// console.log('{ "str": "this is 1.js" }');

// console.warn(123);

// process.stdin.write('我是标准输入');

process.on('message', function (data) {
  console.log(JSON.stringify(`父进程发送的: ${data.toString()}`));
});
//向父进程发送消息
process.send('你好，父进程');
