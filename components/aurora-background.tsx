"use client";

import { useSyncExternalStore } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";

type AuroraBackgroundProps = {
  /** Flowing mesh colors — keep these on-brand (mauve palette). */
  colors: string[];
  /** Static CSS gradient shown during SSR, before mount, and for reduced-motion. */
  fallback: string;
  speed?: number;
  distortion?: number;
  swirl?: number;
  grainOverlay?: number;
  scale?: number;
  opacity?: number;
  style?: React.CSSProperties;
};

// Detect WebGL once and cache it. Computed lazily on the client only.
let webglSupport: boolean | undefined;
function getWebGLSupport(): boolean {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(
        canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"),
      );
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

/**
 * Full-bleed animated mesh-gradient background (WebGL via Paper Shaders).
 *
 * SSR-safe: `useSyncExternalStore` returns `false` on the server / during
 * hydration and the real WebGL capability on the client, so we render a static
 * CSS gradient on the server and only upgrade to the live shader once we know
 * WebGL is available. Reduced-motion users keep the static gradient (no
 * animation loop at all).
 */
export function AuroraBackground({
  colors,
  fallback,
  speed = 0.3,
  distortion = 0.85,
  swirl = 0.55,
  grainOverlay = 0.06,
  scale = 1,
  opacity = 1,
  style,
}: AuroraBackgroundProps) {
  const canAnimate = useSyncExternalStore(
    noopSubscribe,
    getWebGLSupport,
    () => false,
  );
  const reduceMotion = useReducedMotion();

  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    opacity,
    ...style,
  };

  if (!canAnimate || reduceMotion) {
    return <div aria-hidden style={{ ...base, background: fallback }} />;
  }

  return (
    <MeshGradient
      aria-hidden
      colors={colors}
      distortion={distortion}
      swirl={swirl}
      grainOverlay={grainOverlay}
      speed={speed}
      scale={scale}
      maxPixelCount={1_400_000}
      style={base}
    />
  );
}
