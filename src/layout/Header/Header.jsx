import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="logo-main">
          <Link to="/" title="">
            <img src={logo} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
