// src/pages/airpods/components/airpodsModelPage.jsx
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei'

// A small loader component that shows progress while the model loads
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center style={{ color: 'white', fontSize: '1rem' }}>
      {progress.toFixed(0)}% loaded
    </Html>
  )
}

function AirpodsModel() {
  // If your site is at /smart-edge/, ensure this path is correct:
  // e.g. useGLTF('/smart-edge/airpods.model.glb') if you tested that works.
  // Otherwise, useGLTF('/airpods.model.glb').
  const { scene } = useGLTF('/smart-edge/airpods.model.glb')
  return <primitive object={scene} />
}

export default function AirpodsModelPage() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        // Subtle gradient background
        background: 'linear-gradient(135deg, #1c1c1c, #333)'
      }}
    >
      {/* Back to AirPods button */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 999 }}>
        <Link
          to="/airpods"
          style={{
            color: '#fff',
            textDecoration: 'none',
            background: '#444',
            padding: '8px 12px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          ← Back to AirPods
        </Link>
      </div>

      <Canvas
        // Set an initial camera position so it's not too zoomed in
        camera={{ position: [0, 1.5, 4], fov: 50 }}
      >
        {/* Basic lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} />

        <Suspense fallback={<Loader />}>
          <AirpodsModel />
        </Suspense>

        {/* Allow orbit, zoom, and pan */}
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  )
}
