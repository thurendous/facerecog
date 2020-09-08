import React from "react";
import Tilt from "react-tilt";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma4 mt0">
            <div className="absolute mt2">
                <Tilt className="Tilt br2 shadow-2" options={{ max: 30 }} style={{ height: 380, width: 800 }} >
                    <div className="center Tilt-inner pa3">
                        <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
                        <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                    </div>
                </Tilt >
            </div>
        </div>
    );
}


export default FaceRecognition;
