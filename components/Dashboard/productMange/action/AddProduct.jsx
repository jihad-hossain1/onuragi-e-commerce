"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatedTag } from "@/helpers/validated-tag";
import FileUploader from "@/utils/FileUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddProduct = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [updaloding, setUpdaloding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    categoryID: "",
    price: 0,
    slug: "",
    defaultColor: "",
    defaultSize: "",
  });

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
      setUpdaloding(true);
      const res = await axios.post(api, data);
      let _up = await res?.data?.secure_url;
      setUpdaloding(false);
      setPhoto(_up);
    } catch (error) {
      setUpdaloding(false);
      console.error(error);
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
          ...formData,
          price: parseFloat(formData?.price),
          image: _photo,
        }),
      });

      const result = await res.json();

      if (result?.error) {
        setLoading(false);
        toast(result?.error);
      }

      if (result?.result) {
        validatedTag("products");
        setLoading(false);
        toast.success("product added Successfull");

        setFormData({
          name: "",
          categoryID: "",
          price: 0,
          slug: "",
          defaultColor: "",
          defaultSize: ""
        });
        setPhoto("");
        setimage(null);
        
        router.refresh();
        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
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
          <h4 className="text-xs">Select Category</h4>
          <select
            value={formData?.categoryID}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, categoryID: e.target.value }))
            }
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

          <Input
            type="text"
            placeholder="Product name"
            value={formData?.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="bg-transparent"
          />
          <Input
            type="text"
            placeholder="product-slug"
            value={formData?.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="bg-transparent"
          />

          <Input
            type="number"
            placeholder="Price"
            value={formData?.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="bg-transparent"
          />
          <div>
            <Input
              className="bg-transparent"
              type="text"
              placeholder="Enter default Color"
              value={formData?.defaultColor}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  defaultColor: e.target.value,
                }))
              }
              id=""
            />
          </div>
          <select
            className="input"
            value={formData?.defaultSize}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, defaultSize: e.target.value }))
            }
            id="size"
          >
            <option value="">--- Select Default Size ---</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>

          <FileUploader
            updaloding={updaloding}
            handleCancelUpload={handleCancelUpload}
            image={image}
            setimage={setimage}
            handleOnFileUpload={handleOnFileUpload}
            _photo={_photo}
          />

          <Button
            disabled={loading}
            type="submit"
            size="sm"
            varient="outline"
            className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 uppercase"
          >
            {loading ? (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
             <path d="M12 2a10 10 0 1 0 10 10M12 2a10 10 0 1 1-10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
           </svg>
           
            ) : (
              "Add Product"
            )}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
