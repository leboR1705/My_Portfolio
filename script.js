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
    image: "images/projects/ojt-monitoring-system.jpg",
    images: [
      "images/projects/06dad032-b019-4c33-8e43-e5b5fcda9f1c.jfif",
      "images/projects/68ac98ef-6d4a-4043-978c-e1692da3a19f.jfif",
      "images/projects/74e509bf-6ebc-42c1-bf20-17037e1256ab.jfif"
    ],
    role: "Project Leader, Collaborator",
    tech: ["Python", "Django", "MySQL", "OpenCV"],
    liveUrl: "",
    githubUrl: "https://github.com/manarangrhomar-creator/OJT-MONITORING",
    featured: false
  },
  {
    title: "[Project Title]",
    description: "[Short description of what the project does and the problem it solves.]",
    role: "[Your role]",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "",
    featured: false
  },
  {
    title: "[Project Title]",
    description: "[Short description of what the project does and the problem it solves.]",
    image: "images/projects/e9993b02-86d7-4a87-9773-d7aa1af0bd04.jfif",
    images: [
      "images/projects/04975ac7-fd9f-412b-8e29-7f7697813d79.jfif",
      "images/projects/73693e9a-d084-4b12-b943-75f406487ee7.jfif"
    ],
    role: "[Your role]",
    tech: ["Python", "C++"],
    liveUrl: "",
    githubUrl: "",
    featured: false
  }
];

function renderProjects(){
  const grid = document.getElementById('projectGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card ${p.featured ? 'featured' : ''}">
      <div class="project-media">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title} logo">`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`}
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p class="desc">${p.description}</p>
        <div class="project-meta"><span><strong>Role:</strong> ${p.role}</span></div>
        <div class="tech-row">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
        <div class="project-actions">
          ${(p.images && p.images.length)
            ? `<button type="button" class="btn btn-primary btn-sm" data-view-project="${i}">View project</button>`
            : `<a class="btn btn-primary btn-sm" href="${p.liveUrl || '#'}" ${p.liveUrl ? 'target="_blank" rel="noopener"' : ''}>View project</a>`}
          ${p.githubUrl ? `<a class="btn btn-ghost btn-sm" href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>` : `<span class="btn btn-ghost btn-sm" style="opacity:.5; cursor:not-allowed;">GitHub — add link</span>`}
        </div>
      </div>
    </article>
  `).join('');
}
renderProjects();

/* ============================================================
   PROJECT GALLERY MODAL
   ============================================================ */
(function(){
  const modal = document.getElementById('projectModal');
  const title = document.getElementById('projectModalTitle');
  const gallery = document.getElementById('projectGallery');

  function open(p){
    title.textContent = p.title;
    gallery.innerHTML = p.images.map(src =>
      `<img src="${src}" alt="${p.title} screenshot">`
    ).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    gallery.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.getElementById('projectGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view-project]');
    if(btn) open(PROJECTS[+btn.dataset.viewProject]);
  });
  modal.addEventListener('click', (e) => {
    if(e.target.hasAttribute('data-close') || e.target.closest('.lightbox-close')) close();
  });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();

/* ============================================================
   CERTIFICATE DATA
   To add a certificate, copy an object below and edit the fields.
   Leave verificationUrl as the example.com placeholder until you
   have the real official verification link — do not invent one.
   ============================================================ */
const CERTIFICATES = [
  {
    title: "Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals",
    issuer: "TESDA",
    date: "2026-08-30",
    certificateNumber: "ktJqUHixO0",
    verificationUrl: "https://tesda.gov.ph/Rwac",
    certificateFile: "certificates/Certificate_of_Completion,%20tesda.pdf",
    image: "images/cert-certificate-of-completion-tesda.png"
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "2026-02-17",
    certificateNumber: "N/A",
    verificationUrl: "https://cp.certmetrics.com/cisco/en/public/verify/credential",
    certificateFile: "certificates/Networking_Basics_certificate.pdf",
    image: "images/cert-networking-basics-certificate.png"
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2026-01-23",
    certificateNumber: "N/A",
    verificationUrl: "https://cp.certmetrics.com/cisco/en/public/verify/credential",
    certificateFile: "certificates/Introduction_to_Cybersecurity_certificate.pdf",
    image: "images/cert-introduction-to-cybersecurity-certificate.png"
  },
  {
    title: "Cyber Threat Management",
    issuer: "Cisco Networking Academy",
    date: "2026-01-22",
    certificateNumber: "N/A",
    verificationUrl: "https://cp.certmetrics.com/cisco/en/public/verify/credential",
    certificateFile: "certificates/Cyber_Threat_Management_certificate.pdf",
    image: "images/cert-cyber-threat-management-certificate.png"
  },
  {
    title: "Information Technology Specialist — Network Security",
    issuer: "Certiport",
    date: "2025-12-08",
    certificateNumber: "wn8Cz-48eN",
    verificationUrl: "https://www.certiport.com/portal/pages/credentialverification.aspx",
    certificateFile: "certificates/Information%20Technology%20Specialist.pdf",
    image: "images/cert-information-technology-specialist.png"
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
      <button type="button" class="cert-thumb" data-image="${c.image || ''}" data-file="${c.certificateFile}" aria-label="View ${c.title} certificate">
        ${c.image
          ? `<img class="cert-img" src="${c.image}" alt="Preview of ${c.title} certificate">`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z"/></svg>`}
      </button>
      <div class="cert-body">
        <h3>${c.title}</h3>
        <span class="cert-issuer">${c.issuer}</span>
        <div class="cert-meta-row"><span>${fmtDate(c.date)}</span></div>
        <span class="cert-num">Cert. Code: ${c.certificateNumber}</span>
        ${isPlaceholder ? '<span class="placeholder-flag">placeholder — replace before publishing</span>' : ''}
        <div class="cert-actions">
          <a class="cert-verify" href="${c.verificationUrl}" target="_blank" rel="noopener">&lt;&lt; verify &gt;&gt;</a>
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

/* ============================================================
   CERTIFICATE LIGHTBOX
   ============================================================ */
(function(){
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');

  function open(thumb){
    const image = thumb.dataset.image;
    if(!image){
      window.open(thumb.dataset.file, '_blank', 'noopener');
      return;
    }
    img.src = image;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    img.removeAttribute('src');
    document.body.style.overflow = '';
  }

  document.getElementById('certGrid').addEventListener('click', (e) => {
    const thumb = e.target.closest('.cert-thumb');
    if(thumb) open(thumb);
  });
  lightbox.addEventListener('click', (e) => {
    if(e.target.hasAttribute('data-close') || e.target.closest('.lightbox-close')) close();
  });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();
