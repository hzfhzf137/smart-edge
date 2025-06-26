import React, { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Bounds } from '@react-three/drei';


function AirpodsModel({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return (
    <Bounds fit clip observe margin={1.2}>
      <primitive object={scene} />
    </Bounds>
  );
}

export default function AirpodsModelPage() {
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    axios.get("https://smartedge-backend-production.up.railway.app/api/products")
      .then(res => {
        const airpods = res.data.find(p => p.name === "AirPods Pro");
        if (airpods) setModelUrl(airpods.modelUrl);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111", position: "relative" }}>
      <Link to="/airpods" style={{ position: "absolute", top: 20, left: 20, color: "#fff", zIndex: 999 }}>
        ← Back to AirPods
      </Link>

      {modelUrl && (
        <Canvas>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={0.6} />
          <Suspense fallback={<Html center>Loading...</Html>}>
            <AirpodsModel modelUrl={modelUrl} />
          </Suspense>
          <OrbitControls makeDefault />
        </Canvas>
      )}
    </div>
  );
}
