import mediaManifest from "@/data/media-manifest.json";

export interface MediaManifestEntry {
  width: number;
  height: number;
  blurDataURL?: string;
  variants?: Record<string, string>;
}

const manifestMap = mediaManifest as unknown as Record<string, MediaManifestEntry>;

export function getMediaMeta(url?: string): MediaManifestEntry | undefined {
  if (!url) return undefined;
  return manifestMap[url];
}

export function getSrcSet(url?: string): string | undefined {
  if (!url) return undefined;
  const meta = manifestMap[url];
  if (!meta?.variants) return undefined;
  const entries = Object.entries(meta.variants);
  if (entries.length === 0) return undefined;
  return entries.map(([size, variantUrl]) => `${variantUrl} ${size}`).join(", ");
}
