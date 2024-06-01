// import { getProducts } from "@/app/api/frontend/products/products";
import { fetchProducts } from "@/utils/products/fetchProducts";
import Products from "../../../../components/Dashboard/productMange/Products";
import { getSubCategories } from "../../../api/frontend/category/category";
import AddProduct from "@/components/Dashboard/productMange/action/AddProduct";

const ProductManagerpage = async () => {
  const products = await fetchProducts();

  const subcategories = await getSubCategories();
  return (
    <>
      <AddProduct categories={subcategories} />
      <Products products={products} />
    </>
  );
};

export default ProductManagerpage;
