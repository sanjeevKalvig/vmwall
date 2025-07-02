import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./styles.css";

export default function App() {
  return (
    <div className="app-layout">
      <div className="side-panel left-panel">
        <h3>Accessories</h3>
        <img
          src="/images/bike_helmet.png"
          alt="Bike Helmet"
          draggable
          data-model="/models/bike_helmet.glb"
          onDragStart={(e) => {
            e.dataTransfer.setData("modelPath", e.target.dataset.model);
          }}
        />
        <img
          src="/images/round_headlight.png"
          alt="Round Headlight"
          draggable
          data-model="/models/round_headlight.glb"
          onDragStart={(e) => {
            e.dataTransfer.setData("modelPath", e.target.dataset.model);
          }}
        />
        <img
          src="/images/camera.png"
          alt="Retro Camera"
          draggable
          data-model="/models/camera.glb"
          onDragStart={(e) => {
            e.dataTransfer.setData("modelPath", e.target.dataset.model);
          }}
        />
      </div>

      <div
        className="canvas-container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const modelPath = e.dataTransfer.getData("modelPath");
          if (modelPath) {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            window.dispatchEvent(new CustomEvent("model-drop", { detail: { modelPath, x, y } }));
          }
        }}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="side-panel right-panel">
        <h3>Preview</h3>
        <p>Select an item to view details here.</p>
      </div>
    </div>
  );
}
