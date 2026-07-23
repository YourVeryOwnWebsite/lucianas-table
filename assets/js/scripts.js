// Luciana's Table — scripts.js
// Motion level: static — minimal JS for mobile nav toggle only.
// No animation or scroll libraries used.

(function () {
  'use strict';

  // Mobile navigation toggle
  var toggleBtn = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', function () {
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      if (isExpanded) {
        mobileNav.setAttribute('hidden', '');
      } else {
        mobileNav.removeAttribute('hidden');
      }
    });

    // Close mobile nav when a link inside it is clicked
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.setAttribute('hidden', '');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

}());