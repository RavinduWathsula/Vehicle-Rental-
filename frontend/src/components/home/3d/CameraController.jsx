import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const CameraController = ({ scrollProgress = 0, isMobile }) => {
  const { camera } = useThree();
  const groupRef = useRef();

  useFrame((state) => {
    // Cinematic subtle camera sway
    const time = state.clock.elapsedTime;
    
    if (!isMobile) {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(time * 0.2) * 0.5 + state.pointer.x * 2,
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        2 + Math.cos(time * 0.2) * 0.5 + state.pointer.y * 1,
        0.05
      );
    }

    // Connect scroll progress to camera position or lookAt if needed
    // As the user scrolls down, the camera can pull back or change angle
    if (scrollProgress > 0) {
      const zOffset = scrollProgress * 10;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + zOffset, 0.1);
    } else {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.1);
    }
    
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default CameraController;
