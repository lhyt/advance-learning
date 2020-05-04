const child_process = require('child_process');

const { spawn } = child_process;

const sp2 = spawn('node', ['../hello/2.js']);
const sp1 = spawn('node', ['../hello/1.js'], {
  cwd: process.cwd(),
  env: process.env,
  //注意这里，子进程只能有一个IPC通道
  stdio: ['pipe', 'ipc', 'pipe'],
  detached: false,
});
const sp4 = spawn('go', ['run', '../../go-learning/main.go']);

// sp1.stdout.on('data', function (data) {
//   console.log('111:' + data);
// });

sp1.stderr.on('data', function (data) {
  console.log('err1', data.toString());
});

sp1.stdin.on('data', function (data) {
  console.log('stdin1', data.toString());
});

//注意这里要用子进程对象进行监听
//监听有没有消息
sp1.on('message', function (data) {
  console.log('子进程发送的 : ', data.toString());
});

sp1.send('你好，子进程');

// sp2.stdout.on('data', function (data) {
//   console.log('222:' + data);
// });

// sp2.on('exit', function (code, signal) {
//   if (!code) {
//     console.log('sp2 exit, signal:' + signal);
//   } else {
//     console.log('sp2 exit, signal:' + signal);
//   }
//   process.exit();
// });

// sp4.stdout.on('data', (data) => {
//   console.log('go data', data);
// });

// sp4.stdin.on('data', (data) => {
//   console.log('go data', data);
// });

// sp4.stdout.on('data', (data) => {
//   console.log('go output data: \n', data.toString());
// });
