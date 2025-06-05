import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface blog {
  _id: string | null;
  title: string;
  description: string;
  category: string;
  views: number;
  image: string;
}

interface blogData {
  _id: string | null;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
  likes: {
    blogId: string;
    userId: string;
  }[];
  comments: {
    _id: string;
    username: string;
    comment: string;
    blogId: string;
    userId: string;
  }[];
}

interface BlogStore {
  blogs: blog[];
  popularBlogs: blog[];
  blog: blogData | null;
  loadingStateBlogs: boolean;
  getPopularBlogLoader: boolean;
  getBlogs: () => void;
  getBlogData: (_id: string | null) => void;
  clearStateBlogData: () => void;
  categoryBlogs: (category: string) => Promise<blog[]>;
  viewBlog: (_id: string) => void;
  getPopularBlogs: () => void;
}

const useHomeBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  popularBlogs: [],
  blog: null,
  getPopularBlogLoader: false,
  loadingStateBlogs: false,
  getBlogs: async () => {
    try {
      set({ loadingStateBlogs: true });
      const response = await axiosInstance.get("/v2/blog/blog");
      set({ blogs: response.data.blogs });
      set({ loadingStateBlogs: false });
    } catch (error) {
      set({ loadingStateBlogs: false });
      console.error("Error fetching blogs:", error);
      set({ blogs: [] });
    }
  },
  getBlogData: async (id) => {
    try {
      const response = await axiosInstance.get(`/v2/blog/blog/${id}`);
      set({ blog: response.data.blogData });
    } catch (error) {
      return null;
    }
  },
  categoryBlogs: async (category) => {
    try {
      const formData = {
        category: category,
      }
      const response = await axiosInstance.post(`/v2/blog/category`, formData);
      return response.data.blogs;
    } catch (error) {
      return null;
    }
  },
  viewBlog: async (id) => {
    try {
      const formData = {
        blogId: id,
      };
      await axiosInstance.post(`/v2/blog/view-blog`, formData);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPopularBlogs: async () => {
    try {
      set({ getPopularBlogLoader: true });
      const response = await axiosInstance.get(`/v2/blog/popular-blogs`);
      set({ popularBlogs: response.data.blogs });
      set({ getPopularBlogLoader: false });
    } catch (error) {
      console.error(error);
      set({ getPopularBlogLoader: false });
      return null;
    }
  },
  clearStateBlogData: () => set({ blog: null }),
}));

export default useHomeBlogStore;
