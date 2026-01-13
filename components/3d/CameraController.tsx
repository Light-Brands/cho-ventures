'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CameraControllerProps {
  targetPosition?: [number, number, number];
  autoRotate?: boolean;
  onCameraReady?: () => void;
}

export default function CameraController({
  targetPosition,
  autoRotate = true,
  onCameraReady,
}: CameraControllerProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const initialSetupDone = useRef(false);
  const transitionProgress = useRef(0);
  const startPosition = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());

  // Initial camera setup
  useEffect(() => {
    if (!initialSetupDone.current) {
      camera.position.set(0, 5, 15);
      camera.lookAt(0, 0, 0);
      initialSetupDone.current = true;
      onCameraReady?.();
    }
  }, [camera, onCameraReady]);

  // Smooth camera transition to target
  useEffect(() => {
    if (targetPosition && controlsRef.current) {
      // Store starting positions
      startPosition.current.copy(camera.position);
      startTarget.current.copy(controlsRef.current.target);
      transitionProgress.current = 0;
    }
  }, [targetPosition, camera]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // Handle smooth transition to target
    if (targetPosition && transitionProgress.current < 1) {
      transitionProgress.current = Math.min(transitionProgress.current + delta * 1.5, 1);
      const t = easeOutCubic(transitionProgress.current);

      // Calculate new camera position (slightly offset from target for good view)
      const targetVec = new THREE.Vector3(...targetPosition);
      const cameraOffset = new THREE.Vector3(3, 2, 5);
      const finalCameraPos = targetVec.clone().add(cameraOffset);

      // Lerp camera position
      camera.position.lerpVectors(startPosition.current, finalCameraPos, t);

      // Lerp target
      controlsRef.current.target.lerpVectors(startTarget.current, targetVec, t);
    } else if (!targetPosition) {
      // Lock target to center when not focusing on entity
      // Smoothly return to center if we were focused
      const currentTarget = controlsRef.current.target;
      if (currentTarget.distanceTo(new THREE.Vector3(0, 0, 0)) > 0.01) {
        currentTarget.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
      } else {
        currentTarget.set(0, 0, 0);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      autoRotate={autoRotate && !targetPosition}
      autoRotateSpeed={0.3}
      minDistance={5}
      maxDistance={30}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 1.5}
      dampingFactor={0.05}
      enableDamping={true}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
      target={[0, 0, 0]}
    />
  );
}

// Easing function for smooth transitions
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
