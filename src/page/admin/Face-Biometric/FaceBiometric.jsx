import React, { useEffect, useState, useRef } from "react";
import voicebg from "../../../assets/images/voicebg.png";
import logovntel from "../../../assets/images/logo.png";
import styled from "styled-components";
import SnapShotOne from "./components/SnapShotOne";
import SnapShotTwo from "./components/SnapShotTwo";
import CompareImg from "./components/CompareImg";
import Result from "./components/Result";
import logovntelMini from "../../../assets/images/logoMini.png";

const FaceBiometric = () => {
  const [enterNumber, setEnterNumber] = useState(false);
  const [continueImg2, setContinueImg2] = useState(false);
  const [compareTwoImg, setCompareTwoImg] = useState(false);
  const [verify, setVerfify] = useState(false);

  const [classAdd, setClassAdd] = useState(false);

  return (
    <>
      <Container img={voicebg}>
        <div className="main">
          <div className="logo__max">
            <img src={logovntel} alt="" />
          </div>
          <div className={`log__min ${classAdd ? "hide-footer" : ""}`}>
            <p>Power by</p>
            <img src={logovntelMini} alt="" />
          </div>
          {enterNumber ? (
            continueImg2 ? (
              compareTwoImg ? (
                verify ? (
                  <Result />
                ) : (
                  <CompareImg setVerfify={setVerfify} />
                )
              ) : (
                <SnapShotTwo setCompareTwoImg={setCompareTwoImg} />
              )
            ) : (
              <SnapShotOne
                setContinueImg2={setContinueImg2}
                continueImg2={continueImg2}
                setClassAdd={setClassAdd}
              />
            )
          ) : (
            <div className="voice__container">
              <div className="link__back">Quay lại</div>
              <div className="content">
                <h1>Face Matching</h1>
                <h3>Hệ thống nhận dạng khuôn mặt</h3>
                <div
                  onClick={() => setEnterNumber(true)}
                  className="btn__start"
                >
                  <div>Bắt đầu</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .main {
    background-image: url(${(props) => props.img});
    min-height: 100vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    color: #fff;
    .logo__max {
      padding: 20px 0 0 40px;
    }
    .hide-footer {
      display: none !important;
    }
    .log__min {
      position: absolute;
      bottom: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      p {
        margin: 0;
      }
    }
    .voice__container {
      display: flex;
      flex-direction: column;
      .link__back {
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px;
        text-decoration: underline;
        cursor: pointer;
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
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
        .btn__start {
          margin: 20px 0 0;
          width: 240px;
          background: #e6f0ff !important;
          display: flex;
          justify-content: center;
          padding: 20px;
          border-radius: 100px;
          cursor: pointer;
          div {
            color: #003e9c;
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default FaceBiometric;
