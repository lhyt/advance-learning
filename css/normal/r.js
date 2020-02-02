const http = require("http");
http
  .createServer((req, res) => {
    console.log(Object.keys(req));
    if (req.url === "/favicon.ico") {
      res.end("1");
      return;
    }
    http.get("http://api.mtyqx.cn/api/random.php?return=json", r => {
      let buf = "";
      console.log(r.url);
      r.on("data", chunk => {
        buf += chunk;
      });
      r.on("end", () => {
        console.log(buf);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(buf);
      });
    });
  })
  .listen(3000);
