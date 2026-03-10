"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        // mask gradient to control border visibility
        "[background:linear-gradient(white,white)_padding-box,conic-gradient(from_calc(var(--anchor)*1deg),transparent_calc(var(--anchor)*1%),var(--color-from)_calc(var(--anchor)*1%+var(--size)*1deg/360),var(--color-to)_calc(var(--anchor)*1%+var(--size)*1deg/360+var(--size)*1deg/360),transparent_calc(var(--anchor)*1%+2*var(--size)*1deg/360))_border-box]",
        "animate-[border-beam_calc(var(--duration)*1s)_infinite_linear]",
        "[animation-delay:var(--delay)]",
        className
      )}
    />
  );
}
