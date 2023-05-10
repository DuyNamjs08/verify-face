import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const FaceMatching = () => {
  return (
    <>
      <div className="content-face__matching">
        <div className="container" style={{justifyContent:"space-between" , display:'flex', flexDirection:'column' , minHeight:'100vh'}}>
          <Link
            to="/"
            style={{
              paddingTop: 60,
              marginBottom: 50,
              display: "flex",
              width: "fit-content",
              height:'fit-content',
              marginBottom: 30
            }}
          >
            <img src={logo} alt=""></img>
          </Link>
          <Outlet />
          <div className="footer-metric">
            <p>Power by</p>
            <div className="logo-metric" style={{ maxWidth: 80 }}>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaceMatching;
