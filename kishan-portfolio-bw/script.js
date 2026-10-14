/* =========================================================
   Portfolio scripts
   ========================================================= */
document.documentElement.classList.add('js');

/* ---------- Project details (edit text and images here) ---------- */
const projects = {
  raj: {
    title: 'Raj Mobile Hub',
    tag: 'Client project',
    img: 'https://picsum.photos/seed/raj-mobile/1200/675',   // CHANGE: your project image
    brief: 'Branding-focused visual materials for a retail mobile shop.',
    approach: 'Used consistent colours, typography and layout across the promotional designs, with product visibility and a clear information hierarchy as the priority.',
    tools: 'Photoshop, Illustrator'                              // CHANGE: tools you actually used
  },
  grocery: {
    title: 'Shree Khatushyam Grocery Mart',
    tag: 'Shop branding',
    img: 'https://picsum.photos/seed/grocery-mart/1200/675',
    brief: 'A branding concept to support a recognisable shop identity.',
    approach: 'Explored colour palettes, typography and layout options, and considered how the visual style could extend to shop promotions.',
    tools: 'Illustrator, Photoshop'
  },
  whisky: {
    title: '100 Pipers Whisky',
    tag: 'Concept project',
    img: 'https://picsum.photos/seed/whisky-brand/1200/675',
    brief: 'A self-initiated branding concept. This is concept work only, not commercial client work.',
    approach: 'Explored a premium visual direction through typography, colour and composition, focused on a cohesive brand presentation and a consistent visual mood.',
    tools: 'Photoshop, Illustrator, InDesign'
  },
  uiux: {
    title: 'UI/UX project',
    tag: 'UI/UX',
    img: 'https://picsum.photos/seed/uiux-screens/1200/675',
    // TODO: replace this text with your real UI/UX project (app or website screens)
    brief: 'Add the problem this app or website solves and who it is for.',
    approach: 'Describe your steps: research, wireframes, visual design and what you improved after feedback.',
    tools: 'Figma'
  }
};

/* ---------- Mobile menu ---------- */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

function setMenu(open) {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });

/* ---------- Highlight the nav link of the section on screen ---------- */
const navAnchors = [...links.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

navAnchors.forEach(a => {
  const section = document.querySelector(a.getAttribute('href'));
  if (section) sectionObserver.observe(section);
});

/* ---------- Project cards: reveal once, open popup on click ---------- */
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach((card, i) => {
  card.style.transitionDelay = (i % 2) * 80 + 'ms';
  cardObserver.observe(card);
});

const modal = document.getElementById('modal');
const el = id => document.getElementById(id);

cards.forEach(card => {
  card.addEventListener('click', () => {
    const p = projects[card.dataset.project];
    if (!p) return;
    el('modalImg').src = p.img;
    el('modalImg').alt = p.title;
    el('modalTitle').textContent = p.title;
    el('modalTag').textContent = p.tag;
    el('modalBrief').textContent = p.brief;
    el('modalApproach').textContent = p.approach;
    el('modalTools').textContent = p.tools;
    modal.showModal();
  });
});

el('modalClose').addEventListener('click', () => modal.close());
// Close when the dark area outside the popup is clicked
modal.addEventListener('click', e => {
  const r = modal.getBoundingClientRect();
  const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  if (outside) modal.close();
});

/* ---------- Contact form: opens the visitor's email app ---------- */
const form   = el('contactForm');
const status = el('formStatus');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  status.className = 'form__status';
  if (!name || !email || !message) {
    status.textContent = 'Fill in your name, email and message.';
    status.classList.add('error');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    status.textContent = 'Enter a valid email address.';
    status.classList.add('error');
    return;
  }

  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:kmadheshiya278@gmail.com?subject=' + subject + '&body=' + body;
  status.textContent = 'Opening your email app to send the message.';
  status.classList.add('ok');
});

/* ---------- Footer year ---------- */
el('year').textContent = new Date().getFullYear();
