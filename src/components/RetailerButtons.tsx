import type { RetailerLink } from "@/lib/types";

export default function RetailerButtons({ links }: { links: RetailerLink[] }) {
  return (
    <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
      {links.map(r => (
        <a
          key={r.name}
          href={r.url}
          className="button"
          aria-label={`Bei ${r.name} kaufen`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {r.name}
        </a>
      ))}
    </div>
  );
}
