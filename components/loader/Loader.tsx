import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="w-5 h-5 animate-[ping_2s_linear_infinite] border rounded-full border-sky-600"></div>
        <div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] border rounded-full border-sky-600 absolute"></div>
      </div>
    </div>
  );
};

export default Loader;
