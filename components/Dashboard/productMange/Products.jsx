"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import LinkWithId from "./LinkWithId";
import React, { useEffect, useState } from "react";
import { getProducts } from "@/app/api/frontend/products/products";

export function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch(`/api/v1/products`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => console.log(err));
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h4>Total Products: {products ? products?.length || 0 : {}} </h4>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product?._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <Image
                  src={product?.image}
                  alt="prouct iamge"
                  height={50}
                  width={50}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell className="font-medium">{product?.name}</TableCell>
              <TableCell>{product?.categoryID?.name || "no data"}</TableCell>
              <TableCell className="">{product?.price}</TableCell>
              <TableCell className=" flex items-center gap-4">
                <LinkWithId productID={product?._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              Total {products ? products?.length || 0 : {}}
            </TableCell>
            <TableCell className="text-right">0</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
