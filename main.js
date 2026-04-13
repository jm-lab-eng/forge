/* main.js — Jithin Machath Portfolio */

// ── CURSOR ────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animFollower() {
    fx += (mx - fx) * 0.14;
    fy += (my - fy) * 0.14;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  })();

  document.querySelectorAll('a, button, .project-entry-header, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.opacity = '0.5';
    });
  });
}

// ── THEME ─────────────────────────────────────────────────
const toggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('jm-theme', theme);
  if (toggle) {
    toggle.querySelector('.toggle-icon').textContent = theme === 'dark' ? '○' : '◑';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Apply saved theme (inline script in <head> handles first paint; this syncs the icon)
const saved = localStorage.getItem('jm-theme');
applyTheme(saved === 'dark' ? 'dark' : 'light');

if (toggle) {
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });
}

// ── NAVBAR SCROLL ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,.08)'
      : 'none';
  }, { passive: true });
}

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.about-card, .skill-block, .edu-item, .timeline-item, .impact-item, .tool-chip, .project-entry'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ── ACCORDION ─────────────────────────────────────────────
function toggleProject(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const wasOpen = el.classList.contains('is-open');

  // Close all open entries
  document.querySelectorAll('.project-entry.is-open').forEach(e => e.classList.remove('is-open'));

  // If it wasn't open, open it and scroll to it
  if (!wasOpen) {
    el.classList.add('is-open');
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
}

// ── IMAGE PROTECTION ──────────────────────────────────────
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('DOMContentLoaded', () => {
  // External-link hardening
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('referrerpolicy', 'no-referrer');
});

// PDF handling
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (!href.startsWith('http')) {
    link.setAttribute('download', '');
    link.setAttribute('type', 'application/pdf');
  }
});

// Image improvements
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
  img.setAttribute('decoding', 'async');
});

  // Asset hardening hints for local downloadable documents
  document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('http')) {
      link.setAttribute('download', '');
      link.setAttribute('type', 'application/pdf');
    }
  });

  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
    img.setAttribute('decoding', 'async');
    img.addEventListener('dragstart', e => e.preventDefault());
  });
});

// ── MOBILE MENU ───────────────────────────────────────────
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn   = document.getElementById('hamburger');
  if (!links || !btn) return;
  const isOpen = links.classList.toggle('is-open');
  btn.classList.toggle('is-open', isOpen);
  btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

function closeMenu() {
  const links = document.getElementById('nav-links');
  const btn   = document.getElementById('hamburger');
  if (!links || !btn) return;
  links.classList.remove('is-open');
  btn.classList.remove('is-open');
  btn.setAttribute('aria-label', 'Open menu');
}

// Close menu when clicking outside
document.addEventListener('click', e => {
  const navbar = document.getElementById('navbar');
  if (navbar && !navbar.contains(e.target)) closeMenu();
});


// ── COPY EMAIL ─────────────────────────────────────────
const copyBtn = document.getElementById('copy-email');

if (copyBtn) {
copyBtn.addEventListener('click', () => {
  const email = "jithinmachath@outlook.com";

  navigator.clipboard.writeText(email).then(() => {
    copyBtn.textContent = "✓";

    setTimeout(() => {
      copyBtn.textContent = "⧉";
    }, 1200);
  });
});
}
