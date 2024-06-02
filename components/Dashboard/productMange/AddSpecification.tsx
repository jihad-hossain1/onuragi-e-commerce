'use client'

import { validatedTag } from '@/helpers/validated-tag';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaTrash } from 'react-icons/fa6';
import { toast } from 'sonner';
type ProductIDProps = {
    productID: string;
}
const AddSpecification: React.FC<ProductIDProps> = ({ productID }) => {

    const router = useRouter();
    const initialValue = {
        sleeve: '',
        valueAddition: '',
        coller_Neck: '',
        sideCut: '',
    }

    const [formData, setFormData] = React.useState(initialValue);
    const [care, setCare] = React.useState([]);
    const [addCare, setAddCare] = React.useState('');
    const [febric, setFebric] = React.useState([]);
    const [addFebric, setAddedFebric] = React.useState('');

    function getCare() {
        if (addCare === '' || !addCare) {
            toast("Enter Care");
            return;
        }
        setCare([...care, addCare]);
        setAddCare("");
    }

    function removeCare() {
        setCare(care.slice(0, -1));
    }

    function getFebric() {
        if (addFebric === '' || !addFebric) {
            toast("Enter Febric");
            return;
        }
        setFebric([...febric, addFebric]);
        setAddedFebric("");
    }

    function removeFebric() {
        setFebric(febric.slice(0, -1));
    }

    async function handleSubmit() {
        try {
            const response = await fetch(`/api/v1/products/specification`, {
                headers: {
                    "Content-Type": "applications/json"
                },
                body: JSON.stringify({
                    ...formData,
                    productID: productID
                }),
                method: 'POST'
            });

            const data = await response.json();

            if (response.ok) {
              toast(data?.message);
              // validatedTag("specification")
              validatedTag("products");
              router.refresh();
              router.push("/dashboard/product-manage");
            } else {
                toast(data?.message)
            }

        } catch (error: any) {
            console.log(error?.message)
        }
    }
    return (
        <div className='flex flex-col gap-4 max-w-xl m-auto p-4'>

            <div className='flex flex-col gap-2'>
                <label htmlFor="sleeve">sleeve</label>
                <input
                    type="text"
                    name="sleeve"
                    id="sleeve"
                    value={formData?.sleeve}
                    onChange={(e) => setFormData({ ...formData, sleeve: e.target.value })}
                    className="input"
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="valueAddition">valueAddition</label>
                <input
                    type="text"
                    name="valueAddition"
                    id="valueAddition"
                    value={formData?.valueAddition}
                    onChange={(e) => setFormData({ ...formData, valueAddition: e.target.value })}
                    className="input"
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="coller_Neck">coller_Neck</label>
                <input
                    type="text"
                    name="coller_Neck"
                    id="coller_Neck"
                    value={formData?.coller_Neck}
                    onChange={(e) => setFormData({ ...formData, coller_Neck: e.target.value })}
                    className="input"
                />

            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="sideCut">sideCut</label>
                <input
                    type="text"
                    name="sideCut"
                    id="sideCut"
                    value={formData?.sideCut}
                    onChange={(e) => setFormData({ ...formData, sideCut: e.target.value })}
                    className="input"
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="care">care</label>
                <div className='flex items-center gap-2'>
                    <input
                        type="text"
                        name="care"
                        id="care"
                        className="input w-full"
                        value={addCare}
                        onChange={(e) => setAddCare(e.target.value)}
                    />

                    <button className="btn w-fit" onClick={getCare} type='button'>Add</button>
                </div>
                {care?.map((item, index) => (
                    <p
                        key={index}
                        className="text-sm flex items-center gap-4"
                    >
                        <p>{item}</p>
                        <button onClick={removeCare} className="text-pink-600">
                            <FaTrash />
                        </button>
                    </p>
                ))}
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="febric">febric</label>
                <div className='flex items-center gap-2'>
                    <input
                        type="text"
                        name="febric"
                        id="febric"
                        className="input w-full"
                        value={addFebric}
                        onChange={(e) => setAddedFebric(e.target.value)}
                    />
                    <button className="btn w-fit" onClick={getFebric} type='button'>Add</button>
                </div>
                {febric?.map((item, index) => (
                    <p
                        key={index}
                        className="text-sm flex items-center gap-4"
                    >
                        <p>{item}</p>
                        <button onClick={removeFebric} className="text-pink-600">
                            <FaTrash />
                        </button>
                    </p>
                ))}
            </div>

            <button
                className="btn"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default AddSpecification