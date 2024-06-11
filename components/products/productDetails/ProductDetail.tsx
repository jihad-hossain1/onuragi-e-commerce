"use client";

import Image from "next/image";
import React from "react";

const ProductDetail = ({ product }) => {
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [selectedColor, setSelectedColor] = React.useState("PURPLE");
    const [selectedSize, setSelectedSize] = React.useState("90");

    const images = [

        "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1717657188/images_preset/dxqpdbk5ini5h1d5qkyg.png",
        "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1717910386/images_preset/sr7ptqtc2jh5spxmawm4.png",
        "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1717657188/images_preset/dxqpdbk5ini5h1d5qkyg.png",
        "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1717910386/images_preset/sr7ptqtc2jh5spxmawm4.png",
    ];

    const colors = ["Pink", "PURPLE", "green"];
    const sizes = ["110", "120", "130", "90", "100"];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
                <div className="lg:w-1/2 p-6">
                    <div className="relative">
                        <Image
                            src={images[selectedImage]}
                            alt="Product"
                            className="w-full h-auto"
                            width={500}
                            height={500}
                        />
                        <div className="flex space-x-2 mt-2">
                            {images.map((image, index) => (
                                <Image
                                    width={50}
                                    height={50}
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-16 h-16 object-cover cursor-pointer ${index === selectedImage ? "border-2 border-indigo-500" : ""
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 p-6">
                    <h1 className="text-2xl font-bold mb-2 uppercase">{product?.name}</h1>
                    <div className="text-yellow-500 mb-2">{product?.rating || 0} Ratings</div>
                    <div className="text-gray-700 mb-4">
                        <span className="line-through text-gray-400">৳ {product?.price}</span>
                        <span className="text-red-500 text-2xl">৳ {product?.price}</span>
                        <span className="text-green-500 ml-2">-{product?.discount || 0}%</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Color</label>
                        <div className="flex space-x-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    className={`py-2 px-4 rounded ${selectedColor === color
                                        ? "bg-indigo-500 text-white"
                                        : "bg-gray-200"
                                        }`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2"> Size</label>
                        <div className="flex space-x-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`py-2 px-4 rounded ${selectedSize === size
                                        ? "border-2 border-pink-500"
                                        : "border border-pink-200"
                                        }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">{product?.quantity || 0}</label>
                        <div className="flex items-center space-x-2">
                            <button className="py-2 px-4 bg-gray-200 rounded">-</button>
                            <span>1</span>
                            <button className="py-2 px-4 bg-gray-200 rounded">+</button>
                            <span className="text-gray-500">Only 2 items left</span>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button className="flex-1 py-3 bg-pink-500 text-white rounded">
                            Buy Now
                        </button>
                        <button className="flex-1 py-3 bg-orange-500 text-white rounded">
                            Add to Cart
                        </button>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-500">Delivery</p>
                        {/* <p>Free Delivery 14 Jul - 23 Jul</p> */}
                        <p className="text-gray-500">Cash on Delivery Available</p>
                        <p className="text-gray-500">14 days free & easy return</p>
                        {/* <p className="text-gray-500">Warranty not available</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
