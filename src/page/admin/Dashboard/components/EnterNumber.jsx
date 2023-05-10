import React from "react";
import styled from "styled-components";
import btnBack from "../../../../assets/images/btnback.png";
import btnVoice from "../../../../assets/images/btnVoice.png";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function EnterNumber({setRecord}) {
  const arr = [];
  const strArr = [];
  let numberStrings = [
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
    "mười",
  ];
  for (var i = 0; i < 10; i++) {
    var test = Math.floor(Math.random() * 10) + 1;
    arr.push(test);
    strArr.push(numberStrings[test - 1]);
  }
  return (
    <Container>
      <div className="content">
        <h1>Voice Biometrics</h1>
        <h3>Giải pháp sinh trắc học giọng nói</h3>
        <div className="spin__number">
          <div className="spin__main">
            <div className="title">
              <h3>Ghi âm giọng nói</h3>
              <p>Nhấn nút ghi và đọc lại dãy số sau</p>
            </div>
            <div className="main__content">
              <div className="spin__back">
                <img src={btnBack} alt="" />
              </div>
              <div className="flex">
                {arr.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
              <div className="flex text">
                {strArr.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
            </div>
            <div className="records">
              <img src={btnVoice} alt="" />
            </div>
          </div>
          <div onClick={()=>setRecord(true)} className="btn__continue">
            Tiếp tục <BsFillArrowRightCircleFill />
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
            color: #003e9c;
            font-weight: 500;
            font-size: 28px;
          }
        }
        .main__content {
          padding: 10px;
          display: flex;
          flex-direction: column;
          background: #e6f0ff;
          border-radius: 20px;
          height: 120px;
          width: 600px;
          .spin__back {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            cursor: pointer;
          }
          .flex {
            div {
              font-size: 45px;
              font-weight: bold;
              color: #003e9c;
              display: flex;
              justify-content: center;
              flex: 1;
            }
          }
          .text {
            margin-top: 10px;
            div {
              font-size: 14px;
              color: #000;
              font-weight: 500;
              text-transform: uppercase;
            }
          }
        }
        .records {
          margin-top: 10px;
          img {
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

export default EnterNumber;
