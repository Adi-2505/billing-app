import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Providers/AuthProvider";

import {Button} from "@/components/ui/button.jsx"

const About = () => {
  const { loading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!isAuthenticated && !loading) {
      // Redirect to the desired route (e.g., login page)
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const logout = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((response) => {
        console.log(response);
        window.location.href= '/';
      });
  };

  const generateInvoice = async () => {
    const res = await axios.post("http://localhost:5000/api/invoice");
    console.log(res);
  };

  // Render the loading indicator if the authentication status is still being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the component only if the user is authenticated
  if (isAuthenticated) {
    return (
      <div>
        <div>{user.displayName}</div>
        <div>{user.emails[0].value}</div>
        <Button onClick={logout}>Logout</Button>
        <Button onClick={generateInvoice}>Generate invoice</Button>
      </div>
    );
  }

  // If the user is not authenticated, return null 
  return null;
};

export default About;
