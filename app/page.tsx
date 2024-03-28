import React from "react";
import CategoryOne from "@/components/homeImpoter/CategoryOne/CategoryOne";
import CategoryTwo from "@/components/homeImpoter/CategroyTwo/CategoryTwo";
import ShortBanner from "@/components/homeImpoter/ShortBanner/ShortBanner";
import Slider from "@/components/homeImpoter/Slider";
import Banner from "@/components/homeImpoter/banner/Banner";
import Tranding from "@/components/homeImpoter/tranding/Tranding";

const HomePage = async () => {
  return (
    <div>
      <Slider />
      <CategoryOne />
      <ShortBanner />
      <CategoryTwo />
      <Banner />
      <Tranding />
    </div>
  );
};

export default HomePage;
