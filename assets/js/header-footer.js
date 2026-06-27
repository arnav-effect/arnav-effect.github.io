// header-footer.js
(function () {
  const headerHTML = `
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand">
        <div class="avatar-placeholder"></div>
        <span class="brand-name">Arnav Mishra</span>
      </a>

      <div class="nav-actions">
        <nav class="main-nav" id="primary-navigation" aria-label="Primary navigation">
          <a href="about.html">About</a>
          <a href="ventures.html">Ventures</a>
          <a href="projects.html">Projects</a>
          <a href="contact.html">Contact</a>
          <a href="contact.html" class="cta">Collaborate</a>
        </nav>
        <button id="mobile-nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded="false"
          aria-label="Open navigation menu">☰</button>
      </div>
    </div>
  </header>
  `;

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="col about">
        <strong>Arnav Mishra</strong>
        <p>Entrepreneur<br>
           Building Undefeatables & Veleriox Productions<br>
           Shipping web & digital products<br>
           15 | Tech × Business × Execution</p>
      </div>
      <div class="col links">
        <a href="/legal.html">Privacy</a>
      </div>
      <div class="col contact">
        <a href="mailto:acromatic121@gmail.com">acromatic121@gmail.com</a>
        <div style="margin-top:0.5rem">
          <a href="https://instagram.com/arnav.effect" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a> •
          <a href="https://x.com/Arnav_Mishra11" target="_blank" rel="noopener noreferrer" aria-label="X">X (Twitter)</a> •
          <a href="https://github.com/its-acromatic" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a> •
          <a href="https://discord.com/users/1276765112014999557" target="_blank" rel="noopener noreferrer" aria-label="Discord">Discord</a> •
          <a href="https://www.linkedin.com/in/arnav-effect/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <small style="color: grey">© ${new Date().getFullYear()} Arnav Mishra — All rights reserved.</small>
    </div>
  </footer>
  `;

  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = html;
    } else {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      document.body.insertBefore(tmp, document.body.firstChild);
    }
  }

  function closeMobileNav(toggle) {
    document.body.classList.remove('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    inject('site-header', headerHTML);
    inject('site-footer', footerHTML);

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
      langSelect.addEventListener('change', function () {
        document.documentElement.lang = this.value === 'hi' ? 'hi' : 'en';
      });
    }

    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('primary-navigation');

    if (toggle && nav) {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      nav.querySelectorAll('a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }

        link.addEventListener('click', function () {
          if (document.body.classList.contains('nav-open')) {
            closeMobileNav(toggle);
          }
        });
      });

      toggle.addEventListener('click', function () {
        const isOpen = document.body.classList.toggle('nav-open');
        this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        this.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
          closeMobileNav(toggle);
        }
      });
    }
  });
})();
