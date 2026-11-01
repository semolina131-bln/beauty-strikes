# Prelaunch-Checkliste

Legende: **[T]** = technisch umgesetzt, nur prüfen · **[DU]** = deine Aufgabe · **[RECHT]** = rechtliche/Programm-Prüfung nötig (nicht technisch lösbar)

## Inhalte
- [ ] **[DU]** Alle 15 Platzhalter in `products.json` durch echte, geprüfte Produkte ersetzen oder löschen
- [ ] **[DU]** Alle 10 Artikel prüfen (Quellen, Aussagen), erst dann `draft: false`
- [ ] **[DU]** Freigegebene Markentexte & Navigation einsetzen (`src/config.ts`, Startseite)
- [ ] **[DU]** Produktangaben gegen offizielle Zutatenliste / Hersteller-Infos geprüft
- [ ] **[DU]** Eigene oder lizenzierte Produktbilder (keine kopierten Amazon-Bilder)
- [ ] **[DU]** Die 3 fertigen Artikel gegenlesen; Quellen in „Further reading“ selbst verifizieren
- [ ] **[DU]** Weitere Artikel schreiben (Ziel: ≥ 10 eigene, substanzielle Texte vor dem Amazon-Antrag)
- [ ] **[DU]** Keine erfundenen Tests, Bewertungen, Preise, Kundenzitate

## Funktion
- [ ] **[T]** `npm run build` läuft ohne Fehler
- [ ] **[T]** Alle Menüpunkte & Footer-Links funktionieren (auch mobil)
- [ ] **[T]** Suche & Filter auf `/finds/` funktionieren; ohne JavaScript werden alle Produkte gezeigt
- [ ] **[T]** 404-Seite erscheint bei falscher URL (nach Deploy testen)
- [ ] **[DU]** Impressum-Link öffnet https://sites.google.com/view/skinstrike-legal

## Barrierefreiheit
- [ ] **[T]** Skip-Link, sichtbarer Fokus, semantische Überschriften, Alt-Texte, `prefers-reduced-motion`
- [ ] **[DU]** Komplette Seite einmal nur mit Tastatur (Tab/Enter) bedienen
- [ ] **[DU]** Für jedes eigene Bild einen beschreibenden `alt`-Text eintragen
- [ ] **[DU]** Optional: Lighthouse (Chrome DevTools) → Accessibility & Performance prüfen

## SEO & Pinterest
- [ ] **[DU]** `SITE_URL` in `astro.config.mjs` = echte Adresse
- [ ] **[T]** Eindeutige Titles/Descriptions, Canonical, Open Graph, Sitemap, robots.txt, strukturierte Daten (Article, Breadcrumb, WebSite/Organization)
- [ ] **[DU]** Sitemap in der Google Search Console einreichen (`/sitemap-index.xml`)
- [ ] **[DU]** Pinterest-Verifizierung (`config.ts`) + Rich Pins prüfen
- [ ] **[DU]** Für wichtige Artikel eigene Pin-Bilder (1000×1500)

## Recht & Datenschutz
- [ ] **[RECHT]** Impressum vollständig und aktuell (extern auf Google Sites)
- [ ] **[RECHT]** Datenschutzerklärung: alle **[VERIFY]**-Stellen klären, gelben Entwurfs-Hinweis entfernen
- [ ] **[RECHT]** Cloudflare-Datenverarbeitung (Logs, Speicherdauer, US-Transfer) prüfen
- [ ] **[RECHT]** Gesundheitsbezogene Aussagen in Artikeln: nur belegbare, vorsichtige Formulierungen
- [ ] **[T]** Keine Cookies, kein Tracking, Schriften selbst gehostet → kein Cookie-Banner nötig, solange nichts hinzugefügt wird

## Amazon Associates
- [ ] **[RECHT]** Aktuelles Operating Agreement & Program Policies selbst lesen (Regeln ändern sich)
- [ ] **[T]** Pflichtsatz „As an Amazon Associate I earn from qualifying purchases.“ vorbereitet; erscheint erst bei `amazonAssociate: true`
- [ ] **[T]** „Paid link“-Label neben jedem Affiliate-Button; Disclosure vor den Produkten
- [ ] **[T]** Keine Preise, Sterne, Rezensionen, Amazon-Logos oder -Bilder auf der Seite
- [ ] **[T]** Hinweis, dass Beauty Strikes nicht mit Amazon verbunden ist (Disclosure-Seite)
- [ ] **[DU]** Nach Freigabe: `affiliateUrl` + `status: "live"` pro Produkt, dann Schalter in `config.ts` auf `true`
- [ ] **[RECHT]** Amazon verlangt i. d. R. qualifizierte Verkäufe innerhalb einer Frist nach Anmeldung — Zeitpunkt des Antrags daran ausrichten
- [ ] **[DU]** Prüfen, ob Kurzlinks/Links in Pinterest-Pins nach Amazon-Richtlinien erlaubt sind, bevor du sie direkt in Pins setzt
