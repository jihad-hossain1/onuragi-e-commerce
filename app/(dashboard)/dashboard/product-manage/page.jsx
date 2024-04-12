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
      <AddProduct categories={subcategories} />
      <Link
        href={"/dashboard/product-manage/addproduct-image"}
        className="text-sm btn"
      >
        Add Product Details
      </Link>
      <Products products={products} categories={subcategories} />
    </>
  );
};

export default ProductManagerpage;
