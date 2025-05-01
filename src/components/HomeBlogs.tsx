import { useEffect } from "react";
import useHomeBlogStore from "../store/home";
import CategoryBlogs from "./CategoryBlogs";

const HomeBlogs = () => {
  const { blogs, getBlogs, loadingStateBlogs, getPopularBlogs, popularBlogs } = useHomeBlogStore();

  useEffect(() => {
    getBlogs();
    getPopularBlogs();
  }, [getBlogs]);

  const travelBlogs = blogs.filter((blog) => blog.category === "travel");
  const treavelBlogs3Blogs = travelBlogs.slice(0, 3);

  const technologyBlogs = blogs.filter(
    (blog) => blog.category === "technology"
  );
  const foodBlogs = blogs.filter((blog) => blog.category === "food");
  const lifestyleBlogs = blogs.filter((blog) => blog.category === "lifestyle");

  const technologyBlogs3Blogs = technologyBlogs.slice(0, 3);
  const foodBlogs3Blogs = foodBlogs.slice(0, 3);
  const lifestyleBlogs3Blogs = lifestyleBlogs.slice(0, 3);

  return (
    <div className="p-6">

      {/* Popular Blogs */}
      <CategoryBlogs category={"Popular"} blogs={popularBlogs} showButton={false} />
      
      {/* Travel Blogs */}
      <CategoryBlogs category={"Travel"} blogs={treavelBlogs3Blogs} />
      
      {/* Technology Blogs */}
      <CategoryBlogs category={"Technology"} blogs={technologyBlogs3Blogs} />

      {/* Food Blogs */}
      <CategoryBlogs category={"Food"} blogs={foodBlogs3Blogs} />

      {/* Lifestyle Blogs */}
      <CategoryBlogs category={"Lifestyle"} blogs={lifestyleBlogs3Blogs} />

      {/* Loading State */}
      {loadingStateBlogs ? (
        <div className="flex flex-col items-center justify-center w-full p-4">
          <p className="text-gray-500 w-full text-center">
            <span className="loading loading-spinner loading-xl"></span>
          </p>
        </div>
      ) : blogs.length === 0 && !loadingStateBlogs ? (
        <div className="flex flex-col items-center justify-center w-full p-4">
          <p className="text-gray-500 w-full text-center">
            No blogs available.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default HomeBlogs;
