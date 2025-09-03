import React, { createContext, ReactNode, useState, useEffect } from "react";
import type { SidebarContextProps, SidebarState } from "./sidebar-types";

// Criação do contexto
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Provider
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SidebarState>("expanded");
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () =>
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;