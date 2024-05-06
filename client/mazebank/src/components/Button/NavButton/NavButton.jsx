import React from "react";
import { NavLink } from "react-router-dom";

function NavButton({ label, navigator }) {
  return (
    <NavLink to={navigator} className={"w-full max-w-72"}>
      <button
        type="button"
        className="bg-red outline-none text-white text-xl font-medium py-4 w-full max-w-72 hover:bg-darkred font-poppins"
      >
        {label}
      </button>
    </NavLink>
  );
}

export default NavButton;
