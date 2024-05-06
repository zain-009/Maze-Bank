import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Landing/Home";
import About from "./pages/Landing/About";
import Login from "./pages/Landing/Login";
import Layout from "./Layout";
import Signup from "./pages/admin/Signup";
import Profile from "./pages/admin/Profile";
import LoginContextProvider from "./Contexts/LoginContext/LoginContextProvider";
import CloseAccount from "./pages/admin/CloseAccount";
import ViewDetails from "./pages/admin/ViewDetails";
import Transactions from "./pages/admin/Transactions";
import Deposit from "./pages/admin/Deposit";
import Withdraw from "./pages/admin/Withdraw";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<Profile />} />
      <Route path="closeAccount" element={<CloseAccount />} />
      <Route path="viewdetails" element={<ViewDetails />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="deposit" element={<Deposit />} />
      <Route path="withdraw" element={<Withdraw />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
      <RouterProvider router={router} />
    </LoginContextProvider>
  </React.StrictMode>
);
