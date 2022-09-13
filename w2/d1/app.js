const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

const pets = [
  { id:1, name: "Pablo", age: 3, type: "cat" },
  { id:2, name: "Taro", age: 2, type: "dog" }
];

let editId = 0;

server.get("/new", (req, res) => {
  res.render("petForm", {
    title: "List of pets",
    pets,
    editId
  });
});

server.post("/new", (req, res) => {
  console.log("new pet request");
  console.log("body", req.body);
  const newPetName = req.body.name;
  const newPetAge = req.body.age;
  const newPetType = req.body.type;
  pets.push({ name: newPetName, id: pets.length + 1, age: newPetAge, type: newPetType });
  server.get("/", (req, res) => {
    res.render("petForm", {
      title: "List of pets",
      pets,
      editId
    });
  });
  res.redirect("/");
});

server.get("/edit/:id", (req, res) => {
  editId = req.params.id;
    res.render("petForm", {
      title: "List of pets",
      pets,
      editId
    });
  
  server.post("/edit/:id", (req, res) => {
    console.log("edit pet request");
    console.log("body", req.body);
    const editPetName = req.body.name;
    const editPetAge = req.body.age;
    const editPetType = req.body.type;
    pets.map(pet => {
      if (pet.id == editId) {
        pet.name = editPetName;
        pet.age = editPetAge;
        pet.type = editPetType;
      }
    })
    // editId = 0;
    server.get("/edit/:id", (req, res) => {
      res.render("petForm", {
        title: "List of pets",
        pets,
        editId
      });
    });
    res.redirect("/edit/:id");
  });

  //Remove pet (/delete/:id)
//   server.post("/delete/:id", (req, res) => {
//   const id = +req.params.id;
//   pets = pets.filter((pet)=>pet.id != id)
//   res.redirect("/delete/:id");
// });
  
});



server.listen(3000, () => console.log("server on 3000"));


