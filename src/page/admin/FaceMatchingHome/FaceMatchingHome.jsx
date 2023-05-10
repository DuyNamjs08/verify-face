import React from "react";
import { Link } from "react-router-dom";

const FaceMatchingHome = () => {
  return (
    <div className="content-face__home" style={{marginBottom:30}}>
      <p className="btn-backoff">Quay lại</p>
      <div style={{ color: "#FFFFFF", textAlign: "center", marginBottom: 30 }}>
        <h3 style={{ fontSize: 106, marginBottom: 10, fontWeight: 600 }}>
          Face Matching
        </h3>
        <p
          style={{
            marginBottom: 70,
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: 24
          }}
        >
          Hệ thống nhận dạng khuôn mặt
        </p>
      </div>
      <Link
        to="/facematching/takephoto"
        className="btn-white"
        style={{ fontSize: 28, margin: "auto" }}
      >
        Bắt đầu
      </Link>
    </div>
  );
};

export default FaceMatchingHome;
