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
  const sections = Array.from(links)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  const home = document.querySelector('#home');
  let lockUntil = 0;

  function clearActive(){
    links.forEach(l => l.classList.remove('active'));
  }

  function setActive(hash){
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === hash));
  }

  function update(){
    if(Date.now() < lockUntil) return;
    const line = window.scrollY + 120;
    if(home && line < home.offsetTop + home.offsetHeight){
      clearActive();
      return;
    }
    let current = null;
    for(const s of sections){
      if(line >= s.offsetTop) current = '#' + s.id;
    }
    if(current) setActive(current);
    else clearActive();
  }

  window.addEventListener('scroll', update, { passive:true });
  window.addEventListener('resize', update);
  window.addEventListener('hashchange', () => {
    update();
    setTimeout(update, 400);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      lockUntil = Date.now() + 700;
      clearActive();
      link.classList.add('active');
      setTimeout(update, 400);
      setTimeout(update, 900);
    });
  });

  document.querySelector('.brand')?.addEventListener('click', () => {
    lockUntil = Date.now() + 700;
    clearActive();
  });
  update();
})();

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   PROJECT DATA
   To add a project, copy an object below and edit the fields.
   ============================================================ */
const PROJECTS = [
  {
    title: "OJT Monitoring System",
    description: "A web application that allows OJT students to log attendance using facial recognition, track their time progress, and submit daily narrative reports, while enabling the coordinator to monitor student attendance, narrative reports, and progress.",
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
    title: "Satori Spa — Massage Spa Booking System",
    description: "A Django web application for managing a massage spa business. Customers browse services and book appointments online with email confirmations, while staff use an admin dashboard to manage bookings, services, therapists, and track monthly revenue.",
    image: "images/projects/e9993b02-86d7-4a87-9773-d7aa1af0bd04.jfif",
    images: [
      "images/projects/04975ac7-fd9f-412b-8e29-7f7697813d79.jfif",
      "images/projects/73693e9a-d084-4b12-b943-75f406487ee7.jfif"
    ],
    role: "Sole Developer",
    tech: ["Python", "Django", "MariaDB", "HTML", "CSS", "JS"],
    liveUrl: "",
    githubUrl: "https://github.com/leboR1705/MassageSpa",
    featured: false
  }
];

