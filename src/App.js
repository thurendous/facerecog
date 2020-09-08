import React, { Component } from 'react';
import Logo from './component/logo/logo';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Navigation from './component/Navigation/Navigation';
import Signin from './component/Signin/Signin';
import Rank from './component/Rank/Rank';
import './App.css';
// import { render } from '@testing-library/react';
import "tachyons";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'dd53b64aa84b47d9af91510fd53d28b2'
});



class App extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
      input: "",
      box: {},
      route: "signin"
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" />

        <Navigation />
        {this.state.route === "signin"
          ? <Signin />
          :
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>}
      </div>
    );
  }
}

export default App;


// library:
// particles.js 
// techyons
// css patterns Gallery