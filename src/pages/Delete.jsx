import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast"; 
import axios from "axios";
import { FaTrashAlt } from 'react-icons/fa';

const Delete = ({ postID }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // --- LOGIC (UNTOUCHED) ---
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
        toast.success('Post deleted successfully', {
          duration: 4000,
          position: 'top-center',
          icon: '✅',
          iconTheme: { primary: '#000', secondary: '#fff' },
          ariaProps: { role: 'status', 'aria-live': 'polite' },
        });
        navigate(`/`); // Navigate to home page after deletion
      }
    } catch (error) {
      console.log("Error deleting post:", error.message);
      toast.error('Deletion failed.', { duration: 4000, position: 'top-center' });
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };
  // --- END LOGIC ---

  return (
    <>
      <button
        onClick={handleDeleteClick}
        // Red color for destructive action, clean rounded-full button
        className={`flex items-center gap-1 bg-white border border-gray-300 text-red-600 focus:outline-none hover:bg-red-50 focus:ring-4 focus:ring-red-100 font-semibold rounded-full text-sm px-4 py-2 transition duration-300 shadow-md`}
      >
        <FaTrashAlt className="text-sm" /> Delete
      </button>

      {/* Confirmation Modal - Clean, central focus */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to permanently delete this post?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={removePost}
                disabled={loading}
                className={`text-white px-5 py-2 rounded-full font-semibold transition ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
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