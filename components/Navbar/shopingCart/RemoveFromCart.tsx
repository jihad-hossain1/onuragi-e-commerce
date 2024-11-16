'use client'

import { validatedTag } from '@/helpers/validated-tag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { removeServerAction } from './removeServerAction';

const RemoveFromCart = ({ productId, userId }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleRemoveFromCart = async () => {
        try {
            setLoading(true)
            const response = await removeServerAction({ productId: productId, userId: userId });
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
        <div className='mt-1'>
            <button className='max-sm:text-[10px] max-sm:px-2 max-sm:py-0 flex items-center gap-1 text-pink-50 bg-pink-600 text-xs border rounded p-1' onClick={handleRemoveFromCart} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 6h18M19 6l-1 14H6L5 6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>Remove</span>
            </button>
        </div>
    )
}

export default RemoveFromCart