import Link from "next/link";
import type { Route } from "next";
import type { RetailerLink } from "@/lib/types";

export default function RetailerButtons({ links }: { links: RetailerLink[] }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {links.map((retailer) => {
        if (retailer.url.startsWith("http")) {
          return (
            <a
              key={retailer.name}
              href={retailer.url}
              className="button"
              aria-label={`Bei ${retailer.name} kaufen`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {retailer.name}
            </a>
          );
        }

        return (
          <Link
            key={retailer.name}
            href={retailer.url as Route<string>}
            className="button"
            aria-label={`Bei ${retailer.name} kaufen`}
          >
            {retailer.name}
          </Link>
        );
      })}
    </div>
  );
}
