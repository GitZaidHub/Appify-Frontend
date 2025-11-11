import React, { useState, useContext, useEffect } from "react"; // <-- useContext ADDED HERE
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from "../context/userContext"; // <-- IMPORT CONTEXT
import {  useParams } from "react-router-dom";
import Delete from "../pages/Delete" // Assuming Delete is styled with red accent
import axios from "axios";
import { FaEye, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { id } = useParams();
  useEffect(() => {
    const fetchposts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response?.data);
        
      } catch (error) {
        seterror(error.response.data.message);
      }
      setIsLoading(false);
    };

    fetchposts();
  }, [id, token]);
  // --- END LOGIC ---
 

  return (
    <section className="dashboard bg-gray-50 min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">
          My <span className="text-blue-600">Dashboard</span>
        </h1>

        {error && (
            <p className="text-sm font-semibold mb-8 text-red-600 text-center bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </p>
        )}
        
        {posts.length > 0 ? (
          <div className="flex flex-col gap-3">
            {posts.map((post, index) => (
              <div
                key={post._id}
                // Clean white strip with subtle elevation
                className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-md transition duration-300 ${
                    index % 2 === 0 ? 'bg-white hover:shadow-lg' : 'bg-gray-100 hover:shadow-lg' // Subtle striping for scannability
                } border border-gray-100`}
              >
                {/* Post Info (Image and Title) */}
                <div className="flex items-center gap-4 w-full md:w-3/5 mb-3 md:mb-0">
                  
                  {/* Thumbnail/Placeholder */}
                  {post.thumbnail && post.thumbnail[0] ? (
                    <img
                      src={post.thumbnail[0]}
                      alt="posts"
                      className="h-14 w-14 rounded-lg object-cover border-2 border-blue-100 flex-shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-gray-200 flex justify-center items-center border-2 border-gray-200 flex-shrink-0">
                      <p className="text-gray-500 text-xs">No Image</p>
                    </div>
                  )}
                  
                  {/* Title */}
                  <p className="font-semibold text-gray-800 truncate text-base md:text-lg">
                    {post.title}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-end gap-3 w-full md:w-auto">
                  
                  {/* View Button (Secondary Blue) */}
                  <Link to={`/post/${post._id}`}>
                    <button className="flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 font-medium rounded-full text-sm px-4 py-2 transition duration-200">
                      <FaEye /> View
                    </button>
                  </Link>
                  
                  {/* Edit Button (Primary Blue) */}
                  <Link to={`/posts/${post._id}/edit`}>
                    <button className="flex items-center gap-1 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 font-medium rounded-full text-sm px-4 py-2 transition duration-200 shadow-sm">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  
                  {/* Delete Component */}
                  <Delete postID={post._id} /> 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-xl font-semibold text-gray-500 py-10 bg-white rounded-xl shadow-md border border-gray-100">
            You haven't created any posts yet.
          </h2>
        )}
      </div>
    </section>
  );
  
};

export default Dashboard;