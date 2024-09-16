'use client'

import { ProductType } from '@/helpers/types/types'
import MultipleImageUploader from '@/utils/Multiple-Upload'
import React, { useState } from 'react'
import { toast } from 'sonner'

type ProductsProps = {
    productID: string
}

const AddProductImages: React.FC<ProductsProps> = ({ productID }) => {
    const [multiImage, setMultiImage] = useState([]);
    const [multiLink, setmultiLink] = useState([]);

    async function handleSubmit() {
        try {
            const response = await fetch(`/api/v1/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productID: productID, urls: multiLink }),
            })

            const result = await response.json();

            if (response.ok) {
                toast('success,image added successfully');
            } else {

                toast(result.error);
            }

        } catch (error: any) {
        }
    }
    return (
        <main className='max-w-screen-xl mx-auto p-4 flex flex-col gap-6'>

            <h4 className='text-2xl text-center py-8'>Add Product Image</h4>

            <button className='btn my-5 w-fit' onClick={handleSubmit}>Submit</button>

            <MultipleImageUploader multiImage={multiImage} setMultiImage={setMultiImage} setmultiLink={setmultiLink} multiLink={multiLink} />


        </main>
    )
}

export default AddProductImages