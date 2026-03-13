"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {VERTEX, FRAGMENT} from "@/shaders/SketcherShader.jsx"

const SketchScene = () => {
  const { viewport, size } = useThree();

  const meshRef = useRef();
  const materialRef = useRef();

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const currentRadius = useRef(0);
  const targetRadius = useRef(0);

  const hideTimeout = useRef(null);

  const [texture1, setTexture1] = useState(null);
  const [texture2, setTexture2] = useState(null);

  // 🔥 Load textures
  useEffect(() => {
    const imgTop = document.querySelector(".SketcherCont");
    const imgBG = document.querySelector(".SketcherBG");
    if (!imgTop || !imgBG) return;

    const loader = new THREE.TextureLoader();

    loader.load(imgTop.src, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      setTexture1(tex);

      if (materialRef.current) {
        materialRef.current.uniforms.uImageResolution.value.set(
          imgTop.naturalWidth,
          imgTop.naturalHeight,
        );
      }
    });

    loader.load(imgBG.src, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      setTexture2(tex);
    });
  }, []);

  // 🖱 Mouse Move
  useEffect(() => {
    const handleMouse = (e) => {
      if (!materialRef.current) return;

      const x = e.clientX / size.width;
      const y = 1 - e.clientY / size.height;

      targetMouse.current.set(x, y);

      // Show circle when moving
      targetRadius.current = 0.18;

      // Reset hide timer
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      hideTimeout.current = setTimeout(() => {
        targetRadius.current = 0.0; // hide after stop
      }, 150); // delay after mouse stop
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [size]);

  // 🎬 Smooth animation loop
  useFrame(() => {
    if (!materialRef.current) return;

    // Smooth mouse follow
    mouse.current.lerp(targetMouse.current, 0.15);
    materialRef.current.uniforms.uMouse.value.copy(mouse.current);

    // Smooth radius animation
    currentRadius.current = THREE.MathUtils.lerp(
      currentRadius.current,
      targetRadius.current,
      0.1,
    );

    materialRef.current.uniforms.uRadius.value = currentRadius.current;
    // 🔥 animate noise
    materialRef.current.uniforms.uTime.value += 0.03;
  });

  const uniforms = useRef({
    uTexture: { value: null },
    uTexture2: { value: null },
    uPlaneResolution: {
      value: new THREE.Vector2(viewport.width, viewport.height),
    },
    uImageResolution: {
      value: new THREE.Vector2(1, 1),
    },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uRadius: { value: 0 },
    uTime: { value: 0 },
  });

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTexture.value = texture1;
    materialRef.current.uniforms.uTexture2.value = texture2;
  }, [texture1, texture2]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default SketchScene;
