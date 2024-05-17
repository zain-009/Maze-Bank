import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function CloseAccount() {
  const [delAccount, setDelAccount] = useState("");

  const handleDeactivation = async () => {
    if (delAccount == "") {
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
    } else if (delAccount.length < 8 || !/^\d+$/.test(delAccount)) {
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
          `http://localhost:5000/api/check-account-number/${delAccount}`
        );
        if (response.data.exists) {
          setDelAccount("");
          try {
            const response = await axios.get(
              `http://localhost:5000/api/deactivate/${delAccount}`
            );
            toast.success("Account Closed!", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            setTimeout(() => {
              window.location.href = "/profile";
            }, 2000);
          } catch (e) {
            console.error("Error Deactivating Account", error);
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
        console.error("Error checking account number existence:", error);
      }
    }
  };

  return (
    <div className="mx-64 my-20 flex flex-col items-center gap-y-16">
      <span className="text-black font-poppins text-5xl font-medium">
        Close Account
      </span>
      <div className="flex flex-col text-xl font-poppins">
        <label className="text-black mb-1" htmlFor="cnic">
          Account Number
        </label>
        <input
          type="text"
          name=""
          id="accountNumber"
          value={delAccount}
          maxLength={8}
          className="py-3 px-10"
          placeholder="Account Number"
          onChange={(e) => {
            e.preventDefault(), setDelAccount(e.target.value);
          }}
        />
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
        <FunctionalButton
          label={"Close Account"}
          onClick={handleDeactivation}
        />
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

export default CloseAccount;
