'use client';

import { useCallback, useMemo, useState, useEffect, useRef, useDeferredValue } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  ReactFlowInstance,
  NodeMouseHandler,
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

  // Get all non-hub entities
  const nonHubEntities = entities.filter(e => e.id !== 'cho-ventures');
  const nodeCount = nonHubEntities.length;
  
  // Calculate angle step for even distribution in a circle
  const angleStep = (2 * Math.PI) / nodeCount;
  const radius = 380; // Increased radius for better spacing
  const nodeWidth = 144; // Average node width (w-36 = 144px)
  const nodeHeight = 80; // Average node height

  // Position all nodes evenly in a circle
  nonHubEntities.forEach((entity, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top (-π/2)
    positions[entity.id] = {
      x: centerX + Math.cos(angle) * radius - nodeWidth / 2,
      y: centerY + Math.sin(angle) * radius - nodeHeight / 2,
    };
  });

  return positions;
}

export default function EcosystemMap() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const deferredHoveredEntity = useDeferredValue(hoveredEntity);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const hasFittedView = useRef(false);

  const positions = useMemo(() => calculateNodePositions(), []);

      // Create base nodes once - positions don't change
  const baseNodes: Node[] = useMemo(() => {
    return entities.map((entity) => ({
      id: entity.id,
      type: 'entity',
      position: positions[entity.id] || { x: 0, y: 0 },
      data: {
        entity,
      },
    }));
  }, [positions]);

  // Update nodes efficiently - only change what's needed
  // Use deferred hover value to reduce flicker
  const nodes = useMemo(() => {
    return baseNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isSelected: selectedEntity?.id === node.id,
        isHovered: deferredHoveredEntity === node.id,
        isConnected: selectedEntity
          ? selectedEntity.connections.includes(node.id) || node.id === selectedEntity.id
          : true,
      },
    }));
  }, [baseNodes, selectedEntity, deferredHoveredEntity]);

  // Create base edges once
  const baseEdges: Edge[] = useMemo(() => {
    return connections.map((conn) => {
      const sourceEntity = entities.find((e) => e.id === conn.source);
      const sourceColor = sourceEntity ? categoryColorMap[sourceEntity.category] : '#666';

      return {
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: 'default',
        style: {
          stroke: sourceColor,
          transition: 'all 0.25s ease',
        },
      };
    });
  }, []);

  // Update edges efficiently - only change what's needed
  // Use deferred hover value to reduce flicker
  const edges = useMemo(() => {
    return baseEdges.map((edge) => {
      const isHighlighted = selectedEntity
        ? edge.source === selectedEntity.id || edge.target === selectedEntity.id
        : deferredHoveredEntity
          ? edge.source === deferredHoveredEntity || edge.target === deferredHoveredEntity
          : false;

      const sourceEntity = entities.find((e) => e.id === edge.source);
      const sourceColor = sourceEntity ? categoryColorMap[sourceEntity.category] : '#666';
      const conn = connections.find((c) => c.id === edge.id);

      const connType = conn?.type;
      const isDashed = connType === 'services' || connType === 'platform' || connType === 'ip-licensing';

      return {
        ...edge,
        animated: (connType === 'primary' || connType === 'ip-licensing') && isHighlighted,
        style: {
          ...edge.style,
          stroke: isHighlighted ? sourceColor : `${sourceColor}25`,
          strokeWidth: isHighlighted ? (connType === 'ip-licensing' ? 2.5 : 2) : 1,
          strokeDasharray: isDashed ? (connType === 'ip-licensing' ? '8 4' : '5 5') : undefined,
          opacity: selectedEntity ? (isHighlighted ? 1 : 0.15) : 0.6,
        },
      };
    });
  }, [baseEdges, selectedEntity, deferredHoveredEntity]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes/edges when computed values change
  useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  // Fit view once on mount
  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    if (!hasFittedView.current) {
      setTimeout(() => {
        instance.fitView({ padding: 0.2, duration: 400, maxZoom: 1 });
        hasFittedView.current = true;
      }, 100);
    }
  }, []);

  const handleNodeClick = useCallback<NodeMouseHandler>((_, node) => {
    const entity = entities.find((e) => e.id === node.id);
    if (entity) {
      setSelectedEntity((prev) => (prev?.id === entity.id ? null : entity));
    }
  }, []);

  const handleNodeMouseEnter = useCallback<NodeMouseHandler>((_, node) => {
    setHoveredEntity(node.id);
  }, []);

  const handleNodeMouseLeave = useCallback<NodeMouseHandler>(() => {
    setHoveredEntity(null);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  // Focus on nodes of a specific category
  const handleCategoryHover = useCallback((category: EntityCategory) => {
    if (!reactFlowInstance.current) return;
    
    const categoryNodes = nodesState.filter((node) => {
      const entity = entities.find((e) => e.id === node.id);
      return entity?.category === category;
    });
    
    if (categoryNodes.length > 0) {
      reactFlowInstance.current.fitView({
        nodes: categoryNodes,
        padding: 0.3,
        duration: 500,
        maxZoom: 1.1,
      });
    }
  }, [nodesState]);

  // Reset view to show all nodes
  const handleCategoryLeave = useCallback(() => {
    if (!reactFlowInstance.current) return;
    reactFlowInstance.current.fitView({
      padding: 0.2,
      duration: 500,
      maxZoom: 1,
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-hub/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-real-estate/4 rounded-full blur-[100px]" />
      </div>

      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        onPaneClick={handlePaneClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        minZoom={0.2}
        maxZoom={1.2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        selectNodesOnDrag={false}
        preventScrolling={false}
        deleteKeyCode={null}
        multiSelectionKeyCode={null}
      >
        <Background color="rgba(255, 255, 255, 0.015)" gap={50} size={1} />
        <Controls showZoom={true} showFitView={true} showInteractive={false} />
      </ReactFlow>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedEntity && (
          <EntityDetailPanel entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
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
              className="flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-80"
              onMouseEnter={() => handleCategoryHover(item.category)}
              onMouseLeave={handleCategoryLeave}
            >
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[10px] text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
