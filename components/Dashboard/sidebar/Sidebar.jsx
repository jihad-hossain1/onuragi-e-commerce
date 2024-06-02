import Link from "next/link";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className=" bg-zinc-50 dark:bg-zinc-800 md:h-screen p-3 shadow border-r border-zinc-600 md:overflow-auto">
      <div className="flex flex-col gap-4 text-nowrap">
        <Link
          href={"/dashboard/product-manage"}
          className="flex gap-2 items-center"
        >
          <IoSettings size={20} />
          <span className="text-sm">Products</span>
        </Link>
        <Link
          href={"/dashboard/category-manage"}
          className="flex gap-2 items-center"
        >
          <IoSettings size={20} />
          <span className="text-sm">Category</span>
        </Link>
        <Link
          href={"/dashboard/sub-category-manage"}
          className="flex gap-2 items-center"
        >
          <IoSettings size={20} />
          <span className="text-sm">Sub Category</span>
        </Link>
        <Link href={"/dashboard/banners"} className="flex gap-2 items-center">
          <IoSettings size={20} />
          <span className="text-sm">Banner</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
