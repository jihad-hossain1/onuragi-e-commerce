import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";

const Action = ({ categories, subcategories }) => {
  return (
    <div className="flex gap-5 items-center">
      <AddProduct categories={subcategories} />
      <AddCategory />
      <AddSubCategory categories={categories} />
    </div>
  );
};

export default Action;
