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
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message envoyé ✓';
  btn.style.background = '#10b981';
  btn.disabled = true;
}

// --- NAV ACTIVE ON SCROLL ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.borderBottomColor = window.scrollY > 10 ? '#1e1e22' : 'transparent';
});
