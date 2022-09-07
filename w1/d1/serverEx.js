const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request received", req.url);
if (req.url === '/cats') {
  res.setHeader("Content-Type", "text/html");
  res.write("<img src='https://pbs.twimg.com/media/Fb-CMgZaAAAHaU2?format=jpg&name=large'>");
  res.end();
} else if  (req.url === '/dogs'){
  res.setHeader("Content-Type", "text/html");
  res.write("<img src='https://pbs.twimg.com/media/FcCwpShaQAA9fYq?format=jpg&name=medium'>");
  res.end();
} else if (req.url === '/users') {
  res.setHeader("Content-Type", "text/html");
  res.write("");
  res.end();
} else if (req.url === '/products') {
  res.setHeader("Content-Type", "text/html");
  res.write("");
  res.end();
}
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

