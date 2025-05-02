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
      {getPopularBlogLoader ? (
        <HomePageCardsSkeleton />
      ) : popularBlogs.length === 0 ? (
        <p className="text-gray-500 w-full text-center">
          No Popular blogs available.
        </p>
      ) : (
        <CategoryBlogs
          category={"Popular"}
          blogs={popularBlogs}
          showButton={false}
        />
      )}

      {/* Travel Blogs */}
      {loadingStateBlogs ? (
        <HomePageCardsSkeleton />
      ) : travelBlogs.length === 0 ? (
        <p className="text-gray-500 w-full text-center">
          No Travel blogs available.
        </p>
      ) : (
        <CategoryBlogs category={"Travel"} blogs={treavelBlogs3Blogs} />
      )}
      
      {loadingStateBlogs ? (
        <HomePageCardsSkeleton />
      ) : technologyBlogs.length === 0 ? (
        <p className="text-gray-500 w-full text-center">
          No Technology blogs available.
        </p>
      ) : (
        <CategoryBlogs category={"Technology"} blogs={technologyBlogs3Blogs} />
      )}

      {loadingStateBlogs ? (
        <HomePageCardsSkeleton />
      ) : foodBlogs.length === 0 ? (
        <p className="text-gray-500 w-full text-center">
          No Food blogs available.
        </p>
      ) : (
        <CategoryBlogs category={"Food"} blogs={foodBlogs3Blogs} />
      )}

      {loadingStateBlogs ? (
        <HomePageCardsSkeleton />
      ) : lifestyleBlogs.length === 0 ? (
        <p className="text-gray-500 w-full text-center">
          No Lifestyle blogs available.
        </p>
      ) : (
        <CategoryBlogs category={"Lifestyle"} blogs={lifestyleBlogs3Blogs} />
      )}
    </div>
  );
};

export default HomeBlogs;
