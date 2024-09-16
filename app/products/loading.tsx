const SkeletonLoader = () => {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-gray-200 h-64 rounded-lg animate-pulse">
            <div className="h-3/5 bg-gray-300 rounded-t-lg"></div>
            <div className="h-2/5 p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default SkeletonLoader;