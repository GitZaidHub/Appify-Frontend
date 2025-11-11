import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { FaUserCircle } from 'react-icons/fa'; // Icon for placeholder/detail

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [error, seterror] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
  const getAuthors = async()=>{
    setIsLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`)
      setAuthors(response?.data)
    } catch (error) {
      seterror(error.response.data.message)
    }
    setIsLoading(false)
  }
  getAuthors()
  }, [])
  if(isLoading){
    return <Spinner/>
  }
  // --- END LOGIC ---

  return (
    <section className="Authors container mx-auto min-h-screen py-16 bg-white">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        Our Featured <span className="text-blue-600">Authors</span>
      </h1>
      
      <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl">
        {authors.map((p) => (
          <Link
            key={p._id}
            to={`/posts/users/${p._id}`}
            // Clean white card, professional shadow, and lift on hover
            className="author-item group flex flex-col bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-gray-100"
          >
            
            {/* Avatar Section */}
            <div className="relative flex items-center justify-center p-8 bg-gray-50"> {/* Subtle background for avatar area */}
              {p.avatar ? (
                <img
                  className="rounded-full h-28 w-28 object-cover border-4 border-white shadow-md transform transition-all duration-300 group-hover:scale-105 ring-2 ring-blue-600/50" // Accent ring
                  src={p.avatar}
                  alt={p.name}
                />
              ) : (
                <FaUserCircle className="h-28 w-28 text-gray-400 border-4 border-white rounded-full shadow-md transition-all duration-300 group-hover:scale-105" />
              )}
            </div>
            
            {/* Name and Post Count Section */}
            <div className="p-5 text-center bg-white">
              <h1 className="text-xl font-bold text-gray-900 transition duration-300 group-hover:text-blue-600">
                {p.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-bold text-gray-700">{p.posts}</span> {p.posts === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {error && (
        <p className="text-center text-red-600 text-xl mt-10 bg-red-50 p-3 rounded-lg border border-red-200 max-w-md mx-auto">{error}</p>
      )}
    </section>
  );
};

export default Authors;