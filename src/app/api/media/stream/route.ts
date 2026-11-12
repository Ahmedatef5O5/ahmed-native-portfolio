import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const src = searchParams.get("src");

    if (!src) {
      return new NextResponse("Missing src parameter", { status: 400 });
    }

    // Clean and normalize path, strip leading slash
    const cleanRelativePath = src.replace(/^\/+/, "");
    const publicDir = path.resolve(process.cwd(), "public");
    const absolutePath = path.resolve(publicDir, cleanRelativePath);

    // Guard against directory traversal
    if (!absolutePath.startsWith(publicDir)) {
      return new NextResponse("Forbidden path traversal", { status: 403 });
    }

    if (!fs.existsSync(absolutePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const stat = fs.statSync(absolutePath);
    const fileSize = stat.size;
    const range = request.headers.get("range");

    // Standard headers for inline streaming
    const commonHeaders: Record<string, string> = {
      "Content-Type": "video/mp4",
      "Content-Disposition": "inline",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
    };

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize || start > end) {
        return new NextResponse("Requested Range Not Satisfiable", {
          status: 416,
          headers: {
            "Content-Range": `bytes */${fileSize}`,
            ...commonHeaders,
          },
        });
      }

      const chunkSize = end - start + 1;
      const nodeStream = fs.createReadStream(absolutePath, { start, end });
      const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Content-Length": chunkSize.toString(),
          ...commonHeaders,
        },
      });
    }

    // Full file stream
    const nodeStream = fs.createReadStream(absolutePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        ...commonHeaders,
      },
    });
  } catch (error) {
    console.error("Video streaming API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
