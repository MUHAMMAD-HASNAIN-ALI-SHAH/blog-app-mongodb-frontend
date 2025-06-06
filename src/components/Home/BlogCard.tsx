import { useNavigate } from "react-router-dom";

const BlogCard = ({
  blog,
}: {
  blog: {
    _id: string | null;
    title: string;
    description: string;
    category: string;
    image: string;
  };
}) => {
  const navigate = useNavigate();
  const openDetails = (_id: string) => {
    navigate(`/blog/${_id}`);
  };
  return (
    <>
      <figure className="h-[180px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full rounded-t-xl md:object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{blog.title}</h2>

        <p className="text-gray-600 text-sm">
          {blog.description.length > 100
            ? `${blog.description.substring(0, 100)}...`
            : blog.description}
        </p>

        <div className="card-actions justify-end mt-2">
          <button
            onClick={() => blog._id !== null && openDetails(blog._id)}
            className="btn btn-error btn-sm"
          >
            Show Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
