'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientEffectsProps {
  particleCount?: number;
}

export default function AmbientEffects({ particleCount = 200 }: AmbientEffectsProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const { geometry, velocities, layers } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: THREE.Vector3[] = [];
    const layers: number[] = [];

    const categoryColors = [
      new THREE.Color('#E879F7'), // conglomerate
      new THREE.Color('#3B82F6'), // real-estate
      new THREE.Color('#14B8A6'), // regenerative
      new THREE.Color('#0EA5E9'), // authority
      new THREE.Color('#6366F1'), // philanthropy
      new THREE.Color('#F59E0B'), // development
      new THREE.Color('#818CF8'), // ai-layer
    ];

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random();
      layers.push(layer);

      const depthFactor = Math.pow(layer, 0.5);
      const minRadius = 8 + depthFactor * 5;
      const maxRadius = 12 + depthFactor * 15;

      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = categoryColors[Math.floor(Math.random() * categoryColors.length)];
      const fade = 0.5 + depthFactor * 0.5;
      colors[i * 3] = color.r * fade;
      colors[i * 3 + 1] = color.g * fade;
      colors[i * 3 + 2] = color.b * fade;

      const baseSize = 0.03 + Math.random() * 0.08;
      sizes[i] = baseSize * (0.4 + depthFactor * 0.6);

      const speed = 0.005 * (1.5 - depthFactor);
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed
        )
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry, velocities, layers };
  }, [particleCount]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array;
    const originalSizes = geometry.attributes.size.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const depthFactor = layers[i];
      const swaySpeed = 0.3 + depthFactor * 0.5;

      positions[i * 3] += velocities[i].x + Math.sin(time * swaySpeed + i) * 0.0008;
      positions[i * 3 + 1] += velocities[i].y + Math.cos(time * swaySpeed * 0.7 + i) * 0.0008;
      positions[i * 3 + 2] += velocities[i].z + Math.sin(time * swaySpeed * 0.5 + i) * 0.0008;

      const radius = Math.sqrt(
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2
      );

      const minRadius = 8 + Math.pow(depthFactor, 0.5) * 5;
      const maxRadius = 12 + Math.pow(depthFactor, 0.5) * 15;

      if (radius > maxRadius || radius < minRadius) {
        const newRadius = minRadius + Math.random() * (maxRadius - minRadius);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = newRadius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = newRadius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = newRadius * Math.cos(phi);
      }

      const pulse = Math.sin(time * (0.5 + depthFactor) + i * 0.5) * 0.5 + 0.5;
      sizes[i] = originalSizes[i] * (0.8 + pulse * 0.2);
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.size.needsUpdate = true;

    particlesRef.current.rotation.y = time * 0.015;
    particlesRef.current.rotation.x = Math.sin(time * 0.008) * 0.05;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function BackgroundGlows() {
  const glowsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!glowsRef.current) return;
    glowsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  const glows = useMemo(() => {
    return [
      { position: [8, 5, -10] as [number, number, number], color: '#E879F7', scale: 4 },
      { position: [-10, -3, -8] as [number, number, number], color: '#3B82F6', scale: 3 },
      { position: [5, -6, 8] as [number, number, number], color: '#14B8A6', scale: 3.5 },
      { position: [-8, 4, 6] as [number, number, number], color: '#6366F1', scale: 2.5 },
      { position: [0, 3, 0] as [number, number, number], color: '#818CF8', scale: 3 },
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
