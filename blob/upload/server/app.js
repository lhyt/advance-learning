require("http")
  .createServer((req, res) => {
    require("fs").readFile(
      require("path").join(__dirname, "1.jpg"),
      (e, data) => {
        if (e) {
          console.log(e);
          return;
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "image/jpg");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.end(data);
      }
    );
  })
  .listen(2000);
