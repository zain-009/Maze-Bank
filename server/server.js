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

//Collect Loan

app.post(`/api/collectloan`, (req, res) => {
  const { accountNumber, loanAmount } = req.body;

  const prevLoanQuery = `SELECT LoanAmount from loans WHERE AccountNumber = ?`;
  const updatedLoanQuery = `UPDATE loans SET LoanAmount = ? WHERE AccountNumber = ?`;
  const transactionQuery = `INSERT INTO transactions (AccountNumber, TransactionAmount, Purpose) VALUES (?, ?, ?)`;
  const purpose = `Loan Repaid`;

  db.query(prevLoanQuery, [accountNumber], (err, resLoan) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error retrieving loan amount!" });
      return;
    }
    console.log("Loan Amount Retrieved Successfully!");
    let loan = parseInt(resLoan[0].LoanAmount);
    loan -= parseInt(loanAmount);
    db.query(updatedLoanQuery, [loan, accountNumber], (err, resUpdated) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Error updating loan" });
        return;
      }
      console.log("Loan Collected Successfully!");
      db.query(
        transactionQuery,
        [accountNumber, loanAmount, purpose],
        (err, resTransaction) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: "Error inserting transaction" });
            return;
          }
          console.log("Transaction Inserted Successfully!");
          res.status(200).send({ success: true });
        }
      );
    });
  });
});

//Grant Loan

app.post(`/api/grantloan`, (req, res) => {
  const { accountNumber, loanAmount } = req.body;

  const prevLoanQuery = `SELECT LoanAmount from loans WHERE AccountNumber = ?`;
  const updatedLoanQuery = `UPDATE loans SET LoanAmount = ? WHERE AccountNumber = ?`;
  const transactionQuery = `INSERT INTO transactions (AccountNumber, TransactionAmount, Purpose) VALUES (?, ?, ?)`;
  const purpose = `Loan Received`;

  db.query(prevLoanQuery, [accountNumber], (err, resLoan) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error retrieving loan amount!" });
      return;
    }
    console.log("Loan Amount Retrieved Successfully!");
    let loan = parseInt(resLoan[0].LoanAmount);
    loan += parseInt(loanAmount);
    db.query(updatedLoanQuery, [loan, accountNumber], (err, resUpdated) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Error updating loan" });
        return;
      }
      console.log("Loan Granted Successfully!");
      db.query(
        transactionQuery,
        [accountNumber, loanAmount, purpose],
        (err, resTransaction) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: "Error inserting transaction" });
            return;
          }
          console.log("Transaction Inserted Successfully!");
          res.status(200).send({ success: true });
        }
      );
    });
  });
});

//Withdraw Cash

app.post(`/api/withdraw`, (req, res) => {
  const { accountNumber, newBalance, withdrawAmount } = req.body;

  const updatedBalanceQuery = `UPDATE balance SET Balance = ? WHERE AccountNumber = ?`;
  const transactionQuery = `INSERT INTO transactions (AccountNumber, TransactionAmount, Purpose) VALUES (?, ?, ?)`;
  const purpose = `Cash Withdrawal`;
  console.log("withdraw amount:" + withdrawAmount);

  db.query(
    updatedBalanceQuery,
    [newBalance, accountNumber],
    (err, resBalance) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Error Withdrawing Cash" });
        return;
      }
      console.log("Cash Withdrawal Successfully!");
      db.query(
        transactionQuery,
        [accountNumber, withdrawAmount, purpose],
        (err, resTransaction) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: "Error inserting transaction" });
            return;
          }
          console.log("Transaction Inserted Successfully!");
          res.status(200).send({ success: true });
        }
      );
    }
  );
});

//Deposit Cash

app.post(`/api/deposit`, (req, res) => {
  const { accountNumber, depositAmount } = req.body;

  const prevBalanceQuery = `SELECT Balance from balance WHERE AccountNumber = ?`;
  const updatedBalanceQuery = `UPDATE balance SET Balance = ? WHERE AccountNumber = ?`;
  const transactionQuery = `INSERT INTO transactions (AccountNumber, TransactionAmount, Purpose) VALUES (?, ?, ?)`;
  const purpose = `Cash Deposit`;
  db.query(prevBalanceQuery, [accountNumber], (err, resBalance) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error retrieving balance" });
      return;
    }
    console.log("Balance Retrieved Successfully!");
    let balance = parseInt(resBalance[0].Balance);
    balance += parseInt(depositAmount);
    db.query(
      updatedBalanceQuery,
      [balance.toString(), accountNumber],
      (err, resUpdated) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Error updating balance" });
          return;
        }
        console.log("Balance Updated Successfully!");
        db.query(
          transactionQuery,
          [accountNumber, depositAmount, purpose],
          (err, resTransaction) => {
            if (err) {
              console.log(err);
              res.status(500).send({ error: "Error inserting transaction" });
              return;
            }
            console.log("Transaction Inserted Successfully!");
            res.status(200).send({ success: true });
          }
        );
      }
    );
  });
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

//Getting User Transactions

app.get("/api/transactions/:accountNumber", (req, res) => {
  const accountNumber = req.params.accountNumber;
  const getTransactionsQuery =
    "SELECT Purpose, TransactionAmount FROM transactions WHERE AccountNumber = ?";
  db.query(getTransactionsQuery, [accountNumber], (err, result) => {
    if (err) {
      console.error("Error retrieving user transactions:", err);
      return;
    }
    res.json(result);
  });
});

//Get User Balance

app.get("/api/balance/:accountNumber", (req, res) => {
  const accountNumber = req.params.accountNumber;
  const prevBalanceQuery = `SELECT Balance from balance WHERE AccountNumber = ?`;
  db.query(prevBalanceQuery, [accountNumber], (err, result) => {
    if (err) {
      console.error("Error retrieving user details:", err);
      return;
    }
    res.json(result[0].Balance);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
