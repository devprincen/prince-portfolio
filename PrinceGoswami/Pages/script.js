// ── SIDEBAR TOGGLE ──────────────────────────────────────────────
const sidebar        = document.getElementById('sidebar');
const closeBtn       = document.getElementById('sidebarCloseBtn');
const openBtn        = document.getElementById('sidebarOpenBtn');
const overlay        = document.getElementById('sidebarOverlay');
const isMobile       = () => window.innerWidth <= 960;

function closeSidebar() {
    if (isMobile()) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
    } else {
        document.body.classList.add('sidebar-collapsed');
    }
}

function openSidebar() {
    if (isMobile()) {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
    } else {
        document.body.classList.remove('sidebar-collapsed');
    }
}

closeBtn.addEventListener('click', closeSidebar);
openBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);

document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => {
        if (isMobile()) closeSidebar();
    });
});

const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('nav a');

function setActive() {
    let cur = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 150) cur = sec.id;
    });
    
    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
}

window.addEventListener('scroll', setActive, { passive: true });
setActive();

links.forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));
