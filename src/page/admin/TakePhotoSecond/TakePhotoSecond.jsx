import React , { useEffect, useState } from "react";
import picture from "../../../assets/images/img-photo.jpg";
import btnTakePhoto from "../../../assets/images/btn-take-photo.png";
import { IoClose } from "react-icons/io5";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TakePhotoSecond = () => {
  const [takePhoto, setTakePhoto] = useState(false);

  const handleTakePhoto = () => {
    setTakePhoto(true);
  };

  return (
    <div className="content-face__photo">
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
      <div className="box-take__photo">
        <p className="btn-close__photos">
          <IoClose />
        </p>
        <h3
          className="title-theme"
          style={{
            textAlign: "center",
            marginBottom: 10,
            fontWeight: 600,
            fontSize: 48
          }}
        >
          Chụp ảnh lần 2
        </h3>
        <p style={{ fontSize: 20, marginBottom: 30, textAlign: "center" }}>
          Giữ khuôn mặt nằm trong vùng kẻ tròn
        </p>
        <div className="box-picture">
          <img src={picture} alt=""></img>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            margin: "auto",
            marginBottom: 10
          }}
        >
          <button
            className="btn-take__photo"
            onClick={(event) => {
              event.preventDefault();
              handleTakePhoto();
            }}
          >
            <img src={btnTakePhoto} alt=""></img>
          </button>
          {takePhoto && (
            <p style={{ color: "#0065FF", marginLeft: 10 }}>Chụp lại</p>
          )}
        </div>
        {takePhoto && (
          <Link
            to="/facematching/filephotomatching"
            className="next-photo__second"
          >
            Tiếp tục <FaArrowAltCircleRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TakePhotoSecond;
