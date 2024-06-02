"use client";

import React, { useState } from "react";
import { bannerServerAction } from "./bannerServerAction";
import FileUploader from "@/utils/FileUploader";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { validatedTag } from "@/helpers/validated-tag";
import Link from "next/link";
import { updateServerAction } from "./updateServerAction";

const BannerForm = ({ products, id, bannerData }) => {
  const [loading, setLoading] = React.useState(false);
  const [_photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    title: "",
    productId: "",
  });

  React.useEffect(() => {
    if (bannerData) {
      setFormData({
        title: bannerData?.title,
        productId: bannerData?.productId,
      });
      setPhoto(bannerData?.image);
    }
  }, [bannerData]);

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
      console.log(error);
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
          toast("Banner Updated Successfull");
          validatedTag("banner");
          router.refresh();
        }
      } else {
        const data = await bannerServerAction({
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
          toast("Banner Added Successfull");
          validatedTag("banner");
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
      <Link href="/dashboard/banners" className="btn w-fit">
        Back
      </Link>
      <h1 className="text-2xl font-semibold text-center py-5">
        {id ? "Update" : "Add"} Banner
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={formData.title}
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

        <FileUploader
          setimage={setimage}
          handleOnFileUpload={handleOnFileUpload}
          _photo={_photo}
          handleCancelUpload={handleCancelUpload}
        />

        <button disabled={loading} type="submit" className="btn">
          {loading ? "Loading..." : id ? "Update" : "Add"}
        </button>
      </form>

      {}
    </main>
  );
};

export default BannerForm;
