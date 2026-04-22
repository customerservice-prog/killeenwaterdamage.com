// Killeen Water Damage Restoration — front-end behaviors

// 1) Stamp the current year in the footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
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
