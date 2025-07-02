import { useGLTF, useCursor } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function AccessoryModel({ modelPath, position, scale, onDrop }) {
  const groupRef = useRef()
  const { scene } = useGLTF(modelPath)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState(new THREE.Vector3())
  const { raycaster, mouse, camera, scene: threeScene } = useThree()

  useCursor(!dragging && groupRef.current, 'grab', 'auto')

  const handlePointerDown = (e) => {
    e.stopPropagation()
    const clickedPoint = e.point.clone()
    const objectPosition = groupRef.current.position.clone()
    setOffset(objectPosition.sub(clickedPoint))
    setDragging(true)
  }

  const handlePointerUp = (e) => {
    if (!dragging) return
    e.stopPropagation()
    setDragging(false)

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(threeScene.children, true)

    const dropZone = intersects.find(obj => obj.object.parent?.userData?.isDropZone)
    if (dropZone) {
      // Optionally snap to drop zone center
      const dropPosition = dropZone.object.parent.position
      groupRef.current.position.set(dropPosition.x, dropPosition.y, dropPosition.z)
      if (onDrop) onDrop() // Notify parent if needed
    }
  }

  useFrame(() => {
    if (!dragging) return

    const planeZ = position[2]
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeZ)
    const intersection = new THREE.Vector3()

    raycaster.setFromCamera(mouse, camera)
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      intersection.add(offset)
      groupRef.current.position.set(intersection.x, intersection.y, planeZ)
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setDragging(false)}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  )
}
