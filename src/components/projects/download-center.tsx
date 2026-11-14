"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Download, Cpu, HardDrive, AlertCircle, CheckCircle2, Clock, ExternalLink, Layers } from "lucide-react";
import type { Project, ApkVariant } from "@/data/schemas";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// Format bytes to MB
function formatSize(bytes?: number) {
  if (!bytes) return null;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateString?: string) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function normalizeVersion(version?: string) {
  if (!version) return null;
  return `v${version.replace(/^v/i, "")}`;
}

function formatVariantTitle(projectTitle: string, label: string) {
  return label.toLowerCase().startsWith(projectTitle.toLowerCase())
    ? label
    : `${projectTitle} — ${label}`;
}

function formatArchName(projectTitle: string, label: string) {
  const prefixRegex = new RegExp(`^${projectTitle}\\s*[—\\-:]\\s*`, "i");
  return label.replace(prefixRegex, "").trim();
}

function MetadataGrid({
  variant,
  version,
  buildNumber,
  releaseDate,
  commitSha,
}: {
  variant: ApkVariant;
  version?: string;
  buildNumber?: string;
  releaseDate?: string;
  commitSha?: string;
}) {
  const formattedVersion = normalizeVersion(version);
  const formattedSize = formatSize(variant.sizeBytes);
  const formattedDate = formatDate(releaseDate);
  const effectiveBuild = variant.buildNumber || buildNumber;

  if (!formattedVersion && !effectiveBuild && !formattedSize && !formattedDate && !commitSha) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-8 border-b border-border/50">
      {formattedVersion && (
        <div>
          <span className="hud-label text-[10px] block mb-1">Version</span>
          <span className="font-semibold text-text">{formattedVersion}</span>
        </div>
      )}
      {effectiveBuild && (
        <div>
          <span className="hud-label text-[10px] block mb-1">Build</span>
          <span className="font-semibold text-text">{effectiveBuild}</span>
        </div>
      )}
      {formattedSize && (
        <div>
          <span className="hud-label text-[10px] block mb-1">Size</span>
          <span className="font-semibold text-text">{formattedSize}</span>
        </div>
      )}
      {formattedDate ? (
        <div>
          <span className="hud-label text-[10px] block mb-1">Date</span>
          <span className="font-semibold text-text">{formattedDate}</span>
        </div>
      ) : commitSha ? (
        <div>
          <span className="hud-label text-[10px] block mb-1">Commit</span>
          <span className="font-semibold font-mono text-text">{commitSha}</span>
        </div>
      ) : null}
    </div>
  );
}

interface DownloadCenterContentProps {
  project: Project;
  downloads: NonNullable<Project["downloads"]>;
}

