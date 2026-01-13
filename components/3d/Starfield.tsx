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

    // More realistic star colors based on stellar classification
    const starColors = [
      // O-type (blue-white, hot) - rare
      { color: new THREE.Color('#9BB0FF'), weight: 0.03 },
      // B-type (blue-white) - rare
      { color: new THREE.Color('#AABFFF'), weight: 0.05 },
      // A-type (white) - common
      { color: new THREE.Color('#CAD7FF'), weight: 0.15 },
      // F-type (yellow-white) - common
      { color: new THREE.Color('#F8F7FF'), weight: 0.2 },
      // G-type (yellow) - like our sun
      { color: new THREE.Color('#FFF4EA'), weight: 0.25 },
      // K-type (orange) - very common
      { color: new THREE.Color('#FFD2A1'), weight: 0.2 },
      // M-type (red) - most common
      { color: new THREE.Color('#FFCC6F'), weight: 0.12 },
    ];

    // Create cumulative weights for realistic distribution
    const cumulativeWeights: number[] = [];
    let sum = 0;
    starColors.forEach(({ weight }) => {
      sum += weight;
      cumulativeWeights.push(sum);
    });

    for (let i = 0; i < count; i++) {
      // More realistic distribution - denser in some areas (like Milky Way band)
      const isMilkyWay = Math.random() < 0.3;
      
      if (isMilkyWay) {
        // Dense band around equator (like Milky Way)
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.3 + Math.PI / 2;
        const r = radius + (Math.random() - 0.5) * 15;
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      } else {
        // Scattered throughout space
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius + (Math.random() - 0.5) * 25;
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      // Select color based on weighted distribution
      const rand = Math.random();
      let selectedColor = starColors[0].color;
      for (let j = 0; j < cumulativeWeights.length; j++) {
        if (rand <= cumulativeWeights[j]) {
          selectedColor = starColors[j].color;
          break;
        }
      }
      
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;

      // More realistic size distribution - most stars are small
      const sizeRoll = Math.random();
      if (sizeRoll > 0.98) {
        // Very large stars (rare)
        sizes[i] = Math.random() * 0.2 + 0.15;
      } else if (sizeRoll > 0.90) {
        // Large stars
        sizes[i] = Math.random() * 0.1 + 0.08;
      } else if (sizeRoll > 0.7) {
        // Medium stars
        sizes[i] = Math.random() * 0.06 + 0.04;
      } else {
        // Small stars (most common)
        sizes[i] = Math.random() * 0.03 + 0.01;
      }

      // Varied twinkling speeds
      velocities.push(Math.random() * 3 + 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry, velocities };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Very slow rotation for parallax effect
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.01;

    // Realistic twinkling - atmospheric scintillation effect
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;
    const originalSizes = geometry.attributes.size.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const baseSize = originalSizes[i];
      // Multiple frequency twinkling for realism
      const twinkle1 = Math.sin(time * velocities[i] + i) * 0.5 + 0.5;
      const twinkle2 = Math.sin(time * velocities[i] * 1.7 + i * 2.3) * 0.3 + 0.7;
      const combinedTwinkle = twinkle1 * twinkle2;
      
      sizes[i] = baseSize * (0.6 + combinedTwinkle * 0.4);
    }
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
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
