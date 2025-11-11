import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for detecting outside clicks
  const { currentUser } = useContext(UserContext);
  const [isDeskMenu, setIsDeskMenu] = useState(false)
  const [author, setAuthor] = useState([]);

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${currentUser?.id}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser?.id) {
      getAuthor();
    }
  }, [currentUser?.id]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsDeskMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const HamberGer = () => {
    setIsDeskMenu(!isDeskMenu)
  }
  // --- END LOGIC ---

  return (
    // Clean, solid white background with a subtle bottom shadow for elevation
    <nav className="flex justify-center sticky top-0 z-50 text-gray-900 w-full items-center px-6 py-4 bg-white shadow-md"> 
      <div className="container mx-auto flex items-center justify-between max-w-7xl">

        {/* Logo */}
        <Link to="/" className="pl-0">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-wider transition duration-300 hover:text-blue-600">
            BLOG<span className="text-blue-600">VIBES</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {/* Adjusted width management and simplified alignment */}
        <ul className="md:flex gap-8 hidden items-center"> 
          <li>
            <Link 
              className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-150 relative py-2 group" 
              to="/"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </li>
          {currentUser?.id && (
            <li>
              <Link 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-150 relative py-2 group" 
                to="/create"
              >
                Create
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
          )}
          <li>
            <Link 
              className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-150 relative py-2 group" 
              to="/authors"
            >
              Authors
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </li>
          {!currentUser?.id && (
            <li>
              <Link 
                className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg" 
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
          
          {/* User Avatar and Dropdown */}
          {currentUser?.id && (
            <li className="relative">
              <img
                id="avatarButton"
                className="w-10 h-10 rounded-full cursor-pointer object-cover ring-2 ring-blue-600/50 hover:ring-blue-600 transition duration-200"
                src={author?.avatar}
                alt="User dropdown"
                onClick={HamberGer} // Using HamberGer for the avatar click handler
              />
              
              {/* Dropdown Menu - Modernized styling and positioning */}
              {isDeskMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 top-full mt-3 bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-xl w-52 overflow-hidden" // Subtle shadow, clean borders
                >
                  <div className="px-4 py-3 text-sm text-gray-900 bg-gray-50 border-b border-gray-100">
                    <div className="font-bold text-base">{currentUser.name}</div>
                    <div className="font-light truncate text-gray-500 text-sm">
                      {currentUser?.email.split("@")[0]}
                    </div>
                  </div>
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <Link
                        to={`/mypost/${currentUser?.id}`}
                        className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
                        onClick={() => setIsDeskMenu(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/myprofile/${currentUser?.id}`}
                        className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
                        onClick={() => setIsDeskMenu(false)}
                      >
                        My Profile
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1 border-t border-gray-100">
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150"
                      to={"/logout"}
                      onClick={() => setIsDeskMenu(false)}
                    >
                      Log out
                    </Link>
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Hamburger Menu Icon (Desktop menu visibility check is updated) */}
        <div className="md:hidden block z-50">
           {/* Toggling between hamburger and close icon */}
           <button onClick={toggleMenu} className="p-2 text-2xl text-gray-700 hover:text-blue-600 transition duration-150">
              {isMenuOpen ? '✕' : <RxHamburgerMenu className="text-3xl" />}
           </button>
        </div>


        {/* Full-Screen Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center z-40" // Ensure z-index is below the fixed header
          >
            <ul className="flex flex-col gap-10 text-3xl font-semibold text-gray-900">
              <li><Link className="hover:text-blue-600 transition duration-150" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              {currentUser?.id && <li><Link className="hover:text-blue-600 transition duration-150" to="/create" onClick={() => setIsMenuOpen(false)}>Create</Link></li>}
              <li><Link className="hover:text-blue-600 transition duration-150" to="/authors" onClick={() => setIsMenuOpen(false)}>Authors</Link></li>
              {!currentUser?.id ? (
                <li><Link className="px-6 py-3 bg-blue-600 text-white rounded-full text-2xl hover:bg-blue-700 transition duration-300" to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
              ) : (
                <>
                  <li className="border-t border-gray-100 pt-10"><Link className="hover:text-blue-600 transition duration-150" to={`/mypost/${currentUser.id}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                  <li><Link className="hover:text-blue-600 transition duration-150" to={`/myprofile/${currentUser.id}`} onClick={() => setIsMenuOpen(false)}>My Profile</Link></li>
                  <li><Link className="hover:text-red-600 transition duration-150" to="/logout" onClick={() => setIsMenuOpen(false)}>Log out</Link></li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Header;