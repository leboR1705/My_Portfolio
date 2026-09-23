/* ============================================================
   THEME
   ============================================================ */
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme');
  if(saved) root.setAttribute('data-theme', saved);
  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('portfolio-theme', next); }catch(e){}
  });
})();

/* ============================================================
   MOBILE NAV
   ============================================================ */
(function(){
  const burger = document.getElementById('navBurger');
  const panel = document.getElementById('mobilePanel');
  burger.addEventListener('click', () => panel.classList.toggle('open'));
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('open')));
})();

/* ============================================================
   SCROLLSPY
   ============================================================ */
(function(){
  const links = document.querySelectorAll('.nav-links a');
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => s && io.observe(s));
})();

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   PROJECT DATA
   To add a project, copy an object below and edit the fields.
   ============================================================ */
const PROJECTS = [
  {
    title: "Campus-Based OJT Monitoring System",
    description: "A campus deployment system integrating facial recognition for attendance and time tracking, with narrative reporting for OJT students. Reduces manual logging and gives coordinators a real-time view of trainee attendance.",
    tag: "Featured",
    role: "[Your role, e.g. Full-stack developer]",
    tech: ["Python", "Django", "PostgreSQL", "OpenCV"],
    liveUrl: "",
    githubUrl: "",
    featured: true
  },
  {
    title: "[Project Title]",
    description: "[Short description of what the project does and the problem it solves.]",
    tag: "Coursework",
    role: "[Your role]",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "",
    featured: false
  },
  {
    title: "[Project Title]",
    description: "[Short description of what the project does and the problem it solves.]",
    tag: "Personal",
    role: "[Your role]",
    tech: ["Python", "C++"],
    liveUrl: "",
    githubUrl: "",
    featured: false
  }
];

function renderProjects(){
  const grid = document.getElementById('projectGrid');
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card ${p.featured ? 'featured' : ''}">
      <div class="project-media">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      </div>
      <div class="project-body">
        <span class="project-tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p class="desc">${p.description}</p>
        <div class="project-meta"><span><strong>Role:</strong> ${p.role}</span></div>
        <div class="tech-row">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
        <div class="project-actions">
          <a class="btn btn-primary btn-sm" href="${p.liveUrl || '#'}" ${p.liveUrl ? 'target="_blank" rel="noopener"' : ''}>View project</a>
          ${p.githubUrl ? `<a class="btn btn-ghost btn-sm" href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>` : `<span class="btn btn-ghost btn-sm" style="opacity:.5; cursor:not-allowed;">GitHub — add link</span>`}
        </div>
      </div>
    </article>
  `).join('');
}
renderProjects();

/* ============================================================
   CERTIFICATE DATA
   To add a certificate, copy an object below and edit the fields.
   Leave verificationUrl as the example.com placeholder until you
   have the real official verification link — do not invent one.
   ============================================================ */
const CERTIFICATES = [
  {
    title: "Security, Compliance, and Identity Fundamentals",
    issuer: "Microsoft",
    date: "2026-09-01",
    certificateNumber: "[INSERT CERTIFICATE NUMBER]",
    verificationUrl: "https://example.com/verify/CERTIFICATE-ID",
    certificateFile: "certificates/certificate-01.pdf"
  },
  {
    title: "[Certificate Title]",
    issuer: "[Issuing Organization]",
    date: "2026-01-01",
    certificateNumber: "[INSERT CERTIFICATE NUMBER]",
    verificationUrl: "https://example.com/verify/CERTIFICATE-ID",
    certificateFile: "certificates/certificate-02.pdf"
  },
  {
    title: "[Certificate Title]",
    issuer: "[Issuing Organization]",
    date: "2025-11-01",
    certificateNumber: "[INSERT CERTIFICATE NUMBER]",
    verificationUrl: "https://example.com/verify/CERTIFICATE-ID",
    certificateFile: "certificates/certificate-03.pdf"
  }
];

function fmtDate(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year:'numeric', month:'long' });
}

function populateOrgFilter(){
  const sel = document.getElementById('certOrgFilter');
  const orgs = [...new Set(CERTIFICATES.map(c => c.issuer))].sort();
  orgs.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o; opt.textContent = o;
    sel.appendChild(opt);
  });
}

function renderCertificates(){
  const grid = document.getElementById('certGrid');
  const count = document.getElementById('certCount');
  const q = document.getElementById('certSearch').value.trim().toLowerCase();
  const org = document.getElementById('certOrgFilter').value;
  const sort = document.getElementById('certSort').value;

  let list = CERTIFICATES.filter(c => {
    const matchesQ = !q || c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q);
    const matchesOrg = org === 'all' || c.issuer === org;
    return matchesQ && matchesOrg;
  });

  list.sort((a,b) => {
    if(sort === 'date-desc') return new Date(b.date) - new Date(a.date);
    if(sort === 'date-asc') return new Date(a.date) - new Date(b.date);
    if(sort === 'title-asc') return a.title.localeCompare(b.title);
    return 0;
  });

  count.textContent = `${list.length} of ${CERTIFICATES.length}`;

  if(list.length === 0){
    grid.innerHTML = `<div class="cert-empty">No certificates match your search or filter.</div>`;
    return;
  }

  grid.innerHTML = list.map(c => {
    const isPlaceholder = c.certificateNumber.includes('[') || c.verificationUrl.includes('example.com');
    return `
    <article class="cert-card">
      <div class="cert-thumb">
        <span class="cert-org-badge">${c.issuer}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z"/></svg>
      </div>
      <div class="cert-body">
        <h3>${c.title}</h3>
        <span class="cert-issuer">${c.issuer}</span>
        <div class="cert-meta-row"><span>${fmtDate(c.date)}</span></div>
        <span class="cert-num">No. ${c.certificateNumber}</span>
        ${isPlaceholder ? '<span class="placeholder-flag">placeholder — replace before publishing</span>' : ''}
        <div class="cert-actions">
          <a class="btn btn-primary btn-sm" href="${c.verificationUrl}" target="_blank" rel="noopener">Verify</a>
          <a class="btn btn-ghost btn-sm" href="${c.certificateFile}" target="_blank" rel="noopener">View</a>
        </div>
      </div>
    </article>
  `}).join('');
}

populateOrgFilter();
renderCertificates();
document.getElementById('certSearch').addEventListener('input', renderCertificates);
document.getElementById('certOrgFilter').addEventListener('change', renderCertificates);
document.getElementById('certSort').addEventListener('change', renderCertificates);
