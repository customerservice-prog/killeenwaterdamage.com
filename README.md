# killeenwaterdamage.com

Local lead-generation site for water damage restoration in Killeen, TX and surrounding Bell & Coryell County areas (Harker Heights, Copperas Cove, Belton, Temple, Salado, Nolanville, Kempner, Fort Cavazos).

## Status

Visual front-end is in place (static HTML/CSS/JS). **Contact and NAP (name, address, phone):** update `site.config.js` only — at load time it applies `phone`, `email`, and `address` to `tel:` / `sms:` / `mailto:` links, visible phone text, `document.title` / meta description, and the Local Business JSON-LD. HTML may still list legacy placeholder `tel:` / `href` values; the script overwrites them from `SITE_CONFIG`.
- Live CallRail (or other) number: set `phone.e164`, `phone.display`, and `phone.schema` in `site.config.js`.
- Mailing or virtual mailbox for GBP: set `address.streetLine` (see `TODO(virtual-mailbox)` in that file).
- Service detail pages (`/services/water-extraction`, `/services/mold-remediation`, etc.).
- Blog (`/blog/water-damage-cost-killeen`, `/blog/burst-pipe-killeen-what-to-do`, `/blog/homeowners-insurance-water-damage-texas`).
- Contact form backend (Cloudflare Worker or Formspree) for the "text us photos" CTA fallback.
- Lighthouse pass: target 95+ on mobile.

## File structure

```
/
├── index.html      # Single-page landing site
├── site.config.js  # NAP, phone, email, JSON-LD values (edit here only)
├── styles.css      # All design system + responsive styles
├── script.js       # Year stamp, smooth scroll, sticky-call hide, click tracking
├── favicon.ico
├── favicon.svg
├── og.jpg          # 1200×630 Open Graph / Twitter card
├── robots.txt
├── sitemap.xml     # Update when adding new HTML pages
└── README.md       # This file
```

## Design system

- **Primary navy:** `#0b3d91`
- **Accent yellow (CTA):** `#ffb703`
- **Body text:** `#1a1f36` on `#ffffff`
- **Section alt bg:** `#f7f9fc`
- **Font:** Inter (400 / 600 / 800)
- **Radius:** 14px on cards, 999px on buttons (pill)
- **Mobile breakpoints:** 760px (nav collapse, sticky-call shows), 800px (two-column to one)

## SEO setup checklist (Cursor or manual)

- [ ] Set phone and address in `site.config.js` (replaces all former scattered placeholders)
- [ ] Confirm `address.streetLine` matches your Google Business Profile
- [ ] Add favicon + `og.jpg` (1200x630 social card)
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Verify Google Search Console (DNS TXT or HTML file)
- [ ] Submit sitemap to GSC + Bing Webmaster Tools
- [ ] Add service-specific landing pages with their own `Service` schema
- [ ] Add FAQPage schema to blog posts targeting question keywords

## Hosting

Recommended: Cloudflare Pages (free, fast CDN, automatic HTTPS).
1. Connect this repo in Cloudflare Pages dashboard.
2. Build command: (leave blank — static site).
3. Build output directory: `/`.
4. Set custom domain to `killeenwaterdamage.com` and `www.killeenwaterdamage.com`.

## Phone & lead tracking

Use a CallRail or Twilio 254 area code number. All `tel:` and `sms:` links use the same number for now. The `script.js` file fires a `gtag('event','contact_click')` if Google Analytics 4 is added — wire that up after GA4 install.
