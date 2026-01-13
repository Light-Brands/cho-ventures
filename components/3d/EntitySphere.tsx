'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Entity, EntityCategory } from '@/lib/ecosystem-data';
import SphereShaderMaterial from './SphereShaderMaterial';

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
    if (!meshRef.current) return;

    // Smooth scale transition
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 8);
    meshRef.current.scale.setScalar(newScale);

    // Floating animation for all entities
    if (groupRef.current) {
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
      groupRef.current.position.y = position[1] + floatOffset;
    }

    // Opacity and glow transitions are now handled by shader uniforms
    // The shader material will handle these transitions internally
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
      {/* Main sphere - clean, no halos */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[baseSize, 64, 64]} />
        <SphereShaderMaterial
          color={colors.main}
          glowColor={colors.glow}
          emissiveIntensity={isSelected ? 0.8 : isHovered || localHover ? 0.5 : 0.3}
          opacity={1.0}
          isSelected={isSelected}
          isHovered={isHovered || localHover}
          isHub={isHub}
        />
      </mesh>


      {/* Entity label - always fully visible and optimized */}
      <Html
        center
        distanceFactor={12}
        occlude={false}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: 'none',
          transform: 'translateY(60px)',
          opacity: 1,
          userSelect: 'none',
        }}
      >
        <div className="text-center whitespace-nowrap">
          <div
            className="text-[13px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-lg backdrop-blur-md"
            style={{
              color: colors.glow,
              textShadow: `
                0 0 12px ${colors.main},
                0 0 18px ${colors.main}90,
                0 0 24px ${colors.main}70,
                0 3px 8px rgba(0,0,0,0.95)
              `,
              background: `linear-gradient(135deg, ${colors.main}40, ${colors.main}25)`,
              border: `2px solid ${colors.main}60`,
              boxShadow: `
                0 0 20px ${colors.main}50,
                0 6px 16px rgba(0,0,0,0.8),
                inset 0 1px 0 ${colors.main}30
              `,
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            {entity.shortName}
          </div>
        </div>
      </Html>

      {/* Detailed tooltip on hover - improved */}
      {(isHovered || localHover) && !isSelected && (
        <Html
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            transform: 'translateY(-70px)',
          }}
        >
          <div
            className="backdrop-blur-md px-4 py-2.5 rounded-xl border shadow-2xl whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, ${colors.main}25, ${colors.main}10)`,
              borderColor: `${colors.main}60`,
              boxShadow: `
                0 0 20px ${colors.main}40,
                0 8px 32px rgba(0,0,0,0.6)
              `,
            }}
          >
            <div className="text-sm font-semibold text-white" style={{ textShadow: `0 2px 4px rgba(0,0,0,0.5)` }}>
              {entity.name}
            </div>
            <div className="text-[10px] mt-1" style={{ color: colors.glow, textShadow: `0 1px 2px rgba(0,0,0,0.5)` }}>
              {entity.tagline}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
