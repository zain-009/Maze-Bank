import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-richblack flex flex-col text-white font-poppins">
      <div className="mx-64 py-16 flex justify-between">
        <div className="flex flex-col max-w-64 gap-y-3">
          <span className="font-semibold text-xl">We're on a mission</span>
          <span>
            At Maze, we're using the most cutting edge technology to make
            banking safe and deliver financial services that actually work for
            you.
          </span>
        </div>
        <div className="flex flex-col max-w-64 gap-y-3">
          <span className="font-semibold text-xl">Check Out</span>
          <ul className="flex flex-col gap-y-3">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
        <div className="flex flex-col max-w-64 gap-y-3">
          <span className="font-semibold text-xl">Company</span>
          <ul className="font-bold flex flex-col gap-y-3">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red" : "text-grey"
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red" : "text-grey"
                }
                to={"/about"}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr className="mx-64" />
      <div className="flex gap-x-2 items-center justify-center my-5">
        <img src="/assets/images/favicon.png" className="h-10" />
        <span className="font-semibold">Maze Bank</span>
      </div>
      <div className="text-sm self-center gap-x-7 mb-5 flex">
        <div>Copyright © Maze Bank 2024.</div>
        <div>Privacy Policy</div>
        <div>Terms of Use</div>
      </div>
    </div>
  );
}

export default Footer;
