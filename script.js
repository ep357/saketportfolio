'use strict';

const projects = {
  writing: {
    category: 'PERSONAL WRITING · SUBSTACK',
    title: 'I Will Keep Trying',
    intro: 'A personal reflection on ambition, uncertainty, and the decision to keep going.',
    sections: [
      ['The piece', 'This essay explores the distance between what we want to achieve and what we do each day. Written as a journal-like reflection, it works through questions about discipline, self-doubt, and the difficulty of changing familiar patterns.'],
      ['My practice', 'Writing gives me a way to slow down and make sense of my thoughts. My Substack is a space to develop an honest voice and a more consistent habit of reflection.'],
      ['What it explores', ['Ambition and everyday action', 'Personal reflection and emotional honesty', 'Persistence when progress feels uncertain']]
    ],
    url: 'https://saketvedantam.substack.com/p/45178848-690a-49bd-8d4c-22d7385c13b1',
    link: 'Read the full essay'
  },
  video: {
    category: 'VISUAL STORYTELLING · INSTAGRAM',
    title: 'Stories in Motion',
    intro: 'An ongoing practice in telling small stories through footage, pacing, and sound.',
    sections: [
      ['The work', 'I plan, script, and edit short-form videos for Instagram. This is a place to try ideas, pay attention to everyday moments, and build my visual storytelling skills through hands-on work.'],
      ['My process', 'I use Adobe Premiere Pro to shape raw footage and audio into a cohesive edit. I pay attention to how a video opens, the rhythm of the sequence, and whether the story feels clear.'],
      ['What I’m practising', ['Scripting and visual hooks', 'Pacing, sequencing, and audio', 'End-to-end editing in Adobe Premiere Pro']]
    ],
    url: 'https://www.instagram.com/saket_vedantam/',
    link: 'Explore my Instagram'
  },
  research: {
    category: 'COMMUNICATION RESEARCH · GROUP PROJECT',
    title: 'From Creator to Entrepreneur',
    intro: 'How did Varun Mayya’s communication evolve alongside his professional identity?',
    sections: [
      ['The question', 'This collaborative academic project examined nearly eight years of Varun Mayya’s public communication, tracing how his speech patterns and rhetorical choices changed as his career progressed from content creation toward entrepreneurship.'],
      ['My contribution', 'I carried out the rhetorical analysis and examined the evolution of his speech. I explored changes in language, delivery, and persuasive techniques, considering how they developed alongside his professional identity.'],
      ['The analytical lens', ['Ethos: how he establishes credibility and authority', 'Pathos: how stories and emotion build a connection', 'Logos: how reasoning and structured arguments persuade', 'Communication style across YouTube, podcasts, and social media']],
      ['A collaborative effort', 'Created as part of a six-member team at TAPMI Bengaluru. My contribution focused on rhetorical analysis and the study of communication over time.']
    ],
    url: 'https://canva.link/m94r0w8w0emmzrd',
    link: 'View the group presentation'
  }
};

const growth = {
  writing: { kicker: 'WORDS INTO UNDERSTANDING', title: 'Writing to figure things out.', description: 'I use long-form writing to untangle observations and give ideas a clearer shape. My Substack is an ongoing practice in honesty, structure, and finding a voice that feels like my own.', skills: ['Personal essays', 'Structured thinking', 'Audience awareness'] },
  video: { kicker: 'AN IDEA, ONE FRAME AT A TIME', title: 'Making room for a story.', description: 'From a first hook to the final cut, I’m learning how timing changes what a viewer feels. I work in Adobe Premiere Pro, experimenting with sequencing, sound, and the little choices that make an edit feel cohesive.', skills: ['Adobe Premiere Pro', 'Short-form video', 'Pacing & sound'] },
  people: { kicker: 'BETTER QUESTIONS. SHARED PROGRESS.', title: 'Listening before leading.', description: 'I gravitate toward helping peers work through roadblocks. I’m developing my ability to listen, negotiate calmly, and find common ground—while seeking collaborative projects where those skills can grow through practice.', skills: ['Active listening', 'Peer problem-solving', 'Negotiation', 'Collaboration'] }
};

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
function closeMenu() { menuToggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { closeMenu(); menuToggle.focus(); } });
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => { const show = selected === 'all' || card.dataset.category === selected; card.hidden = !show; if (show) { count++; card.classList.add('in-view'); } });
  document.querySelector('#project-count').textContent = String(count);
  document.querySelector('.work-count').lastChild.textContent = count === 1 ? ' thing I’m proud to share' : ' things I’m proud to share';
}));

