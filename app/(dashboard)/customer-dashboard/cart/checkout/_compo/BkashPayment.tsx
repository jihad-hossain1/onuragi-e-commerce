'use client'

import axios from 'axios';
import React from 'react'

interface Props {
    userId: string;
    total: number;
    invoiceId: string
}

const apiUrl = '/api/v1/payment/bkash/create'

const BkashPayment: React.FC<Props> = ({ total, userId }) => {

    const pay = async () => {
        try {
            const { data } = await axios.post(apiUrl, { amount: total, orderId: userId })
            console.log("🚀 ~ pay ~ data:", data)
           if(data.bkashURL) window.location.href = data.bkashURL
        } catch (error: any) {
            console.log(error.response.data)
        }
    }
    return (
        <div>
            <button className='bg-pink-500 text-white px-4 py-2 rounded-md shadow w-fit' onClick={pay}>
                Pay with Bkash
            </button>
        </div>
    )
}

export default BkashPayment