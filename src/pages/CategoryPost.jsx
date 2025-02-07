import React from "react";
import { useState, useEffect } from "react";
import Postitem from "../Components/Postitem";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";


const CategoryPost = () => {
  const [posts, setPosts] = useState([]);
  const [name, setname] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState('')
  const  {category} =useParams()

  useEffect(() => {
    const fetchposts = async()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/category/${category}`)
        setPosts(response.data)
      } catch (error) {
        seterror(error.response.data.message)
      }
      setIsLoading(false)
    }
      
    
    fetchposts()
    
  }, [])

  

  if(isLoading){
    return <Spinner/>
  }
  
  return (
    <section className="posts min-h-screen py-10 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Category : {category}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.map(({ _id: id, thumbnail, title, category, author, description, creator, createdAt, postID }) => (
              <div key={id} className="card">
                <Postitem
                  authorID={creator}
                  postID={id}
                  thumbnail={thumbnail}
                  title={title}
                  category={category}
                  author={author}
                  description={description}
                  createdAt={createdAt}
                />
              </div>
            ))
          ) : (
            <h2 className="flex items-center justify-center text-2xl font-semibold text-gray-600">No Post to Display</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPost;
