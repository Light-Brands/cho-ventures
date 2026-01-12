'use client';

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { Entity, EntityCategory } from '@/lib/ecosystem-data';
import {
  Building2,
  Building,
  Warehouse,
  Leaf,
  Sun,
  Users,
  BookOpen,
  GraduationCap,
  Mic,
  Heart,
  Handshake,
  Sparkles,
} from 'lucide-react';

interface EntityNodeProps {
  data: {
    entity: Entity;
    isSelected: boolean;
    isHovered: boolean;
    isConnected: boolean;
    onHover: (id: string | null) => void;
  };
}

const categoryStyles: Record<EntityCategory, { bg: string; border: string; glow: string; text: string }> = {
  hub: {
    bg: 'bg-gradient-to-br from-hub/30 to-hub/10',
    border: 'border-hub/60',
    glow: 'shadow-[0_0_40px_rgba(236,72,153,0.4)]',
    text: 'text-hub-light',
  },
  'real-estate': {
    bg: 'bg-gradient-to-br from-real-estate/25 to-real-estate/5',
    border: 'border-real-estate/50',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    text: 'text-real-estate-light',
  },
  regenerative: {
    bg: 'bg-gradient-to-br from-regenerative/25 to-regenerative/5',
    border: 'border-regenerative/50',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    text: 'text-regenerative-light',
  },
  authority: {
    bg: 'bg-gradient-to-br from-authority/25 to-authority/5',
    border: 'border-authority/50',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    text: 'text-authority-light',
  },
  philanthropy: {
    bg: 'bg-gradient-to-br from-philanthropy/25 to-philanthropy/5',
    border: 'border-philanthropy/50',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    text: 'text-philanthropy-light',
  },
};

const iconMap: Record<string, React.ElementType> = {
  hub: Sparkles,
  building: Building2,
  city: Building,
  warehouse: Warehouse,
  leaf: Leaf,
  sun: Sun,
  users: Users,
  book: BookOpen,
  graduation: GraduationCap,
  mic: Mic,
  heart: Heart,
  handshake: Handshake,
};

function EntityNode({ data }: EntityNodeProps) {
  const { entity, isSelected, isHovered, isConnected, onHover } = data;
  const styles = categoryStyles[entity.category];
  const IconComponent = iconMap[entity.icon] || Sparkles;
  const isHub = entity.category === 'hub';

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-transparent !border-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !border-0"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isSelected ? 1.05 : isHovered ? 1.02 : 1,
          opacity: isConnected ? 1 : 0.3,
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => onHover(entity.id)}
        onMouseLeave={() => onHover(null)}
        className={`
          relative cursor-pointer
          ${isHub ? 'w-[200px]' : 'w-[160px]'}
          ${styles.bg}
          backdrop-blur-xl
          border-2 ${styles.border}
          rounded-2xl
          p-4
          transition-all duration-300
          ${isSelected || isHovered ? styles.glow : ''}
          ${isSelected ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-transparent' : ''}
        `}
      >
        {/* Animated glow ring for hub */}
        {isHub && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-[-2px] bg-gradient-conic from-hub via-real-estate via-regenerative via-authority to-hub rounded-2xl animate-spin-slow opacity-30" />
            <div className="absolute inset-[1px] bg-cho-deep/90 rounded-2xl" />
          </div>
        )}

        <div className="relative z-10">
          {/* Icon */}
          <div className={`
            ${isHub ? 'w-14 h-14' : 'w-10 h-10'}
            rounded-xl
            ${styles.bg}
            border ${styles.border}
            flex items-center justify-center
            mb-3
            ${isHub ? 'mx-auto' : ''}
          `}>
            <IconComponent className={`${isHub ? 'w-7 h-7' : 'w-5 h-5'} ${styles.text}`} />
          </div>

          {/* Name */}
          <h3 className={`
            ${isHub ? 'text-base text-center' : 'text-sm'}
            font-semibold text-white
            leading-tight
            mb-1
          `}>
            {entity.name}
          </h3>

          {/* Tagline */}
          <p className={`
            text-xs text-white/50
            leading-tight
            ${isHub ? 'text-center' : ''}
            line-clamp-2
          `}>
            {entity.tagline}
          </p>

          {/* Status badge */}
          {entity.status !== 'active' && (
            <div className="mt-2">
              <span className={`
                inline-block
                text-[10px] font-medium
                uppercase tracking-wider
                px-2 py-0.5
                rounded-full
                ${entity.status === 'planned' ? 'bg-authority/20 text-authority-light' : 'bg-white/10 text-white/50'}
              `}>
                {entity.status}
              </span>
            </div>
          )}

          {/* Connection count indicator */}
          <div className={`
            absolute -top-2 -right-2
            w-6 h-6
            rounded-full
            ${styles.bg}
            border ${styles.border}
            flex items-center justify-center
            text-[10px] font-bold
            ${styles.text}
          `}>
            {entity.connections.length}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default memo(EntityNode);
