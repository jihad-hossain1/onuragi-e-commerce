
import { getProductDetails } from '@/app/api/frontend/products/product-details'
import { getProductSpecification } from '@/app/api/frontend/products/specification'
import Link from 'next/link'
import React from 'react'
import { FaAddressBook, FaPhotoFilm, FaServicestack } from 'react-icons/fa6'

const LinkWithId = async ({ productID }) => {
    const productDetails = await getProductDetails(productID);
    const productSpecification = await getProductSpecification(productID);

    return (
        <>
            {
                !productDetails?.productDetail && <Link
                    href={`/dashboard/product-manage/add-product-details/${productID}`}
                >
                    <FaAddressBook size={20} className="text-blue-600" />
                </Link>
            }
            {
                !productSpecification?.specification && <Link
                    href={`/dashboard/product-manage/add-specification/${productID}`}
                >
                    <FaServicestack size={20} className="text-blue-600" />
                </Link>
            }

            <Link
                href={`/dashboard/product-manage/addproduct-image/${productID}`}
            >
                <FaPhotoFilm size={20} className="text-cyan-600" />
            </Link>
        </>
    )
}

export default LinkWithId