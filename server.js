const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url == "/" ? "index.html" : req.url
  );
  //console.log(filePath);

  //extension of file
  let ext = path.extname(filePath);

  //initial content-type
  let type = "text/html";

  //check ext and set content type
  switch (ext) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;
    case ".html":
      contentType = "text/html";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
  }

  //read file

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //PAGE NOT FOUND
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //some server error
        res.writeHead(500);
        res.end(`Sever Error : ${err.code}`);
      }
    } else {
      // success response
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const port = 5000 | process.env.port;

server.listen(port, () => console.log(`server is running on port: ${port}`));
