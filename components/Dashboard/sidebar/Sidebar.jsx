import Link from "next/link";


const Sidebar = () => {
  return (
    <div className="bg-pink-100 dark:bg-pink-950 min-h-screen p-3 shadow">
      <div className="flex flex-col">
        <Link href={"/dashboard/productManager"}>Products</Link>
      </div>
    </div>
  );
};

export default Sidebar;
