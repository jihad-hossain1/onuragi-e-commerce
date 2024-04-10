import Action from "@/components/Dashboard/productMange/action/Action";
import { getProducts } from "@/utils/fetch/product";
import {
  getAllCategory,
  getSubCategories,
} from "@/app/api/frontend/category/category";
import { Products } from "./Products";
import UpdateSub from "@/components/Dashboard/Category/UpdateSub";
import UpdateCat from "@/components/Dashboard/Category/updateCat";

const ProductManagerpage = async () => {
  const categories = await getAllCategory();
  const subcategories = await getSubCategories();
  const products = await getProducts();

  return (
    <main className="flex flex-col gap-5">
      <Action categories={categories} subcategories={subcategories} />

      {/* category section  */}
      <div className="flex flex-col gap-3">
        <h4>Total Categories: {categories?.length || 0} </h4>
        <div>
          {categories?.map((category, _ind) => (
            <h4 key={category?._id} className="flex items-center gap-2">
              <span>{_ind + 1}.</span>
              <span>{category?.name}</span>
              <UpdateCat name={category?.name} _id={category?._id} />
            </h4>
          ))}
        </div>
      </div>

      {/* sub-category section  */}
      <div className="flex flex-col gap-3">
        <h4>Total SubCategories: {subcategories?.length || 0} </h4>
        <div>
          {subcategories?.map((category, _ind) => (
            <h4 key={category?._id} className="flex items-center gap-2">
              <span>{_ind + 1}.</span>
              <span>{category?.name}</span>
              <UpdateSub name={category?.name} _id={category?._id} />
            </h4>
          ))}
        </div>
      </div>

      {/* product section  */}
      <Products products={products} categories={subcategories} />
    </main>
  );
};

export default ProductManagerpage;
