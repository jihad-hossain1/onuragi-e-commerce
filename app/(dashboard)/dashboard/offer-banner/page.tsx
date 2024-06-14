"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OfferBannerpage = () => {
  const [offerBanners, setOfferBanners] = React.useState([]);

  React.useEffect(() => {
    const fetchOfferBanners = async () => {
      const res = await fetch("/api/v1/offerBanner");
      const data = await res.json();
      setOfferBanners(data);
    };
    fetchOfferBanners();
  }, []);

  return (
    <div>
      <Link className="btn" href={"/dashboard/offer-banner/au-offer-banner"}>
        Add Offer Banner
      </Link>

      <div>
        {offerBanners?.map(
          (offerBanner: { _id: string; title: string; image: string }) => (
            <div key={offerBanner?._id}>
              <h1>{offerBanner?.title}</h1>
              <Link
                href={`/dashboard/offer-banner/au-offer-banner/${offerBanner?._id}`}
              >
                update
              </Link>
              <Image
                src={offerBanner?.image}
                alt={offerBanner?.title}
                width={200}
                height={200}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OfferBannerpage;
