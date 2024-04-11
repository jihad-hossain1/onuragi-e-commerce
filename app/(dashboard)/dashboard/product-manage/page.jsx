import { getProducts } from "@/app/api/frontend/products/products";
import { Products } from "./Products";
import { getSubCategories } from "../../../api/frontend/category/category";
import AddProduct from "@/components/Dashboard/productMange/action/AddProduct";

const ProductManagerpage = async () => {
  const products = await getProducts();
  const subcategories = await getSubCategories();
  return (
    <>
      <AddProduct categories={subcategories} />
      <Products products={products} categories={subcategories} />
    </>
  );
};

export default ProductManagerpage;
