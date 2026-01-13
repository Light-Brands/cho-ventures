'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlowShaderMaterialProps {
  color: string;
  intensity?: number;
  isSelected?: boolean;
  isHovered?: boolean;
}

// Glow vertex shader
const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    vViewPosition = -viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

// Glow fragment shader with realistic falloff
const glowFragmentShader = `
  uniform vec3 color;
  uniform float intensity;
  uniform float time;
  uniform float selected;
  uniform float hovered;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  float fresnel(vec3 viewDirection, vec3 normal, float power) {
    return pow(1.0 - dot(viewDirection, normal), power);
  }
  
  void main() {
    vec3 viewDirection = normalize(vViewPosition);
    vec3 normal = normalize(vNormal);
    
    // Strong fresnel for edge glow
    float fresnelFactor = fresnel(viewDirection, normal, 1.5);
    
    // Pulsing effect for selected/hovered
    float pulse = 1.0;
    if (selected > 0.5 || hovered > 0.5) {
      pulse = 1.0 + sin(time * 2.5) * 0.2;
    }
    
    // Distance-based falloff for realistic glow
    float distance = length(vViewPosition);
    float falloff = 1.0 / (1.0 + distance * 0.1);
    
    // Combine effects
    float alpha = fresnelFactor * intensity * pulse * falloff;
    alpha = pow(alpha, 0.7); // Softer falloff
    
    // Color with slight variation
    vec3 finalColor = color;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function GlowShaderMaterial({
  color,
  intensity = 0.1,
  isSelected = false,
  isHovered = false,
}: GlowShaderMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      time: { value: 0 },
      selected: { value: isSelected ? 1 : 0 },
      hovered: { value: isHovered ? 1 : 0 },
    }),
    [color, intensity, isSelected, isHovered]
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
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={glowVertexShader}
      fragmentShader={glowFragmentShader}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
}
