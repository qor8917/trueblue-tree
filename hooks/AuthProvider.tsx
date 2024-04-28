"use client";

import { getUserInfo } from "@/actions/auth/actions";
import { UserInfo } from "@/types";
import React, { createContext, useContext, useState } from "react";
type AuthContextType = {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  //   useEffect(() => {
  //     const userInfoFromSever = async () => {
  //       const userInfo = await getUserInfo();
  //       console.log(userInfo);
  //       setUserInfo(userInfo);
  //     };
  //     userInfoFromSever();
  //   }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
