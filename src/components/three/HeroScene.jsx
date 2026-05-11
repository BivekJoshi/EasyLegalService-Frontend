import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import './HeroScene.css'

/* ============================================================
   Hero scene — 3D scales of justice + golden dust particles.
   ============================================================ */

const GOLD       = '#d4b06b'
const GOLD_BRIGHT = '#e6c98a'
const GOLD_DARK  = '#9c7a36'
const GOLD_GLOW  = '#3b2d10'

/* Gold metallic material preset */
function GoldMaterial({ color = GOLD, ...props }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.92}
      roughness={0.18}
      emissive={GOLD_GLOW}
      emissiveIntensity={0.3}
      {...props}
    />
  )
}

/* Drifting golden dust */
function Particles({ count = 240 }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4.5
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      arr[i * 3 + 0] = r * Math.sin(p) * Math.cos(t)
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.85
      arr[i * 3 + 2] = r * Math.cos(p)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={GOLD_BRIGHT}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* A single hanging pan (chain + rim + shallow dish) */
function Pan({ x }) {
  return (
    <group position={[x, 0, 0]}>
      {/* Chain */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.85, 8]} />
        <GoldMaterial color={GOLD_DARK} />
      </mesh>
      {/* Pan rim (torus) */}
      <mesh position={[0, -0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.028, 16, 64]} />
        <GoldMaterial />
      </mesh>
      {/* Pan dish (shallow inverted sphere) */}
      <mesh position={[0, -0.9, 0]} scale={[1, 0.13, 1]}>
        <sphereGeometry args={[0.42, 48, 32]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.9}
          roughness={0.22}
          emissive={GOLD_GLOW}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/* The full scales — base, pole, finial, rocking beam with pans. */
function ScalesOfJustice() {
  const rootRef = useRef(null)
  const beamRef = useRef(null)

  useFrame(({ clock }, delta) => {
    if (rootRef.current) rootRef.current.rotation.y += delta * 0.12
    if (beamRef.current) {
      beamRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.7) * 0.045
    }
  })

  return (
    <group ref={rootRef} position={[0, -0.35, 0]}>
      {/* Base — wide stepped foot */}
      <mesh position={[0, -1.7, 0]}>
        <cylinderGeometry args={[0.72, 0.88, 0.18, 48]} />
        <GoldMaterial color={GOLD_DARK} />
      </mesh>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.6, 0.72, 0.08, 48]} />
        <GoldMaterial />
      </mesh>

      {/* Central column */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.085, 2.95, 32]} />
        <GoldMaterial />
      </mesh>

      {/* Decorative bands on the column */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.06, 32]} />
        <GoldMaterial color={GOLD_DARK} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.05, 32]} />
        <GoldMaterial color={GOLD_DARK} />
      </mesh>

      {/* Pole finial — sphere + cone */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.13, 32, 32]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <coneGeometry args={[0.08, 0.2, 16]} />
        <GoldMaterial />
      </mesh>

      {/* Rocking beam group */}
      <group ref={beamRef} position={[0, 1.28, 0]}>
        {/* Horizontal beam */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.048, 2.7, 24]} />
          <GoldMaterial />
        </mesh>
        {/* End caps */}
        <mesh position={[-1.35, 0, 0]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <GoldMaterial />
        </mesh>
        <mesh position={[1.35, 0, 0]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <GoldMaterial />
        </mesh>

        <Pan x={-1.3} />
        <Pan x={1.3} />
      </group>
    </group>
  )
}

/* Subtle mouse parallax for the whole group. */
function MouseGroup({ children }) {
  const ref = useRef(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ pointer }, delta) => {
    target.current.x += (pointer.x * 0.28 - target.current.x) * delta * 2.5
    target.current.y += (pointer.y * 0.18 - target.current.y) * delta * 2.5
    if (ref.current) {
      ref.current.rotation.y = target.current.x
      ref.current.rotation.x = -target.current.y
    }
  })

  return <group ref={ref}>{children}</group>
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.45, 6.5], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Lighting — warm spot from above, cool fill from left */}
          <ambientLight intensity={0.5} color="#f8edd5" />
          <directionalLight position={[3, 6, 4]} intensity={2.2} color="#fff3d4" />
          <pointLight position={[-4, 1, 3]} intensity={0.9} color="#5d7cc4" />
          <pointLight position={[0, -3, 2]} intensity={0.5} color="#c9a55c" />
          <spotLight
            position={[0, 5, 2]}
            angle={0.55}
            penumbra={0.85}
            intensity={1.4}
            color="#ffe7b3"
          />

          <MouseGroup>
            <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.4}>
              <ScalesOfJustice />
            </Float>
            <Particles count={240} />
          </MouseGroup>
        </Suspense>
      </Canvas>
    </div>
  )
}
