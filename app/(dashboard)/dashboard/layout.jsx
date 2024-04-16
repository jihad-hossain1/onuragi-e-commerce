import Sidebar from "@/components/Dashboard/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full bg-pink-50 dark:bg-zinc-800 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
