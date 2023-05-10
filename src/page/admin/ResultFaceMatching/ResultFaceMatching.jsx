import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
// import RadialSeparators from "../RadialSeparators";
import RadialSeparators from "../Dashboard/components/RadialSeparators";
import ChangingProgressProvider from "../Dashboard/components/ChangingProgressProvider";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ResultFaceMatching = () => {
  return (
    <div className="content-face__photo">
      <div style={{ color: "#FFFFFF", textAlign: "center", marginBottom: 30 }}>
        <h3 style={{ fontSize: 106, marginBottom: 10, fontWeight: 600 }}>
          Face Matching
        </h3>
        <p
          style={{
            marginBottom: 70,
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: 24
          }}
        >
          Hệ thống nhận dạng khuôn mặt
        </p>
        <div className="box-take__photo">
          <div
            className="result-face__matching"
            style={{ textAlign: "center" }}
          >
            <h3
              style={{
                fontSize: 48,
                marginBottom: 10,
                fontWeight: 600,
                color: "#003E9C"
              }}
            >
              Kết quả xác thực
            </h3>
            <div
              className="result"
              style={{ maxWidth: 200, margin: "auto", marginBottom: 20 }}
            >
              <ChangingProgressProvider values={[0, 80]}>
                {(value) => (
                  <CircularProgressbarWithChildren
                    value={value}
                    text={`${value}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      rotation: 0,
                      strokeLinecap: "butt",
                      trailColor: "#E6F0FF"
                    })}
                  >
                    <RadialSeparators
                      count={12}
                      style={{
                        background: "#fff",
                        width: "2px",
                        height: `${10}%`
                      }}
                    />
                  </CircularProgressbarWithChildren>
                )}
              </ChangingProgressProvider>
            </div>
            <p style={{ color: "#00BA88" }}>Hình ảnh trùng khớp 90%</p>
            <Link
              to="/"
              className="next-photo__second"
            >
              Tiếp tục <FaArrowAltCircleRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultFaceMatching;
