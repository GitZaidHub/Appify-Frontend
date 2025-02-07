import React, { useContext, useEffect } from 'react';
import Posts from '../Components/Posts';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/landingPage");
    }
  }, [token, navigate]); // Add dependencies to avoid warnings

  return (
    <section>
      <Posts />
    </section>
  );
}

export default Home;
