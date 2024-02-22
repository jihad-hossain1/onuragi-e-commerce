"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUploader from "@/utils/FileUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddProduct = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setname] = useState("");
  const [categoryID, setCategory] = useState("");
  const [price, setprice] = useState(0);
  const [_photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOnFileUpload = async (e) => {
    e.preventDefault();
    try {
      let data = new FormData();
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

  const handleAddCategory = async () => {
    if (name == "") {
      return toast.error("name is required");
    }

    const res = await axios.post("/api/v1/category/subCategory", {
      name: name,
      categoryID: categoryID,
    });
    console.log(res);

    if (res?.data?.status === 201) {
      router.refresh();
      toast.success("Category added Successfull");
      setname("");
      setCategory("");
      setIsOpen(false);
    } else {
      setError(res?.data?.message);
      toast.error(res?.data?.message);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

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
          <Input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-transparent"
          />
          <Input
            type="number"
            placeholder="Price"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-transparent"
          />
          <FileUploader
            image={image}
            setimage={setimage}
            handleOnFileUpload={handleOnFileUpload}
          />
          <Button
            onClick={handleAddCategory}
            type="submit"
            size="sm"
            varient="outline"
            className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 uppercase"
          >
            create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddProduct;
