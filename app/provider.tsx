"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | undefined>();

  useEffect(() => {
    if (isLoaded && user) {
      createOrFetchUser();
    }
  }, [isLoaded, user]);

  const createOrFetchUser = async () => {
    try {
      const res = await axios.post("/api/user");
      setUserDetail(res.data);
    } catch (err) {
      console.error("Failed to create/fetch user", err);
    }
  };

  return (
    <NextThemesProvider {...props}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
};

export default Provider;
