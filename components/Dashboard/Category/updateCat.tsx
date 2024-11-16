'use client'

import Modal from '@/components/Modal';
import { validatedTag } from '@/helpers/validated-tag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const UpdateCat = ({ _id, name }) => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [isName, setName] = useState({ name: name });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ name: e.target.value });
    };

    async function submit() {
        try {
            const response = await fetch(`/api/v1/category/${_id}`, {
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
            }

            if (response.ok) {
                toast("update successfull");
                validatedTag('category');
                router.refresh();
                setOpen(false);
            }
        } catch (error: any) {
        }
    }
    return (
        <>
            <button onClick={() => setOpen(!open)} className=''>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 20h9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.36 5.64a2 2 0 0 1 0 2.83l-10.7 10.7a2 2 0 0 1-1.43.59l-2.17-.43a2 2 0 0 1-1.48-1.48l-.43-2.17a2 2 0 0 1 .59-1.43L16.72 5.64a2 2 0 0 1 2.83 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </button>

            <Modal title={'update category'} open={open} setOpen={setOpen} maxWidth={'500px'}>
                <div className='flex flex-col gap-5'>
                    <input type="text" name="name" value={isName?.name} onChange={handleChange} id="" />

                    <button className='btn' type='button' onClick={submit}>Update</button>
                </div>
            </Modal>
        </>
    )
}

export default UpdateCat