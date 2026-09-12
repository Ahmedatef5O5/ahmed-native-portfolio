import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const title = project?.title ?? "Case Study";
  const tagline = project?.positioning ?? "Ahmed Atef — Mobile Engineer";
  const accent = project?.theme?.primary ?? "#2563eb";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#060913",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 64,
            height: 6,
            background: accent,
            marginBottom: 32,
          }}
        />
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 24 }}>
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
