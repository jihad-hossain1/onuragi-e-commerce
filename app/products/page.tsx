"use client";

import Product from "@/components/products/Product";
import React, { useCallback, useEffect, useState } from "react";

// Import the SkeletonLoader component
const PaginatedProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [limit, setLimit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts =useCallback( async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/v1/products/paginated-products?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&sortBy=createdAt&sortOrder=desc`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setProducts(data?.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchTerm, limit]);

  // Trigger fetchProducts when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle search term change to trigger a fetch
  useEffect(() => {
    setPage(1); // Reset to page 1 when search term changes
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 mt-3 pb-10">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <div className="flex justify-center mb-4">
        <input
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2 border border-pink-300 focus:outline-none rounded"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <SkeletonLoader />} {/* Show skeleton loader while loading */}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products?.map((product) => (
            <Product key={product?._id} product={product} />
          ))}
        </div>
      )}

      {products?.length > 0 && (
        <section className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex gap-2">
            <select
              className="border px-4 py-2 rounded border-gray-200 focus:outline-none"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value="" disabled>
                Show Products
              </option>
              {[12, 24, 36].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="border border-gray-200 py-2 px-4 rounded shadow hover:shadow-md transition-all duration-300 text-center"
            >
              Previous
            </button>
            <span className="border border-gray-200 py-2 px-4 rounded shadow text-center">
              Page {page}
            </span>
            <button
              disabled={products?.length < pageSize}
              onClick={() => setPage(page + 1)}
              className="border border-gray-200 py-2 px-4 rounded shadow hover:shadow-md transition-all duration-300 text-center"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

// SkeletonLoader component
const SkeletonLoader = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-gray-200 h-64 rounded-lg animate-pulse">
          <div className="h-3/5 bg-gray-300 rounded-t-lg"></div>
          <div className="h-2/5 p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaginatedProduct;
