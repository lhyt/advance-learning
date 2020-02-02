/**
 * 服务入口
 */
var http = require("http");
var koaStatic = require("koa-static");
var path = require("path");
var koaBody = require("koa-body");
var fs = require("fs");
var Koa = require("koa2");

var app = new Koa();
var port = process.env.PORT || "8100";

var uploadHost = `http://localhost:${port}/uploads/`;

app.use(
  koaBody({
    formidable: {
      //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
      uploadDir: path.resolve(__dirname, "../static/uploads")
    },
    multipart: true // 支持文件上传
  })
);

//开启静态文件访问
app.use(koaStatic(path.resolve(__dirname, "../")));

//二次处理文件，修改名称
app.use(ctx => {
  var files = ctx.request.files ? ctx.request.files.f1 : null; //得道文件对象
  if (files) {
    if (!Array.isArray(files)) {
      files = [files];
    }
    const result = [];
    files.forEach(file => {
      var path = file.path.replace(/\\/g, "/");
      var fname = file.name; //原文件名称
      var nextPath = "";
      if (file.size > 0 && path) {
        //得到扩展名
        var extArr = fname.split(".");
        var ext = extArr[extArr.length - 1];
        nextPath = path + "." + ext;
        //重命名文件
        fs.renameSync(path, nextPath);
        result.push(`${uploadHost}${nextPath.slice(nextPath.lastIndexOf("/") + 1)}`);
      }
    });
    console.log(ctx);
    // 以 json 形式输出上传文件地址
    ctx.res.setHeader("Access-Control-Allow-Origin", "*");
    ctx.res.setHeader("Access-Control-Allow-Methods", "POST");
    ctx.res.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
    ctx.res.setHeader("Access-Control-Allow-Credentials", "true");
    ctx.body = JSON.stringify({
      code: 0,
      fileUrls: result
    });
  } else {
    ctx.body = '{ "code": 0, "msg": "no data" }';
  }
});

/**
 * http server
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log("demo1 server start ......   ");

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  let res;
  let temp;
  let isMoreThan10 = false;
  while (l1 && l2) {
    const sum = l1.val + l2.val;
    const r = sum % 10;
    if (temp) {
      temp.next = new ListNode();
      temp = temp.next;
    }
    if (!res) {
      res = new ListNode(r);
      temp = res;
    }
    temp.val = (r + isMoreThan10) % 10;
    isMoreThan10 = sum + isMoreThan10 > 9;
    l1 = l1.next;
    l2 = l2.next;
  }
  let rest = l1 || l2;
  while (rest) {
    temp.next = rest;
    temp = temp.next;
    if (isMoreThan10) {
      isMoreThan10 = temp.val + 1 > 9;
      temp.val = (temp.val + 1) % 10;
    }
    rest = rest.next;
  }
  if (isMoreThan10) {
    temp.next = new ListNode(1);
  }
  return res;
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function createLink(arr) {
  const res = new ListNode();
  let temp = res;
  arr.forEach((i, j) => {
    temp.val = i;
    if (j !== arr.length - 1) {
      temp = temp.next = new ListNode();
    }
  });
  return res;
}

function add(a, b) {
  let cursor = 1;
  const [{ length: aLen }, { length: bLen }] = [a, b];
  let res = "";
  let carry = 0;
  while (a[aLen - cursor] || b[bLen - cursor] || carry) {
    const sum = ~~a[aLen - cursor] + ~~b[bLen - cursor] + carry;
    res = `${sum % 10}${res}`;
    carry = +(sum > 9);
    cursor++;
  }
  return res;
}

function addMany(...args) {
  let cursor = 1;
  let res = "";
  let carry = 0;
  while (args.some(arg => arg[arg.length - cursor]) || carry) {
    const sum = args.reduce((acc, arg) => acc + ~~arg[arg.length - cursor], 0) + carry;
    res = `${sum % 10}${res}`;
    carry = ~~(sum / 10);
    cursor++;
  }
  return res;
}

function multMany(...args) {
  let cursor = 1;
  let res = "";
  let carry = 0;
  let some;
  while ((some = args.some(arg => arg[arg.length - cursor]) || carry)) {
    const r = some ? args.reduce((acc, arg) => acc * ~~(arg[arg.length - cursor] || 1), 1) : 0;
    console.log(r, carry, res);
    const sum = (r || 1) * (carry || 1);
    res = `${sum % 10}${res}`;
    carry = ~~(sum / 10);
    cursor++;
  }
  return res;
}

const check = str => (`${+str}` === str && !str.includes(".")) || str === (+str).toFixed(1);
["1.1", "11", "0111", "00111", "adasd", "1sdf", "0.11", "0.001", "10.22", "0.2", "00.2", "1.1.1", ".10", ".1", "1.", "0."].reduce((acc, c) => {
  acc[c] = check(c);
  return acc;
}, {});
