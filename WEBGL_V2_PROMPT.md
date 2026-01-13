# CHO Ventures Ecosystem Map v2 - WebGL Implementation Prompt

## Project Overview
Build a next-generation, WebGL-powered interactive ecosystem visualization for Cho Ventures that transforms the current ReactFlow-based 2D network graph into a stunning, performant, and deeply interactive 3D/2.5D experience.

## Current System Understanding

### Core Concept
- **Purpose**: Visualize the Cho Ventures ecosystem as an interconnected network
- **Central Hub**: Cho Ventures (purple) sits at the center, connecting to 11 entities
- **Entity Categories**:
  - **Hub** (purple #A855F7): Central command center
  - **Real Estate** (blue #3B82F6): Metro 1, Future of Cities, PHX-JAX, Climate Hub
  - **Regenerative** (teal #14B8A6): ChoZen Retreat, ChoZen Community
  - **Authority** (cyan #0EA5E9): Book Platform, Course Platform, Speaking & Media
  - **Philanthropy** (indigo #6366F1): Cho Family Foundation, M1 Community Fund

### Current Features
- Interactive nodes with hover/click states
- Connection lines between entities (primary, secondary, data-flow types)
- Detail panel showing entity information (metrics, AI applications, connections)
- Category-based color coding and visual hierarchy
- Smooth animations and transitions
- Dark theme (#080B14 background)
- Legend with category filtering
- Entity status indicators (active, planned, foundation)

### Data Structure
- 12 entities total (1 hub + 11 connected entities)
- Multiple connection types: primary (hub-to-entity), secondary (entity-to-entity), data-flow
- Each entity has: name, category, status, tagline, description, location, metrics, AI applications, connections array

## WebGL v2 Requirements

### Visual Design
1. **3D/2.5D Space**: Transform the flat network into a dynamic 3D space where:
   - Entities appear as glowing orbs/spheres with category-colored halos
   - Connections are animated energy streams/beams between nodes
   - The hub (Cho Ventures) pulses with a distinctive purple glow at the center
   - Depth and layering create visual hierarchy

2. **Color Palette** (maintain existing):
   - Background: `#080B14` (cho-midnight)
   - Hub: `#A855F7` (purple)
   - Real Estate: `#3B82F6` (blue)
   - Regenerative: `#14B8A6` (teal)
   - Authority: `#0EA5E9` (cyan)
   - Philanthropy: `#6366F1` (indigo)

3. **Visual Effects**:
   - Particle systems around nodes (category-colored)
   - Animated connection lines with flowing energy/data particles
   - Depth-of-field blur for non-focused entities
   - Smooth camera transitions and orbital controls
   - Ambient lighting that enhances the dark theme
   - Glow effects that respond to interaction

### Interactivity Requirements

1. **Camera Controls**:
   - Smooth orbital rotation around the hub
   - Zoom in/out with mouse wheel or pinch
   - Pan/drag to explore the space
   - Auto-fit view on load
   - Smooth transitions when focusing on entities/categories

2. **Node Interactions**:
   - **Hover**: Scale up, intensify glow, show connection highlights, display tooltip with entity name
   - **Click**: Focus camera on entity, highlight all connections, show detail panel
   - **Selection**: Visual feedback with pulsing ring, connection highlighting
   - **Category Filter**: Hover legend items to highlight/focus category nodes

3. **Connection Visualization**:
   - Animated particles flowing along connection paths
   - Different visual styles for primary/secondary/data-flow connections
   - Highlight on hover/selection
   - Fade out non-relevant connections when entity selected

4. **Detail Panel**:
   - Slide-in panel (right side) with entity information
   - Maintain existing design language (dark theme, category colors)
   - Smooth animations on open/close
   - Click outside to close

### Performance Requirements

1. **Target Performance**:
   - 60 FPS on modern hardware
   - Smooth interactions with no lag
   - Efficient rendering of 12 nodes + ~20 connections
   - Optimized for both desktop and mobile devices

2. **Technical Considerations**:
   - Use Three.js or similar WebGL framework
   - Implement frustum culling
   - Use instanced rendering for particles
   - Optimize shaders for performance
   - Implement level-of-detail (LOD) if needed
   - Use requestAnimationFrame for smooth animations

### Technical Stack Recommendations

- **WebGL Framework**: Three.js (most mature, great docs) or React Three Fiber (React-friendly)
- **Animation**: GSAP or Framer Motion for UI animations, Three.js animations for 3D
- **State Management**: React hooks (useState, useRef, useEffect)
- **Styling**: Tailwind CSS (maintain existing design system)
- **TypeScript**: Full type safety

### Implementation Phases

**Phase 1: Core 3D Scene**
- Set up WebGL canvas and Three.js scene
- Create dark background with subtle ambient lighting
- Position entities in 3D space (hub at center, others in orbit)
- Render nodes as glowing spheres with category colors

**Phase 2: Connections**
- Draw connection lines between entities
- Add animated particles flowing along connections
- Implement different styles for connection types
- Add hover/selection highlighting

**Phase 3: Interactivity**
- Implement camera controls (orbit, zoom, pan)
- Add node hover/click handlers
- Create smooth camera transitions
- Implement category filtering

**Phase 4: UI Integration**
- Integrate detail panel (reuse existing component)
- Add legend with category filtering
- Maintain header with logo and stats
- Ensure smooth transitions between 2D UI and 3D scene

**Phase 5: Polish**
- Add particle effects around nodes
- Enhance glow effects
- Optimize performance
- Add loading states
- Test on various devices/browsers

### Key Features to Enhance

1. **Entity Visualization**:
   - 3D spheres with category-colored halos
   - Icon/texture on sphere surface (optional)
   - Pulsing animation for active entities
   - Status indicators (planned entities dimmed)

2. **Connection Visualization**:
   - Curved bezier paths (not straight lines)
   - Animated particles flowing along paths
   - Different thickness/opacity for connection types
   - Color-coded by source entity category

3. **Camera Behavior**:
   - Start with overview of entire ecosystem
   - Smooth zoom to entity on click
   - Smooth return to overview on deselect
   - Category focus mode (zoom to show all entities in category)

4. **Performance Optimizations**:
   - Use geometry instancing for particles
   - Implement object pooling
   - Use efficient shaders
   - Minimize draw calls
   - Use texture atlases if needed

### Design Principles

1. **Maintain Brand Identity**: Keep the dark, sophisticated aesthetic
2. **Smooth Transitions**: All interactions should feel fluid and responsive
3. **Visual Hierarchy**: Hub should be clearly central, categories visually distinct
4. **Accessibility**: Ensure keyboard navigation and screen reader support
5. **Mobile Responsive**: Adapt controls and UI for touch devices

### Success Criteria

- ✅ Smooth 60 FPS performance
- ✅ Intuitive camera controls
- ✅ Beautiful, immersive 3D visualization
- ✅ All existing functionality preserved
- ✅ Enhanced interactivity and visual appeal
- ✅ Maintains Cho Ventures brand aesthetic
- ✅ Works across modern browsers
- ✅ Responsive to different screen sizes

## Deliverables

1. **WebGL-powered EcosystemMap component** replacing current ReactFlow implementation
2. **Maintained UI components** (detail panel, legend, header)
3. **Optimized performance** with smooth interactions
4. **Comprehensive documentation** for future maintenance
5. **Type-safe TypeScript** implementation

## Notes

- Preserve all existing data structures (`ecosystem-data.ts`)
- Maintain existing UI components where possible (EntityDetailPanel, etc.)
- Keep the same color palette and design language
- Ensure backward compatibility with existing data format
- Consider adding new visual features that enhance understanding of the ecosystem

---

**Goal**: Create a "wow factor" visualization that makes exploring the Cho Ventures ecosystem a delightful, smooth, and visually stunning experience while maintaining all functional requirements of the current system.
