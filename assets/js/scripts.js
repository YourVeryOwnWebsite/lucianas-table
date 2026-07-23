/* ============================================================
   LUCIANA'S TABLE — scripts.js
   Motion level: subtle
   Vanilla JS only — no external libraries
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. NAV: add .scrolled class on scroll, hamburger toggle
  ---------------------------------------------------------- */
  const header  = document.querySelector('.site-header');
  const toggle  = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Scrolled state
  function updateNavScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });
  updateNavScroll(); // run once on load

  // Hamburger open/close
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }


  /* ----------------------------------------------------------
     2. FADE-IN ON SCROLL — IntersectionObserver
  ---------------------------------------------------------- */
  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px'
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // If reduced motion or no IntersectionObserver — make all visible immediately
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ----------------------------------------------------------
     3. FOOTER YEAR — auto-update copyright year
  ---------------------------------------------------------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ----------------------------------------------------------
     4. RESERVATION FORM — basic client-side feedback
  ---------------------------------------------------------- */
  var form = document.querySelector('.reserve-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name  = form.querySelector('#res-name').value.trim();
      var email = form.querySelector('#res-email').value.trim();
      var party = form.querySelector('#res-party').value;
      var date  = form.querySelector('#res-date').value;
      var time  = form.querySelector('#res-time').value;

      if (!name || !email || !party || !date || !time) {
        alert('Please fill in all required fields to complete your reservation request.');
        return;
      }

      // Replace form with a thank-you message
      var thankYou = document.createElement('div');
      thankYou.setAttribute('role', 'status');
      thankYou.setAttribute('aria-live', 'polite');
      thankYou.style.textAlign = 'center';
      thankYou.style.padding   = '2rem';
      thankYou.innerHTML =
        '<p style="font-family:var(--font-serif);font-size:1.5rem;font-style:italic;color:var(--forest);margin-bottom:0.75rem;">Grazie, ' + escapeHtml(name) + '!</p>' +
        '<p style="color:var(--ink-muted);line-height:1.8;">Your reservation request has been received. We\'ll confirm your table for <strong>' + escapeHtml(party) + '</strong> on <strong>' + escapeHtml(formatDate(date)) + '</strong> at <strong>' + escapeHtml(time) + '</strong> via email shortly.</p>' +
        '<p style="margin-top:1rem;color:var(--ink-muted);">Questions? Call us at <a href="tel:+15032550412" style="color:var(--amber);font-weight:600;">(503) 255-0412</a>.</p>';

      form.replaceWith(thankYou);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(dateStr) {
    if (!dateStr) return dateStr;
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    var months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10) - 1;
    var d = parseInt(parts[2], 10);
    return months[m] + ' ' + d + ', ' + y;
  }

})();