import Link from "next/link";

export const SiteLogo = () => {
  return (
    <Link href={"/"}>
      <div className="font-bold  lg:text-2xl flex">
        Onuragi
        <div className="h-[5px] w-[5px] lg:h-2 lg:w-2 rounded-full bg-pink-400 mt-[14px] lg:mt-4" />
      </div>
    </Link>
  );
};
