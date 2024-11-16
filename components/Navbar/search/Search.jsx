"use client";

import React from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Search = () => {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M10.5 3a7.5 7.5 0 1 0 7.5 7.5 7.51 7.51 0 0 0-7.5-7.5zM10.5 14a3.5 3.5 0 1 1 3.5-3.5 3.51 3.51 0 0 1-3.5 3.5zm6.7 4.1l3.4 3.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

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
