import React, { useEffect } from "react";
import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import upload from "../lib/upload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [title, settitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); // Added dependencies

  // --- RESTORED DEFINITIONS START ---

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

  // --- RESTORED DEFINITIONS END ---

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);

    try {
      setLoading(true);

      // Step 1: Upload thumbnails to Firebase
      const uploadedUrls = await Promise.all(
        thumbnail.map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      // Step 2: Add uploaded URLs to postData
      uploadedUrls.forEach((url, index) => {
        postData.append(`thumbnails[${index}]`, url);
      });

      // Step 3: Send the postData to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/create`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success("Post has been created", {
          duration: 4000,
          position: "top-center",
          icon: "🔥",
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
      setLoading(false);
    }
  };

  return (
    // The rest of your JSX remains the same and is now correctly functional
    <section className="create-post bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Create New <span className="text-blue-600">Post</span>
          </h1>
          {error && (
            <p className="text-red-600 font-semibold mb-4 border border-red-300 bg-red-50 p-3 rounded-lg text-center">
              {error}
            </p>
          )}
          <form className="space-y-6" onSubmit={createPost}>
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

              {/* Category Select - THIS NOW WORKS because POST_CATEGORIES is defined */}
              <select
                name="category"
                className="w-full sm:w-1/3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 transition duration-200 ease-in-out"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {POST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-900"> {/* Added value prop */}
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description (Rich Text Editor) */}
            {/* Description (Rich Text Editor) - Increased height for better UX/stability */}
            <div className="mb-12" style={{ height: '300px' }}> {/* Set a fixed height for the outer wrapper */}
              <ReactQuill
                // Removed h-full and added specific styling for the Quill container
                className="bg-white rounded-lg shadow-sm h-full"
                modules={modules} // Ensure modules/formats are defined and passed
                formats={formats}
                value={description}
                onChange={setDescription}
                // Inline style for the Quill editor body (where text is typed)
                theme="snow"
                style={{ height: '240px' }} // This height targets the editor body specifically
              />
            </div>
            <div className="h-10"></div> {/* Add a buffer space after Quill */}

            {/* File Upload */}
            <div className="pt-12">
              <label htmlFor="file-upload" className="text-gray-700 font-semibold block mb-2">Upload Thumbnails</label>
              <input
                id="file-upload"
                type="file"
                className="w-full text-gray-700 p-2 border border-gray-300 rounded-lg bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => setThumbnail([...e.target.files])}
                accept=".png,.jpeg,.jpg,.webp"
                multiple
              />
              <p className="text-sm text-gray-500 mt-2 bg-gray-100 p-2 rounded-lg text-center border border-gray-200">
                ◉ Choose one or two images (Thumbnails for the post listing)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-8 py-3 px-6 rounded-full text-white font-bold text-lg w-full ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50"
                } transition duration-300`}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Create;