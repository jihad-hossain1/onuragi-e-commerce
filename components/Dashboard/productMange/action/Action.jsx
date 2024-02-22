import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";

const Action = ({ categories }) => {
  return (
    <div className="flex gap-5 items-center">
      <AddProduct categories={categories} />
      <AddCategory />
      <AddSubCategory categories={categories} />
    </div>
  );
};

export default Action;
