import React from "react";
import { useState, useEffect } from "react";
import Postitem from "../Components/Postitem";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";


const Authorpost = () => {
  const [posts, setPosts] = useState([]);
  const [name, setname] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState('')
  const  {id} =useParams()

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
    const fetchposts = async()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`)
        setPosts(response?.data)
      } catch (error) {
        seterror(error.response.data.message)
      }
      setIsLoading(false)
    }
      
      const fetchAuthorName = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`)
       setname(response.data.name)
      } catch (error) {
        seterror(error.response.data.message)
      }
    }
    
    fetchposts()
    fetchAuthorName()
    
  }, [id])

  if(isLoading){
    return <Spinner/>
  }
  // --- END LOGIC ---
  
  return (
    <section className="posts min-h-screen py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Title - Bold, clear, using blue accent */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900">
            Posts by <span className="text-blue-600">{name}</span>
        </h1>
        {error && (
            <p className="text-center text-red-600 text-xl mt-4 bg-red-50 p-3 rounded-lg border border-red-200 max-w-md mx-auto">{error}</p>
        )}
        
        {/* Post Grid (Replicated from Posts.jsx) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.length > 0 ? (
            posts.map(({ _id: id, thumbnail, title, category: postCategory, description, creator, createdAt }) => (
              <Postitem
                key={id}
                authorID={creator}
                postID={id}
                thumbnail={thumbnail}
                title={title}
                category={postCategory}
                description={description}
                createdAt={createdAt}
              />
            ))
          ) : (
            <h2 className="col-span-full flex items-center justify-center text-xl font-semibold text-gray-500 py-10 bg-gray-50 rounded-xl shadow-md border border-gray-100">
                {name} has no posts to display.
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Authorpost;