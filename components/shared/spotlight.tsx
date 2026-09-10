"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      el!.style.opacity = inside ? "1" : "0";
      if (inside) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el!.style.setProperty("--spot-x", `${x}%`);
        el!.style.setProperty("--spot-y", `${y}%`);
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out",
        className
      )}
      style={{
        background:
          "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.08), transparent 70%)",
      }}
    />
  );
}
