"use client";

import { useState } from "react";

type Synopsis = { title: string; content: string };

type Props = { synopses: Synopsis[] };

export default function SynopsisTabs({ synopses }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!synopses.length) return null;

  const activeSynopsis = synopses[activeIndex] ?? synopses[0];

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Inhaltszusammenfassung" className="tab-list">
        {synopses.map((synopsis, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={synopsis.title}
              role="tab"
              type="button"
              className={`tab${isActive ? " active" : ""}`}
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
            >
              {synopsis.title}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="tab-panel">
        <p>{activeSynopsis.content}</p>
      </div>
    </div>
  );
}
