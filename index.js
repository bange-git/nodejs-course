const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
 if(req.url == '/'){
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
        if(err) throw err;
        res.writeHead(200, {"content-type": "text/html" });
        res.end(content);
    })
 }
 else if(req.url == '/about') {
    fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
        if(err) throw err;
        res.writeHead(200, {"content-type": "text/html" });
        res.end(content);
    })
 }
});

const port = 5000 | process.env.port 

server.listen(port, () => console.log(`server is running on port: ${port}`));