import React from "react";
import { useState, useContext } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    if (username === "admin" && password === "admin") {
      window.location.href = "/profile";
    } else {
      toast.error("Invalid Credentials", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="mx-64 flex flex-col items-center my-10">
      <img
        src="/assets/images/logo.png"
        alt="Maze-Bank-Logo"
        className="h-64"
      />
      <span className="text-black text-5xl font-medium my-10 font-poppins">
        Login As Admin
      </span>
      <form action="#" className="flex flex-col gap-y-7">
        <input
          type="text"
          name=""
          id="username"
          value={username}
          className="py-3 px-10 text-lg rounded-sm shadow-sm"
          placeholder="username"
          onChange={(e) => {
            e.preventDefault(), setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name=""
          id="password"
          value={password}
          className="py-3 px-10 text-lg rounded-sm shadow-sm"
          placeholder="password"
          onChange={(e) => {
            e.preventDefault(), setPassword(e.target.value);
          }}
        />
        <FunctionalButton label={"Login"} onClick={handleLogin} />
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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

export default Login;
