import { Input } from "@mantine/core";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const SearchBlogs = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({ search: "" });
  const [blogs, setBlogs] = useState<
    { _id: string; title: string; description: string; image: string }[]
  >([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      if (value.trim() !== "") {
        searchBlogs(value);
      } else {
        setBlogs([]);
      }
    }, 500);

    setDebounceTimer(newTimer);
  };

  const searchBlogs = async (searchValue: string) => {
    try {
      setBlogs([]);
      setLoading(true);
      const formData = { search: searchValue };
      const res = await axiosInstance.post("/v2/blog/search", formData);
      setBlogs(res.data.blogs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
    }
  };

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
    onClose();
  };

  return (
    <div>
      <Input
        name="search"
        value={formData.search}
        onChange={handleChange}
        placeholder="Search blogs"
      />

      {loading ? (
        <>
          {[1, 2].map((_, index) => (
            <li key={index} className="flex gap-2 p-2 rounded-lg">
              <div className="w-1/3">
                <div className="skeleton h-32 w-full bg-gray-300"></div>
              </div>
              <div className="flex flex-col w-2/3 justify-between">
                <div className="skeleton h-8 w-28 bg-gray-300"></div>
                <div className="skeleton h-8 w-full bg-gray-300"></div>
                <div className="skeleton h-8 w-full bg-gray-300"></div>
              </div>
            </li>
          ))}
        </>
      ) : blogs.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              onClick={() => handleBlogClick(blog._id)}
              className="flex gap-2 cursor-pointer p-2 hover:shadow-2xl rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              <div className="w-1/3">
                <img
                  className="w-full h-auto object-cover rounded"
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
              <div className="flex flex-col w-2/3">
                <h2 className="font-semibold">{blog.title}</h2>
                <p className="text-justify text-sm text-gray-600">
                  {blog.description.length > 130
                    ? blog.description.substring(0, 130) + "..."
                    : blog.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className="mt-4 text-gray-500">No blogs found</p>
      ) : null}
    </div>
  );
};

export default SearchBlogs;
