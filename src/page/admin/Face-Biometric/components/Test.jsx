import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam"
import styled from 'styled-components'
import html2canvas from 'html2canvas';
import download from 'downloadjs';

function Test() {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const [isStreaming, setIsStreaming] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef=useRef()


  const videoConstraints = {
    facingMode: FACING_MODE_USER
  };
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);
  const handleStartStream = () => {
    setIsStreaming(true);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
  };
  const handleTakePhoto = () => {
    const imgData = webcamRef.current.getScreenshot();
    console.log("imgData" , imgData)
    setImgSrc(imgData)
  };
  return (
    <Container>
      <div onClick={handleClick}>Switch camera</div>
      {isStreaming ? (
        <div id="webcam-container" style={{  height: '240px', width: '320px' }}>
        <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize="true"
            ref={webcamRef}
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
          />
        <div onClick={handleStopStream}>Stop Streaming</div>
        <div onClick={handleTakePhoto}>Take Photo</div>
        {imgSrc && <img src={imgSrc} />}
      </div>
      ) : (
        <div onClick={handleStartStream}>Start Streaming</div>
      )}
    </Container>
  );
}
const Container = styled.div`
#webcam-container{
  video {
    width: 100% !important;
  }
  img{
    width: 320px;
    height: 240px;
    object-fit: contain;
  }
}
`

export default Test;

;


;