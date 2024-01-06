// Importing necessary components and styles
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "./components/Particles/Particles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";
import { useState } from "react";


export default function App() {

  const [route, setRoute] = useState('Signin');
  const [input, setInput] = useState("");
  const [faceData, setFaceData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  


  // Handling input changes in the form
  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  // Handling button submission
  const onButtonSubmit = () => {
    // Personal Access Token (PAT) for authentication
    const PAT = '***';
    const USER_ID = 'fmsarp';
    const APP_ID = 'Devtest';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = input;

    // Creating a JSON payload for the Clarifai API
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
            }
          }
        }
      ]
    });

    // Configuring the options for the API request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT,
        'Content-Type': 'application/json', // Specifying JSON content type
      },
      body: raw
    };

    // Making a fetch request to the Clarifai API
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // Extracting information about detected regions in the image
        const regions = result.outputs[0].data.regions;

        const faceData = regions.map(region => {
          const boundingBox = region.region_info.bounding_box;
          const width = Number(document.getElementById('inputimage').width);
          const height = Number(document.getElementById('inputimage').height);
  
          return {
            topRow: boundingBox.top_row * height,
            leftCol: boundingBox.left_col * width,
            bottomRow: height - boundingBox.bottom_row * height,
            rightCol: width - boundingBox.right_col * width,
          };
        });

        setFaceData(faceData);
      })
      .catch(error => console.log('error', error));
  }

  
  const onRouteChange = (newRoute) => {
    if (newRoute === 'Signout') {
      setIsSignedIn(true);
    } else if (newRoute === 'Home') {
      setIsSignedIn(false);
    }
    setRoute(newRoute);
    console.log(newRoute)
  };
  


  // Rendering the main App component
  return (
    <div className="App">
      <Particles className="particles" />
      <Navigation isSignedIn={isSignedIn} onRouteChange={() => onRouteChange('Home')}/>  
      
      {route === 'Home'
      ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={handleInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition input={input} faceData={faceData} />
        </div>
      ) : (
        route === 'Signin' 
        ? <Signin onRouteChange={() => onRouteChange('Home')}/>
        : <Register onRouteChange={() => onRouteChange('Register')}/>   
      )}
      
    </div>

    
  );
  
}
