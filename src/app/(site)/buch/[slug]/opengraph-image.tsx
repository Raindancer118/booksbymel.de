import { ImageResponse } from "next/og";
import { getBook } from "@/lib/books";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const runtime = "edge";

export default function OgImage({ params }: { params: { slug: string } }) {
  const book = getBook(params.slug);
  const title = book?.title ?? "booksbymel.de";
  const tagline = book?.tagline ?? book?.blurb ?? "Stories voller Gefühl & Spannung";
  const genres = book?.genres?.join(" • ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #312e81 45%, #f97316 100%)",
          color: "#f8fafc",
          fontFamily: "'DM Serif Display', Georgia, serif",
        }}
      >
        <div style={{ fontSize: 36, letterSpacing: 6, textTransform: "uppercase", opacity: 0.8 }}>
          Melanie Thason
        </div>
        <div>
          <div style={{ fontSize: 72, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 34, marginTop: 24, maxWidth: "90%", opacity: 0.9 }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span>{genres ?? "Queere Romane & Romantic Suspense"}</span>
          <span style={{ fontSize: 24, opacity: 0.6 }}>booksbymel.de</span>
        </div>
      </div>
    ),
    size
  );
}
