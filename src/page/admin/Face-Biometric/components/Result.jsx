import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AiOutlineRedo } from "react-icons/ai";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";
import ChangingProgressProvider from "./ChangingProgressProvider";
import logovntelMini from "../../../../assets/images/logoMini.png";

function Result(props) {
  const result = useSelector((state) => state.verifyFace.resultPercent);
  return (
    <Container>
      <div className="content">
        <h1>Face Matching</h1>
        <h3>Hệ thống nhận dạng khuôn mặt</h3>
        <div className="spin__number">
          <div className="spin__main">
            <div className="title">
              <h3>Kết quả xác thực</h3>
            </div>
            <div className="result">
              <ChangingProgressProvider values={[0, Math.floor(result * 100)]}>
                {(value) => (
                  <CircularProgressbarWithChildren
                    value={value}
                    text={`${value}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      rotation: 0,
                      strokeLinecap: "butt",
                      trailColor: "#eee",
                    })}
                  >
                    <RadialSeparators
                      count={12}
                      style={{
                        background: "#fff",
                        width: "2px",
                        height: `${10}%`,
                      }}
                    />
                  </CircularProgressbarWithChildren>
                )}
              </ChangingProgressProvider>
            </div>
            <div className="result__text">
              <p>Xác thực gương mặt trùng khớp {Math.floor(result * 100)}%</p>
            </div>
          </div>
          <div className="roll__back">
            <p>
              <AiOutlineRedo />
              Thực hiện lại
            </p>
          </div>
        </div>
        <div className="footer">
          <p>Power by</p>
          <img src={logovntelMini} alt="" />
        </div>
      </div>
    </Container>
  );
}
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
      height: 320px;
      border-radius: 8px;
      background: #fff;
      color: #000;
      display: flex;
      flex-direction: column;
      .spin__main {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          h3 {
            padding-top: 10px;
            color: #003e9c;
            font-weight: 550;
            font-size: 28px;
          }
        }
        .result {
          width: 150px;
        }
        .records {
          margin-top: 10px;
          img {
            height: 70px;
          }
        }
        .result__text {
          p {
            padding-top: 60px;
            color: #00ba88;
          }
        }
      }

      .roll__back {
        p {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          align-items: center;
          padding: 0 20px;
          color: #003e9c;
          cursor: pointer;
        }
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

export default Result;
