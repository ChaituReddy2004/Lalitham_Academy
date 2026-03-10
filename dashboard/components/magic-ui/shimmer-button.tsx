"use client";

import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-width": shimmerSize,
          "--border-radius": borderRadius,
          "--shimmer-duration": shimmerDuration,
          "--background": background,
          borderRadius,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)]",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className
      )}
      {...props}
    >
      {/* Shimmer overlay */}
      <div
        className={cn(
          "absolute inset-0 overflow-visible [container-type:size]",
          "[--shimmer-width:200px]"
        )}
      >
        <div
          className="absolute inset-0 h-full w-full animate-shimmer"
          style={{
            background: `linear-gradient(90deg, transparent, var(--shimmer-color, #ffffff) 50%, transparent)`,
            backgroundSize: "var(--shimmer-width, 200px) 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Radial gradient overlay */}
      <div
        className={cn(
          "absolute inset-[1px] z-10",
          "[background:var(--background)]",
          "[border-radius:calc(var(--border-radius)-1px)]"
        )}
      />

      {/* Content */}
      <span className="relative z-20">{children}</span>
    </button>
  );
}
