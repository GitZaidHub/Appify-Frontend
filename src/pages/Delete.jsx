import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast"; 
import axios from "axios";

const Delete = ({ postID }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const removePost = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${postID}/delete`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success(' deleted', {
          duration: 4000,
          position: 'top-center',
        
          // Styling
          style: {},
          className: '',
        
          // Custom Icon
          icon: '✅',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        navigate(`/`); // Navigate to home page after deletion
      }
    } catch (error) {
      console.log("Error deleting post:", error.message);
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the modal when "Delete" button is clicked
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal without deleting
  };

  return (
    <>
    
      <button
        onClick={handleDeleteClick}
        className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={removePost}
                disabled={loading}
                className={`bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;
