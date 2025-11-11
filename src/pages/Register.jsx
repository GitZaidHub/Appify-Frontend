import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [confrmVisible, setConfrmVisible] = useState(false);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // --- LOGIC (UNTOUCHED) ---
  const handleChange = (e) => {
    setUserData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };
  const makePassVisible = () => {
    setPassVisible(!passVisible);
  };
  const confrmVisiblebtn = () => {
    setConfrmVisible(!confrmVisible);
  };
  const formhandler = async (e) => {
    e.preventDefault();
    seterror("");
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userData
      );
      const newUser = await response.data;
      if (!newUser) {
        seterror("can not register !");
      }
      if (!error) {
        toast.success("Check your email for verification");
        navigate("/login");
      }
    } catch (error) {
      seterror(error.response.data.message);
    }finally{
      setLoading(false)
    }
  };
  // --- END LOGIC ---

  return (
    // Background container is subtle light gray
    <section className="bg-gray-50 min-h-screen py-16 flex items-center justify-center">
      
      {/* Form Card: Elevated, clean white background, minimal shadow */}
      <div className="bg-white py-10 px-8 md:px-12 rounded-xl shadow-2xl border border-gray-100 w-full max-w-md">
        <h1 className="text-center mb-8 text-3xl font-extrabold text-gray-900">
          Create Account
        </h1>
        
        <form className="flex flex-col gap-4" onSubmit={formhandler}>
          
          {/* Name Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1">Enter Name</label>
            <input
              className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
              type="text"
              placeholder="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">Enter Email</label>
            <input
              className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col w-full relative">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1">Enter Password</label>
            <input
              className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
              type={passVisible ? "text" : "password"}
              placeholder="Create Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <div
              className="absolute top-1/2 right-3 transform translate-y-[-5%] cursor-pointer text-gray-500 hover:text-blue-600"
              onClick={makePassVisible}
            >
              {passVisible ? (
                <FaRegEye className="text-xl" />
              ) : (
                <FaEyeSlash className="text-xl" />
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col w-full relative">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input
              className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
              type={confrmVisible ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            <div
              className="absolute top-1/2 right-3 transform translate-y-[-5%] cursor-pointer text-gray-500 hover:text-blue-600"
              onClick={confrmVisiblebtn}
            >
              {confrmVisible ? (
                <FaRegEye className="text-xl" />
              ) : (
                <FaEyeSlash className="text-xl" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 py-3 px-4 rounded-full text-white font-bold text-lg w-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50"
            } transition duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Log In Link */}
          <small className="text-center mt-4 w-full text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:text-blue-700 font-bold transition duration-150" to={"/login"}>
              Log In
            </Link>
          </small>
        </form>

        {/* Error Display */}
        {error && (
          <p className="text-center mt-4 text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">{error}</p>
        )}
      </div>
    </section>
  );
};

export default Register;