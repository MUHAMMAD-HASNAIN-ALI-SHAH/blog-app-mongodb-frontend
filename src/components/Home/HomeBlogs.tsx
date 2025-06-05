import { useEffect } from "react";
import useHomeBlogStore from "../../store/home";
import CategoryBlogs from "./CategoryBlogs";
import HomePageCardsSkeleton from "../skeleton/HomePageCardsSkeleton";

const HomeBlogs = () => {
  const {
    blogs,
    getBlogs,
    getPopularBlogs,
    getPopularBlogLoader,
    loadingStateBlogs,
    popularBlogs,
  } = useHomeBlogStore();

  useEffect(() => {
    getBlogs();
    getPopularBlogs();
  }, [getBlogs]);

  const travelBlogs = blogs.filter((blog) => blog.category === "travel").slice(0, 3);
  const technologyBlogs = blogs.filter((blog) => blog.category === "technology").slice(0, 3);
  const foodBlogs = blogs.filter((blog) => blog.category === "food").slice(0, 3);
  const lifestyleBlogs = blogs.filter((blog) => blog.category === "lifestyle").slice(0, 3);

  const noBlogsAvailable = !loadingStateBlogs && blogs.length === 0;

  return (
    <div className="p-6">
      {/* No Blogs Message */}
      {noBlogsAvailable && (
        <p className="text-gray-500 w-full text-center">No blogs available.</p>
      )}

      {/* Popular Blogs */}
      {getPopularBlogLoader ? (
        <HomePageCardsSkeleton />
      ) : popularBlogs.length > 0 && (
        <CategoryBlogs category={"Popular"} blogs={popularBlogs} showButton={false} />
      )}

      {/* Travel Blogs */}
      {!loadingStateBlogs && travelBlogs.length > 0 && (
        <CategoryBlogs category={"Travel"} blogs={travelBlogs} />
      )}

      {/* Technology Blogs */}
      {!loadingStateBlogs && technologyBlogs.length > 0 && (
        <CategoryBlogs category={"Technology"} blogs={technologyBlogs} />
      )}

      {/* Food Blogs */}
      {!loadingStateBlogs && foodBlogs.length > 0 && (
        <CategoryBlogs category={"Food"} blogs={foodBlogs} />
      )}

      {/* Lifestyle Blogs */}
      {!loadingStateBlogs && lifestyleBlogs.length > 0 && (
        <CategoryBlogs category={"Lifestyle"} blogs={lifestyleBlogs} />
      )}

      {/* Skeleton for loading */}
      {loadingStateBlogs && <HomePageCardsSkeleton />}
    </div>
  );
};

export default HomeBlogs;
