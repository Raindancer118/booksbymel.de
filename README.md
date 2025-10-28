# booksbymel.de

Next.js (App Router) Website für Autorin "Mel". DSGVO-freundlich, schnelle Auslieferung, Content per JSON/MDX.

## Schnellstart
```bash
npm install
npm run dev
```

## Cloudflare Pages Deployment

Dieses Projekt ist für Cloudflare Pages vorbereitet und nutzt den offiziellen Next.js-Buildschritt von Cloudflare.

### Build-Befehl

```
npm run cf:build
```

### Statische Auslieferung

`next.config.mjs` setzt `images.unoptimized = true`, damit alle Assets auf Cloudflare ohne das Next.js Image-Optimierungsbackend ausgeliefert werden können.

### Erforderliche Umgebungsvariablen

Richte in Cloudflare Pages folgende Variablen ein, damit Middleware und API-Routen funktionieren:

- `PWT_ACC` – Token für den Zugriffsschutz der geschützten Seiten.
- `NEWSLETTER_ESP_ENDPOINT` – Endpoint des Newsletter-Dienstes.
- `NEWSLETTER_ESP_API_KEY` – API-Key für den Newsletter-Dienst.
- `NEWSLETTER_ESP_AUDIENCE_ID` – Empfängerliste für den Newsletter.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` – Öffentliche Mess-ID für das Opt-in Analytics-Snippet.

Für eine lokale Vorschau des Cloudflare-Workers kannst du den Befehl `npm run cf:preview` verwenden, der `@cloudflare/next-on-pages --watch` startet.
