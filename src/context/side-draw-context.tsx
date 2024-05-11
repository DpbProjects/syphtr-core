"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

type SideDrawerContextProps = {
  children: ReactNode;
};

type SideDrawerContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
};

// Create a context
const SideDrawerContext = createContext<SideDrawerContextValue>({
  open: false,
  id: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setId: () => {}, // A dummy function
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: () => {}, // A dummy function
});

// Create a provider component
export const SideDrawerProvider = ({ children }: SideDrawerContextProps) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>(0);

  return (
    <SideDrawerContext.Provider value={{ open, id, setOpen, setId }}>
      {children}
    </SideDrawerContext.Provider>
  );
};

// Custom hook to use the context
export const useSideDrawer = () => useContext(SideDrawerContext);
