

import { getProducts } from '@/app/api/frontend/products/products';
import AddProductImages from '@/components/Dashboard/productMange/add-product-image';
import React from 'react'

const AddProductImagespage = async () => {
    const products = await getProducts();
    return (
        <>
            <AddProductImages products={products} />
        </>
    )
}

export default AddProductImagespage