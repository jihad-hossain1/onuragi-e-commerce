import { fetchBanner } from "@/utils/banner/fetchBanner";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BannerPage = async () => {
  const banners = await fetchBanner();
  return (
    <main className="max-w-screen-xl mx-auto p-2">
      <h1 className="text-3xl font-bold text-center">Banner Management</h1>
      <section className="">
        <div className="">
          <Link href={"/dashboard/banners/au-banner"} className="btn">
            Add Banner
          </Link>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banners?.map(
            (banner: { _id: string; image: string; title: string }) => (
              <div
                key={banner?._id}
                className="group p-3 border rounded-lg shadow flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <h4>{banner?.title}</h4>
                  <Link
                    href={`/dashboard/banners/au-banner/${banner?._id}`}
                    className="text-xs px-3 py-1 rounded-lg "
                    style={{
                      backgroundColor: "rgb(236 72 153)",
                      color: "white",
                    }}
                  >
                    Update
                  </Link>
                </div>
                <Image
                  src={banner?.image}
                  alt={banner?.title}
                  width={400}
                  height={300}
                />
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default BannerPage;
