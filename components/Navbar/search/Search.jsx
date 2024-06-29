"use client";

import React from "react";
import { SlMagnifier } from "react-icons/sl";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Search = () => {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  // Debounced fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchProducts = React.useCallback(
    debounce(async (term) => {
      if (term) {
        const res = await fetch(
          `/api/v1/products/products-search?searchTerm=${term}`
        );
        const data = await res.json();
        setProducts(data?.data);
      } else {
        setProducts([]);
      }
    }, 300), // 300ms debounce delay
    []
  );

  React.useEffect(() => {
    debouncedFetchProducts(searchTerm);
  }, [searchTerm, debouncedFetchProducts]);

  const handleClick = (slug, id) => {
    router.push(`/products/${slug}=${id}`);
  };
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <SlMagnifier className="text-[18px] lg:text-[27px]" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Search Your Query</SheetTitle>
            <SheetDescription>
              Make your search easy and fast product name or product code or
              category name.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="overflow-y-scroll flex flex-col gap-2">
            {products?.map((product) => (
              <button
                onClick={() => handleClick(product?.slug, product?._id)}
                key={product?._id}
                className="flex gap-2 items-center justify-between border-b border-gray-300 last:border-none pb-2"
              >
                <h4>{product?.name}</h4>
                <p>{product?.price}</p>
                <Image
                  src={product?.image}
                  width={60}
                  height={60}
                  alt="product"
                />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Search;
// "use client";

// import React from "react";
// import { SlMagnifier } from "react-icons/sl";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// const Search = () => {
//   const [products, setProducts] = React.useState([]);
//   console.log("🚀 ~ Search ~ products:", products);
//   const [searchTerm, setSearchTerm] = React.useState("");

//   React.useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch(
//         `/api/v1/products/products-search?searchTerm=${searchTerm}`
//       );
//       const data = await res.json();
//       setProducts(data?.data);
//     };

//     fetchProducts();
//   }, [searchTerm]);
//   return (
//     <>
//       <Sheet>
//         <SheetTrigger asChild>
//           <SlMagnifier className="text-[18px] lg:text-[27px]" />
//         </SheetTrigger>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>Search Your Query</SheetTitle>
//             <SheetDescription>
//               Make your search easy and fast product name or product code or
//               category name.
//             </SheetDescription>
//           </SheetHeader>
//           <div className="grid gap-4 py-4">
//             <Input
//               id="name"
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div>
//             {products?.map((product) => (
//               <div key={product?._id}>
//                 <h1>{product?.name}</h1>
//               </div>
//             ))}
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default Search;
