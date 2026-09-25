import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlaceholderVehicle = React.forwardRef<THREE.Group, {}>((_, ref) => {
  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} envMapIntensity={2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1, -0.2]}>
        <boxGeometry args={[1.6, 0.4, 2]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} envMapIntensity={3} />
      </mesh>
      {[-1.1, 1.1].map((x, i) => 
        [-1.3, 1.3].map((z, j) => (
          <mesh key={`${i}-${j}`} castShadow position={[x, 0.25, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
          </mesh>
        ))
      )}
    </group>
  );
});
PlaceholderVehicle.displayName = 'PlaceholderVehicle';

const SceneRig = ({ isMobile, prefersReducedMotion }: { isMobile: boolean, prefersReducedMotion: boolean }) => {
  const { camera } = useThree();
  const carRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);

  // Floating idle animation
  useFrame((state) => {
    if (!prefersReducedMotion && containerRef.current) {
      containerRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  useLayoutEffect(() => {
    if (!carRef.current || prefersReducedMotion) return;

    // Set initial positions for SCENE 01
    // On desktop, car is shifted right. On mobile, it's centered but lower.
    const startX = isMobile ? 0 : 2;
    const startY = isMobile ? -1 : 0;
    
    camera.position.set(startX, startY + 2, 8);
    carRef.current.rotation.set(0, -Math.PI / 6, 0);
    carRef.current.position.set(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cinematic-sequence",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth scrubbing
      }
    });

    // To SCENE 02: BUILT FOR THE CITY (Orbit side/rear)
    tl.to(camera.position, {
      x: isMobile ? -3 : -5,
      y: 3,
      z: 6,
      ease: "power2.inOut",
    }, 0);
    tl.to(carRef.current.rotation, {
      y: Math.PI / 4,
      ease: "power2.inOut",
    }, 0);

    // To SCENE 03: DESIGNED FOR THE JOURNEY (Move forward)
    tl.to(camera.position, {
      x: isMobile ? 2 : 4,
      y: 1.5,
      z: -4,
      ease: "power2.inOut",
    }, 1);
    tl.to(carRef.current.rotation, {
      y: -Math.PI / 2,
      ease: "power2.inOut",
    }, 1);
    tl.to(carRef.current.position, {
      z: -2,
      ease: "power2.inOut",
    }, 1);

    // To SCENE 04: READY WHEN YOU ARE (Final hero stance)
    tl.to(camera.position, {
      x: 0,
      y: 2,
      z: 9,
      ease: "power2.inOut",
    }, 2);
    tl.to(carRef.current.rotation, {
      y: -Math.PI / 8,
      ease: "power2.inOut",
    }, 2);
    tl.to(carRef.current.position, {
      z: 0,
      ease: "power2.inOut",
    }, 2);

    // Ensure camera always looks at the car
    tl.eventCallback("onUpdate", () => {
      camera.lookAt(0, 0, 0);
    });

    return () => {
      tl.kill();
    };
  }, [camera, isMobile, prefersReducedMotion]);

  return (
    <group ref={containerRef}>
      <PlaceholderVehicle ref={carRef} />
    </group>
  );
};

export const VehicleScene = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    checkMobile();
    checkMotion();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
      <Canvas shadows dpr={isMobile ? 1 : [1, 2]} gl={{ antialias: !isMobile, alpha: true }}>
        <PerspectiveCamera makeDefault />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow={!isMobile} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5FF" />
        <pointLight position={[0, 5, -10]} intensity={0.5} color="#ffffff" />
        
        <Environment preset="city" />
        
        <SceneRig isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />

        <ContactShadows position={[0, -0.1, 0]} opacity={0.7} scale={10} blur={2.5} far={4} resolution={isMobile ? 128 : 256} color="#000000" />
        
        {!isMobile && !prefersReducedMotion && (
          <Sparkles count={40} scale={12} size={2} speed={0.2} opacity={0.15} color="#00E5FF" />
        )}
      </Canvas>
    </div>
  );
};
