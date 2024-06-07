'use client'

import SingleProduct from '@/components/products/SingleProduct'
import React, { useEffect } from 'react'

const PaginatedProduct = () => {
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)
    const [limit, setLimit] = React.useState(10)
    const [searchTerm, setSearchTerm] = React.useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/v1/products/paginated-products?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&sortBy=createdAt&sortOrder=desc`)
            const data = await res.json()
            setProducts(data?.data)
        }

        fetchProducts();
    }, [limit, page, pageSize, searchTerm])
    return (
        <div className='max-w-7xl mx-auto flex flex-col gap-3'>
            <h1 className="text-3xl font-bold text-center">Products</h1>

            <div>
                {/* <button onClick={() => setLimit(limit + 10)}>Load More</button> */}
            </div>
            <div className='flex justify-center '>
                <input className='w-1/3 p-2 border border-pink-300 focus:outline-none' type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {/* <input type="number" value={page} onChange={(e) => setPage(parseInt(e.target.value))} />
            <input type="number" value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))} /> */}

            <div className="" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
                {
                    products?.map((product: any) => (
                        <SingleProduct key={product?._id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default PaginatedProduct