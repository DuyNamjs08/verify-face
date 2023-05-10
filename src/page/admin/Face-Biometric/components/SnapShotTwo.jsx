import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import btnVoice from "../../../../assets/images/btn-take-photo.png";
import paternImg from "../../../../assets/images/img-photo.jpg";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import logovntelMini from "../../../../assets/images/logoMini.png";
import { useDispatch, useSelector } from "react-redux";
import { addImgTwo } from "../../../../features/VerifyFace";
import { HiArrowPath } from "react-icons/hi2";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function SnapShotTwo({ setCompareTwoImg }) {
  // const img1 = useSelector((state) => state.verifyFace.img1);
  const dispatch = useDispatch();
  const [camera, setCamera] = useState(false);
  const [captureImg, setCaptureImg] = useState(false);
  // ======================
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const videoConstraints = {
    facingMode: FACING_MODE_USER,
  };
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);
  const handleStartStream = () => {
    setIsStreaming(true);
    setCamera(true);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
  };
  const handleTakePhoto = () => {
    const imgData = webcamRef.current.getScreenshot();
    setImgSrc(imgData);
  };

  useEffect(() => {
    if (imgSrc) {
      dispatch(addImgTwo(imgSrc));
      setCaptureImg(true);
      alert("chup anh thanh cong ");
    }
  }, [imgSrc]);

  return (
    <>
      <Container>
        <div className="content">
          <h1>Face Matching</h1>
          <h3>Hệ thống nhận dạng khuôn mặt</h3>
          <div className="spin__number">
            <div className="spin__main">
              <div className="title">
                <h3>Chụp ảnh lần 2</h3>
                <p>Giữ khuôn mặt nằm trong vùng xanh</p>
              </div>
              {/* <div className="patern__img">
                {!camera ? <img src={paternImg} alt="" /> : ""}
                <div className="main__video">
                  <video
                    width="460"
                    height="240"
                    style={{
                      position: "absolute",
                      zIndex: "1000",
                    }}
                    ref={videoRef}
                  />
                  <canvas
                    width="460"
                    height="240"
                    style={{ position: "absolute", zIndex: "1000" }}
                    ref={canvasRef}
                  />
                </div>
              </div> */}
              <div className="patern__img">
                {isStreaming ? (
                  <div
                    id="webcam-container"
                    style={{
                      // position: "absolute",
                      width: "460px",
                      height: "240px",
                      zIndex: "1000",
                    }}
                  >
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      forceScreenshotSourceSize="true"
                      videoConstraints={{
                        ...videoConstraints,
                        facingMode,
                      }}
                    />
                    {/* <div onClick={handleStopStream}>Stop Streaming</div>
                    <div onClick={handleClick}>Switch camera</div>
                    <div onClick={handleTakePhoto}>Take Photo</div>
                    {imgSrc && <img src={imgSrc} />} */}
                  </div>
                ) : (
                  <img src={paternImg} alt="" />
                )}
              </div>
              <div className="records">
                <img
                  onClick={() => {
                    // start();
                    handleStartStream();
                  }}
                  src={btnVoice}
                  alt=""
                />
                {camera ? (
                  captureImg ? (
                    <>
                      <div onClick={handleTakePhoto} className="capture">
                        <HiArrowPath /> Chụp lại
                      </div>
                      <div onClick={handleClick} className="capture">
                        Xoay ảnh
                      </div>
                    </>
                  ) : (
                    <>
                      <div onClick={handleTakePhoto} className="capture">
                        Chụp ảnh
                      </div>
                      <div onClick={handleClick} className="capture">
                        Xoay ảnh
                      </div>
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            {captureImg && (
              <div className="continue">
                <div
                  onClick={() => {
                    setCompareTwoImg(true);
                  }}
                  className="btn__continue"
                >
                  Tiếp tục <BsFillArrowRightCircleFill />
                </div>
              </div>
            )}
          </div>
          <div className="footer">
            <p>Power by</p>
            <img src={logovntelMini} alt="" />
          </div>
        </div>
      </Container>
    </>
  );
}
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer {
    margin: 20px 0;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    p {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .spin__number {
      min-width: 1000px;
      height: 500px;
      border-radius: 8px;
      background: #fff;
      color: #000;
      display: flex;
      flex-direction: column;
      position: relative;
      #webcam-container {
        video {
          width: 100% !important;
          height: 100% !important;
        }
      }
      .continue {
        position: absolute;
        right: 20px;
        bottom: 40px;
      }
      .main__video {
        position: absolute;
        top: 100px;
        /* width: 100%; */
        left: 280px;
      }
      .spin__main {
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          h3 {
            color: #003e9c;
            font-weight: 500;
            font-size: 28px;
          }
        }
        .patern__img {
          img {
            height: 260px;
          }
        }
        .records {
          position: absolute;
          bottom: 20px;
          margin-top: 10px;
          cursor: pointer;
          display: flex;
          gap: 20px;
          align-items: center;
          .capture {
            padding: 10px 12px;
            background: #146c94;
            color: white;
            border-radius: 4px;
            div {
              display: flex;
              align-items: center;
            }
          }
          img {
            cursor: pointer;
            height: 70px;
          }
        }
      }

      .btn__continue {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        align-items: center;
        padding: 0 20px;
        color: #003e9c;
        cursor: pointer;
      }
    }
    h1 {
      font-size: 80px;
      line-height: 100px;
      font-family: "Kinn";
    }
    h3 {
      text-transform: uppercase;
      margin: 10px;
      font-weight: 400;
      letter-spacing: 2.2px;
    }
  }
`;
const StyleBorder = styled.div`
  position: absolute;
  top: 96px;
  left: 276px;
  height: 240px;
  width: 460px;
  /* border-radius: 50%; */
  background: transparent;
  border: 4px solid green;
  z-index: 1000;
`;
const StyleBorderErr = styled.div`
  position: absolute;
  top: 96px;
  left: 276px;
  height: 240px;
  width: 460px;
  /* border-radius: 50%; */
  background: transparent;
  border: 4px solid red;
  z-index: 1000;
`;

export default SnapShotTwo;
