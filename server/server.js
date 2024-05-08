const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bankdb",
  port: 3306,
});

app.post(`/api/signup`, (req, res) => {
  const { accountTitle, accountNumber, cnic, phoneNumber, city } = req.body;
  const customerQuery = `INSERT INTO customers (AccountNumber, AccountTitle, Cnic, Phone, City) VALUES (?, ?, ?, ?, ?)`;
  const loanQuery = `INSERT INTO loans (AccountNumber, LoanAmount) VALUES (?, ?)`;
  const balanceQuery = `INSERT INTO balance (AccountNumber, Balance) VALUES (?, ?)`;

  db.query(
    customerQuery,
    [accountNumber, accountTitle, cnic, phoneNumber, city],
    (err, customerResult) => {
      if (err) {
        console.error("Error inserting customer data:", err);
        res.status(500).send("Error inserting customer data");
        return;
      }
      console.log("Customer data inserted successfully");

      db.query(loanQuery, [accountNumber, 0], (err, loanResult) => {
        if (err) {
          console.error("Error creating loan record:", err);
          res.status(500).send("Error creating loan record");
          return;
        }
        console.log("Loan record inserted successfully");

        db.query(balanceQuery, [accountNumber, 0], (err, balanceResult) => {
          if (err) {
            console.error("Error creating balance record:", err);
            res.status(500).send("Error creating balance record");
            return;
          }
          console.log("Balance record inserted successfully");

          res.status(200).send("Data inserted successfully");
        });
      });
    }
  );
});

app.get("/api/check-cnic/:cnic", (req, res) => {
  const { cnic } = req.params;

  const checkCNICQuery =
    "SELECT COUNT(*) AS cnicCount FROM customers WHERE Cnic = ?";
  db.query(checkCNICQuery, [cnic], (err, result) => {
    if (err) {
      console.error("Error checking CNIC:", err);
      res.status(500).json({ error: "Error checking CNIC" });
      return;
    }

    const cnicCount = result[0].cnicCount;
    res.json({ exists: cnicCount > 0 });
  });
});

app.get("/api/check-account-number/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const checkAccountQuery =
    "SELECT COUNT(*) AS AccountCount FROM customers WHERE Cnic = ?";
  db.query(checkAccountQuery, [accountNumber], (err, result) => {
    if (err) {
      console.error("Error checking AccountNumber:", err);
      res.status(500).json({ error: "Error checking AccountNumber" });
      return;
    }

    const AccountCount = result[0].AccountCount;
    res.json({ exists: AccountCount > 0 });
  });
});

// app.get("/api/data", (req, res) => {
//   const sql = "SELECT * FROM your_table_name";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.json(result);
//   });
// });

app.get("/api", (req, res) => {
  res.json({ users: ["one", "two", "three"] });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
