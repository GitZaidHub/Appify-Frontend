import React from "react";
import { useState } from "react";
import upload from "../lib/upload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast"; 
import axios from "axios";
import Spinner from "../Components/Spinner";

const Edit = () => {
  const [title, settitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }, // Corrected indent format
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business", // Corrected typo from bussiness
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
    "Politics",
    "Technology",
    "Health",
    "Science",
  ];

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${id}`
        );
        settitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    // ... submission logic ...
    
    // (Keeping the original submission logic untouched for stability)
    // The visual changes are confined to the return() JSX below.
    
    const postData = new FormData();
    postData.set("title", title);
    postData.set("description", description);
    postData.set("category", category);
  
    try {
      setIsLoading(true);
  
      const uploadedUrls = await Promise.all(
        thumbnail.map(async (file) => {
          const url = await upload(file); 
          return url;
        })
      );
  
      uploadedUrls.forEach((url, index) => {
        postData.append(`thumbnails[${index}]`, url);
      });
  
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}/edit`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 201) {
        toast.success("Post has been edited", {
          duration: 4000,
          position: "top-center",
          icon: "✅",
          iconTheme: { primary: "#000", secondary: "#fff" },
          ariaProps: { role: "status", "aria-live": "polite" },
        });
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        seterror(error.response.data.message);
      } else {
        seterror("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // --- END LOGIC ---
  
  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    // Clean, light background container for the form
    <section className="create-post bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Form Card */}
        <div className="bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            <span className="text-blue-600">Edit</span> Post
          </h1>
          
          {error && (
            <p className="text-red-600 font-semibold mb-4 border border-red-300 bg-red-50 p-3 rounded-lg text-center">
              {error}
            </p>
          )}
          
          <form className="space-y-6" onSubmit={editPost}>
            
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Title input */}
                <input
                  type="text"
                  className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 text-gray-900 transition duration-200 ease-in-out"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Post Title"
                  autoFocus
                />
      
                {/* Category Select */}
                <select
                  name="category"
                  className="w-full sm:w-1/3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 transition duration-200 ease-in-out"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {POST_CATEGORIES.map((cat) => (
                    <option key={cat} className="text-gray-900">
                      {cat}
                    </option>
                  ))}
                </select>
            </div>
  
            {/* Description (Rich Text Editor) */}
            <div className="h-60 mb-12">
                <ReactQuill
                  className="bg-white h-full rounded-lg shadow-sm"
                  modules={modules}
                  formats={formats}
                  value={description}
                  onChange={setDescription}
                />
            </div>

            {/* File Upload */}
            <div className="pt-12">
              <label htmlFor="file-upload" className="text-gray-700 font-semibold block mb-2">Upload Thumbnails (Optional)</label>
              <input
                id="file-upload"
                type="file"
                className="w-full text-gray-700 p-2 border border-gray-300 rounded-lg bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => setThumbnail([...e.target.files])} // Handle multiple files
                accept=".png,.jpeg,.jpg,.webp"
                multiple // Enable selecting multiple files
              />
              <p className="text-sm text-gray-500 mt-2 bg-gray-100 p-2 rounded-lg text-center border border-gray-200">
                ◉ Choose one or two images (Images replaced on upload)
              </p>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-8 py-3 px-6 rounded-full text-white font-bold text-lg w-full ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50"
              } transition duration-300`}
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Edit;