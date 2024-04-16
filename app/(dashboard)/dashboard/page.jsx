import React from "react";

const DashboardHome = () => {
  return (
    <main className="max-w-screen-xl mx-auto p-2">
      <div className="grid md:grid-cols-2 lg:gridcols-3 gap-6">
        <div className="shadow-md bg-gray-50 dark:bg-zinc-800 dark:text-zinc-50 p-4 rounded-md dark:border-zinc-900 border">
          <h4 className="text-xl font-semibold text-center my-6">
            Total Orders
          </h4>
        </div>
        <div className="shadow-md bg-gray-50 dark:bg-zinc-800 dark:text-zinc-50 p-4 rounded-md dark:border-zinc-900 border">
          <h4 className="text-xl font-semibold text-center my-6">
            Total Users
          </h4>
        </div>
        <div className="shadow-md bg-gray-50 dark:bg-zinc-800 dark:text-zinc-50 p-4 rounded-md dark:border-zinc-900 border">
          <h4 className="text-xl font-semibold text-center my-6">
            Total Products
          </h4>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
