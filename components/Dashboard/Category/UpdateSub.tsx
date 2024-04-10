'use client'

import Modal from '@/components/Modal';
import { validatedTag } from '@/helpers/validated-tag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { HiPencilAlt } from "react-icons/hi";
import { toast } from 'sonner';

const UpdateSub = ({ _id, name }) => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [isName, setName] = useState({ name: name });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ name: e.target.value });
    };

    async function submit() {
        console.log(isName);

        try {
            const response = await fetch(`/api/v1/category/subCategory/${_id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: isName?.name }),
                headers: {
                    "Content-Type": "applications/json"
                }
            });

            const result = await response.json();

            if (!response.ok) {
                toast(result?.error);
                router.refresh()
                console.log(result)
            }

            if (response.ok) {
                toast("update successfull");
                validatedTag('subCategory');
                router.refresh();
                setOpen(false);
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <>
            <button onClick={() => setOpen(!open)} className=''>
                <HiPencilAlt size={23} />
            </button>

            <Modal title={'update sub-category'} open={open} setOpen={setOpen} maxWidth={'500px'}>
                <div className='flex flex-col gap-5'>
                    <input type="text" name="name" className='input' value={isName?.name} onChange={handleChange} id="" />

                    <button className='btn' type='button' onClick={submit}>Update</button>
                </div>
            </Modal>
        </>
    )
}

export default UpdateSub