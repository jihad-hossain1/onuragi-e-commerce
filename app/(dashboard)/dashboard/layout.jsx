import Sidebar from "@/components/Dashboard/sidebar/Sidebar";
import React from "react";
import MobileSidebar from "@/components/Dashboard/sidebar/MobileSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid lg:grid-cols-6 container mx-auto">
      <div className="lg:col-span-1">
        <Sidebar />
        <MobileSidebar />
      </div>
      <div className="mt-10 lg:mt-0 lg:col-span-5 min-h-screen md:min-h-full  p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
