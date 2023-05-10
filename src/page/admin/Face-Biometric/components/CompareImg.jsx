import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import btnVoice from "../../../../assets/images/btn-take-photo.png";
import fileRecord from "../../../../assets/images/recordfile.png";
import { AiFillCamera, AiFillFileAdd } from "react-icons/ai";
import logovntelMini from "../../../../assets/images/logoMini.png";
import styled from "styled-components";
import { compareFace, addPercent } from "../../../../features/VerifyFace";

function CompareImg({ setVerfify }) {
  const dispatch = useDispatch();
  const img1 = useSelector((state) => state.verifyFace.img1);
  const img2 = useSelector((state) => state.verifyFace.img2);
  const [imageURL, setImageURL] = useState(null);
  const [renderImg1, setRenderImg1] = useState(img1);
  const [renderImg2, setRenderImg2] = useState(img2);
  const handVerify = async () => {
    try {
      await dispatch(
        compareFace({
          image_target: renderImg1,
          images_source: renderImg2,
        })
      )
        .unwrap()
        .then((res) => {
          dispatch(addPercent(res.score));
          setVerfify(true);
        });
    } catch (error) {
      setVerfify(true);
    }
  };
  const handleFileInput1 = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setRenderImg1(reader.result);
    };
  };
  const handleFileInput2 = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setRenderImg2(reader.result);
    };
  };

  return (
    // <div>
    //   <img src={img1} alt="" />
    //   <img src={img2} alt="" />
    // </div>
    <Container>
      {imageURL && <img src={imageURL} alt="Uploaded image" />}
      <div className="content">
        <h1>Face Matching</h1>
        <h3>Giải pháp sinh trắc học giọng nói</h3>
        <div className="spin__number">
          <div className="spin__main">
            <div className="main__content">
              <div className="title__header">
                <div>File hình ảnh 1</div>
                <div>File hình ảnh 2</div>
              </div>
              <div className="main__section">
                <div className="item1">
                  <div className="item1__section">
                    <img src={renderImg1} alt="" />
                    <div className="record__back">
                      <div>
                        <AiFillCamera /> Chụp lại
                      </div>
                    </div>
                  </div>
                  <div className="upload__file">
                    {/* <AiFillFileAdd /> upload file  */}
                    <input type="file" onChange={handleFileInput1} />
                  </div>
                </div>
                <div className="item1">
                  <div className="item1__section">
                    <img src={renderImg2} alt="" />
                    <div className="record__back">
                      <div>
                        <AiFillCamera /> Chụp lại
                      </div>
                    </div>
                  </div>
                  <div className="upload__file">
                    {/* <AiFillFileAdd /> upload file */}
                    <input type="file" onChange={handleFileInput2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="records">
              <div onClick={() => handVerify()}>Xác thực</div>
            </div>
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
      height: 460px;
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
            height: 60px;
            div {
              flex: 1;
              height: 100%;
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
            height: 300px;
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
                  height: 140px;
                  object-fit: contain;
                }
                .record__back {
                  cursor: pointer;
                  div {
                    cursor: pointer;
                    width: 100px;
                    background: #0065ff;
                    padding: 10px 12px;
                    gap: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 100px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                  }
                }
              }
              .upload__file {
                cursor: pointer;
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
          /* background: #e6f0ff; */
          height: 340px;
          width: 800px;
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

export default CompareImg;
