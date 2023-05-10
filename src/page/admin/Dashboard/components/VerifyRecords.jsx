import React from "react";
import styled from "styled-components";
import resultRecords from "../../../../assets/images/result1.png";
import { AiOutlineRedo } from "react-icons/ai";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";
import ChangingProgressProvider from "./ChangingProgressProvider";

function VerifyRecords(props) {
  return (
    <Container>
      <div className="content">
        <h1>Voice Biometrics</h1>
        <h3>Giải pháp sinh trắc học giọng nói</h3>
        <div className="spin__number">
          <div className="spin__main">
            <div className="title">
              <h3>Kết quả xác thực</h3>
            </div>
            <div className="result">
              <ChangingProgressProvider values={[0, 80]}>
                {(value) => (
                  <CircularProgressbarWithChildren
                    value={value}
                    text={`${value}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      rotation:0,
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
              <p>Giọng nói trùng khớp 80%</p>
            </div>
          </div>
          <div className="roll__back">
            <p>
              <AiOutlineRedo />
              Thực hiện lại
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default VerifyRecords;
