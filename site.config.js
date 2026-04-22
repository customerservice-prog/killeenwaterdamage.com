/**
 * killeenwaterdamage.com — contact & NAP (single source of truth)
 * Update PHONE_TEL, PHONE_DISPLAY, or PHONE_SCHEMA if the business line changes.
 */
(function () {
  'use strict';

  const PHONE_TEL = 'tel:+12542368509';
  const PHONE_DISPLAY = '(254) 236-8509';

  /** E.123-style for JSON-LD `telephone` (schema.org). */
  const PHONE_SCHEMA = '+1-254-236-8509';

  var SITE_CONFIG = {
    phone: {
      e164: '+12542368509',
    },
    email: 'help@killeenwaterdamage.com',
    address: {
      hasStreet: true,
      streetLine: '2112 SW H.K. Dodgen Loop Suite 183',
      addressLocality: 'Temple',
      addressRegion: 'TX',
      postalCode: '76504',
      addressCountry: 'US',
      addressCountryName: 'United States',
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
        'Water damage in Killeen, TX? IICRC-certified crew on call 24/7. 60-minute response across Bell County, direct insurance billing, free on-site assessment. Available now.';
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

    var a = c.address;
    var addressLines = [];
    if (a.streetLine) addressLines.push(a.streetLine);
    addressLines.push(
      a.addressLocality + ', ' + a.addressRegion + ' ' + a.postalCode
    );
    addressLines.push(a.addressCountryName || 'United States');
    var addressText = addressLines.join('\n');
    document.querySelectorAll('[data-site-address]').forEach(function (el) {
      el.textContent = addressText;
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
