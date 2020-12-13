const { spawn } = require('child_process');
const path = require('path');

const execByChildProcess = (n = 1) => {
  Array.apply(null, { length: n }).forEach(() => {
    spawn('node', ['main'], {
      cwd: path.join(__dirname),
    });
  });
};

execByChildProcess(Number([...process.argv].pop()) || 2);
