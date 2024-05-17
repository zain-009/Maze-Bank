import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function Withdraw() {
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawAmount, setWithdrwAmount] = useState("");

  const HandleWithdraw = async () => {
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
    } else if (!/^\d+$/.test(withdrawAmount)) {
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
    } else if (withdrawAmount < 1000) {
      toast.error("Minimum Withdraw 1000!", {
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
            const balanceResponse = await axios.get(
              `http://localhost:5000/api/balance/${accountNumber}`
            );
            const balance = parseInt(balanceResponse.data);
            if (balance >= parseInt(withdrawAmount)) {
              try {
                const newbalance = balance - withdrawAmount;
                const res = await axios.post(
                  `http://localhost:5000/api/withdraw`,
                  {
                    accountNumber: accountNumber,
                    newBalance: newbalance,
                    withdrawAmount: withdrawAmount,
                  }
                );
                toast.success("Cash Withdrawed!", {
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
                setWithdrwAmount("");
                setAccountNumber("");
                setTimeout(() => {
                  window.location.href = "/profile";
                }, 1000);
              } catch (e) {
                console.log(e);
                toast.error("Error Withdrawing Cash!", {
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
              toast.error("Insufficient Balance!", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "light",
                transition: Bounce,
              });
              setWithdrwAmount("");
            }
          } catch (error) {
            console.log("Error getting User balance" + error);
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
        Withdraw
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
          <label className="text-black mb-1" htmlFor="withdrwaAmount">
            Withdraw Amount
          </label>
          <input
            type="text"
            name=""
            id="withdrwaAmount"
            value={withdrawAmount}
            maxLength={7}
            className="py-3 px-10 rounded-sm shadow-sm"
            placeholder="Withdraw Amount"
            onChange={(e) => {
              e.preventDefault(), setWithdrwAmount(e.target.value);
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
        <FunctionalButton label={"Withdraw"} onClick={HandleWithdraw} />
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

export default Withdraw;
