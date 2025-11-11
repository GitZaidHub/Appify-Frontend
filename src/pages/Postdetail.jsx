import React, { useState, useEffect } from "react";
import PostAuthor from "../Components/PostAuthor"; // Assumes PostAuthor is styled already
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Spinner from "../Components/Spinner";
import Delete from "./Delete"; // Assumes Delete is styled already
import { FaEdit } from 'react-icons/fa'; // Icon for Edit button

const Postdetail = () => {
  const { id } = useParams(); // Get the post ID from the route
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");
  const { currentUser } = useContext(UserContext);

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`
      );
      setPost(response.data);
    } catch (error) {
      seterror(error);
    }
    setIsLoading(false);
  };
  fetchPost();
}, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!post) {
    return <div className="text-center py-10 text-gray-500">Post not found or still loading...</div>;
  }
  // --- END LOGIC ---

  return (
    // Wide container for content focus
    <section className="postdetails bg-white py-10"> 
      <div className="container mx-auto px-6 max-w-5xl"> 
        
        {/* Main Post Card Container - White with strong shadow on a white page for subtle depth */}
        <div className="flex flex-col p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 bg-white">
          
          {/* Post Header (Title, Author, Actions) */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex justify-between items-center">
              <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
              
              {/* Edit/Delete Actions - Cleaned up buttons, blue accent for Edit, red for Delete */}
              {currentUser?.id === post?.creator && (
                <div className="flex gap-3">
                  <Link to={`/posts/${id}/edit`}>
                    <button
                      type="button"
                      className="flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-full text-sm px-4 py-2 transition duration-300 shadow-md"
                    >
                      <FaEdit className="text-base" /> Edit
                    </button>
                  </Link>

                  <Delete postID={id} /> {/* Delete component styling handled below */}
                </div>
              )}
            </div>
          </div>

          {/* Image Carousel / Media Section */}
          <div className="w-full mb-8">
            {/* Slick Carousel for displaying multiple images */}
            <Slider {...settings}>
              {post.thumbnail && post.thumbnail.length > 0 ? (
                post.thumbnail.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image} // Firebase URL
                      className="w-full max-h-[500px] object-contain rounded-xl" // Max height added
                      alt={`Slide ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg"; // Fallback image
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">No images available</div>
              )}
            </Slider>
          </div>

          {/* Post Content */}
          <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed">
            {error && (
              <p className="text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200 mb-4">
                {error}
              </p>
            )}
            <div
              className="font-normal text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Postdetail;