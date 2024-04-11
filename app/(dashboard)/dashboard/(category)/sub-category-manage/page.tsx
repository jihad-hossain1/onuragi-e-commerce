import React from 'react'
import { getAllCategory, getSubCategories } from '@/app/api/frontend/category/category';
import UpdateSub from '@/components/Dashboard/Category/UpdateSub';
import AddSubCategory from '@/components/Dashboard/Category/AddSubCategory';

const SubCategorypage = async () => {
    const subcategories = await getSubCategories();
    const categories = await getAllCategory();
    return (
        <>
            <AddSubCategory categories={categories} />
            <div className="flex flex-col gap-3">

                {subcategories?.map((category: { name: string; _id: string; }, _ind: number) => (
                    <h4 key={category?._id} className="flex items-center gap-2">
                        <span>{_ind + 1}.</span>
                        <span>{category?.name}</span>
                        <UpdateSub name={category?.name} _id={category?._id} />
                    </h4>
                ))}

            </div></>
    )
}

export default SubCategorypage