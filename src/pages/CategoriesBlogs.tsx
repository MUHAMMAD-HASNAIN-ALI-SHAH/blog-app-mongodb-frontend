import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHomeBlogStore from "../store/home";
import HomePageCardsSkeleton from "../components/skeleton/HomePageCardsSkeleton";

const CategoriesBlogs = () => {
  const { category } = useParams();
  const { categoryBlogs } = useHomeBlogStore();
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<
    {
      id: number | null;
      title: string;
      description: string;
      category: string;
      views: number;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    if (!category) return;
    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await categoryBlogs(category);
        setBlogs(fetchedBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category blogs:", error);
        setLoading(false);
      }
    };
    fetchCategoryBlogs();
  }, [category]);

  return (
    <div className="w-full mt-1">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto border-b border-base-900 px-10">
        <h1 className="text-2xl font-bold text-center mt-5 mb-5">
          {category} Blogs
        </h1>

        {loading ? (
          <HomePageCardsSkeleton />
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="card bg-base-100 w-full border border-base-200 rounded-2xl shadow-lg indicator mb-4"
              >
                <span className="indicator-item badge badge-secondary">
                  {blog.views} view(s)
                </span>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[200px] object-cover rounded-t-xl"
                />
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-semibold">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {blog.description.length > 100
                      ? `${blog.description.substring(0, 100)}...`
                      : blog.description}
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <button className="btn btn-error btn-sm">Show Blog</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 w-full text-center">
            No blogs available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriesBlogs;
