import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";

const ShortBanner = ({ offerBanner = [] }) => {
    return (
        <Container>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-12'>
                {offerBanner?.map((offerBanner) => (
                    <div
                        key={offerBanner?._id}
                        className='bg-pink-100 p-4 sm:p-6 lg:p-8 rounded-md flex items-center justify-between shadow-md transition-transform transform hover:scale-105 hover:bg-pink-200 hover:shadow-xl duration-300 ease-in-out'
                    >
                        {/* Banner Text */}
                        <div className='max-w-xs'>
                            <h4 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-gray-900'>
                                {offerBanner?.title}
                            </h4>
                            {/* Add any additional text or discount info here */}
                        </div>

                        {/* Banner Image */}
                        <div className='flex-shrink-0 transition-transform duration-300 ease-in-out group-hover:scale-110'>
                            <Image
                                className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-md'
                                alt='Banner image'
                                width={120}
                                height={120}
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
