/* =========================================================
   LGU Student Portal – Dashboard logic
   Everything on the page is rendered from the DATA object,
   so the cards, tables and charts stay connected.
   ========================================================= */

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const ICONS = {
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  chart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  openbook: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  settings: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><line x1="6" y1="12" x2="6.01" y2="12"/><line x1="18" y1="12" x2="18.01" y2="12"/>',
  cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
};
const icon = (n, s = 22) =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

/* ---------- DATA (edit these to match your own details) ---------- */
const DATA = {
  student: { semester: 'Fa-2026', cgpa: 3.1, section: 'A' },

  nav: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'profile',   label: 'My Profile', icon: 'user' },
    { id: 'fee',       label: 'Fee & Challans', icon: 'card' },
    { id: 'attendance',label: 'Attendance', icon: 'chart' },
    { id: 'results',   label: 'Results', icon: 'award' },
    { id: 'courses',   label: 'Courses', icon: 'book' },
    { id: 'calendar',  label: 'Academic Calendar', icon: 'calendar' },
    { id: 'messages',  label: 'Messages', icon: 'message' },
    { id: 'settings',  label: 'Settings', icon: 'settings' }
  ],

  profiles: ['Fa-2025/BS DFCS/009', 'Sp-2025/BS DFCS/009', 'Fa-2024/BS DFCS/009'],

  attendance: [
    { code: 'CCE-TH', value: 78, color: '#d0177a' },
    { code: 'CFE-TH', value: 80, color: '#00a0c6' },
    { code: 'EW-TH',  value: 76, color: '#b00035' },
    { code: 'FSD-Lab',value: 96, color: '#e55a7b' },
    { code: 'FSD-TH', value: 96, color: '#ff7043' }
  ],

  challans: [
    { sem: 'Fa-2026', type: 'REGISTRATION',   issue: '25/09/2026', due: '03/10/2026', amount: 79064, paid: false },
    { sem: 'Sp-2026', type: 'REGISTRATION',   issue: '21/02/2026', due: '20/03/2026', amount: 74500, paid: true },
    { sem: 'Sp-2026', type: 'Igrade-MidTerm', issue: '22/04/2026', due: '27/04/2026', amount: 3000,  paid: true },
    { sem: 'Fa-2025', type: 'App. Processing',issue: '12/08/2025', due: '11/09/2025', amount: 5000,  paid: true },
    { sem: 'Fa-2025', type: 'Registration',   issue: '20/08/2025', due: '27/08/2025', amount: 72000, paid: true },
    { sem: 'Fa-2025', type: 'INSTALLMENT-II', issue: '12/11/2025', due: '25/11/2025', amount: 36000, paid: true }
  ],

  calendar: [
    { activity: 'Enrollment Start', date: '2026-08-26' },
    { activity: 'Semester Start',   date: '2026-08-29' },
    { activity: 'Enrollment End',   date: '2026-08-30' },
    { activity: 'Semester Freeze',  date: '2026-09-14' },
    { activity: 'Mid Term Exams',   date: '2026-10-19' },
    { activity: 'Final Term Exams', date: '2026-12-21' }
  ],

  courses: [
    { name: 'Civics and Community Engagement Sec 1', teacher: 'Mr. Sajjad Sikandar', att: 'CCE-TH' },
    { name: 'Computer Forensic Essentials Sec 1',    teacher: 'Ms. Aroosha Masood',  att: 'CFE-TH' },
    { name: 'Expository Writing Sec 1',              teacher: 'Ms. Iza Aslam',       att: 'EW-TH' },
    { name: 'Full Stack Development Sec 1',          teacher: 'Mr. Muhammad Hamza',  att: 'FSD-TH' },
    { name: 'Full Stack Development Sec 1 (Lab)',    teacher: 'Mr. Umer Farooq',     att: 'FSD-Lab' }
  ],

  tests: { total: '540/600', grade: 'A+', percent: '90%',
    data: [
      { code: 'CT-1', value: 95, color: '#2563eb' },
      { code: 'CT-2', value: 82, color: '#2563eb' },
      { code: 'CT-3', value: 78, color: '#2563eb' },
      { code: 'CT-4', value: 98, color: '#2563eb' }
    ] },

  schedule: [
    { time: '09:00 AM — 10:00 AM', subject: 'Full Stack Development', teacher: 'Mr. Muhammad Hamza', c: '#16a34a' },
    { time: '10:00 AM — 11:00 AM', subject: 'Expository Writing',     teacher: 'Ms. Iza Aslam',      c: '#e11d48' },
    { time: '11:10 AM — 12:10 PM', subject: 'Computer Forensics',     teacher: 'Ms. Aroosha Masood', c: '#e11d48' }
  ],

  notices: [
    { text: 'Submit the Full Stack assignment…', time: '02:00 PM, Wed', init: 'FS', c: '#6366f1' },
    { text: 'All students: take the course review task.', time: '01:10 PM, Wed', init: 'AD', c: '#0ea5e9' },
    { text: 'Mid-term date sheet has been uploaded.', time: '05:00 PM, Tue', init: 'EX', c: '#f97316' },
    { text: 'Fee challan due date extended.', time: '11:30 AM, Mon', init: 'FO', c: '#16a34a' }
  ],

  notifications: [
    'Fa-2026 registration challan is unpaid',
    'New assignment: Full Stack Development',
    'Attendance updated for CFE-TH',
    'Mid-term date sheet uploaded',
    'Result of CT-4 is available',
    'Library book due tomorrow',
    'Semester freeze deadline approaching',
    'Teacher evaluation form is open',
    'Welcome to the new ERP portal'
  ]
};

