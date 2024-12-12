import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [mask, setMask] = useState(null);
  const canvasRef = React.useRef();

  // Handle Image Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Save Mask Image
  const handleSaveMask = () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current.canvas.drawing;
      const maskURL = canvasElement.toDataURL("image/png");
      setMask(maskURL);
    }
  };

  // Clear the Canvas
  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  return (
    <div className="app">
      <h1>Image Inpainting Widget</h1>
      <div className="controls">
        <input type="file" accept="image/png, image/jpeg" onChange={handleUpload} />
        <label>Brush Size: </label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />
        <button onClick={handleSaveMask} disabled={!image}>
          Save Mask
        </button>
        <button onClick={handleClearCanvas} disabled={!image}>
          Clear Canvas
        </button>
      </div>
      {image && (
        <div className="canvas-container">
          <CanvasDraw
            ref={canvasRef}
            imgSrc={image}
            brushColor="#ffffff"
            brushRadius={brushSize}
            lazyRadius={1}
            canvasWidth={500}
            canvasHeight={500}
          />
        </div>
      )}
      {mask && (
        <div className="output-container">
          <div>
            <h3>Original Image</h3>
            <img src={image} alt="Original" width="250" />
          </div>
          <div>
            <h3>Mask Image</h3>
            <img src={mask} alt="Mask" width="250" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
