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

      {/* Controls: Always visible on touch screens, visible on hover for desktop */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-[#00E5FF] hover:text-black transition-colors shadow-lg active:scale-95"
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-[#00E5FF] hover:text-black transition-colors shadow-lg active:scale-95"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6 sm:w-8 bg-[#00E5FF]' : 'w-2 bg-white/50 hover:bg-white'}`}
              aria-label={`Go to slide ${idx + 1}`}
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
  const images = vehicle?.images?.length 
    ? vehicle.images 
    : vehicle?.galleryImages 
      ? vehicle.galleryImages 
      : (vehicle?.primary_image ? [vehicle.primary_image] : ['https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop']);

  return (
    <div className="relative w-full h-[45vh] sm:h-[55vh] lg:h-screen bg-black overflow-hidden">
      
      {/* View Toggle */}
      {has3D && images.length > 0 && (
        <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
          <button 
            onClick={() => setViewMode('3D')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors ${viewMode === '3D' ? 'bg-[#00E5FF] text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            3D View
          </button>
          <button 
            onClick={() => setViewMode('Gallery')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors ${viewMode === 'Gallery' ? 'bg-[#00E5FF] text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[11px] tracking-widest uppercase pointer-events-none bg-black/40 px-3 py-1 rounded-full border border-white/10">
            Drag to rotate
          </div>
        </div>
      ) : (
        <ImageGallery images={images} />
      )}
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[#08090B] z-10 hidden lg:block" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#08090B]/50 via-transparent to-[#08090B] z-10 lg:hidden" />
    </div>
  );
};
