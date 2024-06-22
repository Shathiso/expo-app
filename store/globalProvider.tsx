import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../server/appWriteConfig";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }:any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
            setIsLoggedIn(true);
          setUser(res);
        } else {
            setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        setIsLoading,
        isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
