import React from "react";
import { NavLink } from "react-router-dom";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function Deposit() {
  return (
    <div className="mx-64 my-20 flex flex-col items-center gap-y-16">
      <span className="text-black font-poppins text-5xl font-medium">
        Deposit
      </span>
      <div className="flex flex-col text-xl font-poppins">
        <label className="text-black mb-1" htmlFor="accountNumber">
          Account Number
        </label>
        <input
          type="text"
          name=""
          id="accountNumber"
          maxLength={8}
          className="py-3 px-10 rounded-sm shadow-sm"
          placeholder="Account Number"
          onChange={(e) => {
            e.preventDefault();
          }}
        />
      </div>
      <div className="flex gap-x-20">
        <NavLink to={"/profile"}>
          <button
            type="button"
            className="bg-red outline-none text-white text-xl font-medium py-3 px-10 hover:bg-darkred font-poppins"
          >
            Cancel
          </button>
        </NavLink>
        <FunctionalButton label={"Deposit"} />
      </div>
    </div>
  );
}

export default Deposit;
