'use client'

import { ProductType } from '@/helpers/types/types'
import React from 'react'

type ProductsProps = {
    products: ProductType
}

const AddProductImages: React.FC<ProductsProps> = ({ products }) => {
    const [productID, setProductID] = React.useState<string>('');


    return (
        <main className='max-w-screen-xl mx-auto p-4'>
            <h4 className='text-2xl text-center py-8'>Add Product Image</h4>

            <select name="productID" id="productID" className='w-full p-2 border border-gray-300 rounded' onChange={(e) => setProductID(e.target.value)} value={productID}>
                {products?.map((product: ProductType) => (
                    <option key={product?._id} value={product?._id}>
                        {product?.name}
                    </option>
                ))}
            </select>
        </main>
    )
}

export default AddProductImages