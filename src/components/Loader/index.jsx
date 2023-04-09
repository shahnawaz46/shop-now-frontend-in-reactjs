import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "../../asset/fuzicon_logo.png";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }, []);

  return (
    <div className="container">
      <img src={Logo} alt="" className="loader-image" />
    </div>
  );
};

export default Loader;
