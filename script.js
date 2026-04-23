// --- FADE UP ON SCROLL ---
const fadeEls = document.querySelectorAll(
  '.hero-content, .hero-visual, .stat, .problem-card, .solution-item, .feature-card, .sport-item, .origin-text, .origin-stat, .contact-form'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// --- COUNT UP STATS ---
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-number[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      countUp(entry.target, target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

// --- FORM SUBMIT ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const data = new FormData(contactForm);
      const res  = await fetch('contact.php', { method: 'POST', body: data });
      const json = await res.json();

      if (json.success) {
        btn.textContent = 'Message envoyé ✓';
        btn.style.background = '#10b981';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Erreur — réessayez';
      btn.style.background = '#e8384a';
      btn.disabled = false;
    }
  });
}

// --- NAV ACTIVE ON SCROLL ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.borderBottomColor = window.scrollY > 10 ? '#1e1e22' : 'transparent';
});
