import React, { useContext, useEffect } from 'react';
import Posts from '../Components/Posts'; // Posts component is already styled
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
    if (!token) {
      navigate("/landingPage");
    }
  }, [token, navigate]); 
  // --- END LOGIC ---

  return (
    // Ensuring the Home wrapper is a clean background
    <section className="bg-white min-h-screen"> 
      <Posts />
    </section>
  );
}

export default Home;