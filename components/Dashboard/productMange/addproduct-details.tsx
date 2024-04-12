'use client'

import { ProductType } from '@/helpers/types/types'
import React from 'react'

type ProductsProps = {
    products: ProductType
}


const AddproductDetails: React.FC<ProductsProps> = ({ products }) => {
    return (
        <div>AddproductDetails</div>
    )
}

export default AddproductDetails