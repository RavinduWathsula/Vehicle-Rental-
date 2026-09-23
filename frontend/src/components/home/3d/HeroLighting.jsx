import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HeroLighting = ({ isMobile }) => {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current && !isMobile) {
      // Subtle pulse to the main light
      lightRef.current.intensity = 5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Main key light */}
      <spotLight
        ref={lightRef}
        position={[0, 10, 10]}
        angle={0.4}
        penumbra={1}
        intensity={5}
        castShadow={!isMobile}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        color="#ffffff"
      />
      
      {/* Cinematic rim lights */}
      <spotLight
        position={[-10, 5, -10]}
        angle={0.5}
        penumbra={1}
        intensity={8}
        color="#00B8CC" // Brand accent color (blue-ish)
      />
      
      <spotLight
        position={[10, 5, -10]}
        angle={0.5}
        penumbra={1}
        intensity={8}
        color="#ffffff"
      />
      
      {/* Underglow or floor reflection light */}
      <pointLight position={[0, -1, 0]} intensity={1} color="#00B8CC" />
    </>
  );
};

export default HeroLighting;
