import React, { useEffect, useState, useRef } from "react";
import {
    loadTinyFaceDetectorModel,
    detectSingleFace,
    detectAllFaces,
    TinyFaceDetectorOptions,
    resizeResults,
    matchDimensions,
    draw,
    loadFaceLandmarkTinyModel
} from "face-api.js";
import * as faceapi from 'face-api.js'
import styled from "styled-components";

const FaceTakePhoto = () => {
    const [video, setVideo] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [detected, setDetected] = useState(false);
    const [camera, setCamera] = useState(false);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [message, setMessage] = useState('hello')
    const MIN_DISTANCE = 200;
    const [faceDetected, setFaceDetected] = useState(true);
    const [faceImage, setFaceImage] = useState(null);
    const [show, setShow] = useState(false)

    useEffect(() => {
        const loadModels = async () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            ])
        }
        loadModels()
    }, [])
    useEffect(() => {
        setVideo(videoRef.current);
        setCanvas(canvasRef.current);
    }, []);

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
                    setShow(true)
                    await onPlay()
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
        const detections = await detectAllFaces(video, new TinyFaceDetectorOptions()).withFaceLandmarks();
        console.log("detections", detections)
        if (detections.length > 0) {
            // tính toán khoảng cách từ khuôn mặt đầu tiên đến màn hình
            const faceBox = detections[0].alignedRect.box;
            const centerX = faceBox.x + faceBox.width / 2;
            const centerY = faceBox.y + faceBox.height / 2;
            const distance = Math.min(centerX, video.width - centerX, centerY, video.height - centerY);
            console.log('distance', distance)
            if (distance >= MIN_DISTANCE) {
                console.log('Vui lòng đến gần hơn để xác thực khuôn mặt.');
            } else {
                console.log('Xác thực khuôn mặt thành công!');
            }
        } else {
            console.log('Không nhận diện khuôn mặt!');
        }
    }

    const launchCamera = () =>
        new Promise(resolve => {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            minWidth: 320,
                            maxWidth: 320,
                            minHeight: 320,
                            maxHeight: 320,
                            minFrameRate: 1,
                            maxFrameRate: 10
                        }
                    }
                })
                .then(
                    stream => {
                        video.srcObject = stream;
                        video.play();
                        setCamera(true);
                        resolve();
                    },
                    () => { }
                );
        });
    const capture = async () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        const newfaces = await
            detectAllFaces(video, new TinyFaceDetectorOptions())
        console.log("newfaces", newfaces)
        if (newfaces.length === 1) {
            setMessage('Face detected.')
            setFaceImage(dataURL);
        } else if (newfaces.length > 1) {
            setMessage('Multiple faces detected.')
        } else {
            setMessage('No face detected.')
        }

    }

    return (
        <div>
            {!camera && (
                <button
                    style={{
                        padding: 20,
                        fontSize: 14
                    }}
                    onClick={() => {
                        start();
                    }}
                >
                    Launch Camera
                </button>
            )}
            {detected ? <StyleBorder /> : show ? <StyleBorderErr /> : ''}
            <video
                width="320" height="320"
                style={{ position: "absolute", top: 80, left: 400, borderRadius: '50%' }}
                ref={videoRef}
            />
            <canvas
                width="320" height="320"
                style={{ position: "absolute", top: 80, left: 400 }}
                ref={canvasRef}
            />
            {faceImage && (
                <img src={faceImage} alt="Face" />
            )}
            {faceDetected ? (
                <button onClick={capture}>
                    Capture Face
                </button>
            ) : (
                <p>Please position your face in front of the camera</p>
            )}
            <p>{message}</p>
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        top: 80,
                        left: 400,
                        width: 320,
                        height: 320,
                        borderRadius: '50%',
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 1,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    Loading
                </div>
            )}
            {camera && <h2>Face Detected : {detected ? "True" : "False"}</h2>}

        </div>
    );
};

const wait = time => new Promise(resolve => setTimeout(resolve, time));

const StyleBorder = styled.div`
position: absolute;
top: 76px;
left: 396px;
height: 320px;
width: 320px;
border-radius: 50%;
background: transparent;
border: 4px solid green;
`
const StyleBorderErr = styled.div`
position: absolute;
top: 76px;
left: 396px;
height: 320px;
width: 320px;
border-radius: 50%;
background: transparent;
border: 4px solid red;
`
export default FaceTakePhoto
 ;
 
;
