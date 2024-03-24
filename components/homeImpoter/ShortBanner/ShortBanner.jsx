import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";

const ShortBanner = () => {
  return (
    <Container>
      <div className="grid md:grid-cols-2 mt-4 md:mt-12 gap-5">
        <div className="bg-gray-100 p-5 lg:p-7 rounded-sm flex justify-between ">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-800">
              Mini backpack
            </h4>
            <h4 className="text-xl font-semibold text-gray-500">
              Bags & Accessories
            </h4>
          </div>
          <div>
            <Image
              className="max-h-[100px] max-w-[100px]"
              alt="photo for banner"
              width={400}
              height={300}
              src={""}
            />
          </div>
        </div>
        <div className="bg-gray-100 p-5 lg:p-7 rounded-sm flex justify-between ">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-800">
              Mini backpack
            </h4>
            <h4 className="text-xl font-semibold text-gray-500">
              Bags & Accessories
            </h4>
          </div>
          <div>
            <Image
              className="max-h-[100px] max-w-[100px]"
              alt="photo for banner"
              width={400}
              height={300}
              src={""}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShortBanner;
