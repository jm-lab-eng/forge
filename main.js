/* main.js — Jithin Machath Portfolio
   Place this file in your repository root folder
   alongside index.html, projects.html, style.css
*/

// ─────────────────────────────────────────────
// DARK MODE
// The <head> inline script already sets data-theme
// from localStorage before paint. Here we just
// wire the button and keep the icon in sync.
// ─────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('jm-theme', theme);
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.querySelector('.toggle-icon').textContent = (theme === 'dark') ? '○' : '◑';
  }
}

// ─────────────────────────────────────────────
// ACCORDION
// The expand-btn sits INSIDE the header div.
// Without stopPropagation the click fires twice
// (button → header), toggling open then closed.
// ─────────────────────────────────────────────
function initAccordion() {
  document.querySelectorAll('.project-entry-header').forEach(function (header) {
    header.addEventListener('click', function (e) {
      // If the click came from the expand-btn itself, let it bubble
      // to here (the header), but don't double-fire.
      var entry = header.closest('.project-entry');
      if (!entry) return;

      var isOpen = entry.classList.contains('is-open');

      // Close all entries
      document.querySelectorAll('.project-entry.is-open').forEach(function (e) {
        e.classList.remove('is-open');
      });

      // If this one was closed, open it now
      if (!isOpen) {
        entry.classList.add('is-open');
      }
    });
  });

  // Stop the expand-btn from firing a SECOND click on the header
  document.querySelectorAll('.expand-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // don't let button bubble to header
      var entry = btn.closest('.project-entry');
      if (!entry) return;

      var isOpen = entry.classList.contains('is-open');
      document.querySelectorAll('.project-entry.is-open').forEach(function (e) {
        e.classList.remove('is-open');
      });
      if (!isOpen) {
        entry.classList.add('is-open');
      }
    });
  });
}

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
function initReveal() {
  var els = document.querySelectorAll(
    '.about-card, .skill-block, .edu-item, .timeline-item, .impact-item, .tool-chip'
  );
  els.forEach(function (el) { el.classList.add('reveal'); });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(function (el) { obs.observe(el); });
}

// ─────────────────────────────────────────────
// NAVBAR SHADOW ON SCROLL
// ─────────────────────────────────────────────
function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,.10)'
      : 'none';
  }, { passive: true });
}

// ─────────────────────────────────────────────
// CUSTOM CURSOR (desktop / pointer device only)
// ─────────────────────────────────────────────
function initCursor() {
  var cursor   = document.getElementById('cursor');
  var follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  var mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function tick() {
    fx += (mx - fx) * 0.14;
    fy += (my - fy) * 0.14;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button, .project-entry-header, .gallery-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.style.transform   = 'translate(-50%,-50%) scale(2)';
      follower.style.opacity   = '0.8';
    });
    el.addEventListener('mouseleave', function () {
      cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
      follower.style.opacity   = '0.5';
    });
  });
}

// ─────────────────────────────────────────────
// BOOT — run everything once DOM is ready
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Sync theme button icon with whatever the <head> script already set
  var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.querySelector('.toggle-icon').textContent = (currentTheme === 'dark') ? '○' : '◑';
    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  initAccordion();
  initReveal();
  initNavbar();
  initCursor();
});
