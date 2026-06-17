const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observer.observe(sec));

const style = document.createElement('style');
style.textContent = `nav ul a.active { color: var(--text) !important; }`;
document.head.appendChild(style);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-group, .about-grid').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

const form = document.querySelector('.contact-form');
const btn = form?.querySelector('button');
if (btn) {
  btn.addEventListener('click', () => {
    const name = form.querySelector('input[type=text]').value;
    const email = form.querySelector('input[type=email]').value;
    const msg = form.querySelector('textarea').value;
    if (!name || !email || !msg) {
      btn.textContent = 'Fill all fields!';
      btn.style.background = '#e74c3c';
      setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 2000);
      return;
    }
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 3000);
  });
}

const heroAccent = document.querySelector('.hero h1 .accent');
if (heroAccent) {
  const words = ['the web.', 'humans.', 'the future.'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    heroAccent.style.opacity = '0';
    setTimeout(() => {
      heroAccent.textContent = words[i];
      heroAccent.style.opacity = '1';
    }, 300);
    heroAccent.style.transition = 'opacity 0.3s';
  }, 3000);
}
