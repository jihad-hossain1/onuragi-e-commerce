import Sidebar from "@/components/Dashboard/sidebar/Sidebar";
import React from "react";
import MobileSidebar from "@/components/Dashboard/sidebar/MobileSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid lg:grid-cols-6">
      
      <div className="lg:col-span-1">
        <nav className="hidden shadow border-b bg-slate-200/80 min-h-[20px] lg:block">

        </nav>
        <Sidebar />
        <MobileSidebar />
      </div>
      <div className="mt-4 lg:mt-0 lg:col-span-5 min-h-screen md:min-h-full xl:p-4 px-3 w-11/12 mx-auto">
        
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
