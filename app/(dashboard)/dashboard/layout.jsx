import Sidebar from "@/components/Dashboard/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full bg-pink-50 dark:bg-pink-900 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
