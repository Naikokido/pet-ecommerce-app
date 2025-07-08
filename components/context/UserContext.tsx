"use client";
import { createContext, useContext } from "react";

export type User = {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
} | null;

export const UserContext = createContext<User>(null);

export const useUser = () => useContext(UserContext);
