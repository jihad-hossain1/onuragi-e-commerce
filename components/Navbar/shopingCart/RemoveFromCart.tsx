'use client'

import { validatedTag } from '@/helpers/validated-tag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa6";
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
        <div>
            <button onClick={handleRemoveFromCart} disabled={loading}>
                <FaTrash />
            </button>
        </div>
    )
}

export default RemoveFromCart