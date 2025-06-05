import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";

const CategoryBlogs = ({
  category,
  blogs,
  showButton = true,
}: {
  category: string;
  blogs: {
    _id: string;
    title: string;
    description: string;
    category: string;
    views: number;
    image: string;
  }[];
  showButton?: boolean;
}) => {
  const navigate = useNavigate();
  const handleCategoryBlogsPage = (category: string) => () => {
    const updatedCategory = category.toLowerCase();
    navigate(`/${updatedCategory}`);
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold">{category} Blogs</h3>
        {showButton && (
          <button
            className="btn btn-primary btn-sm"
            onClick={handleCategoryBlogsPage(category)}
          >
            View All
          </button>
        )}
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 w-full border border-base-200 rounded-2xl shadow-lg indicator"
            >
              <span className="indicator-item badge badge-secondary">
                {blog.views} view(s)
              </span>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 w-full text-center">
          No {category} blogs available.
        </p>
      )}
    </div>
  );
};

export default CategoryBlogs;
