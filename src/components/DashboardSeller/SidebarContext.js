// src/components/SidebarContext.js
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    return (
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
