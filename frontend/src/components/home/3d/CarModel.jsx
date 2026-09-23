import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, MeshReflectorMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const CarModel = (props) => {
  const groupRef = useRef();
  
  // Try to load a model, but we need a graceful fallback if it doesn't exist yet
  // In a real scenario, we'd use useGLTF('/models/car.glb') and handle errors.
  // For now, we will build a highly premium abstract "proxy" model 
  // that looks cinematic and high-tech until a real model is provided.
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 8 + state.clock.elapsedTime * 0.1,
        0.05
      );
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 16,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null} position={[0, -0.5, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Abstract Premium proxy for the vehicle */}
        
        {/* Main Body - sleek, dark metallic/glass */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[4, 1.2, 8]} />
          <meshPhysicalMaterial 
            color="#08090a" 
            metalness={0.9} 
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Top Cabin - glass */}
        <mesh position={[0, 1.6, -0.5]} castShadow>
          <boxGeometry args={[2.5, 0.8, 4]} />
          <meshPhysicalMaterial 
            color="#000000" 
            metalness={0.8} 
            roughness={0}
            transmission={0.9} // Glass effect
            thickness={1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Accents / Lights - Glowing */}
        <mesh position={[0, 0.8, 4.01]}>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
        </mesh>
        
        <mesh position={[0, 0.8, -4.01]}>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={5} />
        </mesh>
      </Float>

      {/* High-quality contact shadows */}
      <ContactShadows 
        resolution={1024} 
        scale={20} 
        blur={2} 
        opacity={0.8} 
        far={10} 
        color="#000000"
        position={[0, -0.99, 0]}
      />
    </group>
  );
};

// Preload if we actually had a model
// useGLTF.preload('/models/car.glb');

export default CarModel;
