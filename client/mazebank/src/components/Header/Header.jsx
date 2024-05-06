import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { loginContext } from "../../Contexts/LoginContext/LoginContextProvider";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className="border-b-4 border-red mx-32">
        <div className="flex justify-between items-center">
          <img
            className="py-3 h-24"
            src="/assets/images/logo.png"
            alt="MazeBank Logo"
          />
          <div>
            <ul className="text-black text-lg font-bold font-poppins flex gap-x-20">
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
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-red" : "text-grey"
                      }
                      to={"/profile"}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={"text-grey"}
                      to={""}
                      onClick={handleSignOut}
                    >
                      SignOut
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-red" : "text-grey"
                      }
                      to={"/login"}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
