import React from 'react'
import AddressBook from './_compo/AddressBook'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { fetchUser } from '@/utils/users/fetchuser'
import Payment from './_compo/Payment'

const CheckoutPage = async () => {
    const session = await getServerSession(options)
    const userInfo = await fetchUser(session?.user?.id);
    const userAddress = userInfo?.profile;


    return (
        <main className="max-w-screen-xl mx-auto p-4 min-h-[80vh]">
            <h4 className="text-center text-3xl font-semibold py-10">
                CheckoutPage
            </h4>

            <div className='grid md:grid-cols-2  gap-6' >
                <div className='border shadow-sm bg-slate-50 p-3'>
                    <h4 className="text-center font-semibold">Address</h4>
                    <AddressBook userInfo={userAddress} />
                </div>
                <div className='border shadow-sm bg-slate-50 p-3'>
                    <h4 className="text-center font-semibold">Payment method</h4>
                    <Payment userId={session?.user?.id} />
                </div>
            </div>
        </main>
    )
}

export default CheckoutPage