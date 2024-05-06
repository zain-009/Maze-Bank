import React from "react";

function Card({ number, title, description, icon }) {
  return (
    <div className="shadow-xl rounded-lg flex flex-col items-center px-10 pb-10 pt-3 text-outer max-w-80">
      <span className="text-3xl pb-3 font-poppins">{number}</span>
      <div className="flex justify-center items-start">
        <img src={icon} className="mr-2 max-h-7" />
        <div className="flex flex-col">
          <span className="font-poppins text-2xl font-medium">{title}</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
