'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const bridgeVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bridgeFragmentShader = `
  uniform float time;
  uniform vec3 color;

  varying vec2 vUv;
  varying vec3 vWorldPosition;

  // Simple noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    // Flowing energy pattern
    float flow1 = noise(vUv * 3.0 + vec2(time * 0.15, time * 0.1));
    float flow2 = noise(vUv * 5.0 + vec2(-time * 0.1, time * 0.2));
    float flow = flow1 * 0.6 + flow2 * 0.4;

    // Edge fade
    float edgeFadeX = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
    float edgeFadeY = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

    // Pulse
    float pulse = sin(time * 1.5) * 0.15 + 0.85;

    float alpha = flow * edgeFadeX * edgeFadeY * pulse * 0.15;

    // Energy streaks flowing upward
    float streak = sin(vUv.y * 20.0 - time * 2.0) * 0.5 + 0.5;
    streak *= edgeFadeX;
    alpha += streak * 0.05 * edgeFadeY;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function AILayerBridge() {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#818CF8') },
      },
      vertexShader: bridgeVertexShader,
      fragmentShader: bridgeFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Translucent plane */}
      <mesh ref={meshRef} material={material}>
        <planeGeometry args={[1.5, 8, 32, 32]} />
      </mesh>

      {/* Label */}
      <Html
        center
        distanceFactor={15}
        position={[0, 4.5, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center whitespace-nowrap">
          <div
            className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-md backdrop-blur-md"
            style={{
              color: '#A5B4FC',
              textShadow: '0 0 12px #818CF8, 0 0 24px #818CF890',
              background: 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(129,140,248,0.1))',
              border: '1px solid rgba(129,140,248,0.3)',
            }}
          >
            AI Layer
          </div>
        </div>
      </Html>
    </group>
  );
}
