import React from "react";
import CategoryOne from "@/features/client/home/CategoryOne/CategoryOne";
import CategoryTwo from "@/features/client/home/CategroyTwo/CategoryTwo";
import ShortBanner from "@/features/client/home/ShortBanner/ShortBanner";
import Slider from "@/features/client/home/Slider";
import Banner from "@/features/client/home/banner/Banner";
import Tranding from "@/features/client/home/tranding/Tranding";
import { fetchHomePage } from "@/features/client/home/server-action";

const HomePage = async () => {
  const data = await fetchHomePage();

  return (
    <>
      <Slider banners={data?.banner} />
      <CategoryOne
        babyProducts={data?.babyProducts}
        girlsProducts={data?.girlsProducts}
      />
      <ShortBanner />
      <CategoryTwo
        womenProducts={data?.womenProducts}
        handicraft={data?.handicraft}
      />
      <Banner />
      <Tranding />
    </>
  );
};

export default HomePage;
