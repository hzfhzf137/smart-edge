// AirpodsModelPage.jsx
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Bounds } from '@react-three/drei'

function Loader() {
  return (
    <Html center style={{ color: 'white', fontSize: '1rem' }}>
      Loading...
    </Html>
  )
}

function MagSafeModel() {
  const { scene } = useGLTF('/magSafe.model.glb')

scene.rotation.x = Math.PI / 2  
scene.rotation.y = Math.PI /2    
scene.rotation.z = 0             
  

  return (
    <Bounds fit clip observe margin={1.2}>
      <primitive object={scene} />
    </Bounds>
  )
}

export default function MagSafeModelPage() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #1c1c1c, #333)',
        position: 'relative'
      }}
    >
      {/* Back button */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 999 }}>
        <Link
          to="/chargers"
          style={{
            color: '#fff',
            textDecoration: 'none',
            background: '#444',
            padding: '8px 12px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          ← Back to Magsafe Charger 
        </Link>
      </div>

      <Canvas>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} />

        <Suspense fallback={<Loader />}>
          <MagSafeModel />
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}
