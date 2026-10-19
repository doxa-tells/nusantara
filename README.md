# Nusantara Kazakhstan LLP — Corporate Website

Static, single-page corporate site. Plain HTML / CSS / vanilla JS — no build step required. Open `index.html` in a browser, or serve the folder with any static file server.

## Project Structure

```
nusantara/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── fonts/           ← drop Gilroy .woff2 files here
│   └── images/          ← photos extracted from the corporate PDF
└── README.md
```

## Run Locally

Any of the following works:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .

# VS Code
"Live Server" extension → Right-click index.html → Open with Live Server
```

Then visit `http://localhost:8000`.

## Gilroy Font Setup

Gilroy is a commercial typeface (Radomir Tinkov / Type Type). It is **not** on Google Fonts and cannot legally be hot-linked from a public CDN unless you own a webfont license.

The CSS in `assets/css/styles.css` is wired up with `@font-face` rules pointing to `assets/fonts/`. Add the following five files (purchased from MyFonts / the Type Type foundry):

```
assets/fonts/
├── Gilroy-Light.woff2       (300)
├── Gilroy-Regular.woff2     (400)
├── Gilroy-Medium.woff2      (500)
├── Gilroy-Bold.woff2        (700)
└── Gilroy-ExtraBold.woff2   (800)
```

That's it — once the files are present, the existing `@font-face` rules pick them up. No CSS edits required.

### Fallback chain

While Gilroy is being licensed, the site falls back to the closest free alternative (`Inter`, then native system sans-serif). The `index.html` currently links `https://fonts.cdnfonts.com/css/gilroy-bold` as a developmental convenience — that source is fine for prototyping but **must be replaced with self-hosted files for production**.

To swap Gilroy for a free alternative permanently:

1. Remove the five `@font-face` blocks at the top of `assets/css/styles.css`.
2. Replace the `--font-sans` token with, e.g.:

```css
--font-sans: "Inter", system-ui, -apple-system, sans-serif;
```

3. Add `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800&display=swap" rel="stylesheet">` in `<head>`.

## Brand Tokens (CSS variables, `:root`)

| Token         | Value     | Use                                |
|---------------|-----------|------------------------------------|
| `--c-white`   | `#FFFFFF` | Primary background                 |
| `--c-navy`    | `#0A2540` | Headings, navigation, dark blocks  |
| `--c-blue`    | `#1E5AA8` | Buttons, links, icons              |
| `--c-blue-50` | `#E8F1FB` | Section dividers / tinted bands    |
| `--c-black`   | `#000000` | Body text                          |
| `--c-wa`      | `#25D366` | WhatsApp accent                    |

Edit these in one place (`assets/css/styles.css`, `:root`) to retheme the whole site.

## WhatsApp CTA

All call-to-action buttons (hero, sticky floating button, contact card, footer, partnership cards) point to:

```
https://wa.me/77017976328?text=<pre-filled message>
```

The pre-filled message varies slightly per context (general / Malaysia / Indonesia / Thailand / Turkey / ASEAN) so Dr. Ali Sher can see which country track each enquiry came from.

## Languages

The header includes EN / RU / KZ buttons. The English copy is hard-coded in the markup; Russian and Kazakh strings live in the `i18n` object inside `assets/js/main.js`. Currently only navigation labels are translated — extend the dictionaries to translate hero/body copy as the localised translations are finalised.

## SEO

- Meta description and keywords are set in `<head>`.
- Open Graph tags are configured for social previews.
- Semantic landmarks: `<header>`, `<nav>`, `<section>`, `<footer>`, `<article>` for partner and activity cards.
- All `<img>` tags carry descriptive `alt` text.
- Set the canonical domain in the OG `og:url` tag before deploying.

## Performance Notes

- Images are JPGs sourced from the corporate PDF, optimised on extraction. Convert to WebP with `cwebp -q 82 *.jpg` before production if you want a further ~30% size reduction.
- `loading="lazy"` is applied to every non-hero image.
- The hero background uses `loading="eager"` so it appears immediately.
- No external JS dependencies — vanilla JS keeps the bundle under 4 KB.

## Image Credits

All photos are cropped from the official Nusantara Kazakhstan LLP corporate profile PDF (the source `Nusantara KZ profile PDF.pdf`). For production, replace any low-resolution crops with the originals if available.

## License / Contact

Site code: © Nusantara Kazakhstan LLP. Visual assets remain the property of their respective rights holders. For commercial use questions, contact `alisher@nusantarakz.com`.
