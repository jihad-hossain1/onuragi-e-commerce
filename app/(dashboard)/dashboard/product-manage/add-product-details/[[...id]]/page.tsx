import AddproductDetails from '@/components/Dashboard/productMange/addproduct-details';
import React from 'react'

const AddproductDetailspage = ({ params }) => {
    return (
        <>
            <AddproductDetails productID={params?.id} />
        </>
    )
}

export default AddproductDetailspage