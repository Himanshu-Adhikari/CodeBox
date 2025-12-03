"use client";

import { createContext, useContext, useState } from "react";

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  points: number;
  subscription: string | null;
}

interface UserDetailContextType {
  userDetail: UserDetail | undefined;
  setUserDetail: (user: UserDetail | undefined) => void;
}

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: undefined,
  setUserDetail: () => {},
});

// Optional but recommended: custom hook
export const useUserDetail = () => useContext(UserDetailContext);
