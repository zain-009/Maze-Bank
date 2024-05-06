import React from "react";
import { useEffect, useContext } from "react";
import { loginContext } from "../../Contexts/LoginContext/LoginContextProvider";
import NavButton from "../../components/Button/NavButton/NavButton";
function Profile() {
  const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="mt-2">
      <span className="mx-32 text-3xl font-poppins text-black">Dashboard</span>
      <div className="grid grid-cols-2 grid-rows-4 mx-60 mt-16 mb-24 justify-items-center gap-y-10">
        <NavButton label={"Open Account"} navigator={"/signup"} />
        <NavButton label={"Close Account"} navigator={"/closeAccount"} />
        <NavButton label={"View Account Details"} navigator={"/viewdetails"} />
        <NavButton label={"Transactions"} navigator={"/transactions"} />
        <NavButton label={"Deposit"} navigator={"/deposit"} />
        <NavButton label={"Withdraw"} navigator={"/withdraw"} />
      </div>
    </div>
  );
}

export default Profile;
