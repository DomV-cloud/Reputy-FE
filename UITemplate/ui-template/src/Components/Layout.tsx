import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow p-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
