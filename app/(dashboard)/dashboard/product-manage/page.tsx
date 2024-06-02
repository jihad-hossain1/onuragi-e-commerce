// import { getProducts } from "@/app/api/frontend/products/products";
import { fetchProducts } from "@/utils/products/fetchProducts";
import Products from "../../../../components/Dashboard/productMange/Products";
import { getSubCategories } from "../../../api/frontend/category/category";


const ProductManagerpage = async () => {
  const products = await fetchProducts();

  const subcategories = await getSubCategories();
  return (
    <>
      <Products products={products} subcategories={subcategories} />
    </>
  );
};

export default ProductManagerpage;
