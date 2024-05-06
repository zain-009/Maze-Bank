//instance of express library
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bankdb",
});

app.post("/signup", (req, res) => {
  const { name, accountNumber, cnic, phoneNumber, age, city } = req.body;

  // Insert data into the database
  const query = `INSERT INTO users (name, accountNumber, cnic, phoneNumber, age, city) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [name, accountNumber, cnic, phoneNumber, age, city],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
