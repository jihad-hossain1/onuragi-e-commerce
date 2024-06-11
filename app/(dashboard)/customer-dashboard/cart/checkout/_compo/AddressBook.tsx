'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const AddressBook = ({ userInfo }) => {
    const { data: session, status } = useSession();

    return (
        <div>
            {userInfo ? (
                <div className='flex flex-col gap-1'>
                    <Link href={`/customer-dashboard/user-profile/${session?.user?.id}`} className="btn text-xs w-fit">
                        Update Profile
                    </Link>

                    {/* info  */}
                    <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
                        <h4 className="text-center font-semibold underline">Info.</h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">Mobile : </span>
                            <span>{userInfo?.mobile || "no data."}</span>
                        </h4>

                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">Gender : </span>
                            <span>{userInfo?.gender || "no data."}</span>
                        </h4>
                    </div>
                    {/* address info  */}
                    <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
                        <h4 className="text-center font-semibold underline"> Address Info.</h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">City : </span>
                            <span>{userInfo?.address?.city || "no data."}</span>
                        </h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">Street : </span>
                            <span>{userInfo?.address?.street || "no data."}</span>
                        </h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">ZipCode : </span>
                            <span>{userInfo?.address?.zipCode || "no data."}</span>
                        </h4>
                    </div>

                    {/* delivery address  */}
                    <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
                        <h4 className="text-center font-semibold underline"> Delivery Address.</h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">Sate : </span>
                            <span>{userInfo?.deliveryAddress?.dcity || "no data"}</span>
                        </h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">Street : </span>
                            <span>{userInfo?.deliveryAddress?.dstreet || "no data"}</span>
                        </h4>
                        <h4 className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">zipCode : </span>
                            <span>{userInfo?.deliveryAddress?.dzipCode || "no data"}</span>
                        </h4>
                    </div>
                </div>
            ) : (
                <section style={{ minHeight: '30vh', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='min-h-[30vh] my-10'>
                    <div className='flex flex-col gap-2 items-center justify-center '>
                        <h4>No Address Found</h4>

                        <Link className='btn text-xs ' href={'/customer-dashboard/user-profile'}>Add Address</Link>
                    </div>
                </section>
            )}
        </div>
    )
}

export default AddressBook