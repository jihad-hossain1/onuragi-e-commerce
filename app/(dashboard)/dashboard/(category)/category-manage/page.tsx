import { getAllCategory } from '@/app/api/frontend/category/category'
import UpdateCat from '@/components/Dashboard/Category/updateCat';
import React from 'react'
import AddCategory from '@/components/Dashboard/Category/AddCategory';

const Categorypage = async () => {
    const categories = await getAllCategory();
    return (
        <>
            <AddCategory />
            <div className="flex flex-col gap-3">
                <h4>Total Categories: {categories?.length || 0} </h4>
                <div>
                    {categories?.map((category: { name: string; _id: string; }, _ind: number) => (
                        <h4 key={category?._id} className="flex items-center gap-2">
                            <span>{_ind + 1}.</span>
                            <span>{category?.name}</span>
                            <UpdateCat name={category?.name} _id={category?._id} />
                        </h4>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Categorypage