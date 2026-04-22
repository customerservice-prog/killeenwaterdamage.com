// Killeen Water Damage Restoration — front-end behaviors

// 1) Stamp the current year in the footer + lead form
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('lead-form');
  const success = document.getElementById('lead-success');
  if (form && success) {
    const err = (id, msg) => {
      const el = document.getElementById(id);
      if (el) el.textContent = msg || '';
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      err('lead-err-name');
      err('lead-err-phone');
      err('lead-err-addr');
      err('lead-err-msg');
      err('lead-err-photo');
      const name = document.getElementById('lead-name').value.trim();
      const phone = document.getElementById('lead-phone').value;
      const phoneDigits = phone.replace(/\D/g, '');
      const address = document.getElementById('lead-addr').value.trim();
      const description = document.getElementById('lead-msg').value.trim();
      const fileInput = document.getElementById('lead-photo');
      let valid = true;
      if (name.length < 2) {
        err('lead-err-name', 'Please enter at least 2 characters.');
        valid = false;
      }
      if (phoneDigits.length < 10) {
        err('lead-err-phone', 'Enter a valid 10-digit U.S. phone number.');
        valid = false;
      }
      if (address.length < 4) {
        err('lead-err-addr', 'Enter a street, city, or ZIP in Bell County area.');
        valid = false;
      }
      if (description.length < 10) {
        err('lead-err-msg', 'Please describe what happened in a sentence or two.');
        valid = false;
      }
      if (fileInput.files[0] && fileInput.files[0].size > 8 * 1024 * 1024) {
        err('lead-err-photo', 'Photo must be 8 MB or smaller.');
        valid = false;
      }
      if (!valid) return;
      const btn = document.getElementById('lead-submit');
      btn.setAttribute('disabled', 'disabled');
      try {
        const res = await fetch('/api/lead', { method: 'POST', body: new FormData(form) });
        if (!res.ok) throw new Error('request failed');
        form.hidden = true;
        form.setAttribute('aria-hidden', 'true');
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch {
        err('lead-err-name', "We couldn't send that just now. Please call the number above— we're 24/7.");
      } finally {
        btn.removeAttribute('disabled');
      }
    });
  }
});

// 2) Smooth-scroll for in-page anchor links (modern browsers handle this in CSS too)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// 3) Hide sticky call bar when user scrolls near the footer
const stickyCall = document.querySelector('.sticky-call');
const footer = document.querySelector('.footer');
if (stickyCall && footer && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      stickyCall.style.transform = entry.isIntersecting ? 'translateY(120%)' : 'translateY(0)';
      stickyCall.style.transition = 'transform 0.25s ease';
    });
  }, { threshold: 0.01 });
  observer.observe(footer);
}

// 4) Track tap-to-call clicks (placeholder — wire to GA4/CallRail later)
document.querySelectorAll('a[href^="tel:"], a[href^="sms:"]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.gtag) {
      window.gtag('event', 'contact_click', {
        contact_method: a.href.startsWith('sms:') ? 'sms' : 'phone',
        location: a.closest('section')?.id || a.closest('header,footer')?.tagName?.toLowerCase() || 'unknown'
      });
    }
    // eslint-disable-next-line no-console
    console.log('[contact]', a.href);
  });
});
