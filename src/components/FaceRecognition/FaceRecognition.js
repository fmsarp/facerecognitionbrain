import React from 'react';

export default function FaceRecognition({ input, faceData }) {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        {/* Displaying the input image */}
        <img id='inputimage' src={input} alt='' width='500px' height='auto' />

        {/* Displaying face detection boxes */}
        {faceData &&
          faceData.map((face, index) => (
            <div
              key={index}
              className='bounding-box'
              style={{
                top: face.topRow,
                left: face.leftCol,
                bottom: face.bottomRow,
                right: face.rightCol,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}
