import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, SoftShadows, Preload } from '@react-three/drei';
import CarModel from './CarModel';
import HeroLighting from './HeroLighting';
import CameraController from './CameraController';

const HeroScene = ({ scrollProgress }) => {
  const [dpr, setDpr] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Basic performance check and responsive scaling
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setDpr(mobile ? 1 : Math.min(2, window.devicePixelRatio));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#040508] pointer-events-none">
      {/* Subtle background gradients behind the canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#040508]/80 to-[#040508] z-0" />
      
      <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto">
        <Canvas
          shadows
          camera={{ position: [0, 2, 8], fov: 45 }}
          gl={{ antialias: true, alpha: false, preserveDrawingBuffer: false }}
          dpr={dpr}
          className="touch-none"
        >
          {/* Performance: Use softer shadows only on desktop */}
          {!isMobile && <SoftShadows size={20} samples={10} focus={0.5} />}
          
          <color attach="background" args={['#040508']} />
          <fog attach="fog" args={['#040508', 5, 20]} />

          <Suspense fallback={null}>
            <Environment preset="city" blur={0.8} />
            <HeroLighting isMobile={isMobile} />
            
            <CameraController scrollProgress={scrollProgress} isMobile={isMobile} />
            
            <CarModel />
            
            {/* Floor reflection/shadow catcher */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial transparent opacity={0.4} color="#000000" />
            </mesh>
            
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default HeroScene;
