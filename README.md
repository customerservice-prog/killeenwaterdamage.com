# killeenwaterdamage.com

Local lead-generation site for water damage restoration in Killeen, TX and surrounding Bell and Coryell County areas (Harker Heights, Copperas Cove, Belton, Temple, Salado, Nolanville, Kempner, Fort Cavazos).

## Configuration (`site.config.js`)

**Single place to update** contact and business details:

| Field | Purpose |
|--------|---------|
| `phone.e164` | E.164 for `tel:` and `sms:` (digits; placeholder `X` allowed until you replace with a live 254 or toll-free number) |
| `phone.display` | Shown in UI, home title applies only to meta description/OG on the homepage via JS |
| `phone.schema` | `telephone` in JSON-LD (E.123 style) |
| `email` | `mailto:` and visible footer on pages that use `site.config.js` |
| `address` | NAP in Local Business JSON-LD on the homepage |

`TODO(virtual-mailbox)`: set `address.streetLine` to the street your Google Business Profile uses (for example a verified virtual mailbox) before you go live.

The homepage (`index.html` with `data-config-home` on `<body>`) also applies the phone, email, `document.title` / `meta[description]`, and Open Graph / Twitter text from this file. Inner pages set their own `title` and `description` in HTML.

## What’s in the repo

Static HTML, CSS, and JavaScript (no build step, no `package.json`).

- **Home:** `index.html` — lead form posts to `POST /api/lead` (see below)
- **Services:** `/services/*/index.html` — six IICRC-style service pages with `Service`, `FAQPage`, and `BreadcrumbList` JSON-LD
- **Blog:** `/blog/index.html` and three long-form posts under `/blog/.../`
- **404:** `404.html` — used by Cloudflare Pages for missing URLs
- **API stub:** `functions/api/lead.js` — Cloudflare Pages Function; logs the payload and returns `200` (replace with email/CRM)
- **Edge:** `_headers` (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`), `_redirects` (e.g. `/services` → `/services/`)
- **Assets:** `favicon.ico`, `favicon.svg`, `og.jpg` (1200×630)
- **Crawl:** `robots.txt`, `sitemap.xml` — update `lastmod` and add URLs when you publish new HTML pages
- **Design:** `styles.css` — tokens: `--navy` `#0b3d91`, `--accent` `#ffb703`, Inter, 14px card radius, pill buttons

## Cloudflare Pages deployment

1. Connect this Git repository in the Cloudflare dashboard under **Pages**.
2. **Build command:** leave empty (static site).
3. **Build output directory:** `/` (repository root).
4. **Custom domains:** add `killeenwaterdamage.com` and `www.killeenwaterdamage.com` (CNAME to your `*.pages.dev` host or as Cloudflare suggests).
5. **Functions:** the `functions/` directory deploys as Pages Functions. `POST /api/lead` is implemented in `functions/api/lead.js` (logging only until you wire integrations).

## Lead form

The homepage “Request a free estimate” form uses `fetch('/api/lead')` with `multipart/form-data` (name, phone, address/ZIP, description, optional photo). Client-side checks are in `script.js`. Success copy: we’ll call you in 15 minutes; users with emergencies are directed to the phone.

## Google Search Console

After launch: add the property, verify (DNS or HTML), and submit `https://killeenwaterdamage.com/sitemap.xml`.

## Phone and lead tracking

`script.js` fires `gtag('event','contact_click',…)` for `tel:` and `sms:` when `gtag` is present. Add your GA4 snippet when ready; do not add other trackers per project rules.

## Design system (reference)

- **Primary navy:** `#0b3d91`
- **Accent yellow (CTA):** `#ffb703`
- **Body text:** `#1a1f36` on `#ffffff`
- **Section alt bg:** `#f7f9fc`
- **Font:** Inter (400 / 600 / 800)
- **Radius:** 14px on cards, 999px on buttons (pill)
- **Mobile breakpoints:** 760px (nav, sticky call), 800px (two-column layouts)

## Checklist for go-live

- [ ] Set real `phone` and `address.streetLine` in `site.config.js`
- [ ] Replace `functions/api/lead.js` logging with your CRM, email, or queue
- [ ] Verify in Google’s Rich Results Test: Local Business (home), `Service` + `FAQPage` (services/blog as applicable), `BreadcrumbList` (inner pages)
- [ ] Configure GA4 in `script.js` or a small inline snippet (allowed)
