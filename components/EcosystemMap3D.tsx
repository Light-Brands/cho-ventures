'use client';

import { useState, useCallback, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { entities, connections, Entity, EntityCategory } from '@/lib/ecosystem-data';
import EntitySphere from './3d/EntitySphere';
import ConnectionBeam from './3d/ConnectionBeam';
import CameraController from './3d/CameraController';
import AmbientEffects from './3d/AmbientEffects';
import Starfield from './3d/Starfield';
import EntityDetailPanel from './EntityDetailPanel';

// Category colors for legend
const categoryColorMap: Record<EntityCategory, string> = {
  hub: '#A855F7',
  'real-estate': '#3B82F6',
  regenerative: '#14B8A6',
  authority: '#0EA5E9',
  philanthropy: '#6366F1',
};

// Calculate 3D positions - hub at center, others uniformly distributed
function calculate3DPositions(): Record<string, [number, number, number]> {
  const positions: Record<string, [number, number, number]> = {};

  // Hub at center
  positions['cho-ventures'] = [0, 0, 0];

  // Get all non-hub entities
  const nonHubEntities = entities.filter((entity) => entity.id !== 'cho-ventures');
  const entityCount = nonHubEntities.length;

  if (entityCount === 0) return positions;

  // Uniform radius for all entities
  const baseRadius = 6.0;

  // Use Fibonacci sphere algorithm for uniform distribution
  // This creates evenly spaced points on a sphere
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  nonHubEntities.forEach((entity, index) => {
    // Handle single entity case
    if (entityCount === 1) {
      positions[entity.id] = [baseRadius, 0, 0];
      return;
    }

    // Calculate uniform spherical coordinates using Fibonacci sphere
    const y = 1 - (index / (entityCount - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // Radius at y for sphere
    
    const theta = goldenAngle * index; // Golden angle increment
    
    // Convert to 3D position
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    // Apply base radius with slight vertical flattening for better visibility
    const verticalScale = 0.7; // Flatten sphere slightly for better view
    const finalY = y * baseRadius * verticalScale;
    const finalRadius = baseRadius * Math.sqrt(1 - y * y * (verticalScale * verticalScale));
    
    positions[entity.id] = [
      x * finalRadius,
      finalY,
      z * finalRadius,
    ];
  });

  return positions;
}

// Loading component
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#A855F7" transparent opacity={0.5} />
    </mesh>
  );
}

// 3D Scene content
function Scene({
  selectedEntity,
  hoveredEntity,
  positions,
  onHover,
  onClick,
}: {
  selectedEntity: Entity | null;
  hoveredEntity: Entity | null;
  positions: Record<string, [number, number, number]>;
  onHover: (entity: Entity | null) => void;
  onClick: (entity: Entity) => void;
}) {
  const targetPosition = useMemo(() => {
    if (selectedEntity) {
      return positions[selectedEntity.id];
    }
    return undefined;
  }, [selectedEntity, positions]);

  return (
    <>
      {/* Enhanced realistic lighting setup */}
      <ambientLight intensity={0.3} color="#1a1a2e" />
      
      {/* Main key light - warm white */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Fill lights with category colors for atmosphere */}
      <pointLight position={[10, 8, 10]} intensity={0.6} color="#A855F7" distance={20} decay={2} />
      <pointLight position={[-10, 8, -10]} intensity={0.5} color="#3B82F6" distance={20} decay={2} />
      <pointLight position={[0, 12, 0]} intensity={0.4} color="#14B8A6" distance={25} decay={2} />
      <pointLight position={[-8, -5, 8]} intensity={0.3} color="#6366F1" distance={18} decay={2} />
      
      {/* Rim lighting for depth */}
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.4}
        color="#0EA5E9"
      />
      
      {/* Environment for realistic reflections */}
      <Environment preset="night" />

      {/* Camera controls */}
      <CameraController
        targetPosition={targetPosition}
        autoRotate={!selectedEntity && !hoveredEntity}
      />

      {/* Background effects */}
      <Starfield count={600} radius={45} />
      <AmbientEffects particleCount={100} />

      {/* Connections */}
      {connections.map((connection) => {
        const sourceEntity = entities.find((e) => e.id === connection.source);
        const targetEntity = entities.find((e) => e.id === connection.target);

        if (!sourceEntity || !targetEntity) return null;

        const isHighlighted = selectedEntity
          ? connection.source === selectedEntity.id || connection.target === selectedEntity.id
          : hoveredEntity
            ? connection.source === hoveredEntity.id || connection.target === hoveredEntity.id
            : false;

        const isConnected = selectedEntity
          ? connection.source === selectedEntity.id || connection.target === selectedEntity.id
          : true;

        return (
          <ConnectionBeam
            key={connection.id}
            connection={connection}
            sourceEntity={sourceEntity}
            targetEntity={targetEntity}
            sourcePosition={positions[connection.source]}
            targetPosition={positions[connection.target]}
            isHighlighted={isHighlighted}
            isConnected={isConnected}
          />
        );
      })}

      {/* Entity spheres */}
      {entities.map((entity) => {
        const isConnected = selectedEntity
          ? selectedEntity.connections.includes(entity.id) || entity.id === selectedEntity.id
          : true;

        return (
          <EntitySphere
            key={entity.id}
            entity={entity}
            position={positions[entity.id]}
            isSelected={selectedEntity?.id === entity.id}
            isHovered={hoveredEntity?.id === entity.id}
            isConnected={isConnected}
            onHover={onHover}
            onClick={onClick}
          />
        );
      })}
    </>
  );
}

