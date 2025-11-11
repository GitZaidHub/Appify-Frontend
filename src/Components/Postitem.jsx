import React from 'react'
import PostAuthor from './PostAuthor'; // PostAuthor styling will be updated below
import { Link } from 'react-router-dom';

const Postitem = ({ id, postID, thumbnail, title, author, description, category, authorID, createdAt }) => {
  const shortdesc = description.length > 150 ? description.substr(0, 145) + '...' : description;
  const shorttitle = title.length > 50 ? title.substr(0, 50) + '...' : title; // Ensure title truncation is reasonable

  return (
    // Clean card style: White background, subtle shadow, professional lift on hover
    <section className="postitem max-w-full mx-auto h-full bg-white rounded-xl shadow-lg 
                        overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] 
                        border border-gray-100"> 

      {/* --- Image Section --- */}
      <Link to={`/post/${postID}`}>
          <div className='relative w-full h-[200px] overflow-hidden'> {/* Reduced image height for better mobile fit */}
            <img
            loading='lazy'
              className='w-full h-full object-cover transition-transform duration-500 hover:scale-105' // Added hover effect to image
              src={thumbnail[0]}
              alt={title}
            />
          </div>
      </Link>
      
      {/* --- Content Body --- */}
      <div className='p-5 flex flex-col justify-between h-[calc(100%-200px)]'> {/* Added padding */}
        
        {/* Title and Excerpt */}
        <div>
            <Link to={`/post/${postID}`}>
                <h1 className="text-xl font-extrabold text-gray-900 hover:text-blue-600 transition duration-150 leading-snug mb-2">
                    {shorttitle}
                </h1>
            </Link>

            <p className="text-gray-600 text-sm line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: shortdesc }}></p>
        </div>

        {/* --- Metadata (Author and Category) --- */}
        <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
            {/* PostAuthor Component */}
            <PostAuthor authorID={authorID} createdAt={createdAt} />
            
            {/* Category Link - Clean pill style with blue accent */}
            <Link
              className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full 
                         hover:bg-blue-600 hover:text-white transition duration-300 uppercase tracking-wider"
              to={`/posts/category/${category}`}
            >
              {category}
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Postitem