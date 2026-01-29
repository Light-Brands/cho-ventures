'use client';

import { motion } from 'framer-motion';
import { Entity, EntityCategory, EntityType, categoryLabels, entities } from '@/lib/ecosystem-data';
import {
  X,
  MapPin,
  Sparkles,
  ArrowRight,
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
  Cpu,
  Link,
} from 'lucide-react';

interface EntityDetailPanelProps {
  entity: Entity;
  onClose: () => void;
}

const categoryStyles: Record<EntityCategory, {
  bg: string;
  border: string;
  text: string;
  accent: string;
  gradientFrom: string;
}> = {
  hub: {
    bg: 'bg-hub/10',
    border: 'border-hub/25',
    text: 'text-hub-light',
    accent: 'text-hub',
    gradientFrom: 'from-hub/15',
  },
  'real-estate': {
    bg: 'bg-real-estate/10',
    border: 'border-real-estate/25',
    text: 'text-real-estate-light',
    accent: 'text-real-estate',
    gradientFrom: 'from-real-estate/15',
  },
  regenerative: {
    bg: 'bg-regenerative/10',
    border: 'border-regenerative/25',
    text: 'text-regenerative-light',
    accent: 'text-regenerative',
    gradientFrom: 'from-regenerative/15',
  },
  authority: {
    bg: 'bg-authority/10',
    border: 'border-authority/25',
    text: 'text-authority-light',
    accent: 'text-authority',
    gradientFrom: 'from-authority/15',
  },
  philanthropy: {
    bg: 'bg-philanthropy/10',
    border: 'border-philanthropy/25',
    text: 'text-philanthropy-light',
    accent: 'text-philanthropy',
    gradientFrom: 'from-philanthropy/15',
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

const entityTypeLabels: Record<EntityType, string> = {
  'ip-holder': 'IP Holder',
  'operating': 'Operating Entity',
  'nonprofit': '501(c)(3) Nonprofit',
  'daf': 'Donor-Advised Fund',
  'development': 'Development',
};

export default function EntityDetailPanel({ entity, onClose }: EntityDetailPanelProps) {
  const styles = categoryStyles[entity.category];
  const IconComponent = iconMap[entity.icon] || Sparkles;

  const connectedEntities = entity.connections
    .map((id) => entities.find((e) => e.id === id))
    .filter(Boolean) as Entity[];

  return (
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 80 }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="absolute top-3 right-3 bottom-3 w-[360px] z-50 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
      <div className={`h-full bg-cho-deep/95 backdrop-blur-md rounded-xl overflow-hidden flex flex-col border ${styles.border}`}>
        {/* Header */}
        <div className={`relative px-5 pt-5 pb-6 bg-gradient-to-br ${styles.gradientFrom} to-transparent`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>

          {/* Category */}
          <div className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider ${styles.text} mb-3`}>
            <div className={`w-1.5 h-1.5 rounded-full ${styles.bg}`} />
            {categoryLabels[entity.category]}
          </div>

          {/* Icon + Title */}
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl ${styles.bg} border ${styles.border} flex items-center justify-center flex-shrink-0`}>
              <IconComponent className={`w-6 h-6 ${styles.text}`} />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-white leading-tight">{entity.name}</h2>
              <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{entity.tagline}</p>
            </div>
          </div>

          {/* Location */}
          {entity.location && (
            <div className="mt-3 flex items-center gap-1.5 text-white/40">
              <MapPin className="w-3 h-3" />
              <span className="text-[11px]">{entity.location}</span>
            </div>
          )}

          {/* Status & Entity Type */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {entity.status !== 'active' && (
              <span className={`
                inline-flex items-center gap-1
                text-[10px] font-medium uppercase tracking-wide
                px-2 py-1 rounded
                ${entity.status === 'planned' ? 'bg-authority/15 text-authority-light border border-authority/20' : 'bg-white/5 text-white/40 border border-white/10'}
              `}>
                {entity.status === 'planned' ? 'Coming Soon' : entity.status}
              </span>
            )}
            {entity.entityType && (
              <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-wide px-2 py-1 rounded bg-white/5 text-white/50 border border-white/10">
                {entityTypeLabels[entity.entityType]}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Description */}
          <p className="text-xs text-white/60 leading-relaxed">{entity.description}</p>

          {/* Notes */}
          {entity.notes && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-yellow-500/5 border border-yellow-500/15">
              <span className="text-[10px] text-yellow-400/70 font-medium uppercase tracking-wider shrink-0">Note</span>
              <p className="text-[11px] text-yellow-200/50 leading-relaxed">{entity.notes}</p>
            </div>
          )}

          {/* Metrics */}
          {entity.metrics && entity.metrics.length > 0 && (
            <div>
              <h3 className="text-[10px] font-medium text-white/35 uppercase tracking-wider mb-2">Metrics</h3>
              <div className="grid grid-cols-2 gap-2">
                {entity.metrics.map((metric, i) => (
                  <div key={i} className={`p-2.5 rounded-lg ${styles.bg} border ${styles.border}`}>
                    <div className={`text-base font-semibold ${styles.text}`}>{metric.value}</div>
                    <div className="text-[10px] text-white/40">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Applications */}
          {entity.aiApplications && entity.aiApplications.length > 0 && (
            <div>
              <h3 className="text-[10px] font-medium text-white/35 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3 h-3" />
                AI Applications
              </h3>
              <ul className="space-y-1.5">
                {entity.aiApplications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-white/55">
                    <ArrowRight className={`w-3 h-3 mt-0.5 flex-shrink-0 ${styles.accent}`} />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Connections */}
          {connectedEntities.length > 0 && (
            <div>
              <h3 className="text-[10px] font-medium text-white/35 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Link className="w-3 h-3" />
                Connections ({connectedEntities.length})
              </h3>
              <div className="space-y-1.5">
                {connectedEntities.slice(0, 5).map((connected) => {
                  const connStyles = categoryStyles[connected.category];
                  const ConnIcon = iconMap[connected.icon] || Sparkles;
                  return (
                    <div key={connected.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className={`w-7 h-7 rounded-md ${connStyles.bg} border ${connStyles.border} flex items-center justify-center`}>
                        <ConnIcon className={`w-3.5 h-3.5 ${connStyles.text}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white/80 truncate">{connected.name}</div>
                        <div className="text-[10px] text-white/35">{categoryLabels[connected.category]}</div>
                      </div>
                    </div>
                  );
                })}
                {connectedEntities.length > 5 && (
                  <div className="text-[10px] text-white/30 text-center pt-1">+{connectedEntities.length - 5} more</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
