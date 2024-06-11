'use client'

import React, { useState } from 'react'
import { serverAction } from './serverAction';
import { toast } from 'sonner';

const Payment = ({ userId }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!userId) return toast.error("You are not logged in")
        try {
            setLoading(true);
            const response = await serverAction({ userId });
            setLoading(false)
            console.log(response);

        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    return (
        <div>
            <button disabled={loading} type='button' className='btn w-fit text-xs' onClick={handlePayment} >
                {loading ? "loading..." : "confirm"}
            </button>
        </div>
    )
}

export default Payment