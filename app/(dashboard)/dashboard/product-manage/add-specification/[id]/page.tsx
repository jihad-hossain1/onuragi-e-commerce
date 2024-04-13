import AddSpecification from '@/components/Dashboard/productMange/AddSpecification'
import React from 'react'

const AddSpecificationpage = ({ params }) => {
    return (
        <>
            <AddSpecification productID={params?.id} />
        </>
    )
}

export default AddSpecificationpage