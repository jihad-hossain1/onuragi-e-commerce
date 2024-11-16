'use client'

import Modal from '@/components/Modal';
import { validatedTag } from '@/helpers/validated-tag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const UpdateSub = ({ _id, name }) => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [isName, setName] = useState({ name: name });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ name: e.target.value });
    };

    async function submit() {
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
            }

            if (response.ok) {
                toast("update successfull");
                validatedTag('subCategory');
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
  <path d="M12 20h9M12 20l-3-3m3 3l-3-3M16.5 3.5l4 4L7 17l-4-4 13.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

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