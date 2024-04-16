import { getSubCategories } from '@/app/api/frontend/category/category';
import { getProductById } from '@/app/api/frontend/products/products';
import EditProduct from '@/components/Dashboard/productMange/productAction/EditProduct'
import React from 'react'

const EditProductpage = async ({ params }) => {
    const product = await getProductById(params?.id);
    const categories = await getSubCategories();
    return (
      <div>
        <EditProduct product={product} categories={categories} />
      </div>
    );
}

export default EditProductpage