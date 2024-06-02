import Sidebar from "@/components/Dashboard/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-6 ">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-5 bg-pink-50 dark:bg-zinc-800 p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
