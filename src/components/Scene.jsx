import { OrbitControls, Environment } from "@react-three/drei";
import { DropZone } from "./";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function Scene() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mode, setMode] = useState("rotate");
  const { camera, raycaster } = useThree();

  const handleDrop = (modelPath, x, y) => {
    raycaster.setFromCamera({ x, y }, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();

    if (raycaster.ray.intersectPlane(plane, intersection)) {
      const model = {
        modelPath,
        position: [intersection.x, intersection.y, 0],
        scale: 1,
      };
      setDroppedItems((prev) => [...prev, model]);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      const { modelPath, x, y } = e.detail;
      handleDrop(modelPath, x, y);
    };
    window.addEventListener("model-drop", listener);
    return () => window.removeEventListener("model-drop", listener);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "t") setMode("translate");
      if (e.key === "r") setMode("rotate");
      if (e.key === "s") setMode("scale");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      <DropZone
        position={[0, 0, 0]}
        width={3}
        height={3}
        depth={0}
        color="#e0e0e0"
        droppedItems={droppedItems}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        
        mode={mode}
        setMode={() => {}}
      />
    </>
  );
}
