import React from "react";
import styled from "styled-components";
import fileRecord from "../../../../assets/images/recordfile.png";
import { AiFillAudio, AiFillFileAdd } from "react-icons/ai";

function CompareRecords({setVerify}) {
  return (
    <Container>
      <div className="content">
        <h1>Voice Biometrics</h1>
        <h3>Giải pháp sinh trắc học giọng nói</h3>
        <div className="spin__number">
          <div className="spin__main">
            <div className="main__content">
              <div className="title__header">
                <div>File ghi âm 1</div>
                <div>File ghi âm 2</div>
              </div>
              <div className="main__section">
                <div className="item1">
                  <div className="item1__section">
                    <img src={fileRecord} alt="" />
                    <div className="record__back">
                      <div>
                        <AiFillAudio /> Ghi lại
                      </div>
                    </div>
                  </div>
                  <div className="upload__file">
                    <AiFillFileAdd /> upload file
                  </div>
                </div>
                <div className="item1">
                  <div className="item1__section">
                    <img src={fileRecord} alt="" />
                    <div className="record__back">
                      <div>
                        <AiFillAudio /> Ghi lại
                      </div>
                    </div>
                  </div>
                  <div className="upload__file">
                    <AiFillFileAdd /> upload file
                  </div>
                </div>
              </div>
            </div>
            <div className="records">
              <div onClick={()=>setVerify(true)}>Xác thực</div>
            </div>
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
        .main__content {
          margin-top: 20px;
          .title__header {
            border: 1px solid black;
            display: flex;
            height: 50px;
            div {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              &:nth-child(1) {
                border-right: 1px solid black;
              }
            }
          }
          .main__section {
            border: 1px solid black;
            border-top: 0;
            display: flex;
            height: 180px;
            .item1 {
              flex: 1;
              display: flex;
              justify-content: center;
              padding: 10px;
              display: flex;
              flex-direction: column;
              .item1__section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                img {
                  height: 50px;
                }
                .record__back {
                  div {
                    width: 60px;
                    background: #0065ff;
                    padding: 10px 12px;
                    gap: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: bold;
                    color: #fff;
                  }
                }
              }
              .upload__file {
                display: flex;
                justify-content: flex-end;
                gap: 4px;
                text-decoration: underline;
                color: #0065ff;
              }
              &:nth-child(1) {
                border-right: 1px solid black;
              }
            }
          }
          display: flex;
          flex-direction: column;
          background: #e6f0ff;
          height: 200px;
          width: 600px;
        }
        .records {
          margin-top: 40px;
          div {
            width: 80px;
            padding: 12px 18px;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 550;
            color: #fff;
            cursor: pointer;
            background: linear-gradient(
              143.87deg,
              #2b7fff 19.23%,
              #0065ff 32.96%,
              #0047b3 59.19%,
              #003e9c 81.67%
            );
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

export default CompareRecords;
