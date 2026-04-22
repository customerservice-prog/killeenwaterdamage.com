/**
 * killeenwaterdamage.com — contact & NAP (single source of truth)
 * Update PHONE_TEL, PHONE_DISPLAY, and (when available) phoneSchema before go-live.
 */
(function () {
  'use strict';

  // TODO: Replace with real CallRail 254 number before going live
  const PHONE_TEL = 'tel:+12540000000';
  const PHONE_DISPLAY = '(254) XXX-XXXX';

  /**
   * TODO: iPostal1 (or verified GBP) E.123-style telephone for JSON-LD when you have a live number.
   * Leave null/empty to omit "telephone" from LocalBusiness schema (avoids placeholder rich-result errors).
   */
  const PHONE_SCHEMA = null;

  /**
   * TODO: iPostal1 virtual mailbox — add streetAddress and set hasStreet: true, or set streetLine
   * in SITE_CONFIG below when you wire NAP. Until then, street is omitted from JSON-LD.
   * Example: "123 W Trimmier Rd Ste 100" (Killeen, TX)
   */
  var SITE_CONFIG = {
    phone: {
      e164: '+12540000000',
    },
    email: 'help@killeenwaterdamage.com',
    address: {
      // TODO: iPostal1 virtual mailbox — set streetLine and hasStreet: true (see top-of-file note)
      hasStreet: false,
      streetLine: '',
      addressLocality: 'Killeen',
      addressRegion: 'TX',
      postalCode: '76541',
      addressCountry: 'US',
    },
  };

  function setMetaProp(property, content) {
    var el = document.querySelector('meta[property="' + property + '"]');
    if (el) el.setAttribute('content', content);
  }
  function setMetaName(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (el) el.setAttribute('content', content);
  }

  function contactUris() {
    var p = String(PHONE_TEL);
    if (p.indexOf('tel:') === 0) {
      return { tel: p, sms: p.replace(/^tel:/, 'sms:') };
    }
    return { tel: 'tel:' + p, sms: 'sms:' + p.replace(/[^\d+]/g, '') };
  }

  function applySiteConfig() {
    var c = SITE_CONFIG;
    var uris = contactUris();
    var telUri = uris.tel;
    var smsUri = uris.sms;

    var isHome =
      document.body && document.body.hasAttribute('data-config-home');
    if (isHome) {
      var titleBase =
        '24/7 Water Damage in Killeen, TX | Killeen Water Damage Restoration';
      document.title = titleBase;

      var meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          'content',
          'Water damage in Killeen, TX? IICRC-certified crew on call 24/7. 60-minute response across Bell County, direct insurance billing, free on-site assessment. Available now.'
        );
      }
      var ogTitle =
        '24/7 Water Damage in Killeen, TX | Killeen Water Damage Restoration';
      var ogDesc =
        'Water damage in Killeen, TX? IICRC-certified team. 60-minute response, insurance billing, extraction & drying. Tap to call from mobile—available now.';
      setMetaProp('og:title', ogTitle);
      setMetaProp('og:description', ogDesc);
      setMetaProp('twitter:title', ogTitle);
      setMetaName('twitter:description', ogDesc);
    }

    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.setAttribute('href', telUri);
    });
    document.querySelectorAll('a[href^="sms:"]').forEach(function (a) {
      a.setAttribute('href', smsUri);
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.setAttribute('href', 'mailto:' + c.email);
      a.textContent = c.email;
    });
    document.querySelectorAll('[data-site-phone-text]').forEach(function (el) {
      el.textContent = PHONE_DISPLAY;
    });

    var addressObj = {
      '@type': 'PostalAddress',
      addressLocality: c.address.addressLocality,
      addressRegion: c.address.addressRegion,
      postalCode: c.address.postalCode,
      addressCountry: c.address.addressCountry,
    };
    if (c.address.hasStreet && c.address.streetLine) {
      addressObj.streetAddress = c.address.streetLine;
    }

    var ld = {
      '@context': 'https://schema.org',
      '@id': 'https://killeenwaterdamage.com/#localBusiness',
      '@type': 'EmergencyService',
      name: 'Killeen Water Damage Restoration',
      image: 'https://killeenwaterdamage.com/og.jpg',
      priceRange: '$$',
      address: addressObj,
      areaServed: [
        'Killeen',
        'Harker Heights',
        'Copperas Cove',
        'Belton',
        'Nolanville',
        'Salado',
        'Temple',
        'Kempner',
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
      url: 'https://killeenwaterdamage.com/',
    };

    if (PHONE_SCHEMA) {
      ld.telephone = PHONE_SCHEMA;
    }

    var ldNode = document.getElementById('ld-json-local-business');
    if (ldNode) {
      ldNode.textContent = JSON.stringify(ld, null, 2);
    }
  }

  window.SITE_CONFIG = SITE_CONFIG;
  window.PhoneConfig = { PHONE_TEL: PHONE_TEL, PHONE_DISPLAY: PHONE_DISPLAY };
  window.applySiteConfig = applySiteConfig;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteConfig);
  } else {
    applySiteConfig();
  }
})();
