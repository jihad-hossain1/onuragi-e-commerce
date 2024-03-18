import CategoryOne from "@/components/homeImpoter/CategoryOne/CategoryOne";
import Slider from "@/components/homeImpoter/Slider";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Slider />
      {/* screen size limit  */}
      {/* <main className="max-w-screen-xl mx-auto p-2"></main> */}
      <CategoryOne />
    </div>
  );
};

export default HomePage;
