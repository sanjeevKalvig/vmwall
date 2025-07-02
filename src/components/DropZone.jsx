import { Box, TransformControls, useGLTF } from "@react-three/drei";

function AccessoryModel({ modelPath, position, scale }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} scale={scale} />;
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
        />
      ))}

      {selectedIndex !== null && droppedItems[selectedIndex] && (
        <TransformControls
          object={droppedItems[selectedIndex].object}
          mode={mode}
        />
      )}
    </group>
  );
}
