import Container from "@/components/ui/container";
// import { fetchOfferBanner } from "@/utils/offer-banner/fetchOfferBanner";
import Image from "next/image";
import React from "react";

const ShortBanner = async () => {
  // const offerBanners = await fetchOfferBanner();
  const offerBanners = [
    {
      _id: "1",
      title: "Offer Banner 1",
      image: "",
    },
  ]
  return (
    <Container>
      <div className="grid md:grid-cols-2 mt-4 md:mt-12 gap-5">
        {offerBanners?.map((offerBanner) => (
          <div
            key={offerBanner?._id}
            className="bg-pink-100 p-5 lg:p-7 rounded-sm flex justify-between "
          >
            <div className="">
              <h4 className="text-2xl font-semibold text-gray-800">
                {offerBanner?.title}
              </h4>
              {/* <h4 className="text-3xl font-semibold text-gray-800">50% OFF</h4> */}
            </div>
            <div>
              <Image
                className="max-h-[100px] max-w-[100px]"
                alt="photo for banner"
                width={400}
                height={300}
                src={offerBanner?.image}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShortBanner;
