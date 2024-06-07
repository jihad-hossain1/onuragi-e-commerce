'use client'

import React from 'react'
import { increaseQuantity } from './IncreaseQuantity';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { validatedTag } from '@/helpers/validated-tag';
import { decreaseQuantity } from './decreaseQuantity';

const CartQuantity = ({ quantity, id, productId, userId }) => {
    const [loading, setLoading] = React.useState(false)

    const router = useRouter()

    const handleIncreaseQuantity = async () => {
        try {
            setLoading(true)
            const response = await increaseQuantity({ userId, id, productId, quantity });
            // console.log("🚀 ~ handleIncreaseQuantity ~ response:", response)
            setLoading(false)

            if (response?.error) {
                setLoading(false)
                toast.error(response?.error)
            }
            if (response?.result) {
                validatedTag('cart')
                setLoading(false)
                toast.success(response?.message)
                router.refresh()
            }
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const handleDecreaseQuantity = async () => {
        try {
            setLoading(true)
            const response = await decreaseQuantity({ userId, id, productId, quantity });
            // console.log("🚀 ~ handleDecreaseQuantity ~ response:", response)
            setLoading(false)

            if (response?.error) {
                setLoading(false)
                toast.error(response?.error)
            }
            if (response?.result) {
                validatedTag('cart')
                setLoading(false)
                toast.success(response?.message)
                router.refresh()
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex gap-1">
            <button disabled={loading} onClick={handleIncreaseQuantity} className='bg-gray-200 px-3 rounded-md shadow-sm text-sm w-fit'>+</button>
            <h4 className="bg-gray-200 px-3 rounded-md shadow-sm text-sm w-fit">
                {quantity}
            </h4>
            <button disabled={loading} onClick={handleDecreaseQuantity} className='bg-gray-200 px-3 rounded-md shadow-sm text-sm w-fit'>-</button>
        </div>
    )
}

export default CartQuantity