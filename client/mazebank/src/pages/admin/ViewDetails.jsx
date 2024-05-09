import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function ViewDetails() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    setAccountDetails(null);
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
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/check-account-number/${accountNumber}`
        );
        if (response.data.exists) {
          try {
            const response = axios
              .get(`http://localhost:5000/api/data/${accountNumber}`)
              .then((res) => {
                setAccountDetails(res.data[0]);
                console.log(accountDetails);
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
        View Details
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
      {accountDetails ? (
        <>
          <div className="flex justify-between p-10 bg-fullwhite rounded-md text-xl font-poppins text-black gap-x-20 shadow-lg">
            <div className="flex flex-col gap-y-6 font-bold">
              <span>Account Title</span>
              <span>Account Number</span>
              <span>Cnic</span>
              <span>Phone</span>
              <span>City</span>
              <span>Balance</span>
              <span>Pending Loan</span>
            </div>
            <div className="flex flex-col gap-y-6 font-medium">
              <span>{accountDetails.AccountTitle}</span>
              <span>{accountDetails.AccountNumber}</span>
              <span>{accountDetails.Cnic}</span>
              <span>{accountDetails.Phone}</span>
              <span>{accountDetails.City}</span>
              <span>{accountDetails.Balance}Pkr</span>
              <span>{accountDetails.LoanAmount}Pkr</span>
            </div>
          </div>
        </>
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

export default ViewDetails;
