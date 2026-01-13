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
  };
}

const categoryStyles: Record<EntityCategory, {
  bg: string;
  border: string;
  glow: string;
  text: string;
  ring: string;
}> = {
  hub: {
    bg: 'bg-gradient-to-br from-hub/20 via-hub/10 to-transparent',
    border: 'border-hub/40',
    glow: 'shadow-[0_0_32px_rgba(168,85,247,0.35)]',
    text: 'text-hub-light',
    ring: 'ring-hub/40',
  },
  'real-estate': {
    bg: 'bg-gradient-to-br from-real-estate/15 to-transparent',
    border: 'border-real-estate/30',
    glow: 'shadow-[0_0_24px_rgba(59,130,246,0.3)]',
    text: 'text-real-estate-light',
    ring: 'ring-real-estate/30',
  },
  regenerative: {
    bg: 'bg-gradient-to-br from-regenerative/15 to-transparent',
    border: 'border-regenerative/30',
    glow: 'shadow-[0_0_24px_rgba(20,184,166,0.3)]',
    text: 'text-regenerative-light',
    ring: 'ring-regenerative/30',
  },
  authority: {
    bg: 'bg-gradient-to-br from-authority/15 to-transparent',
    border: 'border-authority/30',
    glow: 'shadow-[0_0_24px_rgba(14,165,233,0.3)]',
    text: 'text-authority-light',
    ring: 'ring-authority/30',
  },
  philanthropy: {
    bg: 'bg-gradient-to-br from-philanthropy/15 to-transparent',
    border: 'border-philanthropy/30',
    glow: 'shadow-[0_0_24px_rgba(99,102,241,0.3)]',
    text: 'text-philanthropy-light',
    ring: 'ring-philanthropy/30',
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
  const { entity, isSelected, isHovered, isConnected } = data;
  const styles = categoryStyles[entity.category];
  const IconComponent = iconMap[entity.icon] || Sparkles;
  const isHub = entity.category === 'hub';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0 pointer-events-none" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0 pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isSelected ? 1.03 : isHovered ? 1.01 : 1,
          opacity: isConnected ? 1 : 0.25,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`
          relative cursor-pointer select-none
          ${isHub ? 'w-44' : 'w-36'}
          ${styles.bg}
          backdrop-blur-md
          border ${styles.border}
          rounded-xl
          ${isHub ? 'p-4' : 'p-3'}
          transition-shadow duration-200
          ${isSelected || isHovered ? styles.glow : ''}
          ${isSelected ? `ring-1 ${styles.ring}` : ''}
        `}
      >
        {/* Hub gradient ring */}
        {isHub && (
          <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-hub/30 via-transparent to-hub/10 -z-10" />
        )}

        <div className="relative z-10 flex flex-col">
          {/* Icon */}
          <div className={`
            ${isHub ? 'w-11 h-11 mb-2.5 mx-auto' : 'w-8 h-8 mb-2'}
            rounded-lg
            ${styles.bg}
            border ${styles.border}
            flex items-center justify-center
          `}>
            <IconComponent className={`${isHub ? 'w-5 h-5' : 'w-4 h-4'} ${styles.text}`} />
          </div>

          {/* Name */}
          <h3 className={`
            ${isHub ? 'text-sm text-center' : 'text-xs'}
            font-semibold text-white/90
            leading-tight truncate
          `}>
            {entity.name}
          </h3>

          {/* Tagline - hub only */}
          {isHub && (
            <p className="text-[10px] text-white/40 text-center mt-1 line-clamp-1">
              {entity.tagline}
            </p>
          )}

          {/* Status badge - non-active only */}
          {entity.status !== 'active' && (
            <span className={`
              mt-2 inline-block self-start
              text-[9px] font-medium uppercase tracking-wide
              px-1.5 py-0.5 rounded
              ${entity.status === 'planned'
                ? 'bg-authority/15 text-authority-light border border-authority/20'
                : 'bg-white/5 text-white/40 border border-white/10'}
            `}>
              {entity.status}
            </span>
          )}
        </div>

        {/* Connection count */}
        <div className={`
          absolute -top-1.5 -right-1.5
          w-5 h-5 rounded-full
          bg-cho-slate border ${styles.border}
          flex items-center justify-center
          text-[9px] font-semibold ${styles.text}
        `}>
          {entity.connections.length}
        </div>
      </motion.div>
    </>
  );
}

export default memo(EntityNode);
