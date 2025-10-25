"use client";

import { useEffect, useMemo, useState } from "react";

type Quote = { quote: string; source: string; role?: string };

type Props = { testimonials: Quote[]; interval?: number };

export default function QuoteCarousel({ testimonials, interval = 8000 }: Props) {
  const filteredTestimonials = useMemo(
    () => testimonials.filter(t => t.quote?.trim() && t.source?.trim()),
    [testimonials]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (filteredTestimonials.length < 2) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % filteredTestimonials.length);
    }, interval);
    return () => clearInterval(id);
  }, [filteredTestimonials.length, interval]);

  useEffect(() => {
    if (index >= filteredTestimonials.length) {
      setIndex(0);
    }
  }, [filteredTestimonials.length, index]);

  if (!filteredTestimonials.length) return null;

  const item = filteredTestimonials[index];

  return (
    <figure className="quote-carousel">
      <blockquote>
        <p>„{item.quote}“</p>
      </blockquote>
      <figcaption>
        — {item.source}
        {item.role ? `, ${item.role}` : ""}
      </figcaption>
      {filteredTestimonials.length > 1 && (
        <div className="quote-carousel__dots" role="tablist" aria-label="Leserstimmen">
          {filteredTestimonials.map((_, dotIndex) => {
            const active = dotIndex === index;
            return (
              <button
                key={dotIndex}
                type="button"
                role="tab"
                className={`dot${active ? " active" : ""}`}
                aria-label={`Zitat ${dotIndex + 1}`}
                aria-selected={active}
                onClick={() => setIndex(dotIndex)}
              />
            );
          })}
        </div>
      )}
    </figure>
  );
}
