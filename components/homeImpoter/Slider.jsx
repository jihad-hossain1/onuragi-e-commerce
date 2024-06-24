"use client";

import React from "react";
import blurImage from "@/public/blur.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import BannerLink from "./bannerLink";

const Slider = () => {
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    const fetchBanner = async () => {
      const response = await fetch("/api/v1/banner");
      const data = await response.json();
      setBanners(data);
    };
    fetchBanner();
  }, []);

  return (
    <div className="bg-[#f9f9f9]">
      <div className="max-w-screen-xl mx-auto p-2">
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          autoPlay={true}
          stopOnHover={true}
          dynamicHeight={true}
          swipeable={true}
          emulateTouch={true}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
        >
          {banners?.map((banner) => (
            <div key={banner?._id}>
              <div className="rounded-lg relative">
                <div className="absolute bottom-0 right-0 z-10">
                  <BannerLink id={banner?.productId} />
                </div>
                <Image
                  height={500}
                  width={1920}
                  className="rounded-lg object-cover  h-[400px] w-full lg:h-[500px]"
                  src={banner?.image}
                  alt="photo"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
