import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

// Add locales
TimeAgo.addDefaultLocale(en) // Add English as the default locale
TimeAgo.addLocale(ru) // Add Russian as an additional locale

const PostAuthor = ({createdAt,authorID}) => {
  const [author, setAuthor] = useState(null)
  
  // LOGIC (UNTOUCHED)
  useEffect(() => {
    const getAuthor=async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${authorID}`)
        setAuthor(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  }, [authorID])
  
  return (
    // Clean Link container with subtle hover effect
    <Link className="flex items-center gap-3 hover:bg-gray-50 rounded-full pr-3 transition duration-150" to={`/posts/users/${authorID}`}>
      
      {/* Avatar Image */}
      <div className="avatar flex-shrink-0">
        <img 
          className="rounded-full w-10 h-10 object-cover ring-1 ring-gray-200" // Reduced size, subtle ring
          src={author?.avatar} 
          alt="Author avatar" 
        />
      </div>

      {/* Details */}
      <div className="author-detail">
        <p className="font-semibold text-sm text-gray-800 hover:text-blue-600 transition duration-150">{author?.name}</p>
        <p className="text-xs text-gray-500">
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </p>
      </div>
    </Link>

  );
};

export default PostAuthor;