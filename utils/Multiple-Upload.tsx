import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";

export const uploadMultipleImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "multiple_preset");
    const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`,
        formData
    );
    return { publicId: data?.public_id, url: data?.secure_url };
};
const MultipleImageUploader = ({
    multiLink,
    setmultiLink,
    multiImage,
    setMultiImage,
}) => {
    const [loading, setloading] = useState(false);
    const [toggleSeeGallary, settoggleSeeGallary] = useState(false);

    const handleImageSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            setloading(true);
            let arr = [];
            for (let i = 0; i < multiImage.length; i++) {
                const data = await uploadMultipleImage(multiImage[i]);
                let image = {
                    image: data?.url,
                };
                arr.push(image);
            }
            setmultiLink(arr);
            setloading(false);
            toast.success("multiple image upload successfull");
            toast.success("check show upload button click");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleImageSubmit}
                className="flex items-center gap-4"
            >
                <input
                    required
                    className="border border-gray-400"
                    type="file"
                    name=""
                    accept="image/*"
                    id="image"
                    multiple={true}
                    onChange={(e) => setMultiImage(e.target.files)}
                />
                <div className="flex gap-5 items-center">
                    <button className="btn" type="submit">
                        {loading ? "uploading..." : "Upload"}
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => settoggleSeeGallary(!toggleSeeGallary)}
                    >
                        show photo
                    </button>
                </div>

            </form>

            <div className="mt-8 ">

                <div className="grid grid-cols-2 my-3">
                    {toggleSeeGallary &&
                        multiLink?.map((item: { image: string }) => (
                            <div key={item?.image} className=" w-fit">
                                <Image
                                    height={300}
                                    width={300}
                                    src={item?.image}
                                    className="max-w-[300px] object-cover "
                                    alt="photo"
                                />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default MultipleImageUploader;