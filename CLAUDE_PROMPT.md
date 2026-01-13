# CHO Ventures Ecosystem Map v2 - WebGL Implementation

Build a WebGL-powered, super-interactive 3D visualization of the Cho Ventures ecosystem network. Transform the current ReactFlow 2D graph into a flawless, performant 3D/2.5D experience.

## Current System
- **12 entities**: Cho Ventures (purple hub) + 11 connected entities across 5 categories
- **Categories**: Hub (#A855F7), Real Estate (#3B82F6), Regenerative (#14B8A6), Authority (#0EA5E9), Philanthropy (#6366F1)
- **Features**: Interactive nodes, connection lines, detail panel, category filtering, dark theme (#080B14)
- **Tech**: Next.js, React, ReactFlow, Framer Motion, TypeScript, Tailwind

## WebGL v2 Requirements

### Visual Design
- **3D Space**: Entities as glowing orbs/spheres with category-colored halos
- **Connections**: Animated energy streams/beams with flowing particles between nodes
- **Hub**: Central pulsing purple glow (Cho Ventures at center)
- **Effects**: Particle systems, depth-of-field blur, smooth camera transitions, ambient lighting, responsive glow effects
- **Colors**: Maintain existing palette (purple hub, blue/teal spectrum on dark #080B14 background)

### Interactivity
- **Camera**: Smooth orbital rotation, zoom (wheel/pinch), pan/drag, auto-fit on load, smooth focus transitions
- **Nodes**: Hover (scale, glow, highlight connections, tooltip), Click (focus camera, show detail panel), Selection (pulsing ring, connection highlights)
- **Connections**: Animated particles flowing along paths, different styles for primary/secondary/data-flow, highlight on hover/selection
- **UI**: Slide-in detail panel (right), category legend filtering, maintain existing header/logo

### Performance
- **60 FPS** on modern hardware, smooth interactions, optimized for desktop/mobile
- **Tech Stack**: Three.js or React Three Fiber, GSAP/Framer Motion, TypeScript, Tailwind CSS
- **Optimizations**: Frustum culling, instanced rendering for particles, efficient shaders, requestAnimationFrame

### Implementation
1. **Core 3D Scene**: WebGL canvas, dark background, position entities (hub center, others in orbit), glowing spheres
2. **Connections**: Animated connection lines with particles, different styles per type, hover/selection highlighting
3. **Interactivity**: Camera controls, node handlers, smooth transitions, category filtering
4. **UI Integration**: Detail panel, legend, header, smooth 2D/3D transitions
5. **Polish**: Particle effects, enhanced glows, performance optimization, loading states

### Key Enhancements
- Curved bezier connection paths (not straight)
- 3D spheres with category halos and optional icon textures
- Pulsing animations for active entities
- Smooth camera zoom/focus on entity click
- Category focus mode (zoom to show category entities)
- Geometry instancing for particles, object pooling, efficient shaders

### Success Criteria
✅ 60 FPS performance | ✅ Intuitive camera controls | ✅ Beautiful immersive 3D | ✅ All existing functionality preserved | ✅ Enhanced interactivity | ✅ Maintains brand aesthetic | ✅ Cross-browser compatible | ✅ Responsive design

**Preserve**: All data structures (`ecosystem-data.ts`), existing UI components (EntityDetailPanel), color palette, design language, TypeScript types.

**Goal**: Create a "wow factor" visualization that makes exploring the Cho Ventures ecosystem delightful, smooth, and visually stunning while maintaining all functional requirements.
