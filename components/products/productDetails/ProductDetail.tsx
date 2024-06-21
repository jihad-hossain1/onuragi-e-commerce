"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddToCart from "../addToCart";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleAddToCart } from "@/utils/handleAddToCart";
import { useSession } from "next-auth/react";

interface ProductDetailProps {
  product: {
    _id: string;
    name: string;
    image: string;
    rating: number;
    price: number;
    discount: number;
    quantity: number;
  };
  images: string[];
  details: {
    sizes: {
      size: string;
      price: number;
      quantity: number;
      colors: { name: string; color: string; image: string }[];
    }[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, details }) => {
  const { data: session, status } = useSession();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [cardQuantity, setCardQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState(details?.sizes || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableColors, setAvailableColors] = useState<
    { name: string; color: string; image: string }[]
  >([]);
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [currentQuantity, setCurrentQuantity] = useState(product.quantity);

  const router = useRouter();

  const initialColors =
    Array.from(
      new Set(
        details?.sizes.flatMap((size) => size.colors.map((color) => color.name))
      )
    ).map((name) =>
      details?.sizes
        .flatMap((size) => size.colors)
        .find((color) => color.name === name)
    ) || [];

  const initialImages = [
    product.image,
    ...initialColors.map((color) => color?.image ?? ""),
  ];

  const handleQuantityIncrement = () => {
    if (cardQuantity >= currentQuantity) {
      toast(`Only ${currentQuantity} left in stock`);
    } else {
      setCardQuantity(cardQuantity + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (cardQuantity > 1) {
      setCardQuantity(cardQuantity - 1);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    const colorIndex = initialColors.findIndex(
      (color) => color?.name === colorName
    );
    setSelectedImageIndex(colorIndex + 1); // +1 to account for product.image at index 0
  };

  const handleSizeSelect = (size: string) => {
    const selectedSizeDetails = details?.sizes.find((s) => s.size === size);
    if (selectedSizeDetails) {
      setSelectedSize(size);
      setCurrentPrice(selectedSizeDetails.price);
      setCurrentQuantity(selectedSizeDetails.quantity);
      setAvailableColors(selectedSizeDetails.colors);
      setCardQuantity(1);
      if (selectedSizeDetails.colors.length > 0) {
        handleColorSelect(selectedSizeDetails.colors[0].name);
      } else {
        setSelectedColor(undefined);
        setSelectedImageIndex(0); // Reset to main product image if no colors available
      }
    }
  };

  const handleAddToCartClick =async () => {
  await handleAddToCart(
    product,
    selectedSize,
    selectedColor,
    cardQuantity,
    currentPrice,
    isLoggedIn
  );
  };

  useEffect(() => {
    if(status === "authenticated"){
      setIsLoggedIn(true);
    }
  },[status])


  const handleBuyNow = () => {
    // Handle buying now logic here
    console.log(
      `size=${selectedSize}&color=${selectedColor}&quantity=${cardQuantity}&price=${currentPrice}`
    );

    // set size,color,quantity,price on local storage
    localStorage.setItem("buyNowInfo", JSON.stringify({ size: selectedSize, color: selectedColor, quantity: cardQuantity, price: currentPrice }));


    router.push(
      `/customer-dashboard/cart/buy-now/${product._id}`
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        <div className="lg:w-1/2 p-6">
          <div className="relative">
            <Image
              src={initialImages[selectedImageIndex]}
              alt="Product"
              className="w-full md:w-[700px] h-full rounded-md"
              width={500}
              height={500}
            />
            <div className="flex space-x-2 mt-2 overflow-auto scrollbar-hide">
              {initialImages.map((image, index) => (
                <Image
                  width={50}
                  height={50}
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 object-cover cursor-pointer ${
                    index === selectedImageIndex
                      ? "border border-indigo-500"
                      : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-2 uppercase">{product.name}</h1>
          <div className="text-yellow-500 mb-2">
            {product.rating || 0} Ratings
          </div>
          <div className="text-gray-700 mb-4">
            <span className="line-through text-gray-400">
              ৳ {product.price}
            </span>
            <span className="text-red-500 text-2xl">৳ {currentPrice}</span>
            <span className="text-green-500 ml-2">
              -{product.discount || 0}%
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Size</label>
            <div className="flex space-x-2">
              {availableSizes.map((size) => (
                <button
                  key={size.size}
                  className={`py-2 px-4 rounded ${
                    selectedSize === size.size
                      ? "border-2 border-pink-500"
                      : "border border-pink-200"
                  }`}
                  onClick={() => handleSizeSelect(size.size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex space-x-2">
              {availableColors.map((color) => (
                <div
                  key={color.name}
                  onClick={() => handleColorSelect(color.name)}
                  className="cursor-pointer flex flex-col gap-1"
                >
                  <button
                    style={{ backgroundColor: color.color }}
                    className="py-2 px-4 rounded"
                  ></button>
                  <button className="text-xs">{color.name}</button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center space-x-2">
              <button
                className="py-1 px-3 bg-gray-200 rounded"
                onClick={handleQuantityDecrement}
              >
                -
              </button>
              <span>{cardQuantity}</span>
              <button
                className="py-1 px-3 bg-gray-200 rounded"
                onClick={handleQuantityIncrement}
              >
                +
              </button>
              {currentQuantity < 5 && (
                <p className="text-gray-500">Only {currentQuantity} left</p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={handleBuyNow} className="btn">
              Buy Now
            </button>
            <button
              onClick={handleAddToCartClick}
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-6">
            <p className="text-gray-500">Delivery</p>
            <p className="text-gray-500">Cash on Delivery Available</p>
            <p className="text-gray-500">14 days free & easy return</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

// "use client";

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import AddToCart from "../addToCart";
// import Link from "next/link";
// import { toast } from "sonner";

// interface ProductDetailProps {
//   product: {
//     _id: string;
//     name: string;
//     image: string;
//     rating: number;
//     price: number;
//     discount: number;
//     quantity: number;
//   };
//   images: string[];
//   details: {
//     sizes: {
//       size: string;
//       price: number;
//       quantity: number;
//       colors: { name: string; color: string; image: string }[];
//     }[];
//   };
// }

// const ProductDetail: React.FC<ProductDetailProps> = ({ product, details }) => {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | undefined>();
//   const [selectedSize, setSelectedSize] = useState<string | undefined>();
//   const [cardQuantity, setCardQuantity] = useState(1);
//   const [selectedEvent, setSelectedEvent] = useState<string | undefined>();
//   const [availableSizes, setAvailableSizes] = useState(details?.sizes || []);
//   const [availableColors, setAvailableColors] = useState<
//     { name: string; color: string; image: string }[]
//   >([]);
//   const [currentPrice, setCurrentPrice] = useState(product.price);
//   const [currentQuantity, setCurrentQuantity] = useState(product.quantity);

//   const initialColors =
//     Array.from(
//       new Set(
//         details?.sizes.flatMap((size) => size.colors.map((color) => color.name))
//       )
//     ).map((name) =>
//       details?.sizes
//         .flatMap((size) => size.colors)
//         .find((color) => color.name === name)
//     ) || [];

//   const initialImages = [
//     product.image,
//     ...initialColors.map((color) => color?.image ?? ""),
//   ];

//   const handleQuantityIncrement = () => {
//     if (cardQuantity >= currentQuantity) {
//       toast(`Only ${currentQuantity} left in stock`);
//     } else {
//       setCardQuantity(cardQuantity + 1);
//     }
//   };

//   const handleQuantityDecrement = () => {
//     if (cardQuantity > 1) {
//       setCardQuantity(cardQuantity - 1);
//     }
//   };

//   const handleImageClick = (index: number) => {
//     setSelectedImageIndex(index);
//   };

//   const handleColorSelect = (colorName: string) => {
//     setSelectedColor(colorName);
//     const colorIndex = initialColors.findIndex(
//       (color) => color?.name === colorName
//     );
//     setSelectedImageIndex(colorIndex + 1); // +1 to account for product.image at index 0
//   };

//   const handleSizeSelect = (size: string) => {
//     const selectedSizeDetails = details?.sizes.find((s) => s.size === size);
//     if (selectedSizeDetails) {
//       setSelectedSize(size);
//       setCurrentPrice(selectedSizeDetails.price);
//       setCurrentQuantity(selectedSizeDetails.quantity);
//       setAvailableColors(selectedSizeDetails.colors);
//       setCardQuantity(1);
//       if (selectedSizeDetails.colors.length > 0) {
//         handleColorSelect(selectedSizeDetails.colors[0].name);
//       } else {
//         setSelectedColor(undefined);
//         setSelectedImageIndex(0); // Reset to main product image if no colors available
//       }

//       // setSelectedEvent(
//       //   `size=${size}&=color${selectedColor}&quantity=${cardQuantity}`
//       // );
//       console.log(
//         `Selected size: ${size}, color: ${selectedColor} , cardQuantity: ${cardQuantity}`
//       );
//     }
//   };

//   // console.log(selectedEvent);

//   return (
//     <div className="max-w-screen-xl mx-auto p-6">
//       <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="lg:w-1/2 p-6">
//           <div className="relative">
//             <Image
//               src={initialImages[selectedImageIndex]}
//               alt="Product"
//               className="w-full md:w-[700px] h-full rounded-md"
//               width={500}
//               height={500}
//             />
//             <div className="flex space-x-2 mt-2 overflow-auto scrollbar-hide">
//               {initialImages.map((image, index) => (
//                 <Image
//                   width={50}
//                   height={50}
//                   key={index}
//                   src={image}
//                   alt={`Thumbnail ${index}`}
//                   className={`w-16 h-16 object-cover cursor-pointer ${
//                     index === selectedImageIndex
//                       ? "border border-indigo-500"
//                       : ""
//                   }`}
//                   onClick={() => handleImageClick(index)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="lg:w-1/2 p-6">
//           <h1 className="text-2xl font-bold mb-2 uppercase">{product.name}</h1>
//           <div className="text-yellow-500 mb-2">
//             {product.rating || 0} Ratings
//           </div>
//           <div className="text-gray-700 mb-4">
//             <span className="line-through text-gray-400">
//               ৳ {product.price}
//             </span>
//             <span className="text-red-500 text-2xl">৳ {currentPrice}</span>
//             <span className="text-green-500 ml-2">
//               -{product.discount || 0}%
//             </span>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Size</label>
//             <div className="flex space-x-2">
//               {availableSizes.map((size) => (
//                 <button
//                   key={size.size}
//                   className={`py-2 px-4 rounded ${
//                     selectedSize === size.size
//                       ? "border-2 border-pink-500"
//                       : "border border-pink-200"
//                   }`}
//                   onClick={() => handleSizeSelect(size.size)}
//                 >
//                   {size.size}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="mb-4">
//             <div className="flex space-x-2">
//               {availableColors.map((color) => (
//                 <div
//                   key={color.name}
//                   onClick={() => handleColorSelect(color.name)}
//                   className="cursor-pointer flex flex-col gap-1"
//                 >
//                   <button
//                     style={{ backgroundColor: color.color }}
//                     className="py-2 px-4 rounded"
//                   ></button>
//                   <button className="text-xs">{color.name}</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Quantity</label>
//             <div className="flex items-center space-x-2">
//               <button
//                 className="py-1 px-3 bg-gray-200 rounded"
//                 onClick={handleQuantityDecrement}
//               >
//                 -
//               </button>
//               <span>{cardQuantity}</span>
//               <button
//                 className="py-1 px-3 bg-gray-200 rounded"
//                 onClick={handleQuantityIncrement}
//               >
//                 +
//               </button>
//               {currentQuantity < 5 && (
//                 <p className="text-gray-500">Only {currentQuantity} left</p>
//               )}
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <Link
//               href={`/customer-dashboard/cart/buy-now/${product._id}`}
//               className="btn"
//             >
//               Buy Now
//             </Link>
//             <AddToCart id={product._id} style="" />
//           </div>
//           <div className="mt-6">
//             <p className="text-gray-500">Delivery</p>
//             {/* <p>Free Delivery 14 Jul - 23 Jul</p> */}
//             <p className="text-gray-500">Cash on Delivery Available</p>
//             <p className="text-gray-500">14 days free & easy return</p>
//             {/* <p className="text-gray-500">Warranty not available</p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

