'use client';

import FileUploader from '@/utils/FileUploader';
import React, { useState } from 'react'
import { serverAction } from './serverAction';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { validatedTag } from '@/helpers/validated-tag';
import Link from 'next/link';

const Form = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        fullname: user?.fullname || "",
        gender: user?.profile?.gender || "",
        username: user?.username || "",
        mobile: user?.profile?.mobile || "",
        street: user?.profile?.address?.street || "",
        city: user?.profile?.address?.city || "",
        zipCode: user?.profile?.address?.zipCode || "",
        dstreet: user?.profile?.deliveryAddress?.dstreet || "",
        dcity: user?.profile?.deliveryAddress?.dcity || "",
        dzipCode: user?.profile?.deliveryAddress?.dzipCode || "",

    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            setLoading(true)
            const res = await serverAction({ ...formData, id: user?._id });
            // console.log("🚀 ~ handleSubmit ~ res:", res)
            setLoading(false)

            if (res?.error) {
                toast(res?.error)
            }
            if (res?.result) {
                validatedTag("user");
                toast("Update Successfull");
                router.refresh();
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section>
            <Link href={"/customer-dashboard/user-profile"} className='btn text-xs w-fit ' style={{ zIndex: 1000 }}>
                Back
            </Link>
            <main style={{ maxWidth: "500px", margin: "0 auto" }}>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 '>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname">full Name</label>
                        <input onChange={handleChange} type="text" name="fullname" value={formData?.fullname} placeholder="full Name" id="" className='input' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="username">user name</label>
                        <input onChange={handleChange} type="text" name="username" value={formData?.username} placeholder="user name" id="" className='input' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="mobile">Mobile</label>
                        <input onChange={handleChange} type="text" name="mobile" value={formData?.mobile} placeholder="Mobile" id="" className='input' />
                    </div>
                    <div>
                        <select name="gender" id="" className='input' onChange={handleChange} value={formData?.gender}>
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h4 className="font-semibold text-center">
                            Address
                        </h4>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="street">street</label>
                            <input onChange={handleChange} type="text" name="street" value={formData?.street} placeholder="street" id="" className='input' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="city">city</label>
                            <input type="text" name="city" onChange={handleChange} value={formData?.city} placeholder="city" id="" className='input' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="zipcode">zipcode</label>
                            <input type="text" onChange={handleChange} name="zipCode" value={formData?.zipCode} placeholder="zipcode" id="" className='input' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h4 className="font-semibold text-center">
                            Delivery Address
                        </h4>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="dstreet">delivery street</label>
                            <input type="text" onChange={handleChange} name="dstreet" value={formData?.dstreet} placeholder="delivery street" id="" className='input' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="dcity">delivery city</label>
                            <input type="text" onChange={handleChange} name="dcity" value={formData?.dcity} placeholder="delivery city" id="" className='input' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="dzipCode">delivery zipcode</label>
                            <input type="text" onChange={handleChange} name="dzipCode" value={formData?.dzipCode} placeholder="delivery zipCode" id="" className='input' />
                        </div>
                    </div>

                    <FileUploader setimage={undefined} handleOnFileUpload={undefined} _photo={undefined} handleCancelUpload={undefined} />

                    <button className='btn w-fit' type='submit'>
                        {loading ? "Loading..." : "Update"}
                    </button>
                </form>
            </main>
        </section>
    )
}

export default Form