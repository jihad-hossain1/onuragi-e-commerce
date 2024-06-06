// import { fetchOfferBanner } from '@/utils/offer-banner/fetchOfferBanner'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const OfferBannerpage = async () => {
    const offerBanners = [{
        _id: '1',
        title: 'Offer Banner 1',
        image: ''
    }]
    // const offerBanners = await fetchOfferBanner();

    return (
        <div>
            <Link className='btn' href={'/dashboard/offer-banner/au-offer-banner'}>
                Add Offer Banner
            </Link>

            <div>
                {/* {
                    offerBanners?.map((offerBanner: { _id: string, title: string, image: string }) => (
                        <div key={offerBanner?._id}>
                            <h1>{offerBanner?.title}</h1>
                            <Link href={`/dashboard/offer-banner/au-offer-banner/${offerBanner?._id}`}>
                                update
                            </Link>
                            <Image
                                src={offerBanner?.image}
                                alt={offerBanner?.title}
                                width={200}
                                height={200}
                            />
                        </div>
                    ))
                } */}
            </div>
        </div>
    )
}

export default OfferBannerpage