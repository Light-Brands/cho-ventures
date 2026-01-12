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
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { entities, connections, Entity, EntityCategory } from '@/lib/ecosystem-data';
import EntityNode from './EntityNode';
import EntityDetailPanel from './EntityDetailPanel';

const nodeTypes = {
  entity: EntityNode,
};

// Category colors for edges and nodes
const categoryColorMap: Record<EntityCategory, string> = {
  hub: '#EC4899',
  'real-estate': '#3B82F6',
  regenerative: '#10B981',
  authority: '#F59E0B',
  philanthropy: '#8B5CF6',
};

// Calculate node positions in a circular layout around the hub
function calculateNodePositions(): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const centerX = 600;
  const centerY = 400;

  // Hub at center
  positions['cho-ventures'] = { x: centerX - 100, y: centerY - 50 };

  // Group entities by category
  const realEstate = ['metro-1', 'future-of-cities', 'phx-jax', 'climate-hub'];
  const regenerative = ['chozen-retreat', 'chozen-community'];
  const authority = ['book-platform', 'course-platform', 'speaking-media'];
  const philanthropy = ['cho-foundation', 'm1-fund'];

  // Position real estate entities (top-left quadrant)
  const reRadius = 350;
  realEstate.forEach((id, index) => {
    const angle = (Math.PI * 1.25) + (index * Math.PI * 0.15);
    positions[id] = {
      x: centerX + Math.cos(angle) * reRadius - 80,
      y: centerY + Math.sin(angle) * reRadius - 40,
    };
  });

  // Position regenerative entities (top-right quadrant)
  const regRadius = 320;
  regenerative.forEach((id, index) => {
    const angle = (Math.PI * 1.75) + (index * Math.PI * 0.2);
    positions[id] = {
      x: centerX + Math.cos(angle) * regRadius - 80,
      y: centerY + Math.sin(angle) * regRadius - 40,
    };
  });

  // Position authority entities (bottom-right quadrant)
  const authRadius = 350;
  authority.forEach((id, index) => {
    const angle = (Math.PI * 0.1) + (index * Math.PI * 0.15);
    positions[id] = {
      x: centerX + Math.cos(angle) * authRadius - 80,
      y: centerY + Math.sin(angle) * authRadius - 40,
    };
  });

  // Position philanthropy entities (bottom-left quadrant)
  const philRadius = 320;
  philanthropy.forEach((id, index) => {
    const angle = (Math.PI * 0.6) + (index * Math.PI * 0.2);
    positions[id] = {
      x: centerX + Math.cos(angle) * philRadius - 80,
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
        isConnected: selectedEntity ? selectedEntity.connections.includes(entity.id) || entity.id === selectedEntity.id : true,
        onHover: (id: string | null) => setHoveredEntity(id),
      },
    }));
  }, [positions, selectedEntity, hoveredEntity]);

  const initialEdges: Edge[] = useMemo(() => {
    return connections.map((conn) => {
      const sourceEntity = entities.find(e => e.id === conn.source);
      const targetEntity = entities.find(e => e.id === conn.target);
      const sourceColor = sourceEntity ? categoryColorMap[sourceEntity.category] : '#666';

      const isHighlighted = selectedEntity
        ? (conn.source === selectedEntity.id || conn.target === selectedEntity.id)
        : hoveredEntity
          ? (conn.source === hoveredEntity || conn.target === hoveredEntity)
          : false;

      const isConnectedToSelected = selectedEntity
        ? (selectedEntity.connections.includes(conn.source) || selectedEntity.connections.includes(conn.target))
        : true;

      return {
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: 'default',
        animated: conn.type === 'primary' && isHighlighted,
        style: {
          stroke: isHighlighted ? sourceColor : isConnectedToSelected ? `${sourceColor}40` : `${sourceColor}15`,
          strokeWidth: conn.type === 'primary' ? (isHighlighted ? 3 : 2) : (isHighlighted ? 2 : 1),
          opacity: selectedEntity ? (isHighlighted ? 1 : 0.2) : 1,
          transition: 'all 0.3s ease',
        },
        markerEnd: conn.bidirectional ? undefined : {
          type: MarkerType.ArrowClosed,
          color: sourceColor,
          width: 15,
          height: 15,
        },
      };
    });
  }, [selectedEntity, hoveredEntity]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when selection changes
  useMemo(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // Update edges when selection changes
  useMemo(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const entity = entities.find(e => e.id === node.id);
    if (entity) {
      setSelectedEntity(prev => prev?.id === entity.id ? null : entity);
    }
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hub/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-real-estate/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-regenerative/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
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
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="rgba(255, 255, 255, 0.03)"
          gap={40}
          size={1}
        />
        <Controls
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(node) => {
            const entity = entities.find(e => e.id === node.id);
            return entity ? categoryColorMap[entity.category] : '#666';
          }}
          maskColor="rgba(10, 15, 28, 0.9)"
          style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
        />
      </ReactFlow>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedEntity && (
          <EntityDetailPanel
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
          />
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-6 left-6 glass rounded-xl p-4"
      >
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Ecosystem</h3>
        <div className="space-y-2">
          {[
            { label: 'Central Hub', color: 'bg-hub' },
            { label: 'Real Estate', color: 'bg-real-estate' },
            { label: 'Regenerative', color: 'bg-regenerative' },
            { label: 'Authority', color: 'bg-authority' },
            { label: 'Philanthropy', color: 'bg-philanthropy' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-xs text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
