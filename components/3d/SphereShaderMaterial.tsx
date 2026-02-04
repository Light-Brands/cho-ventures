'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SphereShaderMaterialProps {
  color: string;
  glowColor: string;
  emissiveIntensity?: number;
  opacity?: number;
  isSelected?: boolean;
  isHovered?: boolean;
  isConglomerate?: boolean;
}

const sphereVertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    vec4 viewPosition = viewMatrix * worldPosition;
    vViewPosition = -viewPosition.xyz;

    gl_Position = projectionMatrix * viewPosition;
  }
`;

const sphereFragmentShader = `
  uniform vec3 color;
  uniform vec3 glowColor;
  uniform float emissiveIntensity;
  uniform float opacity;
  uniform float time;
  uniform float selected;
  uniform float hovered;
  uniform float isConglomerate;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  float fresnel(vec3 viewDirection, vec3 normal, float power) {
    return pow(1.0 - dot(viewDirection, normal), power);
  }

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 viewDirection = normalize(vViewPosition);
    vec3 normal = normalize(vNormal);

    float fresnelSharp = fresnel(viewDirection, normal, 3.5);
    float fresnelSoft = fresnel(viewDirection, normal, 2.0);
    float fresnelCore = fresnel(viewDirection, normal, 1.2);

    float scale = isConglomerate > 0.5 ? 2.5 : 3.5;
    float noiseValue = snoise(vWorldPosition * scale + vec3(time * 0.12, time * 0.08, time * 0.06));
    float turbulence = abs(snoise(vWorldPosition * scale * 2.5 + vec3(time * 0.18)));

    float energyFlow = (noiseValue * 0.4 + 0.6) * (turbulence * 0.25 + 0.75);
    float surfaceDetail = energyFlow * 0.1 + 0.9;

    vec3 baseColor = color * surfaceDetail;
    baseColor = mix(baseColor, baseColor * 1.1, 0.3);

    vec3 coreGlow = glowColor * fresnelCore * 0.4 * (1.0 + energyFlow * 0.3);

    float pulse = 1.0;
    if (isConglomerate > 0.5 || selected > 0.5) {
      pulse = 1.0 + sin(time * 2.0 + energyFlow) * 0.2;
    }

    float glowStrength = emissiveIntensity * pulse;
    if (hovered > 0.5) {
      glowStrength *= 1.4;
    }

    vec3 finalColor = baseColor * 0.85;

    vec3 coreGlowColor = glowColor * fresnelCore * 0.3 * (1.0 + energyFlow * 0.2);
    finalColor += coreGlowColor * glowStrength * 0.6;

    vec3 rimColor = glowColor * fresnelSoft * 0.4 * (1.0 + energyFlow * 0.15);
    finalColor += rimColor * 0.5;

    vec3 edgeHighlight = vec3(1.0) * fresnelSharp * 0.25;
    finalColor += edgeHighlight;

    if (selected > 0.5 || hovered > 0.5) {
      float extraGlow = fresnelSoft * 0.5 * pulse;
      finalColor += glowColor * extraGlow * 0.7;

      float hotSpots = pow(energyFlow, 2.5) * fresnelSharp;
      finalColor += vec3(1.0) * hotSpots * 0.3;
    }

    float subsurface = pow(1.0 - fresnelCore, 2.0) * 0.2;
    finalColor += color * subsurface * 0.4;

    finalColor = min(finalColor, vec3(1.0));

    float alpha = 1.0;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function SphereShaderMaterial({
  color,
  glowColor,
  emissiveIntensity = 0.3,
  opacity = 1.0,
  isSelected = false,
  isHovered = false,
  isConglomerate = false,
}: SphereShaderMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      glowColor: { value: new THREE.Color(glowColor) },
      emissiveIntensity: { value: emissiveIntensity },
      opacity: { value: opacity },
      time: { value: 0 },
      selected: { value: isSelected ? 1 : 0 },
      hovered: { value: isHovered ? 1 : 0 },
      isConglomerate: { value: isConglomerate ? 1 : 0 },
    }),
    [color, glowColor, emissiveIntensity, opacity, isSelected, isHovered, isConglomerate]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;

      const targetSelected = isSelected ? 1 : 0;
      const targetHovered = isHovered ? 1 : 0;

      materialRef.current.uniforms.selected.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.selected.value,
        targetSelected,
        0.1
      );

      materialRef.current.uniforms.hovered.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.hovered.value,
        targetHovered,
        0.1
      );

      materialRef.current.uniforms.opacity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.opacity.value,
        opacity,
        0.1
      );
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={sphereVertexShader}
      fragmentShader={sphereFragmentShader}
      transparent={false}
      depthWrite={true}
      blending={THREE.NormalBlending}
    />
  );
}
