const { log } = require("console");
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./triangle.db");
app.use(express.static("public"));

// Create a table (if not exists)
var createStateTable =
  "CREATE TABLE IF NOT EXISTS statetb (id INTEGER PRIMARY KEY, state TEXT, date_created TEXT)";
db.run(createStateTable);

// GET request to fetch data
app.get("/statetb", (req, res) => {
  db.all("SELECT * FROM statetb", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ state: rows });
  });
});

// POST request to add data
app.post("/statetb", express.json(), (req, res) => {
  const { state, date_created } = req.body;

  db.run(
    "INSERT INTO statetb (state, date_created) VALUES (?,?)",
    [state, date_created],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Item added", itemId: this.lastID });
    }
  );
});

sql = `DELETE FROM statetb WHERE id = ?`;
for (let i = 0; i < 25; i++) {
  db.run(sql, [i], (err) => {
    if (err) return console.log(err.message);
  });
}

// query the data
sql = `SELECT * FROM statetb`;
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
