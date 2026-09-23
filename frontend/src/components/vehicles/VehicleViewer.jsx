import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Only load these if a 3D model exists to save performance. 
// However, since we can't conditionally import hooks easily inside a component without dynamic imports, 
// we will import them statically but only render the Canvas when needed.
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          src={images[currentIndex]?.image_url || images[currentIndex]}
          alt="Vehicle"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Controls */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            →
          </button>
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-[#D4AF37]' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const VehicleViewer = ({ vehicle }) => {
  const [viewMode, setViewMode] = useState(vehicle?.model_3d_url ? '3D' : 'Gallery');

  // If we don't have a 3D model, only show gallery
  const has3D = !!vehicle?.model_3d_url;
  
  // Collect images (fallback to galleryImages array if API returns strings, or object if it's from images relation)
  const images = vehicle?.images?.length ? vehicle.images : vehicle?.galleryImages || [];

  return (
    <div className="relative w-full h-[50vh] lg:h-screen bg-black overflow-hidden">
      
      {/* View Toggle */}
      {has3D && images.length > 0 && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-1 bg-black/50 backdrop-blur-md rounded-sm border border-white/10">
          <button 
            onClick={() => setViewMode('3D')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === '3D' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'}`}
          >
            3D View
          </button>
          <button 
            onClick={() => setViewMode('Gallery')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === 'Gallery' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Gallery
          </button>
        </div>
      )}

      {viewMode === '3D' && has3D ? (
        <div className="w-full h-full cursor-move">
          <Canvas shadows camera={{ position: [4, 2, 4], fov: 45 }}>
            <color attach="background" args={['#040508']} />
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5} adjustCamera={false}>
                <Model url={vehicle.model_3d_url} />
              </Stage>
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} minDistance={2} maxDistance={10} />
          </Canvas>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase pointer-events-none">
            Drag to rotate
          </div>
        </div>
      ) : (
        <ImageGallery images={images} />
      )}
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[#08090B] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#08090B]/50 via-transparent to-[#08090B] z-10 lg:hidden" />
    </div>
  );
};
