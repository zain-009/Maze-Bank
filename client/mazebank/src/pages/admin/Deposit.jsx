import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function Deposit() {
  const [accountNumber, setAccountNumber] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const HandleDeposit = async () => {
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
    } else if (!/^\d+$/.test(depositAmount)) {
      toast.error("Invalid Deposit Amount!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (depositAmount < 1000) {
      toast.error("Minimum Deposit 1000!", {
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
            const res = await axios.post(`http://localhost:5000/api/deposit`, {
              accountNumber: accountNumber,
              depositAmount: depositAmount,
            });
            toast.success("Cash Deposited!", {
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
            setDepositAmount("");
            setAccountNumber("");
            setTimeout(() => {
              window.location.href = "/profile";
            }, 1000);
          } catch (e) {
            console.log(e);
            toast.error("Error Depositing Cash!", {
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
    <div className="mx-64 my-28 flex flex-col items-center gap-y-16">
      <span className="text-black font-poppins text-5xl font-medium">
        Deposit
      </span>
      <div className="flex gap-x-10">
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
        <div className="flex flex-col text-xl font-poppins">
          <label className="text-black mb-1" htmlFor="depositAmount">
            Deposit Amount
          </label>
          <input
            type="text"
            name=""
            id="depositAmount"
            value={depositAmount}
            maxLength={7}
            className="py-3 px-10 rounded-sm shadow-sm"
            placeholder="Deposit Amount"
            onChange={(e) => {
              e.preventDefault(), setDepositAmount(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex gap-x-20">
        <NavLink to={"/profile"}>
          <button
            type="button"
            className="bg-red outline-none text-white text-xl font-medium py-3 px-10 hover:bg-darkred font-poppins rounded-md"
          >
            Cancel
          </button>
        </NavLink>
        <FunctionalButton label={"Deposit"} onClick={HandleDeposit} />
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

export default Deposit;
