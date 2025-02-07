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

  return (
    <nav className="flex justify-between sticky top-0 z-20 text-black w-full items-center backdrop-blur-md px-6 py-4 bg-white/70">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="pl-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 transition-transform duration-300 tracking-wider hover:scale-105">
            BlogVibes
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="md:flex gap-6 w-[55%] hidden justify-between items-center">
          <li>
            <Link className="text-lg px-3 py-2 text-gray-900 hover:scale-105" to="/">
              Home
            </Link>
          </li>
          {currentUser?.id && (
            <li>
              <Link className="text-lg px-3 py-2 text-gray-900 hover:scale-105" to="/create">
                Create
              </Link>
            </li>
          )}
          <li>
            <Link className="text-lg px-3 py-2 text-gray-900 hover:scale-105" to="/authors">
              Authors
            </Link>
          </li>
          {!currentUser?.id && (
            <li>
              <Link className="text-lg px-3 py-2 text-gray-900 hover:scale-105" to="/login">
                Login
              </Link>
            </li>
          )}
          {currentUser?.id && (
            <li>
              <img
                id="avatarButton"
                className="w-10 h-10 rounded-full cursor-pointer ring-black ring-1"
                src={author?.avatar}
                alt="User dropdown"
                onClick={HamberGer}
              />
              {isDeskMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-6 mt-2 bg-slate-100 ring-2 divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div>{currentUser.name}</div>
                    <div className="font-medium truncate">
                      {currentUser?.email.split("@")[0]}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to={`/mypost/${currentUser?.id}`}
                        className="block px-4 py-2 hover:bg-gray-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/myprofile/${currentUser?.id}`}
                        className="block px-4 py-2 hover:bg-gray-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      to={"/logout"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log out
                    </Link>
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Hamburger Menu */}
        <div className={`md:hidden  ${isMenuOpen ? "hidden" : "block"} block z-30`} onClick={toggleMenu}>
          <RxHamburgerMenu className="text-3xl cursor-pointer" />
        </div>

        {/* Full-Screen Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-screen bg-white flex flex-col items-center justify-center z-20 backdrop-blur-lg"
          >
            <button className="absolute top-5 right-6 text-3xl" onClick={toggleMenu}>
              ✖
            </button>
            <ul className="flex flex-col gap-8 text-2xl font-semibold">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              {currentUser?.id && <li><Link to="/create" onClick={() => setIsMenuOpen(false)}>Create</Link></li>}
              <li><Link to="/authors" onClick={() => setIsMenuOpen(false)}>Authors</Link></li>
              {!currentUser?.id ? (
                <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
              ) : (
                <>
                  <li><Link to={`/mypost/${currentUser.id}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                  <li><Link to={`/myprofile/${currentUser.id}`} onClick={() => setIsMenuOpen(false)}>My Profile</Link></li>
                  <li><Link to="/logout" onClick={() => setIsMenuOpen(false)}>Log out</Link></li>
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
