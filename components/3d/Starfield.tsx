'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  radius?: number;
}

export default function Starfield({ count = 1000, radius = 50 }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities: number[] = [];

    // Star colors - mostly white/blue with occasional warm tones
    const starColors = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#E8F4FF'),
      new THREE.Color('#D4E4FF'),
      new THREE.Color('#FFE4D4'),
      new THREE.Color('#C084FC'), // Purple accent
      new THREE.Color('#60A5FA'), // Blue accent
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars in a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = radius + (Math.random() - 0.5) * 20;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Mostly white/blue stars
      const colorIndex = Math.random() > 0.95
        ? Math.floor(Math.random() * 6)
        : Math.floor(Math.random() * 3);
      const color = starColors[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varying sizes - mostly small with some larger stars
      sizes[i] = Math.random() > 0.98
        ? Math.random() * 0.15 + 0.1
        : Math.random() * 0.06 + 0.01;

      // Twinkling speed
      velocities.push(Math.random() * 2 + 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry, velocities };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.02;

    // Twinkling effect
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const baseSize = (i % 50 === 0) ? 0.12 : 0.04;
      const twinkle = Math.sin(time * velocities[i] + i) * 0.5 + 0.5;
      sizes[i] = baseSize * (0.5 + twinkle * 0.5);
    }
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// Grid floor for depth reference
export function GridFloor() {
  return (
    <group position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[40, 40, '#A855F7', '#1a1a2e']}
      />
      <mesh>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#080B14"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
