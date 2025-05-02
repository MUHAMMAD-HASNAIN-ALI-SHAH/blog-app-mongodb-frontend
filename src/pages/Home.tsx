import Hero from "../components/Home/Hero";
import HomeBlogs from "../components/Home/HomeBlogs";
import useAuthStore from "../store/auth";

const Home = () => {
  const { isAuthenticatedLoading } = useAuthStore();
  return (
    <div className="w-full mt-1">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto border-b border-base-900 px-5">
        {isAuthenticatedLoading ? (
          <div className="flex justify-center items-center h-96">
            <span className="loading loading-ball loading-xl bg-blue-700"></span>
            <span className="loading loading-ball loading-xl bg-blue-700"></span>
            <span className="loading loading-ball loading-xl bg-blue-700"></span>
          </div>
        ) : (
          <>
            <Hero />
            <HomeBlogs />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
