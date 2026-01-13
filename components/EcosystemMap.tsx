'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { entities, connections, Entity, EntityCategory } from '@/lib/ecosystem-data';
import EntityNode from './EntityNode';
import EntityDetailPanel from './EntityDetailPanel';

const nodeTypes = {
  entity: EntityNode,
};

// Cohesive color palette - purple hub with blue/teal spectrum
const categoryColorMap: Record<EntityCategory, string> = {
  hub: '#A855F7',
  'real-estate': '#3B82F6',
  regenerative: '#14B8A6',
  authority: '#0EA5E9',
  philanthropy: '#6366F1',
};

// Calculate node positions with proper spacing
function calculateNodePositions(): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const centerX = 550;
  const centerY = 380;

  // Hub at center
  positions['cho-ventures'] = { x: centerX - 88, y: centerY - 60 };

  // Group entities by category
  const realEstate = ['metro-1', 'future-of-cities', 'phx-jax', 'climate-hub'];
  const regenerative = ['chozen-retreat', 'chozen-community'];
  const authority = ['book-platform', 'course-platform', 'speaking-media'];
  const philanthropy = ['cho-foundation', 'm1-fund'];

  // Position real estate (top-left arc)
  const reRadius = 300;
  const reStartAngle = Math.PI * 1.15;
  realEstate.forEach((id, index) => {
    const angle = reStartAngle + (index * Math.PI * 0.18);
    positions[id] = {
      x: centerX + Math.cos(angle) * reRadius - 72,
      y: centerY + Math.sin(angle) * reRadius - 40,
    };
  });

  // Position regenerative (top-right arc)
  const regRadius = 280;
  const regStartAngle = Math.PI * 1.72;
  regenerative.forEach((id, index) => {
    const angle = regStartAngle + (index * Math.PI * 0.18);
    positions[id] = {
      x: centerX + Math.cos(angle) * regRadius - 72,
      y: centerY + Math.sin(angle) * regRadius - 40,
    };
  });

  // Position authority (bottom-right arc)
  const authRadius = 300;
  const authStartAngle = Math.PI * 0.05;
  authority.forEach((id, index) => {
    const angle = authStartAngle + (index * Math.PI * 0.16);
    positions[id] = {
      x: centerX + Math.cos(angle) * authRadius - 72,
      y: centerY + Math.sin(angle) * authRadius - 40,
    };
  });

  // Position philanthropy (bottom-left arc)
  const philRadius = 280;
  const philStartAngle = Math.PI * 0.55;
  philanthropy.forEach((id, index) => {
    const angle = philStartAngle + (index * Math.PI * 0.18);
    positions[id] = {
      x: centerX + Math.cos(angle) * philRadius - 72,
      y: centerY + Math.sin(angle) * philRadius - 40,
    };
  });

  return positions;
}

export default function EcosystemMap() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  const positions = useMemo(() => calculateNodePositions(), []);

  const initialNodes: Node[] = useMemo(() => {
    return entities.map((entity) => ({
      id: entity.id,
      type: 'entity',
      position: positions[entity.id] || { x: 0, y: 0 },
      data: {
        entity,
        isSelected: selectedEntity?.id === entity.id,
        isHovered: hoveredEntity === entity.id,
        isConnected: selectedEntity
          ? selectedEntity.connections.includes(entity.id) || entity.id === selectedEntity.id
          : true,
        onHover: (id: string | null) => setHoveredEntity(id),
      },
    }));
  }, [positions, selectedEntity, hoveredEntity]);

  const initialEdges: Edge[] = useMemo(() => {
    return connections.map((conn) => {
      const sourceEntity = entities.find((e) => e.id === conn.source);
      const sourceColor = sourceEntity ? categoryColorMap[sourceEntity.category] : '#666';

      const isHighlighted = selectedEntity
        ? conn.source === selectedEntity.id || conn.target === selectedEntity.id
        : hoveredEntity
          ? conn.source === hoveredEntity || conn.target === hoveredEntity
          : false;

      return {
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: 'default',
        animated: conn.type === 'primary' && isHighlighted,
        style: {
          stroke: isHighlighted ? sourceColor : `${sourceColor}25`,
          strokeWidth: isHighlighted ? 2 : 1,
          opacity: selectedEntity ? (isHighlighted ? 1 : 0.15) : 0.6,
          transition: 'all 0.25s ease',
        },
      };
    });
  }, [selectedEntity, hoveredEntity]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useMemo(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useMemo(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const entity = entities.find((e) => e.id === node.id);
    if (entity) {
      setSelectedEntity((prev) => (prev?.id === entity.id ? null : entity));
    }
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-hub/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-real-estate/4 rounded-full blur-[100px]" />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255, 255, 255, 0.015)" gap={50} size={1} />
        <Controls showZoom={true} showFitView={true} showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            const entity = entities.find((e) => e.id === node.id);
            return entity ? categoryColorMap[entity.category] : '#666';
          }}
          maskColor="rgba(8, 11, 20, 0.92)"
          style={{ backgroundColor: 'rgba(22, 27, 34, 0.9)' }}
        />
      </ReactFlow>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedEntity && (
          <EntityDetailPanel entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
        )}
      </AnimatePresence>

      {/* Minimal Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-5 left-5 bg-cho-deep/80 backdrop-blur-sm rounded-lg border border-cho-steel/30 px-3 py-2.5"
      >
        <div className="flex items-center gap-4">
          {[
            { label: 'Hub', color: 'bg-hub' },
            { label: 'Real Estate', color: 'bg-real-estate' },
            { label: 'Regenerative', color: 'bg-regenerative' },
            { label: 'Authority', color: 'bg-authority' },
            { label: 'Philanthropy', color: 'bg-philanthropy' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[10px] text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
