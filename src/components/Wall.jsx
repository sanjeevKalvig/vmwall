import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useRef } from "react";

export default function Wall({ position, width, height, depth, color, children }) {
  const wallRef = useRef();

  useFrame(() => {
    if (wallRef.current) {
      wallRef.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <group position={position} ref={wallRef}>
      <Box args={[width, height, depth]} receiveShadow>
        <meshStandardMaterial color={color} />
      </Box>
      {children}
    </group>
  );
}
