// Reveals elements as they scroll into view.
// Skipped entirely when the visitor has asked for reduced motion — the CSS
// media query already puts .fade-up in its final state, so there is nothing
// to animate and nothing left stuck at opacity 0.
(function () {
  'use strict';

  const reveals = document.querySelectorAll('.fade-up');
  if (!reveals.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // No IntersectionObserver support, or motion is unwanted: show everything up front.
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Stagger siblings entering together so a row doesn't pop as one block.
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  reveals.forEach((el) => observer.observe(el));
})();
