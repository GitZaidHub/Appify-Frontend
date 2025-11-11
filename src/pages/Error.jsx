import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    // Clean, centered page with primary accent color
    <div className='bg-white min-h-screen flex flex-col items-center justify-center py-20'>
      <div className='flex flex-col items-center justify-center rounded-xl bg-gray-50 p-12 md:p-16 shadow-lg border border-gray-200 max-w-lg text-center'>
        
        <h1 className='text-9xl font-extrabold text-blue-600 mb-4'>404</h1>
        <p className='text-3xl font-bold text-gray-900 mb-4'>Page Not Available</p>
        <p className='text-xl text-gray-600 mb-6'>
          We can't seem to find the page you're looking for.
        </p>
        
        <p className='text-4xl text-gray-400 mb-8'>ಥ_ಥ</p> {/* Kept the emoticon, but styled it subtly */}

        <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow-md">
            Go to Home
        </Link>
      </div>
    </div>
  )
}

export default Error