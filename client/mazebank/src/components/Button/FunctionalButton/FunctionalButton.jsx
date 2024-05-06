import React from "react";

function FunctionalButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-red outline-none text-white text-xl font-medium py-3 px-10 hover:bg-darkred font-poppins"
    >
      {label}
    </button>
  );
}

export default FunctionalButton;
