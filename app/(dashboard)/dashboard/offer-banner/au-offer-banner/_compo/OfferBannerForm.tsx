"use client";

import React, { useState } from "react";
import { serverAction } from "./serverAction";
import FileUploader from "@/utils/FileUploader";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { validatedTag } from "@/helpers/validated-tag";
import Link from "next/link";
import { updateServerAction } from "./updateServerAction";

const OfferBannerForm = ({ offerData, id, products }) => {
    const [loading, setLoading] = React.useState(false);
    const [_photo, setPhoto] = useState("");
    const [image, setimage] = useState(null);
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        title: "",
        productId: "",
    });

    React.useEffect(() => {
        if (offerData) {
            setFormData({
                title: offerData?.title,
                productId: offerData?.productId,
            });
            setPhoto(offerData?.image);
        }
    }, [offerData]);

    const handleOnFileUpload = async (e) => {
        e.preventDefault();
        try {
            let data = new FormData();
            if (!image) {
                return alert("Please select a image first");
            }
            data.append("file", image);
            data.append("upload_preset", "images_preset");
            let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;
            const res = await axios.post(api, data);
            let _up = await res?.data?.secure_url;
            setPhoto(_up);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            // setLoading(true);
            if (id) {
                setLoading(true);

                const data = await updateServerAction({
                    _id: id[0],
                    title: formData?.title,
                    image: _photo,
                    productId: formData?.productId,
                });

                setLoading(false);

                if (data?.error) {
                    setLoading(false);
                    toast(data?.error);
                }

                if (data?.result) {
                    setLoading(false);
                    toast("offerBanner Updated Successfull");
                    validatedTag("offerBanner");
                    router.refresh();
                }
            } else {
                const data = await serverAction({
                    title: formData?.title,
                    image: _photo,
                    productId: formData?.productId,
                });

                setLoading(false);

                if (data?.error) {
                    setLoading(false);
                    toast(data?.error);
                }

                if (data?.result) {
                    setLoading(false);
                    toast("offerBanner Added Successfull");
                    validatedTag("offerBanner");
                    router.refresh();
                }
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const handleCancelUpload = () => {
        setPhoto("");
        setimage(null);
    };

    return (
      <main className="">
        <Link href="/dashboard/offer-banner" className="btn w-fit">
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-center py-5">
          {id ? "Update" : "Add"} Poster
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            value={formData.title}
            type="text"
            className="input"
            name="title"
            placeholder="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <select
            name="productId"
            id="productId"
            onChange={(e) =>
              setFormData({ ...formData, productId: e.target.value })
            }
            value={formData.productId}
          >
            <option value="" disabled>
              Select Product
            </option>
            {products?.map(
              (product: { _id: string; name: string }, index: number) => (
                <option key={index} value={product?._id}>
                  {product?.name}
                </option>
              )
            )}
          </select>
          {"*** image must be height=400 width=800 pixel ***"}
          <FileUploader
            setimage={setimage}
            handleOnFileUpload={handleOnFileUpload}
            _photo={_photo}
            handleCancelUpload={handleCancelUpload}
            updaloding={undefined}
          />

          <button disabled={loading} type="submit" className="btn">
            {loading ? "Loading..." : id ? "Update" : "Add"}
          </button>
        </form>
      </main>
    );
};

export default OfferBannerForm