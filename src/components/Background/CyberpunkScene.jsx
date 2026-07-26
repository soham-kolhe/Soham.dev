/* ============================================
   Cyberpunk 3D Background Scene
   Floating neon geometry that responds to scroll
   ============================================ */
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei/core/PerformanceMonitor';
import * as THREE from 'three';
import CourierDrone from './CourierDrone';
import { scrollState, SECTION_COLORS } from '../../scrollState';

const SECTION_COLOR_OBJS = SECTION_COLORS.map((c) => new THREE.Color(c));

// Define camera and DataSphere checkpoints based on scroll progress (0.0 to 1.0)
const SCENE_CHECKPOINTS = [
  {
    progress: 0.0, // Hero
    camera: { pos: [0, 1, 8], fov: 60 },
    sphere: { pos: [3, 0.5, -2], scale: 1.0 }
  },
  {
    progress: 0.25, // About
    camera: { pos: [-2, 1.5, 7], fov: 58 },
    sphere: { pos: [2.5, 0.8, -3], scale: 0.9 }
  },
  {
    progress: 0.5, // Skills & Projects
    camera: { pos: [2.2, 0.5, 6], fov: 55 },
    sphere: { pos: [0.5, 0.2, -1], scale: 1.25 }
  },
  {
    progress: 0.75, // Certifications
    camera: { pos: [0, -0.8, 9], fov: 62 },
    sphere: { pos: [3.5, -1.0, -3], scale: 0.8 }
  },
  {
    progress: 1.0, // Contact
    camera: { pos: [1.5, -1.8, 8.5], fov: 60 },
    sphere: { pos: [2.0, -2.0, -2], scale: 0.9 }
  }
];

/* --- Optimized Background Stars --- */
function BackgroundStars({ count = 350, degraded }) {
  const starsRef = useRef();
  const actualCount = degraded ? Math.floor(count * 0.4) : count;

  const positions = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    for (let i = 0; i < actualCount; i++) {
      const r = 30 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [actualCount]);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* --- Floating Neon Shapes --- */
function FloatingShape({ position, geometry, color, speed = 1, reducedMotion }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const t = state.clock.elapsedTime * speed;

    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.5;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.65 + Math.sin(t * 2) * 0.25;
    }
  });

  const geom = useMemo(() => {
    switch (geometry) {
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.7, 0);
      case 'torus':
        return new THREE.TorusGeometry(0.5, 0.12, 8, 20);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.6, 0);
      default:
        return new THREE.OctahedronGeometry(0.5, 0);
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} geometry={geom}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.95}
        wireframe
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* --- Floating Particles --- */
function NeonParticles({ count = 45 }) {
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
function DataSphere({ degraded, reducedMotion }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const wireRef = useRef();
  const innerMatRef = useRef();
  const outerMatRef = useRef();
  const colorObj = useRef(new THREE.Color(SECTION_COLORS[0]));

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

    const prog = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const segment = prog * (SECTION_COLORS.length - 1);
    const idx = Math.floor(segment);
    const frac = segment - idx;
    const colorA = SECTION_COLOR_OBJS[idx] || SECTION_COLOR_OBJS[0];
    const colorB = SECTION_COLOR_OBJS[idx + 1] || colorA;
    colorObj.current.copy(colorA).lerp(colorB, frac);
    if (innerMatRef.current) {
      innerMatRef.current.color.copy(colorObj.current);
      innerMatRef.current.emissive.copy(colorObj.current);
    }

    if (groupRef.current && !degraded && !reducedMotion) {
      const progress = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
      let cpA = SCENE_CHECKPOINTS[0];
      let cpB = SCENE_CHECKPOINTS[SCENE_CHECKPOINTS.length - 1];

      for (let i = 0; i < SCENE_CHECKPOINTS.length - 1; i++) {
        if (progress >= SCENE_CHECKPOINTS[i].progress && progress <= SCENE_CHECKPOINTS[i + 1].progress) {
          cpA = SCENE_CHECKPOINTS[i];
          cpB = SCENE_CHECKPOINTS[i + 1];
          break;
        }
      }

      const segmentRange = cpB.progress - cpA.progress;
      const factor = segmentRange > 0 ? (progress - cpA.progress) / segmentRange : 0;

      const targetSphereX = THREE.MathUtils.lerp(cpA.sphere.pos[0], cpB.sphere.pos[0], factor);
      const targetSphereY = THREE.MathUtils.lerp(cpA.sphere.pos[1], cpB.sphere.pos[1], factor);
      const targetSphereZ = THREE.MathUtils.lerp(cpA.sphere.pos[2], cpB.sphere.pos[2], factor);
      const targetSphereScale = THREE.MathUtils.lerp(cpA.sphere.scale, cpB.sphere.scale, factor);

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetSphereX, 0.03);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetSphereY, 0.03);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetSphereZ, 0.03);

      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetSphereScale, 0.03);
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={[3, 0.5, -2]}>
      {/* Inner sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={degraded ? 0.7 : 1.0}
          wireframe
          transparent
          opacity={degraded ? 0.6 : 0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer wireframe ring */}
      <mesh ref={wireRef}>
        <torusGeometry args={[1.8, 0.02, 6, degraded ? 14 : 24]} />
        <meshStandardMaterial
          ref={outerMatRef}
          color="#FF00AA"
          emissive="#FF00AA"
          emissiveIntensity={0.95}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Second ring */}
      {!degraded && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.0, 0.015, 6, 20]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={0.55}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}
    </group>
  );
}

