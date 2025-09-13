// main.js (simple UX helpers)
document.addEventListener('DOMContentLoaded', function(){
  // Friendly form submit handler (progress UI) - unobtrusive
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e){
      // let Formspree handle submit naturally; we only show small UX
      const btn = form.querySelector('button[type="submit"]');
      if(btn){
        btn.disabled = true;
        const prev = btn.innerText;
        btn.innerText = 'Sending...';
        setTimeout(() => {
          btn.disabled = false;
          btn.innerText = prev;
        }, 2500);
      }
    });
  });

  // Small enhancement: show a toast after newsletter subscribe if redirected with ?sub=1
  if(location.search.includes('sub=1')){
    alert('Thanks for subscribing! Check your email for the guide.');
  }
});

// mobile nav toggle
const toggle = document.getElementById('mobile-nav-toggle');
if(toggle){
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}