/* ---------- Small utilities ---------- */
const fmt = n => Number(n).toLocaleString('en-US');
const attOf = code => (DATA.attendance.find(a => a.code === code) || {}).value;
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
};

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

function countUp(el, to, { decimals = 0, duration = 1000, thousands = true } = {}) {
  const start = performance.now();
  const step = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = to * eased;
    el.textContent = thousands && decimals === 0 ? fmt(Math.round(v)) : v.toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const outstanding = () => DATA.challans.filter(c => !c.paid).reduce((s, c) => s + c.amount, 0);

/* ---------- Layout: sidebar, icons, theme ---------- */
function renderShell() {
  $('#menuBtn').innerHTML = icon('menu');
  $('#bellIcon').innerHTML = icon('bell');
  $('#searchIcon').innerHTML = icon('search', 18);

  $('#nav').innerHTML =
    DATA.nav.map((n, i) =>
      `<button class="nav-item ${i === 0 ? 'active' : ''}" data-id="${n.id}" title="${n.label}">${icon(n.icon)}<span>${n.label}</span></button>`
    ).join('') +
    `<button class="nav-item logout" data-id="logout" title="Logout">${icon('logout')}<span>Logout</span></button>`;

  $('#nav').addEventListener('click', e => {
    const b = e.target.closest('.nav-item');
    if (!b) return;
    if (b.dataset.id === 'logout') return toast('You have been logged out (demo)');
    $$('.nav-item').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    setView(b.dataset.id);
    if (innerWidth <= 720) $('#sidebar').classList.remove('open');
  });

  $('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
  $('#backdrop').onclick = () => $('#sidebar').classList.remove('open');

  // theme
  const applyTheme = dark => {
    document.body.classList.toggle('dark', dark);
    $('#themeBtn').innerHTML = icon(dark ? 'sun' : 'moon');
    store.set('lgu-dark', dark ? '1' : '0');
    // charts read CSS variables, so nothing else to redraw
  };
  applyTheme(store.get('lgu-dark') === '1');
  $('#themeBtn').onclick = () => applyTheme(!document.body.classList.contains('dark'));

  // dates
  const d = new Date();
  const dateStr = d.toLocaleDateString('en-GB').replace(/\//g, '-');
  $('#todayChip').textContent = 'Today ' + dateStr;
  $('#todayChip2').textContent = 'Today ' + dateStr;
}

/* ---------- Dropdowns (profile + notifications) ---------- */
function renderDropdowns() {
  const notifMenu = $('#notifMenu'), profMenu = $('#profileMenu'), badge = $('#badge');

  notifMenu.innerHTML = DATA.notifications.map(n =>
    `<div class="item"><span class="dot"></span><div>${n}<small>Just now</small></div></div>`).join('');

  profMenu.innerHTML = DATA.profiles.map((p, i) =>
    `<button class="${i === 0 ? 'active' : ''}">${p}</button>`).join('');

  const closeAll = () => $$('.menu').forEach(m => m.classList.remove('open'));

  $('#bellBtn').onclick = e => {
    e.stopPropagation();
    const open = !notifMenu.classList.contains('open');
    closeAll();
    notifMenu.classList.toggle('open', open);
    if (open) badge.classList.add('hide');       // mark as read
  };
  $('#profileBtn').onclick = e => {
    e.stopPropagation();
    const open = !profMenu.classList.contains('open');
    closeAll();
    profMenu.classList.toggle('open', open);
  };
  profMenu.onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    $$('button', profMenu).forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    $('#profileLabel').textContent = b.textContent;
    closeAll();
    toast('Switched to ' + b.textContent);
  };
  document.addEventListener('click', closeAll);
  notifMenu.onclick = e => e.stopPropagation();
}

/* ---------- Stat cards ---------- */
function renderStats() {
  const s = DATA.student;
  const cards = [
    { lbl: 'Enrolled Semester', val: s.semester, icon: 'openbook', accent: '#dc2646', id: 'sSem' },
    { lbl: 'Outstanding', val: '0', icon: 'cash', accent: '#16a34a', id: 'sOut' },
    { lbl: 'CGPA', val: '0.00', icon: 'cap', accent: '#1f2540', id: 'sCgpa' },
    { lbl: 'Class Section', val: s.section, icon: 'users', accent: '#111827', id: 'sSec' }
  ];
  $('#stats').innerHTML = cards.map(c => `
    <div class="stat" style="--accent:${c.accent}">
      <div class="ico">${icon(c.icon, 34)}</div>
      <div class="txt"><div class="lbl">${c.lbl}</div><div class="val" id="${c.id}">${c.val}</div></div>
    </div>`).join('');
  countUp($('#sOut'), outstanding());
  countUp($('#sCgpa'), s.cgpa, { decimals: 2, thousands: false });
}

/* ---------- Bar chart (pure SVG, no libraries) ---------- */
function barChart(target, data, { max = 100, step = 20, H = 290, W = 640 } = {}) {
  const pad = { l: 38, r: 10, t: 12, b: 34 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const bw = iw / data.length;
  let g = '';
  for (let v = 0; v <= max; v += step) {
    const y = pad.t + ih - (v / max) * ih;
    g += `<line class="grid-line" x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}"/>
          <text class="tick" x="${pad.l - 8}" y="${y + 4}" text-anchor="end">${v}</text>`;
  }
  data.forEach((d, i) => {
    const h = (d.value / max) * ih, x = pad.l + i * bw + bw * 0.18, w = bw * 0.64, y = pad.t + ih - h;
    g += `<rect class="bar" data-i="${i}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${d.color}" style="animation-delay:${i * 90}ms"/>
          <text class="xlabel" x="${x + w / 2}" y="${H - 10}" text-anchor="middle">${d.code}</text>`;
  });
  target.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img">${g}</svg>`;

  const tip = $('#tooltip');
  $$('.bar', target).forEach(bar => {
    const d = data[bar.dataset.i];
    bar.addEventListener('mousemove', e => {
      tip.textContent = `${d.code}: ${d.value}%`;
      tip.style.left = e.clientX + 14 + 'px';
      tip.style.top = e.clientY - 34 + 'px';
      tip.classList.add('show');
    });
    bar.addEventListener('mouseleave', () => tip.classList.remove('show'));
  });
}

function renderAttendance() {
  barChart($('#attChart'), DATA.attendance);
  const low = DATA.attendance.filter(a => a.value < 80);
  $('#attHint').innerHTML = low.length
    ? `⚠ Keep an eye on: <b>${low.map(l => l.code).join(', ')}</b> (below 80%)`
    : 'Great! All subjects are above 80%.';
}

/* ---------- Tables ---------- */
function renderChallans() {
  const filter = $('#challanFilter').value;
  const q = $('#search').value.trim().toLowerCase();
  const rows = DATA.challans
    .map((c, i) => ({ ...c, i }))
    .filter(c => (filter === 'all' || (filter === 'paid') === c.paid))
    .filter(c => !q || `${c.sem} ${c.type} ${c.issue}`.toLowerCase().includes(q));

  $('#challanTable tbody').innerHTML = rows.length ? rows.map(c => `
    <tr>
      <td class="b">${c.sem}</td>
      <td class="b">${c.type}</td>
      <td class="b">${c.issue}</td>
      <td class="b">${c.due}</td>
      <td>Rs ${fmt(c.amount)}</td>
      <td>
        <span class="tag ${c.paid ? 'paid' : 'unpaid'}">${c.paid ? 'Paid' : 'Unpaid'}</span>
        ${c.paid ? '' : `<button class="pay-btn" data-i="${c.i}">Pay</button>`}
      </td>
    </tr>`).join('') : `<tr><td class="empty" colspan="6">No challans found</td></tr>`;
}

function renderCalendar() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  $('#calTable tbody').innerHTML = DATA.calendar.map(c => {
    const d = new Date(c.date);
    const done = d < today;
    return `<tr>
      <td>${c.activity}</td>
      <td>${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
      <td><span class="tag ${done ? 'done' : 'soon'}">${done ? 'Completed' : 'Upcoming'}</span></td>
    </tr>`;
  }).join('');
}

function renderCourses() {
  const q = $('#search').value.trim().toLowerCase();
  const rows = DATA.courses.filter(c => !q || `${c.name} ${c.teacher}`.toLowerCase().includes(q));
  $('#courseTable tbody').innerHTML = rows.length ? rows.map(c => {
    const a = attOf(c.att);
    const col = a >= 85 ? '#16a34a' : a >= 78 ? '#f59e0b' : '#e11d48';
    return `<tr>
      <td class="b">${c.name}</td>
      <td class="b">${c.teacher}</td>
      <td><span class="bar-mini"><i style="width:${a}%;background:${col}"></i></span>${a}%</td>
    </tr>`;
  }).join('') : `<tr><td class="empty" colspan="3">No courses found</td></tr>`;
}

/* ---------- Test performance, schedule, notices ---------- */
function renderExtras() {
  const t = DATA.tests;
  $('#perfStats').innerHTML = `
    <div><strong>${t.total}</strong><span>Total Mark</span></div>
    <div><strong>${t.grade}</strong><span>Grade</span></div>
    <div><strong>${t.percent}</strong><span>Percentage</span></div>`;
  barChart($('#testChart'), t.data, { max: 100, step: 20, H: 250, W: 420 });

  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = s => { // "09:00 AM — ..." -> minutes
    const m = s.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let h = +m[1] % 12; if (m[3].toUpperCase() === 'PM') h += 12;
    return h * 60 + +m[2];
  };
  $('#schedule').innerHTML = DATA.schedule.map(s => {
    const start = toMin(s.time);
    const state = mins >= start && mins < start + 60 ? 'Live' : mins >= start + 60 ? 'Done' : 'Next';
    return `<div class="sch" style="--c:${s.c}">
      <div class="info"><div class="time">${s.time}</div><div class="sub">${s.subject} · ${s.teacher}</div></div>
      <span class="state">${state}</span></div>`;
  }).join('');

  $('#notices').innerHTML = DATA.notices.map(n => `
    <div class="notice">
      <div class="pic" style="background:${n.c}">${n.init}</div>
      <div><p>${n.text}</p><small>${n.time}</small></div>
    </div>`).join('');
}

/* ---------- Events that connect everything ---------- */
function bindEvents() {
  // challan filter + search re-render tables
  $('#challanFilter').addEventListener('change', renderChallans);
  $('#search').addEventListener('input', () => { renderChallans(); renderCourses(); });

  // Pay button -> marks challan paid -> updates table AND outstanding card
  $('#challanTable').addEventListener('click', e => {
    const btn = e.target.closest('.pay-btn');
    if (!btn) return;
    openPay(+btn.dataset.i);
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderShell();
  renderDropdowns();
  renderStats();
  renderAttendance();
  renderChallans();
  renderCalendar();
  renderCourses();
  renderExtras();
  bindEvents();
});

/* =========================================================
   FINAL ADDITIONS: pages, welcome banner, profile, settings,
   payment dialog and saved data
   ========================================================= */
DATA.profile = {
  name: 'Student Name',
  reg: 'Fa-2025/BS DFCS/009',
  program: 'BS Digital Forensics & Cyber Security',
  email: 'student@lgu.edu.pk',
  phone: '+92 3XX XXXXXXX',
  status: 'Active'
};
{ const n = store.get('lgu-name'); if (n) DATA.profile.name = n; }

// remember payments between visits
DATA.challans.forEach(c => c.orig = c.paid);
try { JSON.parse(store.get('lgu-paid') || '[]').forEach(i => { if (DATA.challans[i]) DATA.challans[i].paid = true; }); } catch (e) {}
const savePaid = () => store.set('lgu-paid', JSON.stringify(
  DATA.challans.map((c, i) => (c.paid && !c.orig ? i : -1)).filter(i => i >= 0)));

const VIEW_TITLES = {
  dashboard: 'DASHBOARD', profile: 'MY PROFILE', fee: 'FEE & CHALLANS', attendance: 'ATTENDANCE',
  results: 'RESULTS', courses: 'COURSES', calendar: 'ACADEMIC CALENDAR', messages: 'NOTICES & MESSAGES', settings: 'SETTINGS'
};

function setView(id) {
  if (!VIEW_TITLES[id]) id = 'dashboard';
  $$('[data-views]').forEach(el => { el.hidden = !el.dataset.views.split(' ').includes(id); });
  $$('.grid').forEach(g => { g.hidden = !$$('.panel', g).some(p => !p.hidden); });
  $('#main').classList.toggle('sub', id !== 'dashboard');
  $('#pageTitle').textContent = VIEW_TITLES[id];
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.id === id));
  document.title = VIEW_TITLES[id].charAt(0) + VIEW_TITLES[id].slice(1).toLowerCase() + ' | LGU Student Portal';
  if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  renderAttendance(); renderExtras();        // replays chart animations
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderWelcome() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const avg = Math.round(DATA.attendance.reduce((s, a) => s + a.value, 0) / DATA.attendance.length);
  const pending = DATA.challans.filter(c => !c.paid).length;
  $('#welcome').innerHTML = `
    <div>
      <h2>${greet}, ${DATA.profile.name} 👋</h2>
      <p>${DATA.profile.program} · ${DATA.student.semester} · Section ${DATA.student.section}</p>
    </div>
    <div class="w-chips">
      <div class="w-chip"><b>${avg}%</b><span>Avg. attendance</span></div>
      <div class="w-chip"><b>${DATA.courses.length}</b><span>Courses</span></div>
      <div class="w-chip"><b>${pending}</b><span>Pending challan${pending === 1 ? '' : 's'}</span></div>
    </div>`;
}

function renderProfile() {
  const p = DATA.profile;
  const initials = p.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  $('#profileCard').innerHTML = `
    <div class="p-top"><div class="p-avatar">${initials}</div>
      <div><h3>${p.name}</h3><small>${p.reg}</small></div></div>
    <div class="p-grid">
      <div><span>Program</span><b>${p.program}</b></div>
      <div><span>Semester</span><b>${DATA.student.semester}</b></div>
      <div><span>Section</span><b>${DATA.student.section}</b></div>
      <div><span>CGPA</span><b>${DATA.student.cgpa.toFixed(2)}</b></div>
      <div><span>Email</span><b>${p.email}</b></div>
      <div><span>Phone</span><b>${p.phone}</b></div>
      <div><span>Status</span><b>${p.status}</b></div>
      <div><span>University</span><b>Lahore Garrison University</b></div>
    </div>`;
}

function renderSettings() {
  $('#settingsCard').innerHTML = `
    <label class="field">Display name
      <input id="nameInput" type="text" value="${DATA.profile.name}" maxlength="40">
    </label>
    <div class="set-row"><div>Dark mode<small>Easier on the eyes at night</small></div>
      <label class="switch"><input type="checkbox" id="darkSwitch" ${document.body.classList.contains('dark') ? 'checked' : ''}><i></i></label></div>
    <div class="set-row"><div>Reset demo data<small>Marks paid challans as unpaid again</small></div>
      <button class="btn danger" id="resetBtn">Reset</button></div>`;
  $('#nameInput').addEventListener('input', e => {
    DATA.profile.name = e.target.value.trim() || 'Student Name';
    store.set('lgu-name', DATA.profile.name);
    renderWelcome(); renderProfile();
  });
  $('#darkSwitch').addEventListener('change', () => $('#themeBtn').click());
  $('#resetBtn').addEventListener('click', () => { store.set('lgu-paid', '[]'); toast('Data reset'); setTimeout(() => location.reload(), 500); });
}

/* ---- Payment dialog ---- */
let payIndex = null;
function openPay(i) {
  payIndex = i;
  const c = DATA.challans[i];
  $('#paySummary').innerHTML =
    `Session <b>${c.sem}</b>Challan <b>${c.type}</b>Due date <b>${c.due}</b>Amount <b>Rs ${fmt(c.amount)}</b>`;
  $('#payModal').hidden = false;
  $('#payConfirm').focus();
}
const closePay = () => { $('#payModal').hidden = true; payIndex = null; };

document.addEventListener('DOMContentLoaded', () => {
  renderWelcome(); renderProfile(); renderSettings();

  $('#payCancel').onclick = closePay;
  $('#payModal').addEventListener('click', e => { if (e.target.id === 'payModal') closePay(); });
  $('#payConfirm').onclick = () => {
    const c = DATA.challans[payIndex];
    if (!c) return;
    c.paid = true; savePaid();
    const method = $('#payMethod').value;
    closePay();
    renderChallans(); renderWelcome();
    countUp($('#sOut'), outstanding(), { duration: 700 });
    toast(`Rs ${fmt(c.amount)} paid via ${method} ✔`);
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePay(); $$('.menu').forEach(m => m.classList.remove('open')); }
  });
  window.addEventListener('hashchange', () => setView(location.hash.slice(1)));

  // panel arrow links go to their page instead of reloading
  $$('.go').forEach(a => a.addEventListener('click', e => { e.preventDefault(); setView(a.getAttribute('href').slice(1)); }));

  setView(location.hash.slice(1) || 'dashboard');
});