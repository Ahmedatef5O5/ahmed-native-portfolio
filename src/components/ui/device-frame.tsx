import { cn } from "@/lib/utils";
import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  type?: "ios" | "android" | "ipad";
  /**
   * "classic" keeps the legacy thick-bezel frame (default, unchanged).
   * "cinematic" renders a slim titanium-style frame with glass sheen, layered shadows and a brand glow.
   */
  variant?: "classic" | "cinematic";
}

type CinematicDeviceFrameProps = Pick<DeviceFrameProps, "children" | "className" | "glowColor">;

function CinematicDeviceFrame({ children, className, glowColor }: CinematicDeviceFrameProps) {
  const baseShadow =
    "0 0 0 1px rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.5), 0 30px 60px -20px rgba(0,0,0,0.75), 0 60px 120px -40px rgba(0,0,0,0.7)";

  const shellShadow = glowColor
    ? `${baseShadow}, 0 0 140px -30px color-mix(in srgb, ${glowColor} 55%, transparent)`
    : baseShadow;

  return (
    <div className="relative flex items-center justify-center">
      {glowColor && (
        <>
          {/* Wide ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px]"
            style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 65%)` }}
          />
          {/* Tight core glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[70px]"
            style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)` }}
          />
        </>
      )}

      {/* Grounding contact shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 h-10 w-[65%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl"
      />

      {/* Slim titanium shell */}
      <div
        className={cn(
          "relative z-10 aspect-[9/19.5] w-[264px] rounded-[2.75rem] p-[5px] sm:w-[280px] lg:w-[300px]",
          "bg-[linear-gradient(145deg,#3a4152_0%,#10141f_35%,#0a0d16_65%,#2c3342_100%)]",
          "transition-shadow duration-500",
          className
        )}
        style={{ boxShadow: shellShadow }}
      >
        {/* Hardware buttons */}
        <span aria-hidden="true" className="absolute -right-[3px] top-[26%] h-14 w-[3px] rounded-r-full bg-[#2a3040]" />
        <span aria-hidden="true" className="absolute -left-[3px] top-[20%] h-9 w-[3px] rounded-l-full bg-[#2a3040]" />
        <span aria-hidden="true" className="absolute -left-[3px] top-[30%] h-9 w-[3px] rounded-l-full bg-[#2a3040]" />

        {/* Screen */}
        <div className="pointer-events-auto relative isolate h-full w-full overflow-hidden rounded-[calc(2.75rem-5px)] bg-[#060913] ring-1 ring-black/70">
          {children}
          {/* Glass sheen (very subtle, never blocks pointer events) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_32%)]"
          />
        </div>
      </div>
    </div>
  );
}

export function DeviceFrame({
  children,
  className,
  glowColor,
  type = "ios",
  variant = "classic",
}: DeviceFrameProps) {
  if (variant === "cinematic") {
    return (
      <CinematicDeviceFrame glowColor={glowColor} className={className}>
        {children}
      </CinematicDeviceFrame>
    );
  }

  // Define dimensions based on type
  const isIPad = type === "ipad";

  const frameClasses = cn(
    "relative border-[#1a1e28] bg-[#0a0f1c] border-[10px] shadow-2xl overflow-hidden ring-1 ring-white/10 z-10 transition-all duration-500",
    isIPad ? "h-[500px] w-[700px] rounded-[2rem]" : "h-[600px] w-[280px] rounded-[2.5rem]",
    className
  );

  return (
    <div className="relative flex items-center justify-center">
      {glowColor && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-10 pointer-events-none transition-colors duration-500"
          style={{ background: glowColor }}
        />
      )}
      <div className={frameClasses}>
        {/* Notch / Camera / Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20 pointer-events-none">
          {type === "ios" && (
            <div className="mt-1.5 w-24 h-5 bg-[#0a0f1c] ring-1 ring-white/10 rounded-full shadow-sm flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-white/5" />
            </div>
          )}
          {type === "android" && (
            <div className="mt-2.5 w-3.5 h-3.5 bg-[#0a0f1c] ring-1 ring-white/10 rounded-full shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#172033] rounded-full" />
            </div>
          )}
          {type === "ipad" && (
            <div className="absolute top-1/2 -translate-y-1/2 left-4 w-2 h-2 bg-white/10 rounded-full" />
          )}
        </div>

        {/* Screen Content */}
        <div
          className={cn(
            "h-full w-full bg-background overflow-hidden relative pointer-events-auto transition-all duration-500",
            isIPad ? "rounded-[1.4rem]" : "rounded-[1.8rem]"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
