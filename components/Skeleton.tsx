export const Skeleton = ({ className }) => (
    <div className="group relative border border-gray-100 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 max-sm:p-1 md:p-4 pb-4 bg-white hover:bg-gray-50">
    {/* Skeleton for Product Link */}
    <div className="block relative overflow-hidden">
      {/* Skeleton Image */}
      <div className="bg-gray-200 rounded-md w-full h-[150px] lg:max-h-[150px] max-sm:max-h-[100px] animate-pulse"></div>
      {/* Skeleton Hover Overlay */}
      <div className="absolute inset-0 bg-gray-300 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
        <span className="text-transparent bg-gray-200 rounded px-2 py-1 animate-pulse">Quick View</span>
      </div>
    </div>
  
    {/* Skeleton Product Info */}
    <h4 className="bg-gray-200 h-4 mt-2 max-sm:h-3 rounded w-3/4 animate-pulse"></h4>
  
    {/* Skeleton Product Price */}
    <div className="flex items-center justify-between mt-2">
      <h4 className="bg-gray-200 h-4 w-1/4 rounded animate-pulse"></h4>
  
      {/* Skeleton Add to Cart Button */}
      <div className="bg-gray-200 h-8 w-16 rounded animate-pulse"></div>
    </div>
  </div>
  );