import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "./components/Particles/Particles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import "./App.css";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [faceData, setFaceData] = useState([]);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs.data.regions.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    console.log(clarifaiFace)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (faceData) => {

    setFaceData({faceData})
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  };


  function onButtonSubmit() {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = ***;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'fmsarp';
    const APP_ID = 'Devtest';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
              // "base64": IMAGE_BYTES_STRING
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {

        const regions = result.outputs[0].data.regions;

        const newfaceData = regions.map(region => {
          const boundingBox = region.region_info.bounding_box;
          return {
            boundingBox: {
              topRow: boundingBox.top_row,
              leftCol: boundingBox.left_col,
              bottomRow: boundingBox.bottom_row,
              rightCol: boundingBox.right_col,
            },
            concepts: region.data.concepts,
          };
        });

        calculateFaceLocation(newfaceData)

        displayFaceBox()

        // setFaceData(newfaceData);

        // Set the face data to state or pass it directly to FaceRecognition component
        // e.g., setFaceData(faceData);
        // or
        // <FaceRecognition input={input} faceData={faceData} />

      })
      .catch(error => console.log('error', error));

  }

  return (
    <div className="App">
      <Particles className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={handleInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition input={input} faceData={faceData} />
    </div>
  );
}
