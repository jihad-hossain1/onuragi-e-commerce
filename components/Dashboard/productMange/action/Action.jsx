import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";

const Action = () => {
  return (
    <div className="flex gap-5 items-center">
      <AddProduct />
      <AddCategory />
      <AddSubCategory />
    </div>
  );
};

export default Action;
