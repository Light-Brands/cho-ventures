'use client';

import { useState, useCallback, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { entities, connections, Entity, EntityCategory } from '@/lib/ecosystem-data';
import EntitySphere from './3d/EntitySphere';
import ConnectionBeam from './3d/ConnectionBeam';
import CameraController from './3d/CameraController';
import AmbientEffects, { BackgroundGlows } from './3d/AmbientEffects';
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

// Calculate 3D positions - hub at center, others in orbital arrangement
function calculate3DPositions(): Record<string, [number, number, number]> {
  const positions: Record<string, [number, number, number]> = {};

  // Hub at center
  positions['cho-ventures'] = [0, 0, 0];

  // Group entities by category
  const categoryEntities: Record<EntityCategory, Entity[]> = {
    hub: [],
    'real-estate': [],
    regenerative: [],
    authority: [],
    philanthropy: [],
  };

  entities.forEach((entity) => {
    if (entity.id !== 'cho-ventures') {
      categoryEntities[entity.category].push(entity);
    }
  });

  // Position each category in a different sector
  const categoryAngles: Record<EntityCategory, { start: number; radius: number; yOffset: number }> = {
    hub: { start: 0, radius: 0, yOffset: 0 },
    'real-estate': { start: 0, radius: 5, yOffset: 0.5 },
    regenerative: { start: Math.PI * 0.5, radius: 5.5, yOffset: -0.3 },
    authority: { start: Math.PI, radius: 5, yOffset: 0.2 },
    philanthropy: { start: Math.PI * 1.5, radius: 5.5, yOffset: -0.5 },
  };

  Object.entries(categoryEntities).forEach(([category, ents]) => {
    if (category === 'hub' || ents.length === 0) return;

    const config = categoryAngles[category as EntityCategory];
    const angleSpread = Math.PI * 0.4; // Spread entities within their sector
    const startAngle = config.start - angleSpread / 2;
    const angleStep = ents.length > 1 ? angleSpread / (ents.length - 1) : 0;

    ents.forEach((entity, index) => {
      const angle = ents.length === 1 ? config.start : startAngle + angleStep * index;
      const radius = config.radius + (index % 2) * 0.8; // Slight radius variation

      positions[entity.id] = [
        Math.cos(angle) * radius,
        config.yOffset + (index % 2 === 0 ? 0.3 : -0.3),
        Math.sin(angle) * radius,
      ];
    });
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
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#3B82F6" />

      {/* Camera controls */}
      <CameraController
        targetPosition={targetPosition}
        autoRotate={!selectedEntity && !hoveredEntity}
      />

      {/* Background effects */}
      <Starfield count={800} radius={45} />
      <BackgroundGlows />
      <AmbientEffects particleCount={150} />

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

      {/* Controls hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] text-white/30"
      >
        <span>Drag to rotate</span>
        <span className="w-px h-3 bg-white/20" />
        <span>Scroll to zoom</span>
        <span className="w-px h-3 bg-white/20" />
        <span>Click entity to focus</span>
      </motion.div>
    </div>
  );
}
