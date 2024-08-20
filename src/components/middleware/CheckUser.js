import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckUser = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    
    if (!user && !email) {
      navigate("/login");
    }
  }, [navigate]);

  return localStorage.getItem("accessToken") || localStorage.getItem("email") ? children : null;
};

export default CheckUser;
