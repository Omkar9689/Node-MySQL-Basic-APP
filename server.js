const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/* CREATE */
app.post("/add", (req, res) => {
  const { name, email, course } = req.body;
  const sql = "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";
  db.query(sql, [name, email, course], () => res.redirect("/"));
});

/* READ */
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/* UPDATE */
app.post("/update/:id", (req, res) => {
  const { name, email, course } = req.body;
  const sql = "UPDATE students SET name=?, email=?, course=? WHERE id=?";
  db.query(sql, [name, email, course, req.params.id], () => res.redirect("/"));
});

/* DELETE */
app.get("/delete/:id", (req, res) => {
  db.query("DELETE FROM students WHERE id=?", [req.params.id], () => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
