'use client'

import Link from 'next/link';
import React from 'react'

const AddressBook = ({ userInfo }) => {
    console.log(userInfo);

    return (
        <div>
            {userInfo ? (
                <div>
                    userInfo..
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