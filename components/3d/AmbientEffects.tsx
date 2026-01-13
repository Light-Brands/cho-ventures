'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientEffectsProps {
  particleCount?: number;
}

export default function AmbientEffects({ particleCount = 200 }: AmbientEffectsProps) {
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle geometry
  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: THREE.Vector3[] = [];

    const categoryColors = [
      new THREE.Color('#A855F7'), // hub
      new THREE.Color('#3B82F6'), // real-estate
      new THREE.Color('#14B8A6'), // regenerative
      new THREE.Color('#0EA5E9'), // authority
      new THREE.Color('#6366F1'), // philanthropy
    ];

    for (let i = 0; i < particleCount; i++) {
      // Random position in a sphere
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color from category palette
      const color = categoryColors[Math.floor(Math.random() * categoryColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random size
      sizes[i] = Math.random() * 0.08 + 0.02;

      // Random velocity for drifting
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry, velocities };
  }, [particleCount]);

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      // Slow drift with slight sine wave motion
      positions[i * 3] += velocities[i].x + Math.sin(time * 0.5 + i) * 0.001;
      positions[i * 3 + 1] += velocities[i].y + Math.cos(time * 0.3 + i) * 0.001;
      positions[i * 3 + 2] += velocities[i].z + Math.sin(time * 0.4 + i) * 0.001;

      // Wrap around bounds
      const radius = Math.sqrt(
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2
      );

      if (radius > 25 || radius < 10) {
        // Reset to random position
        const newRadius = 15 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = newRadius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = newRadius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = newRadius * Math.cos(phi);
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation of entire particle field
    particlesRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Ambient glow orbs in the background
export function BackgroundGlows() {
  const glowsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!glowsRef.current) return;
    glowsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  const glows = useMemo(() => {
    return [
      { position: [8, 5, -10] as [number, number, number], color: '#A855F7', scale: 4 },
      { position: [-10, -3, -8] as [number, number, number], color: '#3B82F6', scale: 3 },
      { position: [5, -6, 8] as [number, number, number], color: '#14B8A6', scale: 3.5 },
      { position: [-8, 4, 6] as [number, number, number], color: '#6366F1', scale: 2.5 },
    ];
  }, []);

  return (
    <group ref={glowsRef}>
      {glows.map((glow, i) => (
        <mesh key={i} position={glow.position}>
          <sphereGeometry args={[glow.scale, 16, 16]} />
          <meshBasicMaterial
            color={glow.color}
            transparent
            opacity={0.03}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
