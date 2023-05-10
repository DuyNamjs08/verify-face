import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import sevice1 from "../../../assets/images/face-sevice.png";
import sevice2 from "../../../assets/images/voice-sevice.png";

const Dashboard = () => {
  const seviceMetric = [
    {
      img: sevice1,
      title: "Face Matching",
      content: "Hệ thống nhận dạng khuôn mặt",
      path: "/face-biometric"
    },
    {
      img: sevice2,
      title: "Voice Biometrics ",
      content: "Giải pháp sinh trắc học giọng nói",
      path: "/voice"
    }
  ];

  return (
    <>
      <div className="body-dashboard">
        <div className="content-dashboard" style={{ margin: "auto" }}>
          <div className="container" style={{justifyContent:"space-between" , display:'flex', flexDirection:'column' , minHeight:'100vh'}}>
            <div className="logo-metric">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="content-metric" style={{marginBottom:30}}>
              <h2 className="title-metric">Vui lòng chọn tính năng </h2>
              <div className="groups-sevice__metric">
                {seviceMetric?.map((item, index) => (
                  <div className="item-metric__sevice" key={index}>
                    <div className="img-item__sevice">
                      <Link to="/" title="">
                        <img src={item.img} alt="" />
                      </Link>
                    </div>
                    <div
                      className="info-item__sevice"
                      style={{ textAlign: "center", padding: 20 }}
                    >
                      <h3
                        className="title-bg"
                        style={{
                          fontSize: 40,
                          fontWeight: 700,
                          marginBottom: 5
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ marginBottom: 20 }}>
                        Hệ thống nhận dạng khuôn mặt
                      </p>
                      <Link
                        to={item.path}
                        title=""
                        className="btn-theme"
                        style={{ maxWidth: 250, width: "100%", margin: "auto" }}
                      >
                        Chọn
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      </div>
    </>
  );
};

export default Dashboard;
