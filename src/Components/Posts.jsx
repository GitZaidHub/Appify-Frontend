import React from "react";
import { useState, useEffect } from "react";
import Postitem from "../Components/Postitem";
import Spinner from "./Spinner";
import axios from "axios";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // LOGIC (UNTOUCHED)
  useEffect(() => {
    const fetchposts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchposts();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    // Main Section container - Clean white background
    <section className="posts min-h-screen py-16 bg-white"> 
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Title - Bold, clear, aligned with Aero-Clarity styling */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900">
            Latest <span className="text-blue-600">Articles</span>
        </h1>
        
        {/* Grid Layout - Changed to a cleaner 3-column default, 4 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.length > 0 ? (
            posts.map(({ _id: id, thumbnail, title, category, author, description, creator, createdAt, postID }) => (
              // Note: The outer <div> with class "card" is removed for cleaner structure
              <Postitem
                  key={id}
                  authorID={creator}
                  postID={id} // Using postID for the unique URL slug/ID
                  thumbnail={thumbnail}
                  title={title}
                  category={category}
                  author={author}
                  description={description}
                  createdAt={createdAt}
              />
            ))
          ) : (
            // Empty State Styling - Centered and clear
            <h2 className="col-span-full flex items-center justify-center text-xl font-semibold text-gray-500 py-10">
                No Posts to Display
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;