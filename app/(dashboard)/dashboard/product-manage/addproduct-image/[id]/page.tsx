
import AddProductImages from '@/components/Dashboard/productMange/add-product-image';
import React from 'react'

const AddProductImagespage = ({ params }) => {
    return (
        <>
            <AddProductImages productID={params?.id} />
        </>
    )
}

export default AddProductImagespage