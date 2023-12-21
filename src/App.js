import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from './components/Particles/Particles';
import "./App.css";


export default function App() {
  return (
    <div className="App">
      <Particles className="particles"/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
            {/* {<FaceRecognition /> } */}
    </div>
  );
}

