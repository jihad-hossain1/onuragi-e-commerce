"use client";

import uploadImageToCDN from "@/utils/uploadImageToCDN";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { FaImage, FaCloudUploadAlt } from "react-icons/fa";
import { MdFileUploadOff } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

export type ColorType = {
  _id: string;
  color: string;
  name: string;
  image?: string;
};

export type SizeType = {
  price: number;
  quantity: number;
  size: string;
  colors: ColorType[];
};

type Props = {
  sizes: SizeType[];
  setSizes: React.Dispatch<React.SetStateAction<SizeType[]>>;
};

const AddSizes: React.FC<Props> = ({ sizes, setSizes }) => {
  const [color, setColor] = React.useState({ color: "", name: "" });
  const [_colors, _setColors] = React.useState([]);
  const [image, setImage] = React.useState<File | null>(null);
  const [photo, setPhoto] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();

  const [imageUploadOpen, setImageUploadOpen] = React.useState<boolean>(false);

  const [sizeData, setSizeData] = React.useState({
    price: 0,
    quantity: 0,
    size: "",
  });

  function addSize() {
    if (!sizeData.size || !sizeData.price || !sizeData.quantity) {
      toast("Please fill all fields");
      return;
    } else if (
      sizeData.price < 0 ||
      sizeData.quantity < 0 ||
      sizeData.size == ""
    ) {
      toast("Please fill all fields");
      return;
    }

    const findSameSize = sizes.find((size) => size.size === sizeData.size);

    if (findSameSize) {
      toast("Size already exists");
      return;
    }

    setSizes([
      ...sizes,
      {
        ...sizeData,
        price: Number(sizeData.price),
        quantity: Number(sizeData.quantity),
        colors: _colors,
      },
    ]);
    setSizeData({
      price: 0,
      quantity: 0,
      size: "",
    });
  }

  function remove() {
    setSizes(sizes.slice(0, -1));
  }

  const handleOnFileUpload = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!image) {
        alert("Please select an image first");
        return;
      }
      const imageUrl = await uploadImageToCDN(image);
      setPhoto(imageUrl);
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  function addColor() {
    if (!color.color || !color.name) {
      toast("Please fill color fields");
      return;
    }
    const findSameColor = _colors.find(
      (color) => color.color.trim() === color.color.trim()
    );
    if (findSameColor) {
      toast("Color already exists");
      return;
    }

    _setColors([
      ..._colors,
      { color: color.color, name: color.name, image: photo },
    ]);
    setColor({ color: "", name: "" });
  }

  function removeColor() {
    _setColors(_colors.slice(0, -1));
  }
  return (
    <section>
      <main className="flex flex-col ">
        <section className="flex  gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="size">Size</label>

            <select
              className="input"
              name="size"
              value={sizeData.size}
              onChange={(e) =>
                setSizeData({ ...sizeData, size: e.target.value })
              }
              id="size"
            >
              <option value="" disabled>
                Select Size
              </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <input
              className="input"
              placeholder="Enter price"
              type="number"
              name="price"
              value={sizeData.price}
              onChange={(e) =>
                setSizeData({ ...sizeData, price: e.target.valueAsNumber })
              }
              id="price"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="input"
              placeholder="Enter quantity"
              value={sizeData.quantity}
              onChange={(e) =>
                setSizeData({ ...sizeData, quantity: e.target.valueAsNumber })
              }
            />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="color">Color</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="color"
              id="color"
              className="input"
              placeholder="Enter Color Name"
              value={color.name}
              onChange={(e) => setColor({ ...color, name: e.target.value })}
            />
            <div className="border p-1 w-full border-gray-300 my-0">
              <input
                type="color"
                name="color"
                id="color"
                className=" w-full"
                placeholder="Select Color"
                value={color.color}
                onChange={(e) => setColor({ ...color, color: e.target.value })}
              />
            </div>

            <button
              onClick={() => setImageUploadOpen(!imageUploadOpen)}
              type="button"
              className="border p-2 rounded-md text-xl shadow-sm"
            >
              {imageUploadOpen ? <MdFileUploadOff /> : <FaImage />}
            </button>
            <button onClick={addColor} className="btn w-fit" type="button">
              +
            </button>
          </div>
          {imageUploadOpen && (
            <>
              <form
                onSubmit={handleOnFileUpload}
                className="flex gap-2 items-center"
              >
                <input
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      setImage(imageFile);
                      setShowName(imageFile);
                      setShowImagePreview(URL.createObjectURL(imageFile));
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  id="file5"
                  type="file"
                />

                <button
                  className="border rounded-md p-2 shadow-sm text-xl border-gray-400 hover:shadow transition-all duration-200"
                  type="submit"
                  disabled={!image || loading}
                >
                  {loading ? (
                    <span className="">
                      <VscLoading className="animate-spin" />
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <span className="text-xs">Upload</span>{" "}
                      <FaCloudUploadAlt />
                    </span>
                  )}
                </button>
              </form>
            </>
          )}
          <div className="flex  gap-2">
            {showImagePreview && (
              <div className="mb-4 flex gap-4 ">
                <Image
                  width={200}
                  height={200}
                  src={showImagePreview as string}
                  alt="Selected"
                  className="w-20 h-20 rounded-md mb-2"
                />
                <div>
                  <p>File Name: {image?.name}</p>
                  <p>File Size: {(image?.size / 1024).toFixed(2)} KB</p>
                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={() => {
                        setShowImagePreview(null);
                        setImage(null);
                        setShowName(null);
                      }}
                      className="bg-red-500 text-white py-1 px-2 text-xs rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {photo && (
              <div className="flex gap-2">
                <Image
                  width={200}
                  height={200}
                  src={photo}
                  alt="Uploaded"
                  className="mt-2 w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <p>Uploaded Image:</p>
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="bg-red-500 text-white py-1 px-2 text-xs rounded"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={addSize}
            className="w-fit text-xs bg-gray-900 text-white py-1 px-2 rounded shadow hover:shadow-md"
          >
            Add Size
          </button>
        </div>
      </main>
      <div className="flex gap-2">
        {_colors?.map((color, index) => (
          <div className="flex gap-2" key={index}>
            <p>{color?.name}</p>
            <p
              style={{ backgroundColor: color?.color }}
              className="p-1 rounded shadow-sm"
            >
              {color?.color}
            </p>
            <Image src={color?.image} alt="color" width={20} height={20} />
            <button
              type="button"
              onClick={() => removeColor()}
              className=" text-xs text-pink-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {sizes?.map((size, index) => (
        <div key={index} className="flex gap-2">
          <p>Size: {size?.size}</p>
          <p>Price: {size?.price}</p>
          <p>Quantity: {size?.quantity}</p>
          <p>
            Color:{" "}
            {size?.colors?.map((color, index) => (
              <span key={index}>{color?.color}</span>
            ))}
          </p>
          <button onClick={() => remove()} className="text-xs text-pink-600">
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default AddSizes;
