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

//Signup Customer

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

//Closing Account

app.get(`/api/deactivate/:accountNumber`, (req, res) => {
  const accountNumber = req.params.accountNumber;
  console.log(accountNumber);
  const removeFromCustomersQuery = `DELETE FROM customers WHERE AccountNumber = ?`;
  const removeFromLoansQuery = `DELETE FROM loans WHERE AccountNumber = ?`;
  const removeFromBalanceQuery = `DELETE FROM balance WHERE AccountNumber = ?`;
  const removeFromTransactionsQuery = `DELETE FROM transactions WHERE AccountNumber = ?`;

  db.query(removeFromLoansQuery, [accountNumber], (err, res1) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Deleted User Record From Loans Table!");

    db.query(removeFromBalanceQuery, [accountNumber], (err, res2) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Deleted User Records From Balance Table!");

      db.query(removeFromTransactionsQuery, [accountNumber], (err, res3) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Deleted User Transactions From Transactions Table!");
        db.query(removeFromCustomersQuery, [accountNumber], (err, res4) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Deleted User From Customers Table!");
          res.status(200).send("Account Deactivation Successful");
        });
      });
    });
  });
});

//Checking Cnic Existense

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

//Checking Account Existense

app.get("/api/check-account-number/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const checkAccountQuery =
    "SELECT COUNT(*) AS AccountCount FROM customers WHERE AccountNumber = ?";
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

//Getting User Details

app.get("/api/data/:accountNumber", (req, res) => {
  const accountNumber = req.params.accountNumber;
  const detailsQuery =
    "SELECT customers.AccountNumber, customers.AccountTitle, customers.Cnic, customers.Phone, customers.City, loans.LoanAmount, balance.Balance FROM customers LEFT JOIN loans ON customers.AccountNumber = loans.AccountNumber LEFT JOIN balance ON customers.AccountNumber = balance.AccountNumber WHERE customers.AccountNumber = ?";
  db.query(detailsQuery, [accountNumber], (err, result) => {
    if (err) {
      console.error("Error retrieving user details:", err);
      return;
    }
    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
