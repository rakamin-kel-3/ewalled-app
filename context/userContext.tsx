import { coreApi } from "@/api";
import { me, refreshToken } from "@/api/model/user";
import { User } from "@/model/user";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  isAuthenticated: boolean;
  userInfo: User | null;
  login: (newToken: string, newRefreshToken: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => void;
};

const defaultValue: UserContextType = {
  isAuthenticated: false,
  userInfo: null,
  login: async (newToken: string, newRefreshToken: string) => {},
  logout: () => {},
  fetchUser: () => {},
};

const UserContext = createContext(defaultValue);

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const login = async (newToken: string, newRefreshToken: string) => {
    await SecureStore.setItemAsync("user_token", newToken);
    await SecureStore.setItemAsync("refresh_token", newRefreshToken);
    coreApi.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setIsAuthenticated(true);
    fetchUser();
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    coreApi.defaults.headers.common["Authorization"] = "";
    await SecureStore.deleteItemAsync("user_token");
    await SecureStore.deleteItemAsync("refresh_token");
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

  const accessBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const biometricResult = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue",
      });

      if (!biometricResult.success) {
        return false;
      }
    }

    return true;
  };

  const refreshUserToken = async (token: string) => {
    try {
      const res = await refreshToken(token);
      const newToken = res.data.data?.token;
      const newRefreshToken = res.data.data?.refreshToken;
      await login(newToken, newRefreshToken);
    } catch (error) {
      logout();
    }
  };

  const authBiometric = async () => {
    const storedToken = await SecureStore.getItemAsync("user_token");
    const storedRefreshToken = await SecureStore.getItemAsync("refresh_token");

    if (!storedToken || !storedRefreshToken) {
      return;
    }

    const isBiometricSuccess = await accessBiometric();
    if (!isBiometricSuccess) {
      return;
    }

    try {
      coreApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
      const res = await me();
      if (res?.data?.data) {
        setUserInfo(res.data.data);
        setIsAuthenticated(true);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 401 && error.response?.status !== 403) {
          return;
        }
      }
    }
    coreApi.defaults.headers.common["Authorization"] = "";
    await refreshUserToken(storedRefreshToken);
  };

  useEffect(() => {
    authBiometric();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
