import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import btnVoice from "../../../../assets/images/btn-take-photo.png";
import paternImg from "../../../../assets/images/img-photo.jpg";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import logovntelMini from "../../../../assets/images/logoMini.png";
import {
  loadTinyFaceDetectorModel,
  detectSingleFace,
  detectAllFaces,
  TinyFaceDetectorOptions,
  resizeResults,
  matchDimensions,
  draw,
  loadFaceLandmarkTinyModel,
} from "face-api.js";
import * as faceapi from "face-api.js";
import { useDispatch, useSelector } from "react-redux";
import { addImgOne } from "../../../../features/VerifyFace";
import { HiArrowPath } from "react-icons/hi2";

function SnapShotOne({ setContinueImg2, setClassAdd }) {
  // const img1 = useSelector((state) => state.verifyFace.img1);
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [detected, setDetected] = useState(false);
  const [camera, setCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState("hello");
  const MIN_DISTANCE = 200;
  const [faceImage, setFaceImage] = useState(null);
  const [show, setShow] = useState(false);
  const [captureImg, setCaptureImg] = useState(false);
  const [Newstream, setNewstream] = useState(null);


  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
    };
    setClassAdd(true)
    loadModels();
  }, []);
  useEffect(() => {
    setVideo(videoRef.current);
    setCanvas(canvasRef.current);
  }, []);
  useEffect(() => {
    if (faceImage) {
      dispatch(addImgOne(faceImage));
      setCaptureImg(true);
      alert("chup anh thanh cong ");
    }
  }, [faceImage]);

  const start = async () => {
    await launchCamera();
    const recognition = makeRecognition();
    await recognition.init();
    recognition.start();
  };

  const getFaceDetectorOptions = () =>
    new TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.9 });

  const makeRecognition = () => {
    let ctx;

    const init = async () => {
      setLoading(true);
      await loadTinyFaceDetectorModel(`models`);
      await loadFaceLandmarkTinyModel("models");
      ctx = canvas.getContext("2d");
    };

    const start = async () => {
      await wait(0);

      if (video.readyState === 4) {
        const faces = await detectSingleFace(
          video,
          getFaceDetectorOptions()
        ).withFaceLandmarks(true);
        setLoading(false);
        if (faces) {
          setDetected(true);
          const dims = matchDimensions(canvas, video, true);
          const resizedResults = resizeResults(faces, dims);
          setShow(true);
          await onPlay();
          if (true) {
            draw.drawDetections(canvas, resizedResults);
          }
        } else {
          setDetected(false);
          ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
        }
      }
      start();
    };

    return { init, start };
  };
  async function onPlay() {
    // lấy khuôn mặt đầu tiên được phát hiện trong video
    const detections = await detectAllFaces(
      video,
      new TinyFaceDetectorOptions()
    ).withFaceLandmarks();
    // console.log("detections", detections);
    if (detections.length > 0) {
      // tính toán khoảng cách từ khuôn mặt đầu tiên đến màn hình
      const faceBox = detections[0].alignedRect.box;
      const centerX = faceBox.x + faceBox.width / 2;
      const centerY = faceBox.y + faceBox.height / 2;
      const distance = Math.min(
        centerX,
        video.width - centerX,
        centerY,
        video.height - centerY
      );
      // console.log("distance", distance);
      if (distance >= MIN_DISTANCE) {
        console.log("Vui lòng đến gần hơn để xác thực khuôn mặt.");
      } else {
        console.log("Xác thực khuôn mặt thành công!");
      }
    } else {
      console.log("Không nhận diện khuôn mặt!");
    }
  }

  const launchCamera = () =>
    new Promise((resolve) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              minWidth: 460,
              maxWidth: 460,
              minHeight: 240,
              maxHeight: 240,
              minFrameRate: 1,
              maxFrameRate: 10,
            },
          },
        })
        .then(
          (stream) => {
            setNewstream(stream)
            video.srcObject = stream;
            video.play();
            setCamera(true);
            resolve();
          },
          () => {}
        );
    });
  const closeCamera = () => {
    if (Newstream) {
      const tracks = Newstream.getTracks();
      tracks.forEach((track) => track.stop());
      setCamera(false);
      // Reset srcObject để dừng hiển thị video
      video.srcObject = null;
    }
  };
  const capture = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    const newfaces = await detectAllFaces(video, new TinyFaceDetectorOptions());
    if (newfaces.length === 1) {
      setMessage("Face detected.");
      setFaceImage(dataURL);
    } else if (newfaces.length > 1) {
      setMessage("Multiple faces detected.");
    } else {
      setMessage("No face detected.");
    }
  };
  return (
    <>
      {/* <div>
        {!camera && (
          <button
            style={{
              padding: 20,
              fontSize: 14,
            }}
            onClick={() => {
              start();
            }}
          >
            Launch Camera
          </button>
        )}

        {faceImage && <img src={faceImage} alt="Face" />}
        {faceDetected ? (
          <div onClick={capture}>Capture Face</div>
        ) : (
          <p>Please position your face in front of the camera</p>
        )}
        <p>{message}</p>

        {camera && <h2>Face Detected : {detected ? "True" : "False"}</h2>}
      </div> */}
      <Container>
        <div className="content">
          <h1>Face Matching</h1>
          <h3>Hệ thống nhận dạng khuôn mặt</h3>
          <div className="spin__number">
            <div className="spin__main">
              <div className="title">
                <h3>Chụp ảnh lần 1</h3>
                <p>Giữ khuôn mặt nằm trong vùng xanh</p>
              </div>
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: "100px",
                    // width: "100%",
                    lef: "280px",
                    width: 460,
                    height: 240,
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 10000,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Loading
                </div>
              )}
              {detected ? <StyleBorder /> : show ? <StyleBorderErr /> : ""}
              <div className="patern__img">
                {!camera ? <img src={paternImg} alt="" /> : ""}
                <div className="main__video">
                  <video
                    width="460"
                    height="240"
                    style={{
                      position: "absolute",
                      zIndex: "1000",
                    }}
                    id="video"
                    ref={videoRef}
                  />
                  <canvas
                    width="460"
                    height="240"
                    style={{ position: "absolute", zIndex: "1000" }}
                    ref={canvasRef}
                  />
                </div>
              </div>
              <div className="records">
                <img
                  onClick={() => {
                    start();
                  }}
                  src={btnVoice}
                  alt=""
                />
                {camera ? (
                  captureImg ? (
                    <div onClick={capture} className="capture">
                      <HiArrowPath /> Chụp lại
                    </div>
                  ) : (
                    <div onClick={capture} className="capture">
                      Chụp ảnh
                    </div>
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
                    setContinueImg2(true);
                    closeCamera();
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

export default SnapShotOne;
