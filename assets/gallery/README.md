# Galerie-Bilder hinzufügen

So fügst du nach dem Event Fotos zur Recap-Galerie hinzu — kein Code-Wissen nötig:

## 1. Bilder ablegen
Lege deine Fotos in diesen Ordner (`assets/gallery/`). Empfehlung:
- Format: **JPG** oder **WebP**
- Kantenlänge: ~1200–1600 px (quadratisch sieht am besten aus)
- Benennung fortlaufend: `01.jpg`, `02.jpg`, `03.jpg` …

## 2. In `index.html` einbinden
Suche im `index.html` den Bereich `<!-- GALERIE ... -->` (Sektion „Recap").
Ersetze die leeren Platzhalter-Kacheln:

```html
<figure class="ph-tile"></figure>
```

durch echte Bilder:

```html
<figure><img src="assets/gallery/01.jpg" alt="The 30 Berlin — Impression" loading="lazy" /></figure>
```

Für jedes weitere Foto einfach eine weitere `<figure>`-Zeile hinzufügen.

## 3. Speichern, committen, fertig
```bash
git add .
git commit -m "Recap-Fotos Event 1 hinzugefügt"
git push
```
Nach ~1 Minute sind die Bilder live auf the30berlin.com.

> Tipp: Auch die Platzhalter für Location- und Host-Foto funktionieren gleich —
> lege `assets/location.jpg` bzw. `assets/markus.jpg` an und ersetze den jeweiligen
> `<div class="media-ph">…</div>`-Block durch ein `<img>`.
