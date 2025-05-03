import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import SearchBlogs from "./SearchBlogs";

const Hero = () => {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Search Blogs"
        fullScreen={isMobile}
        size="lg"
        centered
      >
        <SearchBlogs onClose={close} />
      </Modal>

      {/* Search bar */}
      <div className="flex justify-center mt-4">
        <input
          onClick={open}
          type="text"
          placeholder="Search blogs..."
          className="block sm:hidden w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none md:w-80"
        />
      </div>

      {/* Hero section */}
      <div className="hero bg-transparent mt-5 min-h-[60vh]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome to Our Blogging Hub
            </h1>
            <p className="py-6 text-sm md:text-lg">
              Share your thoughts, explore insightful articles, and connect with
              a community of passionate writers. Whether you're here to learn,
              express, or inspire, this is your space to create and discover new
              ideas.
            </p>
            <button className="btn btn-primary">Get Started ⬇️</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
