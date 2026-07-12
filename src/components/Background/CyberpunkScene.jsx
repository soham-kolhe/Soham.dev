/* ============================================
   Cyberpunk 3D Background Scene
   Floating neon geometry that responds to scroll
   ============================================ */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* --- Neon Grid Floor --- */
function NeonGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <group ref={gridRef} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[60, 60, '#00F0FF', '#1a1a3e']}
        position={[0, 0, 0]}
      />
    </group>
  );
}

/* --- Floating Neon Shapes --- */
function FloatingShape({ position, geometry, color, speed = 1, rotationAxis = 'y' }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;

    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.5;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.3;

    // Subtle floating
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;

    // Pulse emissive
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.2;
    }
  });

  const geom = useMemo(() => {
    switch (geometry) {
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.7, 0);
      case 'torus':
        return new THREE.TorusGeometry(0.5, 0.15, 16, 32);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.6, 0);
      case 'torusKnot':
        return new THREE.TorusKnotGeometry(0.4, 0.12, 64, 16);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(0.5, 0);
      default:
        return new THREE.OctahedronGeometry(0.5, 0);
    }
  }, [geometry]);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} geometry={geom}>
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

/* --- Floating Particles --- */
function NeonParticles({ count = 100 }) {
  const particlesRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const colorOptions = [
      [0, 0.94, 1],     // cyan
      [1, 0, 0.67],     // magenta
      [0.72, 1, 0],     // green
    ];
    for (let i = 0; i < count; i++) {
      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      cols[i * 3] = c[0];
      cols[i * 3 + 1] = c[1];
      cols[i * 3 + 2] = c[2];
    }
    return cols;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* --- Central Data Sphere --- */
function DataSphere() {
  const sphereRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.15;
      sphereRef.current.rotation.x = Math.sin(t * 0.1) * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group position={[3, 0.5, -2]}>
      {/* Inner sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Outer wireframe ring */}
      <mesh ref={wireRef}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#FF00AA"
          emissive="#FF00AA"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Second ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#B8FF00"
          emissive="#B8FF00"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

/* --- Main Scene --- */
function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle scene sway based on time (scroll-linked via CSS/GSAP in parent)
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient and point lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#00F0FF" intensity={1} distance={20} />
      <pointLight position={[-5, 3, -5]} color="#FF00AA" intensity={0.8} distance={20} />
      <pointLight position={[0, -3, 5]} color="#B8FF00" intensity={0.5} distance={15} />

      {/* Stars background */}
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={3}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Neon grid floor */}
      <NeonGrid />

      {/* Central data sphere */}
      <DataSphere />

      {/* Floating neon shapes scattered around */}
      <FloatingShape position={[-4, 2, -3]} geometry="octahedron" color="#00F0FF" speed={0.8} />
      <FloatingShape position={[5, -1, -5]} geometry="torus" color="#FF00AA" speed={1.2} />
      <FloatingShape position={[-3, -1, 2]} geometry="icosahedron" color="#B8FF00" speed={0.6} />
      <FloatingShape position={[2, 3, -8]} geometry="torusKnot" color="#00F0FF" speed={0.9} />
      <FloatingShape position={[-6, 0, -6]} geometry="dodecahedron" color="#FF00AA" speed={0.7} />
      <FloatingShape position={[7, 1, -4]} geometry="octahedron" color="#B8FF00" speed={1.1} />

      {/* Particles */}
      <NeonParticles count={150} />
    </group>
  );
}

/* --- Exported Canvas Component --- */
export default function CyberpunkScene() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 1, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
