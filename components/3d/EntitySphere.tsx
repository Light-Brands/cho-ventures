'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Entity, EntityCategory } from '@/lib/ecosystem-data';

// Category colors matching the existing palette
const categoryColors: Record<EntityCategory, { main: string; glow: string }> = {
  hub: { main: '#A855F7', glow: '#C084FC' },
  'real-estate': { main: '#3B82F6', glow: '#60A5FA' },
  regenerative: { main: '#14B8A6', glow: '#2DD4BF' },
  authority: { main: '#0EA5E9', glow: '#38BDF8' },
  philanthropy: { main: '#6366F1', glow: '#818CF8' },
};

interface EntitySphereProps {
  entity: Entity;
  position: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  isConnected: boolean;
  onHover: (entity: Entity | null) => void;
  onClick: (entity: Entity) => void;
}

// Orbital particles component for hub
function OrbitalParticles({ color, radius, count = 20 }: { color: string; radius: number; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      sizes[i] = Math.random() * 0.04 + 0.02;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.06}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Pulsing ring effect
function PulsingRings({ color, baseRadius }: { color: string; baseRadius: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ring1Ref.current) {
      const scale1 = 1 + Math.sin(time * 2) * 0.1;
      ring1Ref.current.scale.set(scale1, scale1, 1);
      (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(time * 2) * 0.15;
    }

    if (ring2Ref.current) {
      const scale2 = 1 + Math.sin(time * 2 + Math.PI) * 0.1;
      ring2Ref.current.scale.set(scale2, scale2, 1);
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(time * 2 + Math.PI) * 0.1;
    }
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={ring1Ref}>
        <ringGeometry args={[baseRadius * 1.3, baseRadius * 1.35, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[baseRadius * 1.5, baseRadius * 1.55, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function EntitySphere({
  entity,
  position,
  isSelected,
  isHovered,
  isConnected,
  onHover,
  onClick,
}: EntitySphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  const colors = categoryColors[entity.category];
  const isHub = entity.category === 'hub';
  const baseSize = isHub ? 0.8 : 0.5;

  // Target scale based on state
  const targetScale = useMemo(() => {
    if (isSelected) return 1.15;
    if (isHovered || localHover) return 1.08;
    return 1;
  }, [isSelected, isHovered, localHover]);

  // Animate the sphere
  useFrame((state, delta) => {
    if (!meshRef.current || !glowRef.current) return;

    // Smooth scale transition
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 8);
    meshRef.current.scale.setScalar(newScale);
    glowRef.current.scale.setScalar(newScale * 1.8);

    // Outer glow follows
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(newScale * 2.5);
    }

    // Pulsing animation for hub and selected entities
    if (isHub || isSelected) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      glowRef.current.scale.multiplyScalar(pulse);
    }

    // Floating animation for all entities
    if (groupRef.current) {
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
      groupRef.current.position.y = position[1] + floatOffset;
    }

    // Rotate selection ring
    if (ringRef.current && isSelected) {
      ringRef.current.rotation.z += delta * 0.5;
    }

    // Opacity for disconnected state
    const targetOpacity = isConnected ? 1 : 0.25;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 8);

    // Glow intensity based on state
    const targetEmissive = isSelected ? 0.8 : isHovered || localHover ? 0.5 : 0.3;
    material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, delta * 5);
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setLocalHover(true);
    onHover(entity);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setLocalHover(false);
    onHover(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onClick(entity);
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Outer atmospheric glow */}
      <mesh ref={outerGlowRef} scale={2.5}>
        <sphereGeometry args={[baseSize, 24, 24]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={isSelected ? 0.08 : isHovered ? 0.05 : 0.02}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={glowRef} scale={1.8}>
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={isSelected ? 0.2 : isHovered ? 0.15 : 0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[baseSize, 64, 64]} />
        <meshStandardMaterial
          color={colors.main}
          emissive={colors.main}
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={1}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh scale={0.5}>
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Hub-specific effects */}
      {isHub && (
        <>
          <OrbitalParticles color={colors.glow} radius={baseSize * 1.8} count={30} />
          <PulsingRings color={colors.glow} baseRadius={baseSize} />
        </>
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[baseSize * 1.6, 0.025, 16, 64]} />
          <meshBasicMaterial color={colors.glow} transparent opacity={0.9} />
        </mesh>
      )}

      {/* Secondary selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[baseSize * 1.9, 0.015, 16, 64]} />
          <meshBasicMaterial color={colors.glow} transparent opacity={0.4} />
        </mesh>
      )}

      {/* Entity label (always visible, fades with distance) */}
      <Html
        center
        distanceFactor={8}
        occlude={false}
        style={{
          pointerEvents: 'none',
          transform: 'translateY(50px)',
          opacity: isSelected || isHovered || localHover ? 1 : 0.7,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div className="text-center whitespace-nowrap">
          <div
            className="text-[10px] font-medium tracking-wide uppercase"
            style={{ color: colors.glow, textShadow: `0 0 10px ${colors.main}` }}
          >
            {entity.shortName}
          </div>
        </div>
      </Html>

      {/* Detailed tooltip on hover */}
      {(isHovered || localHover) && !isSelected && (
        <Html
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            transform: 'translateY(-70px)',
          }}
        >
          <div className="bg-cho-deep/95 backdrop-blur-md px-3 py-2 rounded-lg border border-cho-steel/50 shadow-lg shadow-black/50 whitespace-nowrap">
            <div className="text-xs font-medium text-white">{entity.name}</div>
            <div className="text-[10px] text-white/50 mt-0.5">{entity.tagline}</div>
          </div>
        </Html>
      )}
    </group>
  );
}
