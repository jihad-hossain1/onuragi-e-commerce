import { getProducts } from "@/app/api/frontend/products/products";
import { Products } from "./Products";
import { getSubCategories } from "../../../api/frontend/category/category";
import AddProduct from "@/components/Dashboard/productMange/action/AddProduct";
import Link from "next/link";

const ProductManagerpage = async () => {
  const products = await getProducts();
  const subcategories = await getSubCategories();
  return (
    <>
      <div className="flex items-center gap-4">
        <AddProduct categories={subcategories} />
        <Link
          href={"/dashboard/product-manage/add-product-details"}
          className="bg-pink-600 text-white py-2 px-4 rounded-md text-sm"
        >
          Add Details
        </Link>
        <Link
          href={"/dashboard/product-manage/addproduct-image"}
          className="bg-pink-600 text-white py-2 px-4 rounded-md text-sm"
        >
          Add Images
        </Link>
      </div>
      <Products products={products} categories={subcategories} />
    </>
  );
};

export default ProductManagerpage;
