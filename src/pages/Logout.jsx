import React from "react";
import { useContext ,useEffect} from "react";
import toast, { Toaster } from "react-hot-toast"; 

import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { setcurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setcurrentUser(null); // Clear the current user
    toast.success('Sucessfully logged Out', {
      duration: 4000,
      position: 'top-center',
    
      // Styling
      style: {},
      className: '',
    
      // Custom Icon
      icon: '✅',
    
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    
      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    navigate("/login"); // Redirect to the login page
  }, [setcurrentUser, navigate]);
  return <></>;
};

export default Logout;
