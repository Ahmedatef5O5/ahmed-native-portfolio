"use client";

import { Download, Cpu, HardDrive, AlertCircle, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import type { Project, ApkVariant } from "@/data/schemas";

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

  // Only render grid if we have at least one metadata point to show
  if (!formattedVersion && !buildNumber && !formattedSize && !formattedDate && !commitSha) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-8 border-b border-border/50">
      {formattedVersion && (
        <div>
          <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Version</span>
          <span className="font-semibold text-text">{formattedVersion}</span>
        </div>
      )}
      {buildNumber && (
        <div>
          <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Build</span>
          <span className="font-semibold text-text">{buildNumber}</span>
        </div>
      )}
      {formattedSize && (
        <div>
          <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Size</span>
          <span className="font-semibold text-text">{formattedSize}</span>
        </div>
      )}
      {formattedDate ? (
        <div>
          <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Date</span>
          <span className="font-semibold text-text">{formattedDate}</span>
        </div>
      ) : commitSha ? (
        <div>
          <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Commit</span>
          <span className="font-semibold font-mono text-text">{commitSha}</span>
        </div>
      ) : null}
    </div>
  );
}

interface DownloadCenterProps {
  project: Project;
}

export function DownloadCenter({ project }: DownloadCenterProps) {
  if (!project.downloads) return null;

  const { version, buildNumber, releaseDate, releaseUrl, commitSha, androidCompatibility, variants } =
    project.downloads;

  // Determine the recommended variant from data only (no unreliable UA detection)
  const recommendedVariant = variants.find((v) => v.recommended) || variants[0];
  const otherVariants = variants.filter((v) => v.id !== recommendedVariant.id);
  const recommendedSize = formatSize(recommendedVariant.sizeBytes);
  const recommendedDisplayTitle = formatVariantTitle(project.title, recommendedVariant.label);
  const recommendedArchName = formatArchName(project.title, recommendedVariant.label);

  return (
    <section id="downloads" className="py-24 scroll-mt-24 bg-surface-variant/30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
            Download {project.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Install the latest Android build directly to your device. All builds are optimized for performance and security.
          </p>
        </div>

        <div id="download-cards" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recommended Download (Takes up more space) */}
          <div className="lg:col-span-8">
            <div className="bg-surface/50 backdrop-blur-md border border-border/80 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-primary/5 relative overflow-hidden flex flex-col h-full hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 group">
              {/* Glow background */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 blur-[80px] pointer-events-none rounded-full bg-primary transition-opacity duration-500"
              />
              
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <CheckCircle2 size={20} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  Recommended Build
                </span>
              </div>

              <h3 className="text-3xl font-display font-bold text-text mb-2 relative z-10 group-hover:text-primary transition-colors duration-300">
                {recommendedDisplayTitle}
              </h3>
              {recommendedVariant.description && (
                <p className="text-text-secondary mb-8 max-w-xl relative z-10">
                  {recommendedVariant.description}
                </p>
              )}

              <div className="relative z-10">
                <MetadataGrid
                  variant={recommendedVariant}
                  version={version}
                  buildNumber={buildNumber}
                  releaseDate={releaseDate}
                  commitSha={commitSha}
                />
              </div>

              <div className="mt-auto relative z-10">
                <div className="flex flex-wrap items-center gap-4">
                  {recommendedVariant.status === "pending" ? (
                    <div 
                      className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl font-medium shadow-sm bg-surface-variant text-text-secondary border border-border cursor-not-allowed select-none"
                      aria-label={`Download ${recommendedDisplayTitle} APK is pending`}
                    >
                      <Clock size={20} />
                      Artifact Pending
                    </div>
                  ) : (
                    <a
                      href={recommendedVariant.fileUrl}
                      download={recommendedVariant.fileName}
                      className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary outline-none group/btn"
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
            <h4 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 px-2">
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
                      <h4 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors">
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
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-surface-variant text-text font-medium hover:bg-primary hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm"
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
