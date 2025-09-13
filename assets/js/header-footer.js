// header-footer.js
(function(){
  const headerHTML = `
  <header class="site-header">
  <div class="header-inner">
    <a href="/" class="brand">
      <div class="avatar-placeholder"></div>
      <span class="brand-name">Arnav Mishra</span>
    </a>

    <div class="nav-actions">
      <nav class="main-nav">
        <a href="about.html">About</a>
        <a href="ventures.html">Ventures</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
        <a href="contact.html" class="cta">Work with Me</a>
      </nav>
      <button id="mobile-nav-toggle">☰</button>
    </div>
  </div>
</header>
  `;

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="col about">
        <strong>Arnav Mishra</strong>
        <p>Founder: Undefeatables — creator-first learning & practical projects.</p>
      </div>
      <div class="col links">
        <a href="/legal.html">Privacy</a>
      </div>
      <div class="col contact">
        <a href="mailto:acromatic121@gmail.com">acromatic121@gmail.com</a>
        <div style="margin-top:0.5rem">
          <a href="https://instagram.com/arnav_effect" aria-label="Instagram">Instagram</a> •
          <a href="https://x.com/Arnav_Mishra11" aria-label="X">X (Twitter)</a> •
          <a href="https://discord.com/users/1276765112014999557" aria-label="Discord">Discord</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <small style="color: grey">© ${new Date().getFullYear()} Arnav — All rights reserved.</small>
    </div>
  </footer>
  `;

  function inject(id, html){
    const el = document.getElementById(id);
    if(el) el.innerHTML = html;
    else {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      document.body.insertBefore(tmp, document.body.firstChild);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    inject('site-header', headerHTML);
    inject('site-footer', footerHTML);

    const langSelect = document.getElementById('langSelect');
    if(langSelect){
      langSelect.addEventListener('change', function(){
        // Simple swap — site is English-first but footer dropdown toggles 'lang' attribute
        document.documentElement.lang = this.value === 'hi' ? 'hi' : 'en';
        // You can expand this to toggle microcopy later.
      });
    }

    const toggle = document.getElementById('mobile-nav-toggle');
    if(toggle){
      toggle.addEventListener('click', function(){
        const nav = document.querySelector('.main-nav');
        if(!nav) return;
        const open = nav.style.display === 'flex';
        nav.style.display = open ? 'none' : 'flex';
        this.setAttribute('aria-expanded', open ? 'false' : 'true');
      });

      // Hide nav on small by default
      if(window.innerWidth < 900){
        const nav = document.querySelector('.main-nav');
        if(nav) nav.style.display = 'none';
      }
    }
  });
})();

