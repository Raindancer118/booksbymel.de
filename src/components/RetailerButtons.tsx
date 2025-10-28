import type { RetailerLink } from "@/lib/types";

export default function RetailerButtons({ links }: { links: RetailerLink[] }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className="button-row">
      {links.map(({ name, url }) => (
        <a
          key={name}
          href={url}
          className="button"
          aria-label={`Bei ${name} kaufen`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {name}
        </a>
      ))}
    </div>
  );
}
