import Action from "@/components/Dashboard/productMange/action/Action";
import { getAllCategory } from "@/utils/fetch/product";

const ProductManagerpage = async () => {
  const categories = await getAllCategory();

  return (
    <main className="flex flex-col gap-5">
      <Action />
      <div>
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
      </div>
    </main>
  );
};

export default ProductManagerpage;
