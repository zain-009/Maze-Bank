import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function Transactions() {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    setTransactions(null);
  }, [accountNumber]);

  const handleViewDetails = async () => {
    if (accountNumber == "") {
      toast.error("Enter an Account Number!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (accountNumber.length < 8 || !/^\d+$/.test(accountNumber)) {
      toast.error("Invalid Account Number!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/check-account-number/${accountNumber}`
        );
        if (response.data.exists) {
          try {
            const transactionResponse = axios
              .get(`http://localhost:5000/api/transactions/${accountNumber}`)
              .then((response) => {
                console.log(response.data);
                setTransactions(response.data);
              })
              .catch((e) => {
                console.log(e);
              });
            toast.success("Success!", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } catch (e) {
            toast.error("Error Getting Account Details!", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        } else {
          toast.error("Account Does not Exist!", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error("Error checking account number existence!", error);
      }
    }
  };

  return (
    <div className="mx-64 mt-10 flex flex-col items-center gap-y-10">
      <span className="text-black font-poppins text-5xl font-medium">
        Transactions
      </span>
      <div className="flex flex-col text-xl font-poppins">
        <label className="text-black mb-1" htmlFor="accountNumber">
          Account Number
        </label>
        <input
          type="text"
          name=""
          id="accountNumber"
          value={accountNumber}
          maxLength={8}
          className="py-3 px-10 rounded-sm shadow-sm"
          placeholder="Account Number"
          onChange={(e) => {
            e.preventDefault(), setAccountNumber(e.target.value);
          }}
        />
      </div>
      {transactions ? (
        <div className="w-full bg-fullwhite p-5 flex flex-col items-center text-xl font-poppins text-black font-medium">
          {transactions.length === 0 ? (
            <>
              <span className="mb-1">Your don't have any transactions</span>
            </>
          ) : transactions.length === 1 ? (
            <span className="mb-1">Here is your last transaction</span>
          ) : (
            <span className="mb-1">
              Here are your last {transactions.length} transactions
            </span>
          )}
          {transactions.map((transaction, index) => (
            <div key={index} className="p-3 bg-lightred rounded-sm w-full my-1">
              <div className="flex justify-between">
                <p className="ms-2">{transaction.Purpose}</p>
                <div>
                  {transactions.Purpose}
                  <div className="w-32 flex justify-start">
                    {transaction.Purpose == "Cash Deposit" ||
                    transaction.Purpose == "Loan Received" ? (
                      <span>+</span>
                    ) : (
                      <span>-</span>
                    )}
                    <p>{transaction.TransactionAmount}Pkr</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      <div className="flex gap-x-20 mt-5">
        <NavLink to={"/profile"}>
          <button
            type="button"
            className="bg-red outline-none text-white text-xl font-medium py-3 px-10 hover:bg-darkred font-poppins rounded-md"
          >
            Back
          </button>
        </NavLink>
        <FunctionalButton label={"Check Details"} onClick={handleViewDetails} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default Transactions;
