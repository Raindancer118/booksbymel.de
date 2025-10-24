import Link from "next/link";
import type { RetailerLink } from "@/lib/types";

export default function RetailerButtons({ links }: { links: RetailerLink[] }){
  return (
    <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
      {links.map(r => (
        <Link key={r.name} href={r.url} className="button" aria-label={`Bei ${r.name} kaufen`}>{r.name}</Link>
      ))}
    </div>
  );
}
