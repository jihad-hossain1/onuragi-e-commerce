'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const Profile = () => {
    const { data: session, status } = useSession()
    const user = session?.user;

    if (status === 'loading') {
        return <div className='flex flex-col justify-center items-center text-sm text-pink-600 min-h-[70vh]'>{"Loading...."}</div>
    }

    return (
        <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
            <h4 className="text-center font-semibold underline"> Short Info.</h4>
            <h4 className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Name : </span>
                <span>{user?.name}</span>
            </h4>
            <h4 className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Email : </span>
                <span>{user?.email}</span>
            </h4>

            <h4 className="flex items-center gap-2 text-sm">
                <span className="font-semibold">User Role : </span>
                <span>{user?.role || 'no data'}</span>
            </h4>
        </div>
    )
}

export default Profile