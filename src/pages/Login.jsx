import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Login = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setcurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // --- LOGIC (UNTOUCHED) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    seterror(" ");
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      const user = await response.data;
      setcurrentUser(user);
      toast.success(`${user.name} loged in succefully`, {
        duration: 4000,
        position: "top-center",
        icon: "🔥",
        iconTheme: { primary: "#000", secondary: "#fff" },
        ariaProps: { role: "status", "aria-live": "polite" },
      });
      navigate("/");
    } catch (error) {
      seterror(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
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
  // --- END LOGIC ---

  return (
    // Background container is subtle light gray
    <section className="bg-gray-50 min-h-screen py-16 flex items-center justify-center">
      
      {/* Form Card: Elevated, clean white background, minimal shadow */}
      <div className="bg-white py-10 px-8 md:px-12 rounded-xl shadow-2xl border border-gray-100 w-full max-w-md">
        <h1 className="text-center mb-8 text-3xl font-extrabold text-gray-900">
          Welcome Back!
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          
          {/* Email Input - Clean border and blue focus ring */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input - Clean border and blue focus ring */}
          <div className="flex flex-col w-full relative">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              className="rounded-lg px-4 py-3 w-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-150"
              type={passVisible ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />

            {/* Toggle Password Visibility - Icon color updated for clarity */}
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

          {/* Submit Button - Blue Accent, strong hover, full width */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 py-3 px-4 rounded-full text-white font-bold text-lg w-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50"
            } transition duration-300`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Error Message */}
          {error && (
            <h3 className="text-center text-red-600 text-sm font-semibold mt-2 bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </h3>
          )}

          {/* Register Link */}
          <small className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 hover:text-blue-700 font-bold transition duration-150"
              to="/register"
            >
              Register
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Login;