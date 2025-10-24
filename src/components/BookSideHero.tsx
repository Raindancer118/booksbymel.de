'use client';
import { useEffect, useRef } from 'react';
import '@/styles/book-side.css';

export default function BookSideHero(){
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current!;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      /* Fortschritt 0..1: Sobald die Bühne im Sichtfenster ist */
      const p = Math.max(0, Math.min(1, (vh - r.top) / (r.height + vh * 0.25)));
      document.documentElement.style.setProperty('--p', p.toFixed(4));
    };
    update();
    const onScroll = () => update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="bookside-wrap" ref={wrapRef} aria-label="Buch in Seitenansicht, Seiten schwingen">
      <div className="bookside-stage">
        <div className="bookside-scene" role="img" aria-label="Offenes Buch, von vorne/tief gesehen">
          <div className="bookside-shadow" />
          <div className="bookside-core" />

          {/* Starre Blöcke links/rechts (dicker Seitenstapel ~300 Seiten) */}
          <div className="bookside-left-block"><div className="bookside-edge" /></div>
          <div className="bookside-right-block"><div className="bookside-edge" /></div>

          {/* ~10 blätternde Seiten aus der Falz nach rechts */}
          <div className="bookside-flips" aria-hidden>
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="flip" key={i} />
            ))}
          </div>

          {/* Rechte „Leseseite“ (Demo-Linien; hier kannst du echten Text/CTA setzen) */}
          <div className="bookside-right-content" aria-hidden>
            <div className="line" /><div className="line" /><div className="line" />
            <div className="line" /><div className="line" />
          </div>
        </div>
      </div>
    </section>
  );
}
