const http = require("http");
const fs = require("fs");

const server = http.createServer(async(request, response) => {
  console.log("url", request.url);
  if (request.url === "/readFile") {
    fs.readFile("users.json", "utf8", (error, data) => {
      if (error) {
        console.log("error on read file", error);
      } else {
        console.log("content file", data);
        response.writeHead(200, { "content-type": "application/json" });
        response.write(JSON.stringify(data));
        response.end();
      }
    });
  }
  if (request.url === "/appendFile") {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }

    const newUserdata = Buffer.concat(buffers).toString();
    console.log(JSON.parse(newUserdata)); 
    fs.readFile("users.json", "utf8", (error, data) => {
      console.log(data);
      if (error) {
        console.log("error on read file", error);
      } else {
        const userObj = JSON.parse(data);
        userObj.users.push(JSON.parse(newUserdata));
        fs.writeFile("users.json", JSON.stringify(userObj), (err) => {
          if (err) {
            console.log("Error on create file", err);
          } else {
            response.writeHead(201, { "content-type": "application/json" });
            response.write(JSON.stringify({ message: "File created." }));
            response.end();
          }
        });
      }
    });
  }
  if (request.url === "/deleteFile") {
    fs.unlink("users.json", (err) => {
      if (err) {
        console.log("Error on delete file", err);
      } else {
        response.writeHead(200, { "content-type": "application/json" });
        response.write(JSON.stringify({ message: "File deleted." }));
        response.end();
      }
    });
  }


  
})

server.listen(3000, () => console.log("server runnning on 3000"));