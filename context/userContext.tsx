// contexts/UserContext.js
import { coreApi } from "@/api";
import { me } from "@/api/model/user";
import React, { createContext, useContext, useEffect, useState } from "react";

const defaultValue = {
  isAuthenticated: false,
  userInfo: null,
  login: (token: string) => {},
  logout: () => {},
  fetchUser: () => {},
};

const UserContext = createContext(defaultValue);

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState("");

  const login = (newToken: string) => {
    setToken(newToken);
    coreApi.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setIsAuthenticated(true);
    fetchUser();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setToken("");
    coreApi.defaults.headers.common["Authorization"] = "";
  };

  const fetchUser = async () => {
    try {
      const res = await me();
      if (res?.data?.data) {
        setUserInfo(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userInfo,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
