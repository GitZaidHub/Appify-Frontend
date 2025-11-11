import React, { useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
// ... (Firebase imports and other imports)
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase" 
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";

const Userprofile = () => {
  // ... (State definitions)
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatartIstouched, setAvatartIstouched] = useState(false);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, seterror] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // ... (Hooks and useEffects for logic - UNTOUCHED)
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { name, avatar, email, bio } = response.data;
        setName(name);
        setAvatar(avatar);
        setBio(bio);
        setEmail(email);
      } catch (error) {
        seterror(error.response.data.message);
      }
    };
    fetchUser();
  }, []);

  const changeAvatar = async () => {
    setAvatartIstouched(false);
    try {
      const avatarRef = ref(storage, `avatars/${avatar.name}`);
      const snapshot = await uploadBytes(avatarRef, avatar);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        { avatarURL: downloadURL }, 
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(downloadURL); 
      toast.success(`Avatar changed`, { duration: 4000, position: "top-center" });
    } catch (error) {
      seterror(error.response.data.message);
    }
  };
  

  const updateDetail = async (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      currentPassword,
      newPassword,
      bio,
    };

    try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/users/edit-user`,
      userData,
      { withCredentials: true, headers: { authorization: `Bearer ${token}` } }
    );
    if(response.status ==  200){
      navigate('/logout')
      
    }
    } catch (error) {
      seterror(error.response.data.message)
    }
  };
  // --- END LOGIC ---

  return (
    // Clean, light background container
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">
        My <span className="text-blue-600">Profile</span>
      </h1>

      {error && (
        <p className="text-sm font-semibold mb-8 text-red-600 text-center bg-red-50 p-2 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      {/* Main Profile Card - White, spacious, elevated */}
      <section className="userprofile container flex flex-col md:flex-row items-start md:gap-12 justify-center w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 md:p-12 border border-gray-100">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-0 relative w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pr-10">
          <img
            className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-gray-200 shadow-md"
            src={avatar}
            alt="Avatar"
          />
          <label
            htmlFor="avatar"
            // Blue accent on edit button
            className="absolute top-0 right-1/4 md:right-0 bg-white p-2 rounded-full shadow-lg hover:bg-blue-50 transition cursor-pointer border border-gray-200"
            onClick={() => setAvatartIstouched(true)}
          >
            <FaRegEdit className="text-blue-600 text-lg" />
          </label>
          <input
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          {avatartIstouched && (
            // Green accent for save action
            <button
              onClick={changeAvatar}
              className="absolute bottom-10 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-600 transition shadow-md"
            >
              <FaCheck className="inline-block mr-1" /> Save Avatar
            </button>
          )}
          <p className="mt-6 text-xl font-bold text-gray-900">{name}</p>
          <Link to={`/mypost/${id}`}>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-md">
              My Posts
            </button>
          </Link>
        </div>

        {/* Form Section */}
        <form
          className="flex flex-col w-full md:w-2/3 space-y-5 md:pt-0 pt-6 md:pl-8"
          onSubmit={updateDetail}
        >
          {/* Inputs - Clean border and blue focus ring */}
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
            type="password"
            placeholder="Current Password (To Confirm Changes)"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
            type="password"
            placeholder="New Password (Leave blank to keep current)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <textarea
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150 h-32"
            placeholder="Bio (Tell us about yourself)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-lg w-full mt-6 hover:bg-blue-700 transition shadow-md shadow-blue-500/50"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default Userprofile;