import React, { createContext, useState } from "react";

export const loginContext = createContext(null);

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </loginContext.Provider>
  );
};

export default LoginContextProvider;
