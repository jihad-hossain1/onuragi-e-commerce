"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUploader from "@/utils/FileUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPencilAlt } from "react-icons/hi";

const EditProduct = ({ product, categories }) => {
  const [btnDisabled, setBtnDisabled] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setname] = useState(product?.name);
  const [categoryID, setCategory] = useState(product?.categoryID);
  const [price, setprice] = useState(product?.price);
  const [_photo, setPhoto] = useState(product?.image);
  const [image, setimage] = useState(null);
  const [error, setError] = useState("");
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

  const handleAddProduct = async () => {
    try {
      const res = await axios.put(`/api/v1/products/${product?._id}`, {
        name: name,
        categoryID: categoryID,
        price: parseFloat(price),
        image: _photo,
      });
      console.log("response : ", res);

      if (res?.status === 201) {
        router.refresh();
        toast.success("product update Successfull");
        setIsOpen(false);
      } else {
        console.log(res?.response);
        setBtnDisabled(res.data.isValid);
        setError(res?.data?.message);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      setError(error?.response.data.message);
      console.log(error?.response);
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        varient="outline"
        className="text-green-500"
      >
        <HiPencilAlt size={23} />
      </button>

      <Modal open={isOpen} setOpen={setIsOpen} title={"Update Product"}>
        <div className="flex flex-col gap-3">
          <h4 className="text-xs text-pink-600">{error ? error : ""}</h4>

          <h4 className="text-xs">Select Category</h4>
          <select
            value={categoryID}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border"
          >
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
            onClick={handleAddProduct}
            type="submit"
            size="sm"
            varient="outline"
            className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 uppercase"
          >
            Update
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditProduct;
