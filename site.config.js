/**
 * killeenwaterdamage.com — contact & NAP (single source of truth)
 * Update this file only; phone, email, and address propagate across the site.
 */
(function () {
  'use strict';

  var SITE_CONFIG = {
    phone: {
      /** E.164 for tel: / sms: (digits after optional +) */
      e164: '+1254XXXXXXX',
      /** Shown in UI, title, and meta */
      display: '(254) XXX-XXXX',
      /**
       * For schema.org "telephone" (include country; hyphens help readability)
       * Example: +1-254-555-0100
       */
      schema: '+1-254-XXX-XXXX',
    },
    email: 'help@killeenwaterdamage.com',
    /**
     * postalAddress for JSON-LD
     * TODO(virtual-mailbox): Set streetLine to your verified virtual mailbox
     * or Google Business Profile street address before going live.
     */
    address: {
      streetLine: 'REPLACE WITH KILLEEN ADDRESS',
      addressLocality: 'Killeen',
      addressRegion: 'TX',
      postalCode: '76541',
      addressCountry: 'US',
    },
  };

  /**
   * Build tel: / sms: URIs. If e164 still contains X placeholders, pass through
   * (for pre-launch); once you set 11-digit E.164, digits are normalized.
   */
  function setMetaProp(property, content) {
    var el = document.querySelector('meta[property="' + property + '"]');
    if (el) el.setAttribute('content', content);
  }
  function setMetaName(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (el) el.setAttribute('content', content);
  }

  function contactUris() {
    var p = String(SITE_CONFIG.phone.e164 || '');
    if (/X/i.test(p)) {
      return {
        tel: 'tel:' + p.replace(/\s/g, ''),
        sms: 'sms:' + p.replace(/\s/g, ''),
      };
    }
    var digits = p.replace(/\D/g, '');
    if (digits[0] === '1' && digits.length === 11) {
      return { tel: 'tel:+' + digits, sms: 'sms:+' + digits };
    }
    if (digits.length === 10) {
      return { tel: 'tel:+1' + digits, sms: 'sms:+1' + digits };
    }
    return { tel: 'tel:+' + digits, sms: 'sms:+' + digits };
  }

  function applySiteConfig() {
    var c = SITE_CONFIG;
    var uris = contactUris();
    var telUri = uris.tel;
    var smsUri = uris.sms;

    var titleBase =
      'Killeen Water Damage Restoration | 24/7 Emergency Response | ' +
      c.phone.display;
    document.title = titleBase;

    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Water damage in Killeen, TX? IICRC-certified crew on call 24/7. 60-minute response, direct insurance billing. Burst pipes, floods, mold. Call ' +
          c.phone.display +
          ' now.'
      );
    }
    var ogTitle =
      'Killeen Water Damage Restoration | 24/7 Emergency | ' + c.phone.display;
    var ogDesc =
      'Water damage in Killeen, TX? IICRC-certified team. 60-minute response, insurance billing, extraction & drying. Call ' +
      c.phone.display +
      ' 24/7.';
    setMetaProp('og:title', ogTitle);
    setMetaProp('og:description', ogDesc);
    setMetaProp('twitter:title', ogTitle);
    setMetaName('twitter:description', ogDesc);

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
    // Visible phone text (any element that marks itself)
    document.querySelectorAll('[data-site-phone-text]').forEach(function (el) {
      el.textContent = c.phone.display;
    });

    var ld = {
      '@context': 'https://schema.org',
      '@type': 'EmergencyService',
      name: 'Killeen Water Damage Restoration',
      image: 'https://killeenwaterdamage.com/og.jpg',
      telephone: c.phone.schema,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.address.streetLine,
        addressLocality: c.address.addressLocality,
        addressRegion: c.address.addressRegion,
        postalCode: c.address.postalCode,
        addressCountry: c.address.addressCountry,
      },
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

    var ldNode = document.getElementById('ld-json-local-business');
    if (ldNode) {
      ldNode.textContent = JSON.stringify(ld, null, 2);
    }
  }

  window.SITE_CONFIG = SITE_CONFIG;
  window.applySiteConfig = applySiteConfig;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteConfig);
  } else {
    applySiteConfig();
  }
})();