/* --- Main Scene --- */
function Scene({ degraded, reducedMotion }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      if (!reducedMotion) {
        const targetRotationY = (scrollState.progress * Math.PI * 0.25) + Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.035);

        const targetPositionY = -scrollState.progress * 1.1;
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPositionY, 0.035);

        const targetRotationX = scrollState.velocity * 0.06;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.04);
      } else {
        groupRef.current.rotation.y = 0;
        groupRef.current.position.y = 0;
        groupRef.current.rotation.x = 0;
      }
    }

    if (!degraded && !reducedMotion) {
      const progress = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
      let cpA = SCENE_CHECKPOINTS[0];
      let cpB = SCENE_CHECKPOINTS[SCENE_CHECKPOINTS.length - 1];

      for (let i = 0; i < SCENE_CHECKPOINTS.length - 1; i++) {
        if (progress >= SCENE_CHECKPOINTS[i].progress && progress <= SCENE_CHECKPOINTS[i + 1].progress) {
          cpA = SCENE_CHECKPOINTS[i];
          cpB = SCENE_CHECKPOINTS[i + 1];
          break;
        }
      }

      const segmentRange = cpB.progress - cpA.progress;
      const factor = segmentRange > 0 ? (progress - cpA.progress) / segmentRange : 0;

      const targetCamX = THREE.MathUtils.lerp(cpA.camera.pos[0], cpB.camera.pos[0], factor);
      const targetCamY = THREE.MathUtils.lerp(cpA.camera.pos[1], cpB.camera.pos[1], factor);
      const targetCamZ = THREE.MathUtils.lerp(cpA.camera.pos[2], cpB.camera.pos[2], factor);
      const targetFov = THREE.MathUtils.lerp(cpA.camera.fov, cpB.camera.fov, factor);

      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.03);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.03);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.03);

      if (Math.abs(state.camera.fov - targetFov) > 0.01) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.05);
        state.camera.updateProjectionMatrix();
      }

      state.camera.lookAt(0, 0, 0);
    } else {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1, 0.05);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 8, 0.05);
      if (Math.abs(state.camera.fov - 60) > 0.01) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 60, 0.05);
        state.camera.updateProjectionMatrix();
      }
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={['#000000', 12, 38]} />

      <ambientLight intensity={degraded ? 0.4 : 0.25} />
      <pointLight position={[5, 5, 5]} color="#00F0FF" intensity={1} distance={20} />
      {!degraded && (
        <>
          <pointLight position={[-5, 3, -5]} color="#FF00AA" intensity={0.8} distance={20} />
          <pointLight position={[0, -3, 5]} color="#00F0FF" intensity={0.5} distance={15} />
        </>
      )}

      {/* Stars backdrop */}
      <BackgroundStars count={350} degraded={degraded} />

      {/* Central data sphere */}
      <DataSphere degraded={degraded} reducedMotion={reducedMotion} />

      {/* Floating neon shapes */}
      <FloatingShape position={[-4, 2, -3]} geometry="octahedron" color="#00F0FF" speed={0.8} reducedMotion={reducedMotion} />
      {!degraded && (
        <>
          <FloatingShape position={[5, -1, -5]} geometry="torus" color="#FF00AA" speed={1.2} reducedMotion={reducedMotion} />
          <FloatingShape position={[-3, -1, 2]} geometry="icosahedron" color="#FF00AA" speed={0.6} reducedMotion={reducedMotion} />
        </>
      )}

      {/* Particles */}
      <NeonParticles count={degraded ? 20 : 45} />

      {/* Scroll-Reactive Companion Drone */}
      <CourierDrone degraded={degraded} />
    </group>
  );
}

/* --- Exported Canvas Component --- */
export default function CyberpunkScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [degraded, setDegraded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const forceSettings = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    if (params.get('perf') === 'high' || params.get('degraded') === 'false') {
      return 'high';
    }
    if (params.get('perf') === 'low' || params.get('degraded') === 'true') {
      return 'low';
    }
    return null;
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileQuery.matches);
    const handleMobileChange = (e) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', handleMobileChange);
    return () => mobileQuery.removeEventListener('change', handleMobileChange);
  }, []);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isLowConcurrency = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      if (isLowConcurrency) {
        setDegraded(true);
      }
    }
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const activeDegraded = forceSettings ? (forceSettings === 'low') : degraded;

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
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onDecline={() => setDegraded(true)}
          onIncline={() => setDegraded(false)}
        >
          <Scene degraded={activeDegraded} reducedMotion={reducedMotion} />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
