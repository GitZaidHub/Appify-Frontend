// ... (Imports - UNTOUCHED)
import React from "react";
import { useContext ,useEffect} from "react";
import toast, { Toaster } from "react-hot-toast"; 

import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { setcurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  // --- LOGIC (UNTOUCHED) ---
  useEffect(() => {
    setcurrentUser(null); 
    toast.success('Sucessfully logged Out', {
      duration: 4000,
      position: 'top-center',
      icon: '✅',
      iconTheme: { primary: '#000', secondary: '#fff' },
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    navigate("/login"); 
  }, [setcurrentUser, navigate]);
  // --- END LOGIC ---

  return <></>;
};

export default Logout;