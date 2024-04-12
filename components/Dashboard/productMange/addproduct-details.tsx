'use client'

import Container from '@/components/ui/container'
import { ProductType } from '@/helpers/types/types'
import React from 'react'
import AddSizes from './add-sizes'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type ProductsProps = {
    products: ProductType
}


const AddproductDetails: React.FC<ProductsProps> = ({ products }) => {

    const initialData = {
        productID: '',
        about: '',
        sizeGuide: '',
    }

    const router = useRouter();

    const [formData, setFormData] = React.useState(initialData);
    const [sizes, setSizes] = React.useState([]);


    async function handleSubmit() {
        try {
            const response = await fetch(`/api/v1/products/product-details`, {
                headers: {
                    "Content-Type": "applications/json"
                },
                body: JSON.stringify({
                    ...formData,
                    sizes: sizes,
                }),
                method: 'POST'
            })

            const data = await response.json();

            if (response.ok) {
                toast(data?.message);
                router.push('/dashboard/product-manage');

            } else {
                console.log(data)
                toast(data?.message);
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    }
    return (
        <Container>
            <h4 className='text-2xl text-center my-8'>Add product Details</h4>

            <section className='flex flex-col gap-4 max-w-xl m-auto'>
                <label htmlFor="product">
                    Select Product
                </label>
                <select className='input' name="" id="product" value={formData.productID} onChange={(e) => setFormData({ ...formData, productID: e.target.value })}>
                    {products?.map((product: ProductType) => (
                        <option key={product?._id} value={product?._id}>{product?.name}</option>
                    ))}
                </select>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="sizeGuide">
                        Size Guide
                    </label>
                    <input className='input' placeholder='Enter size Guide or image link' type="text" name="sizeGuide" value={formData.sizeGuide} onChange={(e) => setFormData({ ...formData, sizeGuide: e.target.value })} id="sizeGuide" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="About">
                        About
                    </label>
                    <textarea className='input' placeholder='Enter About' name="About" value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} id="About" maxLength={800} rows={5} cols={50} />
                </div>

                <AddSizes sizes={sizes} setSizes={setSizes} />

                <div>
                    <button onClick={handleSubmit} type='submit' className='btn'>Submit</button>
                </div>
            </section>
        </Container>
    )
}

export default AddproductDetails