"use client";

import SingleProduct from "@/components/products/SingleProduct";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect } from "react";

const PaginatedProduct = () => {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [limit, setLimit] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/v1/products/paginated-products?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&sortBy=createdAt&sortOrder=desc`
      );
      const data = await res.json();
      setProducts(data?.data);
    };

    fetchProducts();
  }, [limit, page, pageSize, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-3 px-2 mt-3">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <div className="flex justify-center ">
        <input
          className="max-sm:w-11/12 md:w-1/3 p-2 border border-pink-300 focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-2 md:gap-4"
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        //   gap: "1rem",
        // }}
      >
        {products?.map((product: any) => (
          <SingleProduct key={product?._id} product={product} />
        ))}
      </div>

      {/* pagination button  */}

      <section className="flex justify-end ">
        {/* list of page  */}
        <div className="flex gap-2 md:flex-row flex-col">
          <select
            className="border px-10 py-2 rounded border-gray-200 "
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={""} disabled>
              Show Products
            </option>
            {[12, 24, 36].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className=" border border-gray-200  py-2 rounded shadow hover:shadow-md transition-all duration-300  px-4 text-center"
          >
            Previous
          </button>
          {/* show current page number  */}
          <h4 className="border border-gray-200  py-2 rounded shadow hover:shadow-md transition-all duration-300  px-4 text-center">
            {page}
          </h4>

          <button
            disabled={products?.length < pageSize}
            onClick={() => setPage(page + 1)}
            className=" border border-gray-200  py-2 rounded shadow hover:shadow-md transition-all duration-300  px-4 text-center"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default PaginatedProduct;
