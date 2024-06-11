"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatedTag } from "@/helpers/validated-tag";
import FileUploader from "@/utils/FileUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddProduct = ({ categories }) => {
  const [btnDisabled, setBtnDisabled] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setname] = useState("");
  const [categoryID, setCategory] = useState("");
  const [price, setprice] = useState(0);
  const [slug, setSlug] = useState("");
  const [_photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      console.log(error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({
          name: name,
          categoryID: categoryID,
          price: parseFloat(price),
          image: _photo,
          slug: slug,
        }),
      });

      const result = await res.json();

      console.log(result);

      if (result?.error) {
        setLoading(false);
        toast(result?.error);
      }
      if (result?.result) {
        setLoading(false);
        toast.success("product added Successfull");
        setname("");
        setCategory("");
        setimage("");
        setprice(0);
        setIsOpen(false);
        router.refresh();
        validatedTag("products");
      }

      // if (res.ok) {
      //   setLoading(false);
      //   // router.refresh();
      //   validatedTag("products");
      //   toast.success("product added Successfull");
      //   setname("");
      //   setCategory("");
      //   setimage("");
      //   setprice(0);
      //   // setIsOpen(false);
      // } else {
      //   setLoading(false);
      //   toast.error("error while adding product");
      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCancelUpload = () => {
    setPhoto("");
    setimage(null);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error, _photo, image, btnDisabled]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        varient="outline"
        className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 my-4"
      >
        Add Product
      </Button>

      <Modal open={isOpen} setOpen={setIsOpen} title={"Add Product"}>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
          <h4 className="text-xs text-pink-600">{error ? error : ""}</h4>

          <h4 className="text-xs">Select Category</h4>
          <select
            value={categoryID}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border"
          >
            <option disabled value={""}>
              Select Category
            </option>
            {categories?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          <h4 className="text-xs text-pink-600">
            {btnDisabled ? btnDisabled?.categoryID : ""}
          </h4>
          <Input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-transparent"
          />
          <Input
            type="text"
            placeholder="product-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="bg-transparent"
          />
          {btnDisabled ? btnDisabled?.name : ""}
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="bg-transparent"
          />

          <FileUploader
            handleCancelUpload={handleCancelUpload}
            image={image}
            setimage={setimage}
            handleOnFileUpload={handleOnFileUpload}
            _photo={_photo}
          />
          <h4 className="text-xs text-pink-600">
            {btnDisabled ? btnDisabled?.image : ""}
          </h4>
          <Button
            // disabled={btnDisabled}
            // onClick={handleAddProduct}
            type="submit"
            size="sm"
            varient="outline"
            className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 uppercase"
          >
            create
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
