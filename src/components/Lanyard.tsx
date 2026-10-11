/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardScale?: number;
  leashSegment?: number;
}

export const Lanyard: React.FC<LanyardProps> = ({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  cardScale = 2.25,
  leashSegment = 0.5,
}) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            cardScale={cardScale}
            leashSegment={leashSegment}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
};

export default Lanyard;

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardScale?: number;
  leashSegment?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  cardScale = 2.25,
  leashSegment = 0.5,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = { type: 'dynamic' as const, canSleep: false, colliders: false as const, angularDamping: 3.5, linearDamping: 3.5 };
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardImage || lanyard);
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL) as any;
  const backTex = useTexture(backImage || BLANK_PIXEL) as any;

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base?.map;
    if (!baseMap) return null;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    if (!baseImg) return baseMap;
    const W = baseImg.width || 1024;
    const H = baseImg.height || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    // When custom images are supplied, wipe the entire atlas with a dark fill
    // so NO baked GLB texture content (text, barcode, borders) EVER bleeds through.
    ctx.fillStyle = '#08090a';
    ctx.fillRect(0, 0, W, H);

    const FRONT_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
    const BACK_RECT  = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

    const drawFitted = (img: HTMLImageElement, rect: { x: number; y: number; w: number; h: number }) => {
      if (!img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      ctx.clearRect(rx, ry, rw, rh);
      ctx.fillStyle = '#08090a';
      ctx.fillRect(rx, ry, rw, rh);
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    const hasFront = !!(frontImage && frontTex.image && (frontTex.image.width > 1 || frontTex.image.naturalWidth > 1));
    const hasBack  = !!(backImage && backTex.image && (backTex.image.width > 1 || backTex.image.naturalWidth > 1));

    if (hasFront) {
      drawFitted(frontTex.image, FRONT_RECT);
      if (!hasBack) {
        drawFitted(frontTex.image, BACK_RECT);
      }
    }
    if (hasBack) {
      drawFitted(backTex.image, BACK_RECT);
      if (!hasFront) {
        drawFitted(backTex.image, FRONT_RECT);
      }
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base?.map]);

  const curve = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = 'chordal';
    return c;
  }, []);

  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  }, [texture]);

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], leashSegment]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], leashSegment]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], leashSegment]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45 * (cardScale / 2.25), -0.05],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());

      // Constrain kinematics safely within the visible camera frustum and leash bounds
      const rawX = vec.x - dragged.x;
      const rawY = vec.y - dragged.y;
      const rawZ = vec.z - dragged.z;

      const clampedX = Math.max(-3.5, Math.min(3.5, rawX));
      const clampedY = Math.max(-4.2, Math.min(2.5, rawY));
      const clampedZ = Math.max(-2.0, Math.min(3.5, rawZ));

      card.current?.setNextKinematicTranslation({ x: clampedX, y: clampedY, z: clampedZ });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      if (card.current) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());

        if (!dragged) {
          // Keep physics bodies awake so the subtle idle sway runs continuously
          [card, j1, j2, j3].forEach((ref) => ref.current?.wakeUp());

          const t = state.clock.getElapsedTime();
          // Slow, subtle, very gentle ambient sway (soft ~5.5s cycle)
          const swingSpeed = 1.1;
          const targetRoll = Math.sin(t * swingSpeed) * 0.035; // tiny ~2° tilt
          const swingImpulse = Math.cos(t * swingSpeed) * 0.004 * (cardScale / 2.25);

          // Strong restoring torques: keep card firmly facing forward and upright
          const restoreX = -rot.x * 2.0 - ang.x * 0.8;
          const restoreY = -rot.y * 2.2 - ang.y * 0.8;
          const restoreZ = (targetRoll - rot.z) * 1.0 - ang.z * 0.4;

          card.current.setAngvel({
            x: ang.x + restoreX * delta * 10,
            y: ang.y + restoreY * delta * 10,
            z: ang.z + restoreZ * delta * 10,
          });

          card.current.applyImpulse({ x: swingImpulse * delta * 60, y: 0, z: 0 }, true);
        } else {
          // While dragging, stabilize rotation so it doesn't spin uncontrollably
          card.current.setAngvel({
            x: ang.x * 0.85 - rot.x * 0.5,
            y: ang.y * 0.85 - rot.y * 0.5,
            z: ang.z * 0.85,
          });
        }
      }
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[leashSegment * 0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[leashSegment, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[leashSegment * 1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[leashSegment * 2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8 * (cardScale / 2.25), 1.125 * (cardScale / 2.25), 0.01]} />
          <group
            scale={cardScale}
            position={[0, -1.2 * (cardScale / 2.25), -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e: any) => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            {nodes?.clip?.geometry && (
              <mesh geometry={nodes.clip.geometry}>
                <meshStandardMaterial
                  color="#3A3F4A"
                  metalness={0.92}
                  roughness={0.35}
                  envMapIntensity={0.8}
                />
              </mesh>
            )}
            {nodes?.clamp?.geometry && (
              <mesh geometry={nodes.clamp.geometry}>
                <meshStandardMaterial
                  color="#3A3F4A"
                  metalness={0.92}
                  roughness={0.35}
                  envMapIntensity={0.8}
                />
              </mesh>
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
