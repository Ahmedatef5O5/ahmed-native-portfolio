import { cn } from "@/lib/utils";
import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  type?: "ios" | "android" | "ipad";
}

export function DeviceFrame({ children, className, glowColor, type = "ios" }: DeviceFrameProps) {
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
        <div className={cn(
          "h-full w-full bg-background overflow-hidden relative pointer-events-auto transition-all duration-500",
          isIPad ? "rounded-[1.4rem]" : "rounded-[1.8rem]"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}