const dialog = document.querySelector('#project-dialog');
let lastProjectTrigger;
function appendSection(heading, content) {
  const h = document.createElement('h3'); h.textContent = heading;
  const element = document.createElement(Array.isArray(content) ? 'ul' : 'p');
  if (Array.isArray(content)) content.forEach(text => { const li = document.createElement('li'); li.textContent = text; element.append(li); });
  else element.textContent = content;
  document.querySelector('#dialog-body').append(h, element);
}
document.querySelectorAll('[data-project]').forEach(trigger => trigger.addEventListener('click', () => {
  const project = projects[trigger.dataset.project]; if (!project) return;
  lastProjectTrigger = trigger;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  document.querySelector('#dialog-body').replaceChildren();
  project.sections.forEach(([heading, content]) => appendSection(heading, content));
  if (project.note) { const note = document.createElement('p'); note.className = 'dialog-note'; note.textContent = project.note; document.querySelector('#dialog-body').append(note); }
  const link = document.querySelector('#dialog-link'); link.href = project.url; link.textContent = project.link;
  dialog.showModal(); document.body.classList.add('dialog-open'); dialog.scrollTop = 0;
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastProjectTrigger?.focus({ preventScroll: true }); });

const growthTabs = [...document.querySelectorAll('[data-growth]')];
function selectGrowth(tab) {
  const item = growth[tab.dataset.growth];
  growthTabs.forEach(button => { const selected = button === tab; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; button.querySelector('.tab-plus').textContent = selected ? '−' : '+'; });
  const panel = document.querySelector('#growth-panel'); panel.dataset.active = tab.dataset.growth; panel.setAttribute('aria-labelledby', tab.id);
  document.querySelector('#growth-kicker').textContent = item.kicker;
  document.querySelector('#growth-title').textContent = item.title;
  document.querySelector('#growth-description').textContent = item.description;
  document.querySelector('#growth-skills').replaceChildren(...item.skills.map(skill => { const chip = document.createElement('span'); chip.textContent = skill; return chip; }));
}
growthTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectGrowth(tab));
  tab.addEventListener('keydown', event => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']; if (!keys.includes(event.key)) return;
    event.preventDefault(); let next = index;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = growthTabs.length - 1;
    else next = (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + growthTabs.length) % growthTabs.length;
    growthTabs[next].focus(); selectGrowth(growthTabs[next]);
  });
});

let toastTimer;
function toast(message) { const element = document.querySelector('.toast'); element.textContent = message; element.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('visible'), 3500); }
document.querySelector('#copy-email').addEventListener('click', async () => {
  const email = 'saketvedantam007@gmail.com';
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
    else { const textarea = document.createElement('textarea'); textarea.value = email; textarea.style.cssText = 'position:fixed;left:-9999px'; document.body.append(textarea); textarea.select(); const copied = document.execCommand('copy'); textarea.remove(); if (!copied) throw new Error('Clipboard unavailable'); }
    toast('Email copied. Good things start somewhere.');
  } catch { toast('Copy this address: ' + email); }
});

document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-ready');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } }), { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) nav.querySelectorAll('a').forEach(link => { if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-10% 0px -60% 0px' });
  document.querySelectorAll('#work, #about, #contact').forEach(section => sectionObserver.observe(section));
}
let ticking = false;
function updateProgress() { const total = document.documentElement.scrollHeight - window.innerHeight; document.querySelector('.reading-progress').style.width = (total > 0 ? Math.min(100, window.scrollY / total * 100) : 0) + '%'; ticking = false; }
window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
window.addEventListener('resize', updateProgress); updateProgress();
