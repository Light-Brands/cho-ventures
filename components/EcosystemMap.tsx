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
import { entities, connections, Entity, EntityCategory, aiLayerConfig } from '@/lib/ecosystem-data';
import EntityNode from './EntityNode';
import EntityDetailPanel from './EntityDetailPanel';

const nodeTypes = {
  entity: EntityNode,
};

const categoryColorMap: Record<EntityCategory, string> = {
  conglomerate: '#E879F7',
  'real-estate': '#3B82F6',
  regenerative: '#14B8A6',
  authority: '#0EA5E9',
  philanthropy: '#6366F1',
  development: '#F59E0B',
};

const roleLineStyles: Record<string, string | undefined> = {
  investor: undefined, // solid
  donor: '8 4',
  developer: undefined, // solid thick
  'in-kind-donor': '4 4',
  authority: '12 4',
  parent: undefined,
};

// Hierarchy: AI System at top → two conglomerates → children in circles below
function calculateDualLayoutPositions(): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  const centerX = 950;

  // --- AI Superintelligent System at top center ---
  positions['ai-system'] = { x: centerX - 88, y: 40 };

  // --- CHO Ventures (left) below AI system ---
  const cvCenterX = 350;
  const cvCenterY = 620;
  positions['cho-ventures'] = { x: cvCenterX - 88, y: 240 };

  // CV entities in semicircle, ordered by cluster affinity:
  // Right side (near center shared entities): real-estate + philanthropy
  // Bottom: regenerative (bridges to chozen-ccrl in center)
  // Left side: authority cluster (self-contained)
  const cvEntities = [
    'metro-1',            // real-estate → climate-hub
    'cho-foundation',     // philanthropy → climate-hub, friends-of-phxjax
    'ximena-legacy-fund', // philanthropy → cho-foundation
    'chozen-ip',          // regenerative → chozen-ccrl, course-platform
    'course-platform',    // authority → chozen-ip, book, tony-cho
    'book-platform',      // authority → course, speaking, tony-cho
    'speaking-media',     // authority → book, tony-cho
    'tony-cho-brand',     // authority → speaking, book, course
  ];
  const cvRadius = 380;

  cvEntities.forEach((id, index) => {
    const startAngle = -Math.PI * 0.1;
    const endAngle = Math.PI * 1.1;
    const angle = startAngle + (index / (cvEntities.length - 1)) * (endAngle - startAngle);
    positions[id] = {
      x: cvCenterX + Math.cos(angle) * cvRadius - 70,
      y: cvCenterY + Math.sin(angle) * cvRadius * 0.65 - 40,
    };
  });

  // --- Future of Cities (right) below AI system ---
  const focCenterX = 1550;
  positions['future-of-cities'] = { x: focCenterX - 88, y: 240 };

  // FoC Portugal below parent
  positions['foc-portugal'] = { x: focCenterX - 70, y: 480 };

  // --- Shared entities (center column, ordered to minimize crossing) ---
  // Top: climate-hub (connects to metro-1 + cho-foundation at top-right of CV arc)
  // Then: phx-jax (connects to friends-of-phxjax below)
  // Then: friends-of-phxjax (connects to cho-foundation + phx-jax above)
  // Bottom: chozen-ccrl (connects to chozen-ip at bottom of CV arc)
  const sharedEntities = ['climate-hub', 'phx-jax', 'friends-of-phxjax', 'chozen-ccrl'];
  const sharedStartY = 340;
  const sharedSpacing = 180;

  sharedEntities.forEach((id, index) => {
    positions[id] = {
      x: centerX - 70,
      y: sharedStartY + index * sharedSpacing,
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

  const positions = useMemo(() => calculateDualLayoutPositions(), []);

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

  const baseEdges: Edge[] = useMemo(() => {
    return connections.map((conn) => {
      const sourceEntity = entities.find((e) => e.id === conn.source);
      const sourceColor = sourceEntity ? categoryColorMap[sourceEntity.category] : '#666';
      const isBridge = conn.type === 'conglomerate-bridge';
      const isDeveloper = conn.relationshipRole === 'developer';

      return {
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: 'default',
        label: conn.relationshipRole ? conn.relationshipRole.replace('-', ' ') : undefined,
        labelStyle: { fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 500, textTransform: 'uppercase' as const },
        labelBgStyle: { fill: 'rgba(8,11,20,0.8)', fillOpacity: 0.8 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 3,
        style: {
          stroke: isBridge ? aiLayerConfig.colors.primary : sourceColor,
          strokeWidth: isBridge ? 3 : isDeveloper ? 2.5 : 1.5,
          strokeDasharray: isBridge ? '12 6' : (conn.relationshipRole ? roleLineStyles[conn.relationshipRole] : undefined),
          transition: 'all 0.25s ease',
        },
      };
    });
  }, []);

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
      const isBridge = conn?.type === 'conglomerate-bridge';

      const connType = conn?.type;
      const isDashed = connType === 'services' || connType === 'platform' || connType === 'ip-licensing';

      return {
        ...edge,
        animated: isBridge || ((connType === 'primary' || connType === 'ip-licensing') && isHighlighted),
        style: {
          ...edge.style,
          stroke: isHighlighted
            ? (isBridge ? aiLayerConfig.colors.light : sourceColor)
            : isBridge
              ? `${aiLayerConfig.colors.primary}60`
              : `${sourceColor}25`,
          strokeWidth: isHighlighted
            ? (isBridge ? 4 : connType === 'ip-licensing' ? 2.5 : 2)
            : (isBridge ? 2 : 1),
          strokeDasharray: isBridge ? '12 6' : isDashed ? (connType === 'ip-licensing' ? '8 4' : '5 5') : (conn?.relationshipRole ? roleLineStyles[conn.relationshipRole] : undefined),
          opacity: selectedEntity ? (isHighlighted ? 1 : 0.15) : isBridge ? 0.7 : 0.6,
        },
      };
    });
  }, [baseEdges, selectedEntity, deferredHoveredEntity]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    if (!hasFittedView.current) {
      setTimeout(() => {
        instance.fitView({ padding: 0.1, duration: 400, maxZoom: 0.75 });
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

  const handleCategoryLeave = useCallback(() => {
    if (!reactFlowInstance.current) return;
    reactFlowInstance.current.fitView({
      padding: 0.15,
      duration: 500,
      maxZoom: 0.9,
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-[400px] h-[400px] bg-conglomerate/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/5 w-[400px] h-[400px] bg-conglomerate/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[600px] bg-ai-layer/3 rounded-full blur-[100px]" />
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
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
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

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-cho-deep/80 backdrop-blur-sm rounded-lg border border-cho-steel/30 px-3 py-3"
      >
        <div className="flex flex-col gap-2">
          <div className="text-[8px] font-medium text-white/25 uppercase tracking-wider mb-1">Entity Types</div>
          {[
            { label: 'Conglomerate', color: 'bg-conglomerate', category: 'conglomerate' as EntityCategory },
            { label: 'Real Estate', color: 'bg-real-estate', category: 'real-estate' as EntityCategory },
            { label: 'Regenerative', color: 'bg-regenerative', category: 'regenerative' as EntityCategory },
            { label: 'Authority', color: 'bg-authority', category: 'authority' as EntityCategory },
            { label: 'Philanthropy', color: 'bg-philanthropy', category: 'philanthropy' as EntityCategory },
            { label: 'Development', color: 'bg-development', category: 'development' as EntityCategory },
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

          <div className="w-full h-px bg-white/10 my-1" />
          <div className="text-[8px] font-medium text-white/25 uppercase tracking-wider mb-1">Roles</div>
          {[
            { label: 'Investor', style: 'solid' },
            { label: 'Donor', style: 'dashed' },
            { label: 'Developer', style: 'solid-thick' },
            { label: 'AI System', style: 'ai-bridge' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-4 h-px relative">
                {item.style === 'solid' && <div className="absolute inset-0 bg-white/40" />}
                {item.style === 'dashed' && <div className="absolute inset-0 border-t border-dashed border-white/40" />}
                {item.style === 'solid-thick' && <div className="absolute inset-0 bg-white/40 h-[2px]" />}
                {item.style === 'ai-bridge' && <div className="absolute inset-0 border-t border-dashed border-ai-layer/60" />}
              </div>
              <span className="text-[10px] text-white/40">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
