"use client";

import React from "react";
import blurImage from "@/public/blur.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import BannerLink from "./bannerLink";

const Slider = ({ banners = [] }) => {

  return (
    <div className="bg-[#f9f9f9] min-h-[200px]">
      <div className="max-w-screen-xl mx-auto p-2 ">
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
              <div id="" className="gslider rounded-lg relative">
                <div className="absolute bottom-0 right-0 z-10">
                  <BannerLink id={banner?.productId} />
                </div>
                <Image
                  blurDataURL={blurImage.src}
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
