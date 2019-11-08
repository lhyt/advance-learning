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
app.use(koaStatic(path.resolve(__dirname, "../static")));

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
        result.push(
          `${uploadHost}${nextPath.slice(nextPath.lastIndexOf("/") + 1)}`
        );
      }
    });
    // 以 json 形式输出上传文件地址
    ctx.body = JSON.stringify({
      code: 0,
      fileUrls: result
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "x-requested-with,content-type"
    );
    response.addHeader("Access-Control-Allow-Credentials", "true");
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
