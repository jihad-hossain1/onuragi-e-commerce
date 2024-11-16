import Container from "@/components/ui/container";
import React from "react";
import Product from "@/components/products/Product";
import { Skeleton } from "@/components/Skeleton";

const CategoryOne = ({ babyProducts, girlsProducts }) => {
    return (
        <Container>
            <div className='grid md:grid-cols-2 gap-4 lg:gap-6 max-sm:mt-6'>
                {/* Product Section */}
                <div>
                    <h4 className='text-xl font-bold border-b border-gray-400 pb-3'>
                        For Girls
                    </h4>

                    <div className='mt-4 grid max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {girlsProducts?.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                </div>
                {/* Product Section */}
                <div>
                    <h4 className='text-xl font-bold border-b border-gray-400 pb-3'>
                        For Baby
                    </h4>

                    <div className='mt-4 grid max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {babyProducts?.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CategoryOne;
