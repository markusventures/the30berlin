# The 30 — Creator Marketing Leaders Berlin

Onepager-Website für **The 30**, ein exklusives, geladenes Dinner für Deutschlands
führende Köpfe im Creator- & Influencer-Marketing.
Präsentiert von **WePush** · Host: Markus Cremer.

🗓️ Vol. 2 · 18. Februar 2027 · Berlin

Speakerinnen: Lara Schwitalla (Social Lead @ REWE), Anna Hartmann (Global Influencer Lead @ cosnova).
🔗 Anmeldung: https://luma.com/bhbs4krd

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

## Vol. 2: Quellen und Assets

- Lara: [HORIZONT, 3. November 2026](https://www.horizont.net/marketing/nachrichten/29-jaehrige-kommt-von-aldi-das-ist-die-neue-social-media-chefin-von-rewe-236448). Artikel mit Bezahlschranke. Portrait © REWE, über [Leadersnet](https://www.leadersnet.de/news/105370,personalie-lara-schwitalla.html).
- Anna: [Catrice-Kampagne, GFDK / W&V Morgenpost, 7. August 2024](https://www.freundederkuenste.de/aktuelles/marketing-news/honeypuu-und-karo-kauer-waren-die-gesichter-der-catrice-kampagne-own-your-magic-studio/). Der ursprüngliche W&V-Link liefert HTTP 410; deshalb ist die erreichbare Zusammenfassung verlinkt. Profil und Portrait: [re:publica](https://re-publica.com/en/user/25766), Rollenbeschreibung zusätzlich [M.STORIES](https://www.mstories.de/festival2026).
- REWE-Wortmarke: Simple Icons (`rewe.svg`), ViewBox auf die Wortmarke zugeschnitten. cosnova-Logo aus dem vorhandenen Asset-Bestand.
- LinkedIn-Links und Zusagen beider Speakerinnen vom Veranstalter bestätigt. Keine konkreten Vortragstitel angekündigt.
- Vol. 1: alle fünf freigegebenen Zitate bleiben erhalten; die komplette Galerie und das frühere Line-up sind aufklappbar.
