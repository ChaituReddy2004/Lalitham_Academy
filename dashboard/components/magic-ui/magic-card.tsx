"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      className={cn("group relative overflow-hidden rounded-xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at var(--mouse-x) var(--mouse-y), ${gradientColor}, transparent 80%)`,
          opacity: springX.get() === -gradientSize ? 0 : gradientOpacity,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(${gradientSize}px circle at ${springX}px ${springY}px, ${gradientColor}, transparent 80%)`,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
