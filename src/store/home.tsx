import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface blog {
  id: number | null;
  title: string;
  description: string;
  category: string;
  views: number;
  image: string;
}

interface blogData {
  id: number | null;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
  likes: {
    blogID: number;
    userID: number;
  }[];
  comments: {
    id: number;
    username: string;
    comment: string;
    blogID: number;
    userID: number;
  }[];
}

interface BlogStore {
  blogs: blog[];
  popularBlogs: blog[];
  blog: blogData | null;
  loadingStateBlogs: boolean;
  getBlogs: () => void;
  getBlogData: (id: number | null) => void;
  clearStateBlogData: () => void;
  categoryBlogs: (category: string) => Promise<blog[]>;
  viewBlog: (id: number) => void;
  getPopularBlogs: () => void;
}

const useHomeBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  popularBlogs: [],
  blog: null,
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
      const response = await axiosInstance.get(`/v2/blog/popular-blogs`);
      set({ popularBlogs: response.data.blogs });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  clearStateBlogData: () => set({ blog: null }),
}));

export default useHomeBlogStore;
