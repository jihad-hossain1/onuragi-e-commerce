import Link from "next/link";
import React from "react";

const BannerPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Banner Page</h1>
      <div>
        <Link href={"/dashboard/banners/au-banner"} className="btn">
          Add Banner
        </Link>
      </div>
    </div>
  );
};

export default BannerPage;
