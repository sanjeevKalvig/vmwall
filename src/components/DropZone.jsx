import { Box, TransformControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

function AccessoryModel({ modelPath, position, scale, onClick, refCallback }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useEffect(() => {
    if (refCallback) refCallback(modelRef.current);
  }, [refCallback]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={position}
      scale={scale}
      onClick={onClick}
    />
  );
}

export default function DropZone({
  position,
  width,
  height,
  depth,
  color,
  droppedItems,
  selectedIndex,
  setSelectedIndex,
  mode,
}) {
  const selectedRef = useRef();

  return (
    <group position={position} userData={{ isDropZone: true }}>
      <Box args={[width, height, depth]}>
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>

      {droppedItems.map((item, index) => (
        <AccessoryModel
          key={index}
          modelPath={item.modelPath}
          position={item.position}
          scale={item.scale}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex(index);
          }}
          refCallback={(ref) => {
            if (index === selectedIndex) selectedRef.current = ref;
          }}
        />
      ))}

      {selectedIndex !== null && selectedRef.current && (
        <TransformControls
          object={selectedRef.current}
          mode={mode}
          showX
          showY
          showZ
        />
      )}
    </group>
  );
}