export default function EcosystemMap3D() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<Entity | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<EntityCategory | null>(null);

  const positions = useMemo(() => calculate3DPositions(), []);

  const handleEntityHover = useCallback((entity: Entity | null) => {
    setHoveredEntity(entity);
  }, []);

  const handleEntityClick = useCallback((entity: Entity) => {
    setSelectedEntity((prev) => (prev?.id === entity.id ? null : entity));
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  const handleCategoryHover = useCallback((category: EntityCategory) => {
    setFocusedCategory(category);
  }, []);

  const handleCategoryLeave = useCallback(() => {
    setFocusedCategory(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        onPointerMissed={handlePaneClick}
        style={{ background: '#080B14' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            selectedEntity={selectedEntity}
            hoveredEntity={hoveredEntity}
            positions={positions}
            onHover={handleEntityHover}
            onClick={handleEntityClick}
          />
        </Suspense>
      </Canvas>

      {/* Detail Panel - reusing existing component */}
      <AnimatePresence>
        {selectedEntity && (
          <EntityDetailPanel
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
          />
        )}
      </AnimatePresence>

      {/* Minimal Legend */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-cho-deep/80 backdrop-blur-sm rounded-lg border border-cho-steel/30 px-3 py-3"
      >
        <div className="flex flex-col gap-3">
          {[
            { label: 'Hub', color: 'bg-hub', category: 'hub' as EntityCategory },
            { label: 'Real Estate', color: 'bg-real-estate', category: 'real-estate' as EntityCategory },
            { label: 'Regenerative', color: 'bg-regenerative', category: 'regenerative' as EntityCategory },
            { label: 'Authority', color: 'bg-authority', category: 'authority' as EntityCategory },
            { label: 'Philanthropy', color: 'bg-philanthropy', category: 'philanthropy' as EntityCategory },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 cursor-pointer transition-opacity ${
                focusedCategory && focusedCategory !== item.category ? 'opacity-30' : 'opacity-100'
              } hover:opacity-100`}
              onMouseEnter={() => handleCategoryHover(item.category)}
              onMouseLeave={handleCategoryLeave}
            >
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[10px] text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Controls hint - fully centered at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 text-[10px] text-white/40 font-medium whitespace-nowrap"
        >
          <span>Drag to rotate</span>
          <span className="w-px h-3 bg-white/20" />
          <span>Scroll to zoom</span>
          <span className="w-px h-3 bg-white/20" />
          <span>Click entity to focus</span>
        </motion.div>
      </div>
    </div>
  );
}
