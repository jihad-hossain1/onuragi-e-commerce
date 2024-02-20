"use client";

import React from "react";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    <>
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
        <div className="rounded-lg relative">
          <div className="absolute left-0 top-5 md:top-24">
            <div className="flex flex-col items-center ml-2 md:ml-28 md:mt-11">
              <h4 className="uppercase text-pink-400 md:text-2xl">Discount</h4>
              <h4 className="uppercase text-xl md:text-3xl font-bold mb-2">
                New Toy s
              </h4>
              <button className="uppercase border border-gray-50 px-2  md:px-4 text-xs md:text-xl mb-2 text-pink-500">
                Save to 40% today
              </button>
              <Link href={"/allToys"}>
                <button className="uppercase text-sm md:text-xl border-b border-blue-gray-700 hover:text-pink-500 hover:border-yellow-600">
                  shop now
                </button>
              </Link>
            </div>
          </div>
          <img
            className="rounded-lg object-cover"
            src="https://i.ibb.co/8s3n13s/slider1.webp"
            alt=""
          />
        </div>
        <div className="rounded-lg relative">
          <div className="absolute left-0 top-5 md:top-24">
            <div className="flex flex-col items-center ml-2 md:ml-28 md:mt-11">
              <h4 className="uppercase text-gray-50 md:text-2xl">Discount</h4>
              <h4 className="uppercase text-xl md:text-3xl font-bold mb-2">
                New Toy s
              </h4>
              <button className="uppercase border border-gray-50 px-2  md:px-4 text-xs md:text-xl mb-2 text-gray-50">
                Save to 40% today
              </button>
              <Link href={"/allToys"}>
                <button className="uppercase text-sm md:text-xl border-b border-blue-gray-700 hover:text-pink-500 hover:border-yellow-600">
                  shop now
                </button>
              </Link>
            </div>
          </div>
          <img
            className="rounded-lg object-cover"
            src="https://i.ibb.co/jkB2Sgw/slider2.webp"
            alt=""
          />
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