function DownloadCenterContent({ project, downloads }: DownloadCenterContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.18, 0.08]);

  const { version, buildNumber, releaseDate, releaseUrl, commitSha, androidCompatibility, variants } =
    downloads;

  const recommendedVariant = variants.find((v) => v.recommended) || variants[0];
  const otherVariants = variants.filter((v) => v.id !== recommendedVariant.id);
  const recommendedSize = formatSize(recommendedVariant.sizeBytes);
  const recommendedDisplayTitle = formatVariantTitle(project.title, recommendedVariant.label);
  const recommendedArchName = formatArchName(project.title, recommendedVariant.label);

  return (
    <section
      ref={sectionRef}
      id="downloads"
      className="py-24 scroll-mt-24 bg-surface-variant/30 border-t border-border/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="hud-label text-[var(--project-accent,var(--primary))] block mb-3">
            06 — DOWNLOADS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-4">
            Download {project.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Install the latest Android build directly to your device. All builds are optimized for high-performance native execution and security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Recommended Card with Scroll Glow */}
          <div className="lg:col-span-8 bg-surface border border-border/80 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
            {/* Ambient Accent Glow driven by scroll */}
            <motion.div
              style={{
                backgroundColor: "var(--project-accent, var(--primary))",
                opacity: prefersReducedMotion ? 0.08 : glowOpacity,
                scale: prefersReducedMotion ? 1 : glowScale,
              }}
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 size={13} />
                  Recommended Build
                </span>
                <span className="hud-label text-xs">
                  Target Architecture: {recommendedVariant.abi}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-display text-text mb-2">
                {recommendedDisplayTitle}
              </h3>

              {recommendedVariant.description && (
                <p className="text-text-secondary mb-8 text-base leading-relaxed">
                  {recommendedVariant.description}
                </p>
              )}

              <MetadataGrid
                variant={recommendedVariant}
                version={version}
                buildNumber={buildNumber}
                releaseDate={releaseDate}
                commitSha={commitSha}
              />

              <div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {recommendedVariant.status === "pending" ? (
                    <div
                      className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl bg-surface text-text-secondary font-medium border border-border cursor-not-allowed select-none"
                      aria-label={`Download ${recommendedDisplayTitle} APK is currently pending`}
                    >
                      <Clock size={20} />
                      Artifact Pending
                    </div>
                  ) : (
                    <a
                      href={recommendedVariant.fileUrl}
                      download={recommendedVariant.fileName}
                      className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl bg-[var(--project-accent,var(--primary))] hover:opacity-90 text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary outline-none group/btn"
                      aria-label={`Download ${recommendedDisplayTitle} APK`}
                    >
                      <Download size={20} className="group-hover/btn:-translate-y-1 transition-transform" />
                      Download {recommendedArchName} APK{recommendedSize ? ` (${recommendedSize})` : ""}
                    </a>
                  )}

                  {releaseUrl && (
                    <a
                      href={releaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 rounded-xl bg-surface text-text font-medium border border-border hover:bg-surface-variant transition-colors text-sm"
                    >
                      Release Notes
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>

                <p className="text-xs text-text-secondary mt-4 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {androidCompatibility
                    ? `${androidCompatibility}. Unknown sources must be enabled.`
                    : "Requires Android 8.0 or later. Unknown sources must be enabled."}
                </p>
              </div>
            </div>
          </div>

          {/* Other Architectures */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="hud-label text-xs mb-1 px-1">
              Other Architectures
            </h4>

            {otherVariants.map((variant) => {
              const variantSize = formatSize(variant.sizeBytes);
              const variantDisplayTitle = formatVariantTitle(project.title, variant.label);
              const variantArchName = formatArchName(project.title, variant.label);
              return (
                <div
                  key={variant.id}
                  className="bg-surface border border-border hover:border-text/30 transition-colors rounded-2xl p-6 group flex flex-col relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div>
                      <h4 className="text-lg font-bold text-text mb-1 group-hover:text-[var(--project-accent,var(--primary))] transition-colors">
                        {variantDisplayTitle}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        {variantSize && (
                          <span className="flex items-center gap-1 font-medium text-text">
                            <HardDrive size={12} /> {variantSize}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Cpu size={12} /> {variant.abi}
                        </span>
                        {variant.buildNumber && (
                          <span className="flex items-center gap-1 font-mono text-text-secondary">
                            <Layers size={12} /> {variant.buildNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {variant.description && (
                    <p className="text-sm text-text-secondary mb-6 leading-relaxed relative z-10">
                      {variant.description}
                    </p>
                  )}

                  <div className="mt-auto relative z-10">
                    {variant.status === "pending" ? (
                      <div
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-surface text-text-secondary font-medium border border-border cursor-not-allowed select-none text-sm"
                        aria-label={`Download ${variantDisplayTitle} APK is pending`}
                      >
                        <Clock size={16} />
                        Pending
                      </div>
                    ) : (
                      <a
                        href={variant.fileUrl}
                        download={variant.fileName}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-surface-variant text-text font-medium hover:bg-[var(--project-accent,var(--primary))] hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm"
                        aria-label={`Download ${variantDisplayTitle} APK`}
                      >
                        <Download size={16} />
                        Download {variantArchName} APK{variantSize ? ` (${variantSize})` : ""}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface DownloadCenterProps {
  project: Project;
}

export function DownloadCenter({ project }: DownloadCenterProps) {
  if (!project.downloads) return null;
  return <DownloadCenterContent project={project} downloads={project.downloads} />;
}
