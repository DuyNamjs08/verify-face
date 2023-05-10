import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  var CurrentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{marginTop:'70vh'}}>
      <div className="container">
        <p>Power by</p>
      </div>
    </footer>
  );
};

export default Footer;
