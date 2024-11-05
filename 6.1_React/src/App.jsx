import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef, useState } from 'react'
import './App.css'

function RotatingBox() {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
    }
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[0.5, 0.5, 0]}
      scale={active ? 2.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Saucer() {
  const gltf = useLoader(GLTFLoader, '/Models/ufo.glb')
  const ufoRef = useRef(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  useFrame((state, delta) => {
    if (ufoRef.current) {
 
      setElapsedTime(prev => prev + delta)
      
      
      ufoRef.current.position.y = 10 + Math.sin(elapsedTime * 2) * 0.5 
      
      const baseScale = 0.1
      const scaleOffset = Math.sin(elapsedTime * 3) * 0.01 
      ufoRef.current.scale.set(
        baseScale + scaleOffset,
        baseScale + scaleOffset,
        baseScale + scaleOffset
      )
    }
  })

  return <primitive 
    ref={ufoRef}
    object={gltf.scene} 
    position={[0, 10, 0]} 
    scale={[0.1, 0.1, 0.1]} 
  />
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [3, 3, 3] }}>

      <spotLight 
        position={[0, 9.5, 0]} 
        angle={0.2}
        penumbra={0.5}
        intensity={500}
        color="cyan"
        distance={20}
        target-position={[-50, -50, -50]} // Points toward ground
      />

        <Saucer />
        <RotatingBox />
        <OrbitControls />
      </Canvas>
    </div>
  )


  
}

export default App