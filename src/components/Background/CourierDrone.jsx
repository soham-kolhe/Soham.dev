import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { scrollState } from '../../scrollState';

const SECTION_COLORS = [
  '#00F0FF', // hero: cyan
  '#00F0FF', // about: cyan
  '#FF00AA', // skills: magenta
  '#FF00AA', // projects: magenta
  '#B8FF00', // certs: green
  '#B8FF00', // contact: green
];

export default function CourierDrone({ degraded }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const trailRef = useRef();
  
  // Adaptive settings
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile and prefers-reduced-motion
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setIsMobile(mobileQuery.matches);
    setReducedMotion(motionQuery.matches);
    
    const handleMobileChange = (e) => setIsMobile(e.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    
    mobileQuery.addEventListener('change', handleMobileChange);
    motionQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Trail buffer size: smaller on mobile/degraded systems for performance
  const trailLength = useMemo(() => {
    if (degraded) return 10;
    if (isMobile) return 30;
    return 60;
  }, [degraded, isMobile]);

  const trailPositions = useMemo(() => {
    return new Float32Array(trailLength * 3);
  }, [trailLength]);

  const colorObj = useRef(new THREE.Color(SECTION_COLORS[0]));

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(4, 3.5, -2),   // hero
      new THREE.Vector3(-3.5, 2, 0),   // about
      new THREE.Vector3(3.2, 0.2, 1.5), // skills
      new THREE.Vector3(-3.8, -1.5, -1),// projects
      new THREE.Vector3(2.8, -3.2, 2.5),// certs
      new THREE.Vector3(-2.5, -4.8, 0.5),// contact
    ], false, 'catmullrom', 0.5);
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;

    const t = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    if (groupRef.current) {
      groupRef.current.position.lerp(point, 0.08);

      // Subtle idle bobbing
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.03;

      // Bank into scroll velocity
      const targetTilt = THREE.MathUtils.clamp(scrollState.velocity * 6, -0.5, 0.5);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetTilt, 0.1);

      // Face travel direction
      const lookTarget = point.clone().add(tangent);
      groupRef.current.lookAt(lookTarget);
    }

    // Color interpolation matching active section
    const segment = t * (SECTION_COLORS.length - 1);
    const idx = Math.floor(segment);
    const frac = segment - idx;
    const colorA = new THREE.Color(SECTION_COLORS[idx] || SECTION_COLORS[0]);
    const colorB = new THREE.Color(SECTION_COLORS[idx + 1] || colorA);
    colorObj.current.copy(colorA).lerp(colorB, frac);

    if (materialRef.current) {
      materialRef.current.color.copy(colorObj.current);
      materialRef.current.emissive.copy(colorObj.current);
      materialRef.current.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }

    // Shift trail buffer and push new position
    const arr = trailPositions;
    for (let i = arr.length - 3; i >= 3; i -= 3) {
      arr[i] = arr[i - 3];
      arr[i + 1] = arr[i - 2];
      arr[i + 2] = arr[i - 1];
    }
    if (groupRef.current) {
      arr[0] = groupRef.current.position.x;
      arr[1] = groupRef.current.position.y;
      arr[2] = groupRef.current.position.z;
    }
    if (trailRef.current) {
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (reducedMotion) return null;

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={0.7}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>
        
        {/* Disable light if degraded/mobile to preserve GPU cycles */}
        {!degraded && !isMobile && (
          <pointLight color={colorObj.current} intensity={1.0} distance={3} />
        )}
      </group>

      {/* Light trail */}
      <line ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailLength}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={colorObj.current} transparent opacity={0.3} />
      </line>
    </>
  );
}
