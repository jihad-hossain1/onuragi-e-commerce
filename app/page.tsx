import CategoryOne from "@/components/homeImpoter/CategoryOne/CategoryOne";
import CategoryTwo from "@/components/homeImpoter/CategroyTwo/CategoryTwo";
import ShortBanner from "@/components/homeImpoter/ShortBanner/ShortBanner";
import Slider from "@/components/homeImpoter/Slider";
import { getServerSession } from "next-auth/next";
import React from "react";
import { options } from "./api/auth/[...nextauth]/options";

const HomePage = async () => {
  const session = await getServerSession(options);
  console.log(session?.user);
  return (
    <div>
      <Slider />
      {/* screen size limit  */}
      {/* <main className="max-w-screen-xl mx-auto p-2"></main> */}
      <CategoryOne />
      <ShortBanner />
      <CategoryTwo />
    </div>
  );
};

export default HomePage;
