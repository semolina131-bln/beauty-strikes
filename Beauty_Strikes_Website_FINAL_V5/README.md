# Beauty Strikes — Website

Statische Astro-Website. Kein CMS, keine Datenbank, keine Cookies, kein Tracking.

## 1. Lokal starten

Voraussetzung: [Node.js](https://nodejs.org) 22.23.4 oder neuer (LTS).

```bash
npm install
npm run dev        # Vorschau unter http://localhost:4321
npm run build      # erzeugt den fertigen Ordner dist/
npm run preview    # testet den fertigen Build lokal
```

## 2. Ordnerstruktur

```
src/
  config.ts              ← Name, Impressum-Link, AFFILIATE-SCHALTER, Navigation
  data/products.json     ← alle Produkte
  data/categories.json   ← Texte der 4 Kategorieseiten
  content/journal/*.md   ← Artikel (ein File = ein Artikel)
  components/            ← wiederverwendbare Bausteine
  pages/                 ← Seiten (URL = Dateiname)
  styles/global.css      ← Farben, Schriften (oben als Variablen)
public/images/           ← Bilder (brand/, products/, journal/)
templates/               ← Vorlagen zum Kopieren
```

## 3. Produkt hinzufügen

1. Öffne `src/data/products.json`.
2. Kopiere einen Eintrag (Vorlage: `templates/product-entry.json`) und passe ihn an.
3. `id` = Teil der URL (`/finds/<id>/`). Nur Kleinbuchstaben und Bindestriche. Echte Produkte **nicht** mit `placeholder-` beginnen.
4. `category`: `korean-skincare`, `skincare-routines`, `haircare-scalp` oder `beauty-tools`.
5. `subcategory` = eine Abschnitts-`id` aus `categories.json` (z. B. `cleansers`, `serums`, `led`). Bestimmt, in welchem Abschnitt das Produkt erscheint.
6. `status`:
   - `placeholder` — nur lokal in der Entwicklung sichtbar; nicht im Produktions-Build
   - `draft` — echtes Produkt, nur lokal sichtbar; nicht im Produktions-Build
   - `live` — Affiliate-Button aktiv (nur wenn der Schalter in `config.ts` an ist)
   - `unavailable` — nicht mehr erhältlich
7. `featured: true` → erscheint auf der Startseite (max. 4).
8. `lastReviewed` bei jeder Prüfung aktualisieren.
9. Platzhalter löschen, sobald echte Produkte da sind.

**Bilder:** Lege eigene oder lizenzierte Bilder in `public/images/products/` (quadratisch, WebP, ca. 800×800) und trage den Pfad unter `image.src` ein. **Keine Amazon-Produktbilder kopieren.** Ohne Bild erscheint automatisch eine neutrale Illustration.

## 4. Affiliate-Links aktivieren (erst nach Amazon-Freischaltung)

1. Bei Amazon Associates (amazon.com, US) anmelden; erst nach wirksamer Einschreibung und Erlaubnis für Special Links aktivieren (die endgültige Prüfung kann erst nach qualifizierten Verkäufen erfolgen).
2. Pro Produkt `affiliateUrl` mit deinem Tracking-Link füllen und `status` auf `"live"` setzen.
3. In `src/config.ts`: `amazonAssociate: true`.
4. Neu bauen/deployen. Dann erscheinen automatisch:
   - der Pflichtsatz „As an Amazon Associate I earn from qualifying purchases.“ (Footer, Produktseiten, Disclosure-Seite),
   - das Label „Paid link“ neben jedem Button,
   - `rel="sponsored nofollow noopener"` auf jedem Link.

Ein Button erscheint nur, wenn **alle drei** Bedingungen erfüllt sind (Schalter an, Status `live`, URL von amazon.com/amzn.to). So kann kein halbfertiger Link live gehen.

## 5. Artikel veröffentlichen

1. Kopiere eine Vorlage aus `templates/` nach `src/content/journal/mein-artikel.md`. Der Dateiname wird die URL: `/journal/mein-artikel/`.
2. Frontmatter ausfüllen (Titel, Beschreibung, Kategorie, Template, Datum).
3. Text in Markdown schreiben (`## Überschrift`, `- Liste`, `**fett**`, Tabellen).
4. `relatedProducts` = Liste von Produkt-`id`s → erscheinen unter dem Artikel, Disclosure wird automatisch eingeblendet.
5. `draft: false` setzen → Artikel wird gebaut, erscheint im Journal, in der Sitemap und auf der Startseite.

**Wichtig:** Alle 10 Artikel sind aktuell `draft: true` — 3 ausformulierte Texte (Quellen noch prüfen) und 7 Gliederungen. Entwürfe werden **nie** in die öffentliche Seite gebaut. Du siehst sie nur lokal mit `npm run dev` (markiert mit „Draft — not public“). Erst nach Prüfung `draft: false` setzen.

## 6. Weitere Bearbeitungen

| Was | Wo |
|---|---|
| Kategorietexte & Abschnitte | `src/data/categories.json` |
| Impressum-Link, Pinterest-Profil, Pinterest-Verifizierung | `src/config.ts` |
| Navigation | `src/config.ts` → `NAV` |
| Farben & Schriften | `src/styles/global.css` (`:root`) — Midnight #170B2E, Strike Violet #6733D6, Electric Lavender #B59AFF, Off-white #F7F5FA, Charcoal #26222E; Schriften: Bodoni Moda (Überschriften) + Inter (Text), lokal eingebunden |
| Logo | `public/images/brand/` (gleiche Dateinamen ersetzen) |
| About / Disclosure / Privacy | `src/pages/about.astro` usw. |
| Endgültige Domain | `astro.config.mjs` → `SITE_URL` |

## 7. Kostenlos veröffentlichen: Cloudflare Pages

Cloudflare Pages erlaubt kommerzielle Nutzung im Gratis-Plan und gibt dir eine kostenlose Adresse `<projektname>.pages.dev`.

1. Konto bei [github.com](https://github.com) anlegen → neues **privates** Repository `beauty-strikes`.
2. Projektordner hochladen (ohne `node_modules/` und `dist/`; die `.gitignore` liegt bei). Am einfachsten mit GitHub Desktop.
3. Konto bei [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → Repository wählen.
4. Build-Einstellungen:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Umgebungsvariable: `NODE_VERSION` = `22.23.4`
5. **Save and Deploy.** Nach ca. 1–2 Minuten ist die Seite unter `https://<projektname>.pages.dev` online.
6. Falls der Projektname nicht `beauty-strikes` ist: `SITE_URL` in `astro.config.mjs` anpassen und erneut pushen (wichtig für Canonical-URLs, Sitemap, Pinterest).
7. Jede Änderung, die du ins Repository hochlädst, wird automatisch neu veröffentlicht.

Hinweis: Die Bezeichnungen im Cloudflare-Dashboard ändern sich gelegentlich. Wenn ein Menüpunkt anders heißt, such nach „Pages“ bzw. „Connect to Git“.

## 8. Pinterest

- Jeder Artikel kann ein eigenes Hochformat-Bild (`pinImage`, 1000×1500) haben, sonst wird `public/images/brand/pin-default.jpg` verwendet.
- Open-Graph-Tags (Titel, Beschreibung, Bild, `article:published_time`) sind gesetzt.
- Website bei Pinterest verifizieren: Code aus „Claim website“ → `pinterestVerification` in `src/config.ts`.
- Rich Pins ggf. im Pinterest-Business-Konto aktivieren/validieren (Pinterest-Vorgaben dazu vorher prüfen).

## Noch vor dem öffentlichen Start

- Alle 15 Produkt-Platzhalter sind nur Entwicklungsdaten und werden im Produktions-Build ausgeblendet. Reale Produktseiten erst nach Verifikation auf `live` umstellen.
- Die Datenschutzseite enthält `[VERIFY]`-Markierungen und darf nicht als geprüft gelten. Hostinganbieter, Ansprechpartner, Rechtsgrundlagen und etwaige Drittlandtransfers klären.
- `astro.config.mjs` enthält die **angenommene** Host-URL `https://beauty-strikes.pages.dev`. Vor Deployment mit der tatsächlich zugeteilten URL abgleichen.
- Originalartikel und Quellen verifizieren; keine unbestätigten Inhalte freischalten.
- Für Affiliate-Verlinkungen Amazon Associates Registrierung, Disclosure und Regeln prüfen.
- Markenrechte vor dauerhafter kommerzieller Verwendung recherchieren.

## Rebrand note (2026-11-01)
- Brand is **Beauty Strikes**; new user-supplied logo replaces favicon, header mark, and default social media artwork.
- Verify the existing Google Sites legal URL still serves the newly updated Beauty Strikes notice before publishing.
- Pinterest profile is configured as https://de.pinterest.com/beautystrikes/.
- `astro.config.mjs` assumes `https://beauty-strikes.pages.dev`; set this to the **actual** host URL before launch.
- Product entries and article drafts are still not launch-ready, and legal review remains open.
