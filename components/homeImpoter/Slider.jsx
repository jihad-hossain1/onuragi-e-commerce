"use client";

import React from "react";
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
                <div className="absolute left-0 top-5 md:top-24">
                  <div className="flex flex-col items-center ml-2 md:ml-28 md:mt-11">
                    <BannerLink id={banner?.productId} />
                  </div>
                </div>
                <Image
                  height={500}
                  width={1920}
                  className="rounded-lg object-cover  lg:h-[500px]"
                  src={banner?.image}
                  alt="photo"
                />
              </div>
              {/* <Image
                src={banner?.image}
                alt="banner"
                width={1920}
                height={500}
              /> */}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
