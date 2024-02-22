import Action from "@/components/Dashboard/productMange/action/Action";
import { getAllCategory, getSubCategories } from "@/utils/fetch/product";

const ProductManagerpage = async () => {
  const categories = await getAllCategory();
  const subcategories = await getSubCategories();

  return (
    <main className="flex flex-col gap-5">
      <Action categories={categories} />
      <>
        {/* category section  */}
        <div className="flex flex-col gap-3">
          <h4>Total Categories: {categories?.length || 0} </h4>
          <div>
            {categories?.map((category, _ind) => (
              <h4 key={category?._id} className="flex items-center gap-2">
                <span>{_ind + 1}.</span>
                <span>{category?.name}</span>
              </h4>
            ))}
          </div>
        </div>
      </>
      <>
        {/* sub-category section  */}
        <div className="flex flex-col gap-3">
          <h4>Total SubCategories: {subcategories?.length || 0} </h4>
          <div>
            {subcategories?.map((category, _ind) => (
              <h4 key={category?._id} className="flex items-center gap-2">
                <span>{_ind + 1}.</span>
                <span>{category?.name}</span>
              </h4>
            ))}
          </div>
        </div>
      </>
    </main>
  );
};

export default ProductManagerpage;
