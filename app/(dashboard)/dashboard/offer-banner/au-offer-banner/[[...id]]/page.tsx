import React from 'react'
import OfferBannerForm from '../_compo/OfferBannerForm'
import { fetchProducts } from '@/utils/products/fetchProducts';
import { fetchSingleOfferBanner } from '@/utils/offer-banner/fetchSingleOfferBanner';


const AUOfferBanner = async ({ params }) => {
    const id = params?.id;
    const products = await fetchProducts();

    let initialData;

    if (id) {
        initialData = await fetchSingleOfferBanner(id[0]);
    }
    return (
        <div>
            <OfferBannerForm offerData={initialData?.result} id={id} products={products} />
        </div>
    )
}

export default AUOfferBanner