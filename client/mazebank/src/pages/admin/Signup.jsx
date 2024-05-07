import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import FunctionalButton from "../../components/Button/FunctionalButton/FunctionalButton";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      const num = Math.floor(Math.random() * chars.length);
      result += chars[num];
    }
    setAccountNumber(result);
  }, []);

  const handleSignUp = async () => {
    if (!name || !accountNumber || !cnic || !phoneNumber || !age || !city) {
      toast.error("Incomplete Details", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (!/^[a-zA-Z\s]*$/.test(name.trim())) {
      toast.error("Invalid Name!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (cnic.length < 13 || !/^\d+$/.test(cnic)) {
      toast.error("Invalid Cnic!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (phoneNumber.length < 11 || !/^\d+$/.test(phoneNumber)) {
      toast.error("Invalid Phone Number!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (age < 18) {
      toast.error("Under 18!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (!/^\d+$/.test(age)) {
      toast.error("Invalid Age!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (!/^[a-zA-Z\s]*$/.test(city.trim())) {
      toast.error("Invalid City!", {
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
        const cnicExistsResponse = await axios.get(
          `http://localhost:5000/api/check-cnic/${cnic}`
        );
        const cnicExists = cnicExistsResponse.data.exists;

        if (cnicExists) {
          toast.error("CNIC already registered!", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
            transition: Bounce,
          });
          return;
        }

        const res = await axios.post(`http://localhost:5000/api/signup`, {
          name: name,
          accountNumber: parseInt(accountNumber, 10),
          cnic: parseInt(cnic, 10),
          phoneNumber: parseInt(phoneNumber, 10),
          age: parseInt(age, 10),
          city: city,
        });
        toast.success("Signup Successful!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          window.location.href = "/profile";
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="mx-64 flex flex-col items-center mt-10 mb-20">
      <span className="text-black text-5xl font-medium mt-10 mb-16 font-poppins">
        Signup
      </span>
      <form
        action="#"
        className="flex-col grid gap-y-8 gap-8 grid-cols-2 grid-rows-2 font-poppins text-lg"
      >
        <div className="flex flex-col">
          <label className="text-black" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name=""
            id="name"
            value={name}
            className="py-3 px-10"
            placeholder="name"
            onChange={(e) => {
              e.preventDefault(), setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black" htmlFor="username">
            Account Number
          </label>
          <input
            disabled
            type="text"
            name=""
            id="accountNumber"
            value={accountNumber}
            className="py-3 px-10 bg-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black" htmlFor="cnic">
            Cnic
          </label>
          <input
            type="text"
            name=""
            id="cnic"
            value={cnic}
            maxLength={13}
            className="py-3 px-10"
            placeholder="cnic"
            onChange={(e) => {
              e.preventDefault(), setCnic(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black" htmlFor="email">
            Phone
          </label>
          <input
            type="text"
            name=""
            id="phoneNumber"
            value={phoneNumber}
            maxLength={11}
            className="py-3 px-10"
            placeholder="phone"
            onChange={(e) => {
              e.preventDefault(), setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black" htmlFor="age">
            Age
          </label>
          <input
            type="text"
            name=""
            id="age"
            maxLength={2}
            value={age}
            className="py-3 px-10"
            placeholder="age"
            onChange={(e) => {
              e.preventDefault(), setAge(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black" htmlFor="city">
            City
          </label>
          <input
            type="text"
            name=""
            id="city"
            value={city}
            className="py-3 px-10"
            placeholder="city"
            onChange={(e) => {
              e.preventDefault(), setCity(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="flex items-center mt-10 gap-x-20">
        <NavLink to={"/profile"}>
          <button
            type="button"
            className="bg-red outline-none text-white text-xl font-medium py-3 px-10 hover:bg-darkred font-poppins"
          >
            Cancel
          </button>
        </NavLink>
        <FunctionalButton label={"Signup"} onClick={handleSignUp} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default Signup;
