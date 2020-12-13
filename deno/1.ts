import { serve } from 'http/server.ts';
import { createRequire } from 'https://deno.land/std/node/module.ts';
const require = createRequire(import.meta.url);
const path = require('path');

const __dirname = path.dirname(import.meta.url);
console.log(serve, __dirname, window);

fetch('http://www.qq.com').then(r => {
  r.text().then(res => {
    console.log(res);
  });
});
