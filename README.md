# The 30 — Creator Marketing Leaders Berlin

Onepager-Website für **The 30**, ein exklusives, geladenes Dinner für Deutschlands
führende Köpfe im Creator- & Influencer-Marketing.
Präsentiert von **WePush** · Host: Markus Cremer.

🗓️ 15. September 2026 · Hotel Telegraphenamt, Berlin
🔗 Anmeldung: https://luma.com/48qmouk6

## Stack
Reine statische Seite — kein Build, kein Framework:
- `index.html` — gesamte Seitenstruktur & Texte
- `css/styles.css` — Design; **alle Marken-Variablen** (Farben, Fonts) oben unter `:root`
- `js/main.js` — Nav-Verhalten & Scroll-Animationen
- `assets/` — Bilder (Galerie, Location, Host, OG-Image)

## Lokal ansehen
Einfach `index.html` im Browser öffnen — oder ein Mini-Server:
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Inhalte pflegen
- **Texte:** direkt in `index.html` ändern.
- **Farben / Branding:** Variablen in `css/styles.css` (`:root`) anpassen — z. B. `--accent`.
- **Galerie-Fotos nach dem Event:** siehe [`assets/gallery/README.md`](assets/gallery/README.md).

## Deployment
Deploy via **GitHub Pages** (Branch `main`, Root). Die Datei `CNAME` bindet die
Domain `the30berlin.com`. Nach jedem `git push` ist die Seite in ~1 Min live.

Setup einmalig: Repo → Settings → Pages → Source: „Deploy from a branch" → `main` / `/ (root)`.
