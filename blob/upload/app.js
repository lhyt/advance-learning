/**
 * 服务入口
 */
var http = require("http");
var koaStatic = require("koa-static");
var path = require("path");
var koaBody = require("koa-body"); //文件保存库
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
    multipart: true // 开启文件上传，默认是关闭
  })
);

//开启静态文件访问
app.use(koaStatic(path.resolve(__dirname, "../static")));

//文件二次处理，修改名称
app.use(ctx => {
  var file = ctx.request.files.f1; //得道文件对象
  var path = file.path;
  var fname = file.name; //原文件名称
  var nextPath = path + fname;
  if (file.size > 0 && path) {
    //得到扩展名
    var extArr = fname.split(".");
    var ext = extArr[extArr.length - 1];
    var nextPath = path + "." + ext;
    //重命名文件
    fs.renameSync(path, nextPath);
  }
  //以 json 形式输出上传文件地址
  ctx.body = `{
        "fileUrl":"${uploadHost}${nextPath.slice(
    nextPath.lastIndexOf("/") + 1
  )}"
    }`;
});

/**
 * http server
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log("demo1 server start ......   ");
