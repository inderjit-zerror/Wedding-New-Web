"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import SketchScene from "@/components/sections/wedding/SketchScene";

const CanvasSection = () => {
  const distance = 200;
  const [fov, setfov] = useState(75);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const FovCalculator = () => {
      setfov(
        2 * Math.atan(window.innerHeight / (2 * distance)) * (180 / Math.PI),
      );
    };
    FovCalculator();
    window.addEventListener("resize", FovCalculator);
    return () => window.removeEventListener("resize", FovCalculator);
  }, []);

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[-1]">
      <Canvas className="w-full h-screen" gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault fov={fov} position={[0, 0, distance]} />
        {/* Home-Page */}
        {!isMobile && <SketchScene />}
      </Canvas>
    </div>
  );
};

export default CanvasSection;