function renderProjects(){
  const grid = document.getElementById('projectGrid');
  grid.innerHTML = PROJECTS.map((p, i) => {
    const shots = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []);
    const mainImg = p.image || shots[0] || '';
    return `
    <article class="project-row reveal">
      <div class="project-media">
        <div class="project-browser">
          <div class="project-browser-bar">
            <span class="pb-dot pb-red"></span>
            <span class="pb-dot pb-yellow"></span>
            <span class="pb-dot pb-green"></span>
            <span class="pb-title">${p.title}</span>
          </div>
          <div class="project-shot">
            ${mainImg
              ? `<img src="${mainImg}" alt="${p.title}">`
              : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`}
          </div>
        </div>
      </div>
      <div class="project-info">
        <span class="project-index">PROJECT ${String(i + 1).padStart(2, '0')}</span>
        <h3>${p.title}</h3>
        <p class="desc">${p.description}</p>
        <div class="project-meta"><span><strong>Role:</strong> ${p.role}</span></div>
        <div class="tech-row">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
        <div class="project-actions">
          <button type="button" class="project-link" data-view-project="${i}">View project <span class="arrow" aria-hidden="true">&rarr;</span></button>
          ${p.githubUrl
            ? `<a class="btn btn-ghost btn-sm" href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>`
            : `<span class="btn btn-ghost btn-sm" style="opacity:.5; cursor:not-allowed;">GitHub — add link</span>`}
        </div>
      </div>
    </article>`;
  }).join('');
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
    const shots = p.images || [];
    gallery.innerHTML = shots.map(src =>
      `<img src="${src}" alt="${p.title} screenshot">`
    ).join('');
    gallery.hidden = !shots.length;
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
    title: "AI Security Summit 2026: CxO Trust",
    issuer: "Cloud Security Alliance",
    date: "2026-08-19",
    certificateNumber: "N/A",
    verificationUrl: "https://example.com",
    certificateFile: "certificates/AI%20Security%20Summit%20Certificate.pdf",
    image: "images/cert-ai-security-summit.png"
  },
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
    verificationUrl: "https://www.credly.com/badges/fe6727cb-97c4-4221-ae66-9d8eda43f3b1",
    certificateFile: "certificates/Networking_Basics_certificate.pdf",
    image: "images/cert-networking-basics-certificate.png"
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2026-01-23",
    certificateNumber: "N/A",
    verificationUrl: "https://www.credly.com/badges/027dac7b-aeb9-4f2e-9ccf-6835513646e7",
    certificateFile: "certificates/Introduction_to_Cybersecurity_certificate.pdf",
    image: "images/cert-introduction-to-cybersecurity-certificate.png"
  },
  {
    title: "Cyber Threat Management",
    issuer: "Cisco Networking Academy",
    date: "2026-01-22",
    certificateNumber: "N/A",
    verificationUrl: "https://www.credly.com/badges/efdae50b-9ab8-42bf-829b-a9a9326f5af9",
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
    const isPlaceholder = !c.verificationUrl || c.verificationUrl.includes('example.com');
    return `
    <article class="cert-card reveal">
      <button type="button" class="cert-thumb" data-image="${c.image || ''}" data-file="${c.certificateFile}" aria-label="View ${c.title} certificate">
        ${c.image
          ? `<img class="cert-img" src="${c.image}" alt="Preview of ${c.title} certificate">`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z"/></svg>`}
      </button>
      <div class="cert-body">
        <h3>${c.title}</h3>
        <span class="cert-issuer">${c.issuer}</span>
        <div class="cert-meta-row"><span>${fmtDate(c.date)}</span></div>
        ${isPlaceholder ? '<span class="placeholder-flag">verification link needed</span>' : ''}
      </div>
      <div class="cert-foot">
        <a class="cert-verify" href="${c.verificationUrl}" target="_blank" rel="noopener">&lt;&lt; verify &gt;&gt;</a>
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

/* ============================================================
   CONTACT FORM (EmailJS)
   Setup at https://dashboard.emailjs.com
   1. Email Services -> Add New Service (Gmail) -> copy the Service ID
   2. Email Templates -> New Template. Set "To Email" to your Gmail.
      Add these variables to the subject/body: {{from_name}}, {{reply_to}}, {{message}}
      -> copy the Template ID
   3. Account -> General -> copy the Public Key
   Replace the three values below, then the form will email you directly.
   ============================================================ */
const EMAILJS = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID'
};

(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const btn = document.getElementById('cfSend');
  const status = document.getElementById('cfStatus');
  const configured = ![EMAILJS.publicKey, EMAILJS.serviceId, EMAILJS.templateId]
    .some(v => v.startsWith('YOUR_'));

  if(configured && window.emailjs){
    emailjs.init({ publicKey: EMAILJS.publicKey });
  }

  function setStatus(msg, type){
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.from_name.value.trim();
    const email = form.reply_to.value.trim();
    const message = form.message.value.trim();

    if(!name || !email || !message) return setStatus('Please fill in all fields.', 'error');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus('Please enter a valid email address.', 'error');
    if(!configured || !window.emailjs){
      return setStatus('Form is not set up yet — add your EmailJS keys in script.js.', 'error');
    }

    btn.disabled = true;
    btn.classList.add('loading');
    setStatus('', '');

    try{
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        from_name: name,
        reply_to: email,
        message
      });
      setStatus("Message sent — I'll get back to you soon.", 'success');
      form.reset();
    }catch(err){
      setStatus('Something went wrong. Please try again or email me directly.', 'error');
    }finally{
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  });
})();

/* ============================================================
   SCROLL REVEAL
   Elements with .reveal fade + slide in when they enter the viewport.
   ============================================================ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const TARGETS = [
    '.section-head',
    '.about-text', '.about-quote',
    '.skill-group',
    '.cert-toolbar',
    '.edu-item',
    '.resume-wrap',
    '.resume-list .item',
    '.contact-card',
    '.contact-note',
    '.contact-form'
  ].join(', ');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      e.target.classList.toggle('visible', e.isIntersecting);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  function scan(){
    document.querySelectorAll(TARGETS).forEach(el => {
      if(!el.classList.contains('reveal')) el.classList.add('reveal');
      io.observe(el);
    });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  scan();

  new MutationObserver(scan).observe(document.getElementById('projectGrid'), { childList: true });
  new MutationObserver(scan).observe(document.getElementById('certGrid'), { childList: true });
})();
