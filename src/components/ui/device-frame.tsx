import { cn } from "@/lib/utils";
import React from "react";

export interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  type?: "ios" | "android" | "ipad" | "landscape";
  /**
   * "classic" keeps the legacy thick-bezel frame (default, unchanged).
   * "cinematic" renders a slim titanium-style phone frame with Dynamic Island and glass sheen.
   * "landscape" renders an adaptive monitor/tablet frame matched to the media's natural aspect ratio.
   */
  variant?: "classic" | "cinematic" | "landscape";
  /**
   * Optional notch / camera cutout style for cinematic frame.
   * Default is "island". Set to "none" to disable.
   */
  notch?: "island" | "none";
  /**
   * For landscape variant: natural aspect ratio (e.g. 1280 / 671 ≈ 1.907).
   * Default is 16 / 10.
   */
  aspectRatio?: number;
  /**
   * Explicit device kind for landscape frame.
   * Inferred from aspectRatio > 1.6 if omitted.
   */
  kind?: "desktop" | "tablet";
}

type CinematicDeviceFrameProps = Pick<
  DeviceFrameProps,
  "children" | "className" | "glowColor" | "notch"
>;

function CinematicDeviceFrame({
  children,
  className,
  glowColor,
  notch = "island",
}: CinematicDeviceFrameProps) {
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

      {/* Titanium shell with professional ~8px bezel and 3rem radius */}
      <div
        className={cn(
          "relative z-10 aspect-[9/19.5] w-[264px] rounded-[3rem] p-2 sm:w-[280px] lg:w-[300px]",
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

        {/* Screen Container with subtle 1px white inset edge highlight */}
        <div className="pointer-events-auto relative isolate h-full w-full overflow-hidden rounded-[calc(3rem-8px)] bg-[#060913] ring-1 ring-black/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
          {children}

          {/* Dynamic Island pill centered inside screen, overlaying empty status bar center */}
          {notch === "island" && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 z-40 flex h-5 sm:h-[22px] w-[34%] min-w-[86px] max-w-[106px] items-center justify-end rounded-full bg-black px-2.5 sm:px-3 shadow-sm ring-1 ring-white/10"
            >
              {/* Camera lens dot with subtle blue reflection */}
              <div className="relative h-2.5 w-2.5 rounded-full bg-[#080d1a] ring-1 ring-white/15 flex items-center justify-center overflow-hidden">
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(56,189,248,0.35)_0%,transparent_75%)]" />
              </div>
            </div>
          )}

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

export interface LandscapeDeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  aspectRatio?: number;
  kind?: "desktop" | "tablet";
}

export function LandscapeDeviceFrame({
  children,
  className,
  glowColor,
  aspectRatio = 16 / 10,
  kind,
}: LandscapeDeviceFrameProps) {
  const isDesktop = kind ? kind === "desktop" : aspectRatio > 1.6;

  const baseShadow =
    "0 0 0 1px rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.5), 0 25px 50px -12px rgba(0,0,0,0.7), 0 50px 100px -25px rgba(0,0,0,0.65)";
  const shellShadow = glowColor
    ? `${baseShadow}, 0 0 120px -25px color-mix(in srgb, ${glowColor} 50%, transparent)`
    : baseShadow;

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {glowColor && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[100px]"
          style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 65%)` }}
        />
      )}

      {/* Monitor / Tablet Chassis */}
      <div
        className={cn(
          "relative z-10 w-full max-w-[320px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[680px] xl:max-w-[720px]",
          "transition-all duration-500",
          className
        )}
      >
        <div
          className={cn(
            "relative p-2 sm:p-2.5",
            isDesktop
              ? "rounded-2xl bg-[linear-gradient(145deg,#2f3644_0%,#131722_40%,#0c0f17_70%,#242b38_100%)]"
              : "rounded-[1.75rem] bg-[linear-gradient(145deg,#363e4f_0%,#151924_40%,#0e111a_70%,#283140_100%)]"
          )}
          style={{ boxShadow: shellShadow }}
        >
          {/* Top Webcam dot for Desktop */}
          {isDesktop && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-2 h-2 rounded-full bg-[#0a0d16] ring-1 ring-white/20"
            >
              <span className="w-1 h-1 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(56,189,248,0.5)_0%,transparent_75%)]" />
            </div>
          )}

          {/* Camera dot for Tablet on left/short side */}
          {!isDesktop && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-2 h-2 rounded-full bg-[#0a0d16] ring-1 ring-white/20"
            >
              <span className="w-1 h-1 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(56,189,248,0.5)_0%,transparent_75%)]" />
            </div>
          )}

          {/* Inner Screen */}
          <div
            className={cn(
              "relative isolate w-full overflow-hidden bg-[#060913] ring-1 ring-black/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
              isDesktop ? "rounded-[calc(1rem-3px)]" : "rounded-[calc(1.75rem-8px)]"
            )}
            style={{ aspectRatio }}
          >
            {children}

            {/* Subtle Glass Sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_35%)]"
            />
          </div>
        </div>

        {/* Minimalist Desktop Monitor Stand (Neck + Foot) on lg+ */}
        {isDesktop && (
          <div aria-hidden="true" className="hidden lg:flex flex-col items-center pointer-events-none">
            {/* Monitor Neck */}
            <div className="w-14 sm:w-16 h-7 sm:h-9 bg-gradient-to-b from-[#1b212f] via-[#141824] to-[#0e121b] border-x border-white/10 shadow-inner" />
            {/* Monitor Base / Foot */}
            <div className="w-40 sm:w-48 h-3 sm:h-3.5 bg-gradient-to-r from-[#141924] via-[#283245] to-[#141924] rounded-full border border-white/15 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] -mt-0.5" />
          </div>
        )}
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
  notch = "island",
  aspectRatio,
  kind,
}: DeviceFrameProps) {
  if (variant === "landscape" || type === "landscape") {
    return (
      <LandscapeDeviceFrame
        glowColor={glowColor}
        className={className}
        aspectRatio={aspectRatio}
        kind={kind}
      >
        {children}
      </LandscapeDeviceFrame>
    );
  }

  if (variant === "cinematic") {
    return (
      <CinematicDeviceFrame glowColor={glowColor} className={className} notch={notch}>
        {children}
      </CinematicDeviceFrame>
    );
  }

  // Define dimensions based on type (classic path unchanged)
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
