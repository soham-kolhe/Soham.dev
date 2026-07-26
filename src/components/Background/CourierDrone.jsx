/* ============================================
   Courier Drone — Section-Aware Companion
   Follows a spline path through the scene, with
   behavior that adapts to the active section.
   ============================================ */
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  scrollState,
  SECTION_COLORS,
  SECTION_CONFIGS,
  TOTAL_SECTIONS,
} from '../../scrollState';

const SECTION_COLOR_OBJS = SECTION_COLORS.map((c) => new THREE.Color(c));

export default function CourierDrone({ degraded }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const trailRef = useRef();

  // Adaptive settings
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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

  // Trail config
  const showTrail = !degraded && !isMobile;
  const trailLength = 12;

  const trailPositions = useMemo(() => {
    return new Float32Array(showTrail ? trailLength * 3 : 0);
  }, [showTrail, trailLength]);

  const colorObj = useRef(new THREE.Color(SECTION_COLORS[0]));

  // Smoothed drone config values (lerped per frame for seamless transitions)
  const droneState = useRef({
    posLerp: 0.06,
    bobAmp: 0.03,
    bobSpeed: 1.5,
    bankMult: 4,
    glowSpeed: 2,
    glowRange: 0.1,
    baseEmissive: 0.6,
    opacity: 0.9,
  });

  // 8-point spline matching section layout
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(4, 3.5, -2), // 0: Hero — idle patrol
        new THREE.Vector3(-3.5, 2, 0), // 1: About — escort
        new THREE.Vector3(3.2, 0.5, 1.5), // 2: Projects — active scan
        new THREE.Vector3(-2.5, -0.5, 0.5), // 3: Open Source — relay
        new THREE.Vector3(2.8, -1.5, 2), // 4: Certifications — verification
        new THREE.Vector3(-3.0, -2.5, 1), // 5: Skills — scanning
        new THREE.Vector3(1.5, -3.8, 0), // 6: Contact — transmission
        new THREE.Vector3(-1.0, -5.0, -1), // 7: Footer — return to base
      ],
      false,
      'catmullrom',
      0.5
    );
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;

    const t = THREE.MathUtils.clamp(scrollState.progress, 0, 1);
    const idx = scrollState.sectionIndex;
    const sectionFrac = scrollState.sectionProgress;

    // --- Interpolate drone config from current and next section ---
    const config = SECTION_CONFIGS[idx]?.drone || SECTION_CONFIGS[0].drone;
    const nextConfig =
      SECTION_CONFIGS[Math.min(idx + 1, TOTAL_SECTIONS - 1)]?.drone || config;

    const ds = droneState.current;
    const cfgLerp = 0.04; // smooth config transition speed
    ds.posLerp +=
      (THREE.MathUtils.lerp(config.posLerp, nextConfig.posLerp, sectionFrac) -
        ds.posLerp) *
      cfgLerp;
    ds.bobAmp +=
      (THREE.MathUtils.lerp(config.bobAmp, nextConfig.bobAmp, sectionFrac) -
        ds.bobAmp) *
      cfgLerp;
    ds.bobSpeed +=
      (THREE.MathUtils.lerp(
        config.bobSpeed,
        nextConfig.bobSpeed,
        sectionFrac
      ) -
        ds.bobSpeed) *
      cfgLerp;
    ds.bankMult +=
      (THREE.MathUtils.lerp(
        config.bankMult,
        nextConfig.bankMult,
        sectionFrac
      ) -
        ds.bankMult) *
      cfgLerp;
    ds.glowSpeed +=
      (THREE.MathUtils.lerp(
        config.glowSpeed,
        nextConfig.glowSpeed,
        sectionFrac
      ) -
        ds.glowSpeed) *
      cfgLerp;
    ds.glowRange +=
      (THREE.MathUtils.lerp(
        config.glowRange,
        nextConfig.glowRange,
        sectionFrac
      ) -
        ds.glowRange) *
      cfgLerp;
    ds.baseEmissive +=
      (THREE.MathUtils.lerp(
        config.baseEmissive,
        nextConfig.baseEmissive,
        sectionFrac
      ) -
        ds.baseEmissive) *
      cfgLerp;
    ds.opacity +=
      (THREE.MathUtils.lerp(config.opacity, nextConfig.opacity, sectionFrac) -
        ds.opacity) *
      cfgLerp;

    // --- Position along spline ---
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    if (groupRef.current) {
      groupRef.current.position.lerp(point, ds.posLerp);

      // Section-reactive idle bobbing
      groupRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * ds.bobSpeed) * ds.bobAmp;

      // Bank into scroll velocity with section-reactive multiplier
      const targetTilt = THREE.MathUtils.clamp(
        scrollState.velocity * ds.bankMult,
        -0.5,
        0.5
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetTilt,
        0.1
      );

      // Face travel direction
      const lookTarget = point.clone().add(tangent);
      groupRef.current.lookAt(lookTarget);
    }

    // --- Color interpolation matching active section ---
    const segment = t * (SECTION_COLORS.length - 1);
    const colorIdx = Math.floor(segment);
    const frac = segment - colorIdx;
    const colorA = SECTION_COLOR_OBJS[colorIdx] || SECTION_COLOR_OBJS[0];
    const colorB = SECTION_COLOR_OBJS[colorIdx + 1] || colorA;
    colorObj.current.copy(colorA).lerp(colorB, frac);

    if (materialRef.current) {
      materialRef.current.color.copy(colorObj.current);
      materialRef.current.emissive.copy(colorObj.current);
      materialRef.current.emissiveIntensity =
        ds.baseEmissive +
        Math.sin(state.clock.elapsedTime * ds.glowSpeed) * ds.glowRange;
      materialRef.current.opacity = ds.opacity;
    }

    // --- Update trail ---
    if (showTrail) {
      const arr = trailPositions;
      arr.copyWithin(3, 0);
      if (groupRef.current) {
        arr[0] = groupRef.current.position.x;
        arr[1] = groupRef.current.position.y;
        arr[2] = groupRef.current.position.z;
      }
      if (trailRef.current) {
        trailRef.current.geometry.attributes.position.needsUpdate = true;
      }
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
            emissiveIntensity={1.1}
            toneMapped={false}
            wireframe
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Disable light if degraded/mobile to preserve GPU cycles */}
        {!degraded && !isMobile && (
          <pointLight color={colorObj.current} intensity={1.0} distance={3} />
        )}
      </group>

      {/* Light trail - only rendered on desktop/high-performance */}
      {showTrail && (
        <line ref={trailRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={trailLength}
              array={trailPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={colorObj.current}
            transparent
            opacity={0.3}
          />
        </line>
      )}
    </>
  );
}
