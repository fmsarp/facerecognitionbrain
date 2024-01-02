// components/FaceRecognition/FaceRecognition.js

import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ input, faceData }) => {
  const renderFaceBoxes = () => {
    return faceData.map((face, index) => {
      const { topRow, leftCol, bottomRow, rightCol } = face.boundingBox;
      return (
        <div
          key={index}
          className="bounding-box"
          style={{
            top: topRow + "em",
            left: leftCol + "em",
            bottom: bottomRow + "em",
            right: rightCol + "em",
          }}
        ></div>
      );
    });
  };

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={input}
          alt=""
          width="500px"
          height="auto"
          style={{ maxWidth: "100%" }}
        />
        {renderFaceBoxes()}
      </div>
    </div>
  );
};

export default FaceRecognition;
