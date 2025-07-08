"use client";
import { ReactNode, useEffect, useState } from "react";
import { User, UserContext } from "./UserContext";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Lee el usuario desde localStorage
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("pet_user") : null;
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
