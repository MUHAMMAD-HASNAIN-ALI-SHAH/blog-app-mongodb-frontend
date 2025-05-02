import DashboardData from "../components/Dashboard/DashboardData";
import { useEffect, useState } from "react";
import useBlogStore from "../store/blog";
import DashboardBlogs from "../components/Dashboard/DashboardBlogs";
import DashboardSkeletonData from "../components/skeleton/DashboardSkeletonData";
import DashboardSkeletonBlogs from "../components/skeleton/DashboardSkeletonBlogs";

const Dashboard = () => {
  const { getBlogs, getLikes, getComments } = useBlogStore();
  const [dataLoader, setDataLoader] = useState(false);
  const [blogLoader, setBlogLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setBlogLoader(true);
      await getBlogs();
      setBlogLoader(false);
    };

    const fetchLikesAndComments = async () => {
      setDataLoader(true);
      await getLikes();
      await getComments();
      setDataLoader(false);
    };

    fetchLikesAndComments();

    fetchData();
  }, [getBlogs, getLikes, getComments]);

  return (
    <div className="w-full mt-1">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <div className="w-full">
          {dataLoader ? (
            <DashboardSkeletonData />
          ) : (
            <DashboardData />
          )}
        </div>

        <div className="w-full">
          {blogLoader ? (
            <DashboardSkeletonBlogs />
          ) : (
            <DashboardBlogs />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
