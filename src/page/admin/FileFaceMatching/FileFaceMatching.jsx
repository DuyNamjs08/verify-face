import React, { useState, useEffect } from "react";
import photo from "../../../assets/images/img-show-photo.png";
import { AiFillCamera } from "react-icons/ai";
import { FaFileUpload, FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const FileFaceMatching = () => {
  const navigate = useNavigate();
  const [activeUpload, setActiveUpload] = useState([]);
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

  const photoBox = [
    {
      img: photo,
      name: "photo1"
    },
    {
      img: photo,
      name: "photo2"
    }
  ];

  const handleChangeUpload = (names) => {
    setActiveUpload([...activeUpload, names]);
  };

  const handleChangeAvatar = function loadFile(event, name) {
    if (event.target.files.length > 0 && name === "photo1") {
      const filess = URL.createObjectURL(event.target.files[0]);
      setFile1(filess);
    }
    if (event.target.files.length > 0 && name === "photo2") {
      const filess = URL.createObjectURL(event.target.files[0]);
      setFile2(filess);
    }
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
        <div className="box-take__photo">
          <div className="table-take__photo" style={{marginBottom:30}}>
            <table className="">
              <thead>
                <tr>
                  <th>File hình ảnh 1</th>
                  <th>File hình ảnh 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {photoBox?.map((v, i) => (
                    <td key={i}>
                      {activeUpload?.includes(v.name) ? (
                        <div className="input-file">
                          <input
                            name={v.name}
                            type="file"
                            onChange={(e) => handleChangeAvatar(e, v.name)}
                          ></input>
                          <div className="img-input__file">
                            <img
                              src={v.name === "photo1" ? file1 : file2}
                              alt=""
                            />
                          </div>
                          <p className="label-avatar">
                            Kéo & thả tệp của bạn vào đây
                            <FaCloudUploadAlt />
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="box-photo__show">
                            <img src={v?.img} alt=""></img>
                          </div>
                          <div
                            className="btn-file__photo"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center"
                            }}
                          >
                            <span
                              onClick={() => {
                                navigate("/facematching", { replace: true });
                              }}
                              className="btn-theme__second"
                              style={{ margin: "auto" }}
                            >
                              <AiFillCamera /> Chụp lại
                            </span>
                            <span
                              className="btn-upload__active"
                              onClick={() => handleChangeUpload(v.name)}
                            >
                              <FaFileUpload /> Upload file
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <Link
            to="/facematching/result"
            title=""
            className="btn-theme"
            style={{ maxWidth: 200, width: "100%", margin: "auto", minHeight:35, borderRadius:1000, border:'solid 2px #96C0FF' }}
          >
            Xác thực
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileFaceMatching;
