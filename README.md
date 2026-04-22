# killeenwaterdamage.com

Local lead-generation site for water damage restoration in Killeen, TX and surrounding Bell & Coryell County areas (Harker Heights, Copperas Cove, Belton, Temple, Salado, Nolanville, Kempner, Fort Cavazos).

## Status

Visual front-end is in place (static HTML/CSS/JS). Ready for Cursor to extend with:
- Real phone number wiring (replace all `+1254XXXXXXX` placeholders with the live CallRail number).
- Replacing `REPLACE WITH KILLEEN ADDRESS` in the JSON-LD schema with the verified Google Business Profile address.
- Service detail pages (`/services/water-extraction`, `/services/mold-remediation`, etc.).
- Blog (`/blog/water-damage-cost-killeen`, `/blog/burst-pipe-killeen-what-to-do`, `/blog/homeowners-insurance-water-damage-texas`).
- Contact form backend (Cloudflare Worker or Formspree) for the "text us photos" CTA fallback.
- Lighthouse pass: target 95+ on mobile.

## File structure

```
/
├── index.html      # Single-page landing site
├── styles.css      # All design system + responsive styles
├── script.js       # Year stamp, smooth scroll, sticky-call hide, click tracking
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

- [ ] Replace placeholder phone number in 9 spots
- [ ] Replace placeholder address in JSON-LD schema
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
