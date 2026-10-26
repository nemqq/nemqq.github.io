(() => {
  'use strict';
  const config = window.SITE_CONFIG;
  if (!config) return;
  const profile = config.profile;
  const $ = (selector) => document.querySelector(selector);
  const put = (selector, value) => { const target = $(selector); if (target) target.textContent = value || ''; };
  const icons = {
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
    workflow: '<rect x="2" y="8" width="6" height="8" rx="1.5"/><rect x="16" y="2" width="6" height="6" rx="1.5"/><rect x="16" y="16" width="6" height="6" rx="1.5"/><path d="M8 12h3a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h1M11 12a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1"/>',
    github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.7-1.6 6.7-7.3A5.7 5.7 0 0 0 19.2 4a5.3 5.3 0 0 0-.1-4s-1.3-.4-4.2 1.6a14.5 14.5 0 0 0-7.8 0C4.2-.4 2.9 0 2.9 0A5.3 5.3 0 0 0 2.8 4a5.7 5.7 0 0 0-1.5 4c0 5.7 3.4 6.9 6.7 7.3A3.5 3.5 0 0 0 7 18v4" transform="translate(1 1) scale(.9)"/>',
    linkedin: '<rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7m0-11v.5M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/>'
  };
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.5');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true'); svg.innerHTML = icons[name] || icons.link;
    return svg;
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  // Only web URLs and project-relative files are accepted from configuration.
  function safeUrl(value, local = false) {
    if (typeof value !== 'string' || !value.trim()) return '';
    const url = value.trim();
    if (/^https?:\/\//i.test(url)) return url;
    if (local && !/^[a-z][a-z\d+.-]*:/i.test(url) && !url.startsWith('//') && !url.includes('\\')) return url;
    return '';
  }
  function externalLink(label, url, className) {
    const a = element('a', className, label); a.href = url;
    a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
  }
  function tags(values) {
    const wrapper = element('div', 'tags');
    (values || []).forEach(value => wrapper.append(element('span', 'tag', value)));
    return wrapper;
  }

  const displayName = profile.name || profile.role;
  document.title = `${displayName} — Embedded & DevOps`;
  $('meta[property="og:title"]').content = document.title;
  put('#hero-role', profile.name ? `${profile.name} / ${profile.role}`.toUpperCase() : profile.role.toUpperCase());
  put('#hero-contract', profile.collaboration);
  const heading = $('#hero-title'); heading.replaceChildren();
  (profile.headline || []).forEach((line, i) => heading.append(element('span', i ? 'accent-text' : '', line)));
  put('#hero-intro', profile.introduction); put('#availability', profile.availability);
  put('#about-text', profile.about); put('#profile-role', profile.role);
  put('#profile-contract', `Współpraca ${profile.collaboration}`);
  if (profile.location) { $('#location-row').hidden = false; put('#profile-location', profile.location); }
  const cvUrl = safeUrl(config.cvUrl, true);
  if (cvUrl) { const a = $('#cv-link'); a.hidden = false; a.href = cvUrl; a.target = '_blank'; a.rel = 'noopener'; }
  Object.entries(config.sections || {}).forEach(([section, enabled]) => {
    if (enabled !== false) return;
    const target = document.querySelector(`[data-section="${section}"]`);
    if (target) target.hidden = true;
    document.querySelectorAll(`[data-nav="${section}"]`).forEach(a => { a.hidden = true; });
  });
  (config.expertise || []).forEach(item => {
    const card = element('article', 'expertise-card');
    const top = element('div', 'expertise-card-top');
    const symbol = element('div', 'expertise-icon'); symbol.append(icon(item.icon));
    top.append(symbol, element('span', 'expertise-number', `/${item.number}`));
    card.append(top, element('h3', '', item.title), element('p', 'expertise-subtitle', item.subtitle), element('p', 'expertise-description', item.description), tags(item.technologies));
    $('#expertise-list').append(card);
  });

  const projectArt = {
    embedded: '<div class="art-chip">C++</div>',
    pipeline: '<div class="art-pipeline"><i>⌘</i><span>→</span><i>✓</i><span>→</span><i>↗</i></div>',
    python: '<div class="art-code"><b>def</b> automate():<br>&nbsp; <span># less repetition</span><br>&nbsp; <b>return</b> more_time</div>'
  };
  const projects = (config.projects || []).filter(item => item.visible !== false);
  const actualProjects = projects.filter(item => !item.placeholder);
  $('#project-count').hidden = actualProjects.length === 0;
  put('#project-count', `${String(actualProjects.length).padStart(2, '0')} realizacji`);
  $('#projects-note').hidden = actualProjects.length > 0;
  projects.forEach(project => {
    const card = element('article', 'project-card');
    const visualType = Object.hasOwn(projectArt, project.visual) ? project.visual : 'embedded';
    const visual = element('div', `project-visual visual-${visualType}`);
    const art = element('div', 'project-art'); art.setAttribute('aria-hidden', 'true'); art.innerHTML = projectArt[visualType];
    const imageUrl = safeUrl(project.image, true);
    if (imageUrl) {
      const image = document.createElement('img'); image.src = imageUrl; image.alt = project.imageAlt || `Podgląd projektu ${project.title}`;
      image.loading = 'lazy'; image.width = 600; image.height = 330;
      image.addEventListener('error', () => { image.remove(); visual.append(art); }, { once: true });
      visual.append(image);
    } else visual.append(art);
    if (project.placeholder) visual.append(element('span', 'project-placeholder-badge', 'MIEJSCE NA PROJEKT'));
    const content = element('div', 'project-body');
    content.append(element('p', 'project-category', project.category), element('h3', '', project.title), element('p', 'project-description', project.description), tags(project.technologies));
    const links = element('div', 'project-links');
    const liveUrl = safeUrl(project.url); const repoUrl = safeUrl(project.repository);
    if (liveUrl) links.append(externalLink('Zobacz projekt ↗', liveUrl));
    if (repoUrl) links.append(externalLink('Kod źródłowy ↗', repoUrl));
    if (links.children.length) content.append(links);
    card.append(visual, content); $('#projects-grid').append(card);
  });
  if (!projects.length) $('#projects-grid').append(element('p', 'empty-projects', 'Pierwsze projekty pojawią się wkrótce.'));

  put('#contact-title', profile.contactTitle); put('#contact-text', profile.contactText);
  put('#contact-email', profile.email); $('#contact-email').href = `mailto:${profile.email}`;
  let copyTimer;
  $('.copy-email').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(profile.email);
      put('.copy-status', 'Adres skopiowany');
    } catch {
      const selection = window.getSelection(); const range = document.createRange();
      range.selectNodeContents($('#contact-email')); selection.removeAllRanges(); selection.addRange(range);
      put('.copy-status', 'Zaznaczono adres — skopiuj go ręcznie.');
    }
    clearTimeout(copyTimer); copyTimer = setTimeout(() => put('.copy-status', ''), 6000);
  });
  (config.socials || []).forEach(social => {
    const url = safeUrl(social.url);
    const node = url ? externalLink('', url, 'social-link') : element('span', 'social-link social-unavailable');
    node.append(icon(social.icon), element('span', '', social.label));
    if (url) node.append(element('span', '', '↗'));
    else node.append(element('small', '', 'wkrótce'));
    $('#contact-socials').append(node);
  });
  put('#footer-credit', `© ${new Date().getFullYear()} ${displayName} · Embedded & DevOps`);

  const toggle = $('.menu-toggle'); const nav = $('#main-nav');
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Otwórz menu'); nav.classList.remove('is-open'); }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu'); nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 561px)').addEventListener('change', closeMenu);
})();
