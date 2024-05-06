import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function CloseAccount() {
  const [delAccount, setDelAccount] = useState("");

  const handleDeactivation = () => {
    if (delAccount != "1") {
      toast.error("Invalid Account Number", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      window.location.href = "/profile";
    }
  };

  return (
    <div className="mx-64 my-20 flex flex-col items-center gap-y-16">
      <span className="text-black font-poppins text-5xl font-medium">
        Deactivate Account
      </span>
      <input
        type="text"
        name=""
        id="accountNumber"
        maxLength={9}
        placeholder="Account Number"
        value={delAccount}
        className="py-3 px-10 bg-white"
        onChange={(e) => {
          setDelAccount(e.target.value);
        }}
      />
      <div className="flex gap-x-20">
        <NavLink to={"/profile"}>
          <button
            type="button"
            className="bg-red outline-none text-white text-xl font-medium py-3 px-10 hover:bg-darkred font-poppins"
          >
            Cancel
          </button>
        </NavLink>
        <FunctionalButton label={"Deactivate"} onClick={handleDeactivation} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default CloseAccount;
