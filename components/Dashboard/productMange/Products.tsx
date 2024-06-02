"use client";

import Image from "next/image";
import LinkWithId from "./LinkWithId";
import { useProducts } from "@/hooks/productHook";
import AddProduct from "@/components/Dashboard/productMange/action/AddProduct";

type Product = {
  _id: number;
  name: string;
  image: string;
  categoryID: {
    name: string;
  };
  price: number;
  specification: string;
  details: string;
};

interface ProductsProps {
  products: Product[];
  subcategories: any[];
}

const Products: React.FC<ProductsProps> = ({ products, subcategories }) => {
  // const { products, loading, error } = useProducts();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="max-w-screen-xl m-auto p-4">
      <div className="overflow-x-auto">
        <section className="flex gap-2 items-center justify-between">
          <h4>Total Products: {products?.length || 0}</h4>
          <AddProduct categories={subcategories} />
        </section>
        <table className="w-full shadow-md  border m-auto border-gray-200  my-6">
          <thead>
            <tr className="bg-gray-100 dark:bg-zinc-800 ">
              <th className="py-3 px-6 text-left border-b ml-10">#</th>
              <th className="py-3 px-6 text-left  border-b">Image</th>
              <th className="py-3 px-6 text-left  border-b">Name</th>
              <th className="py-3 px-6 text-left  border-b">Category</th>
              <th className="py-3 px-6 text-left  border-b">Price</th>
              <th className="py-3 px-6 text-left  border-b ">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any, index: number) => (
              <tr key={product?._id}>
                <td className="py-3 px-6 text-left  border-b">{index + 1}</td>
                <td className="py-3 px-6 text-left  border-b">
                  <Image
                    src={product?.image}
                    alt="product iamge"
                    height={50}
                    width={50}
                    className="rounded-lg"
                  />
                </td>
                <td className="py-3 px-6 text-left  border-b">
                  {product?.name}
                </td>
                <td className="py-3 px-6 text-left  border-b">
                  {product?.categoryID?.name || "no data"}
                </td>
                <td className="py-3 px-6 text-left  border-b">
                  {product?.price}
                </td>
                <td className="py-3 px-6  border-b text-end">
                  <LinkWithId
                    productID={product?._id}
                    specification={product?.specification}
                    details={product?.details}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
