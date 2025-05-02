const HomePageCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="card bg-base-100 w-full border border-base-200 rounded-2xl shadow-lg indicator"
        >
          <span className="skeleton indicator-item badge bg-gray-300 w-16"></span>
          <div className="flex w-full flex-col gap-4 py-3 ">
            <div className="skeleton h-32 w-full bg-gray-300"></div>
            <div className="skeleton h-4 w-28 bg-gray-300"></div>
            <div className="skeleton h-4 w-full bg-gray-300"></div>
            <div className="skeleton h-4 w-full bg-gray-300"></div>
            <div className="flex justify-end">
              <button className="skeleton w-28 bg-gray-300 btn border-none"></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageCardsSkeleton;
