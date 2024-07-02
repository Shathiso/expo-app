import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser, getUserData } from "../server/appWriteConfig";
import { globalContextTypes } from "@/typescript_types/types";

const GlobalContext = createContext<globalContextTypes>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: [],
  setUser: () => {},
  setIsLoading: () => {},
  isLoading : false,
  isAdmin: false,
  setIsAdmin: () => {}
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }:any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser({...res});
          if(res.isAdmin) setIsAdmin(true)
          
        } else {
          setIsLoggedIn(false);
          setUser([]);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setIsLoading(false)
      })
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        setIsLoading,
        isLoading,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
