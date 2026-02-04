'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Connection, Entity, EntityCategory } from '@/lib/ecosystem-data';

const categoryColors: Record<EntityCategory, string> = {
  conglomerate: '#E879F7',
  'real-estate': '#3B82F6',
  regenerative: '#14B8A6',
  authority: '#0EA5E9',
  philanthropy: '#6366F1',
  development: '#F59E0B',
};

interface ConnectionBeamProps {
  connection: Connection;
  sourceEntity: Entity;
  targetEntity: Entity;
  sourcePosition: [number, number, number];
  targetPosition: [number, number, number];
  isHighlighted: boolean;
  isConnected: boolean;
}

const beamVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragmentShader = `
  uniform vec3 color;
  uniform float time;
  uniform float opacity;
  uniform float highlighted;
  uniform float isBridge;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    float flowSpeed = highlighted > 0.5 ? 0.8 : 0.4;
    if (isBridge > 0.5) flowSpeed = 1.2;
    float flow = fract(vUv.x * 4.0 - time * flowSpeed);

    float pulse = smoothstep(0.0, 0.2, flow) * smoothstep(1.0, 0.6, flow);

    float energyNoise = smoothNoise(vec2(vUv.x * 8.0 + time * 0.5, time * 0.3));
    energyNoise = energyNoise * 0.3 + 0.7;

    float radialDist = abs(vUv.y - 0.5) * 2.0;
    float radialFade = 1.0 - smoothstep(0.0, 1.0, radialDist);

    float endFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
    endFade = pow(endFade, 0.8);

    float coreIntensity = mix(0.4, 1.0, pulse * max(highlighted, isBridge));
    coreIntensity *= energyNoise;

    float edgeGlow = 1.0 - radialDist;
    edgeGlow = pow(edgeGlow, 0.5);

    float alpha = coreIntensity * radialFade * endFade * opacity;
    alpha += edgeGlow * 0.3 * opacity * max(highlighted, isBridge);

    vec3 energyColor = color;
    if (highlighted > 0.5 || isBridge > 0.5) {
      float hotCore = pulse * 0.5;
      energyColor = mix(color, vec3(1.0, 1.0, 1.0), hotCore);
    }

    energyColor *= (0.9 + energyNoise * 0.1);

    gl_FragColor = vec4(energyColor, alpha);
  }
`;

export default function ConnectionBeam({
  connection,
  sourceEntity,
  sourcePosition,
  targetPosition,
  isHighlighted,
  isConnected,
}: ConnectionBeamProps) {
  const lineRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const color = new THREE.Color(
    connection.type === 'conglomerate-bridge'
      ? '#818CF8'
      : categoryColors[sourceEntity.category]
  );
  const isPrimary = connection.type === 'primary';
  const isBridge = connection.type === 'conglomerate-bridge';
  const isDataFlow = connection.type === 'data-flow';
  const isIpLicensing = connection.type === 'ip-licensing';

  const { curve, tubeGeometry } = useMemo(() => {
    const start = new THREE.Vector3(...sourcePosition);
    const end = new THREE.Vector3(...targetPosition);

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    const distance = start.distanceTo(end);
    const curveHeight = distance * 0.15;
    mid.y += curveHeight;

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      64,
      isBridge ? 0.04 : isPrimary || isIpLicensing ? 0.02 : 0.012,
      8,
      false
    );

    return { curve, tubeGeometry };
  }, [sourcePosition, targetPosition, isPrimary, isBridge, isIpLicensing]);

  const particleGeometry = useMemo(() => {
    const particleCount = isBridge ? 40 : isPrimary ? 30 : 15;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const point = curve.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      sizes[i] = Math.random() * 0.03 + 0.02;
      offsets[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));

    return geometry;
  }, [curve, isPrimary, isBridge]);

  const beamMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: color },
        time: { value: 0 },
        opacity: { value: isConnected ? 1 : 0.15 },
        highlighted: { value: isHighlighted ? 1 : 0 },
        isBridge: { value: isBridge ? 1 : 0 },
      },
      vertexShader: beamVertexShader,
      fragmentShader: beamFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [color, isConnected, isHighlighted, isBridge]);

  useFrame((state, delta) => {
    if (beamMaterial) {
      beamMaterial.uniforms.time.value = state.clock.elapsedTime;

      const targetHighlight = isHighlighted ? 1 : 0;
      beamMaterial.uniforms.highlighted.value = THREE.MathUtils.lerp(
        beamMaterial.uniforms.highlighted.value,
        targetHighlight,
        delta * 5
      );

      const targetOpacity = isConnected ? (isHighlighted || isBridge ? 1 : 0.4) : 0.1;
      beamMaterial.uniforms.opacity.value = THREE.MathUtils.lerp(
        beamMaterial.uniforms.opacity.value,
        targetOpacity,
        delta * 5
      );
    }

    if (particlesRef.current && (isHighlighted || isBridge)) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const offsets = particlesRef.current.geometry.attributes.offset.array as Float32Array;
      const time = state.clock.elapsedTime;

      const particleCount = positions.length / 3;
      for (let i = 0; i < particleCount; i++) {
        const t = (offsets[i] + time * 0.3) % 1;
        const point = curve.getPoint(t);
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={lineRef} geometry={tubeGeometry} material={beamMaterial} />

      {(isHighlighted || isBridge) && (
        <points ref={particlesRef} geometry={particleGeometry}>
          <pointsMaterial
            color={color}
            size={isBridge ? 0.07 : 0.05}
            transparent
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      )}

      {isDataFlow && isHighlighted && (
        <points geometry={particleGeometry}>
          <pointsMaterial
            color="#ffffff"
            size={0.04}
            transparent
            opacity={0.6}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
