import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
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
      getAuthor(); // Only call if currentUser has a valid id
    }
  }, [currentUser?.id]); // Dependency array to fetch author only when currentUser.id changes

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
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
        <ul className="md:flex gap-6 hidden justify-between items-center">
          <li><Link className="text-lg px-3 py-2 hover:scale-105" to="/">Home</Link></li>
          {currentUser?.id && <li><Link className="text-lg px-3 py-2 hover:scale-105" to="/create">Create</Link></li>}
          <li><Link className="text-lg px-3 py-2 hover:scale-105" to="/authors">Authors</Link></li>
          {!currentUser?.id ? (
            <li><Link className="text-lg px-3 py-2 hover:scale-105" to="/login">Login</Link></li>
          ) : (
            <li>
              <Link className="text-lg px-3 py-2 hover:scale-105" to={`/mypost/${currentUser.id}`}>Dashboard</Link>
            </li>
          )}
        </ul>

        {/* Hamburger Menu */}
        <div className="md:hidden block z-30" onClick={toggleMenu}>
          <RxHamburgerMenu className="text-3xl cursor-pointer" />
        </div>

        {/* Full-Screen Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-screen bg-white flex flex-col items-center justify-center z-20 backdrop-blur-lg"
          >
            <button className="absolute top-5 right-6 text-3xl" onClick={toggleMenu}>✖</button>
            <ul className="flex flex-col gap-8 text-2xl font-semibold">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              {currentUser?.id && <li><Link to="/create" onClick={toggleMenu}>Create</Link></li>}
              <li><Link to="/authors" onClick={toggleMenu}>Authors</Link></li>
              {!currentUser?.id ? (
                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
              ) : (
                <>
                  <li><Link to={`/mypost/${currentUser.id}`} onClick={toggleMenu}>Dashboard</Link></li>
                  <li><Link to={`/myprofile/${currentUser.id}`} onClick={toggleMenu}>My Profile</Link></li>
                  <li><Link to="/logout" onClick={toggleMenu}>Log out</Link></li>
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
