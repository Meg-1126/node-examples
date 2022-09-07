const http = require("http");
const users = { 
  user1: "Megumi", 
  user2: "Mauricio", 
  user3: "Gabriel", 
  user4: "Yuto", 
  user5: "Arthur" 
};
const products = {
  item1: "car",
  item2: "airplane",
  item3: "bike",
  item4: "train"
}

const server = http.createServer((req, res) => {
  console.log("request received", req.url);
if (req.url === '/cats') {
  res.setHeader("Content-Type", "text/html");
  res.write("<img src='https://pbs.twimg.com/media/Fb-CMgZaAAAHaU2?format=jpg&name=large'>");
  // res.end();
} 
if  (req.url === '/dogs'){
  res.setHeader("Content-Type", "text/html");
  res.write("<img src='https://pbs.twimg.com/media/FcCwpShaQAA9fYq?format=jpg&name=medium'>");
  // res.end();
} 
if (req.url === '/users') {
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(users));
  // res.end();
} 
if (req.url === '/products') {
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(products));
}
res.end();
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

