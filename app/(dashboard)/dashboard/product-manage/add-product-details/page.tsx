import { getProducts } from '@/app/api/frontend/products/products'
import AddproductDetails from '@/components/Dashboard/productMange/addproduct-details';
import React from 'react'

const AddproductDetailspage = async () => {
    const products = await getProducts();

    return (
        <>
            <AddproductDetails products={products} />
        </>
    )
}

export default AddproductDetailspage