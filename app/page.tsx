import React from "react";
import CategoryOne from "@/components/homeImpoter/CategoryOne/CategoryOne";
import CategoryTwo from "@/components/homeImpoter/CategroyTwo/CategoryTwo";
import ShortBanner from "@/components/homeImpoter/ShortBanner/ShortBanner";
import Slider from "@/components/homeImpoter/Slider";
import Banner from "@/components/homeImpoter/banner/Banner";
import Tranding from "@/components/homeImpoter/tranding/Tranding";

async function fetchHomePage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/common/homepage`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (data?.result) return data?.result;

    return {
      babyProducts: [],
      girlsProducts: [],
      boysProducts: [],
      handicraft: [],
      womenProducts: [],
      banner: [],
    }
  } catch (error: any) {
    console.error(error?.message);
  }
}

const HomePage = async () => {
  const data = await fetchHomePage();

  return (
    <>
      <Slider banners={data?.banner} />
      <CategoryOne babyProducts={data?.babyProducts} girlsProducts={data?.girlsProducts} />
      <ShortBanner />
      <CategoryTwo womenProducts={data?.womenProducts} handicraft={data?.handicraft} />
      <Banner />
      <Tranding />
    </>
  );
};

export default HomePage;
