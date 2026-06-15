// ============================================================
// EnglishMaster — utils.js
// Shared helper functions
// ============================================================

// ---- DOM helpers ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, cls = '', html = '') => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
};

// ---- Text ----
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function truncate(str, n = 50) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}

// ---- Numbers ----
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function formatNumber(n) {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}

function pad(n, width = 2) {
  return String(n).padStart(width, '0');
}

// ---- Time ----
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${pad(m)}:${pad(s)}`;
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - then) / 86400000);
}

// ---- Array ----
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n = 1) {
  const s = shuffle(arr);
  return n === 1 ? s[0] : s.slice(0, n);
}

function unique(arr) {
  return [...new Set(arr)];
}

// ---- Animation helpers ----
function animateValue(element, from, to, duration = 1000) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    element.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function showXPPopup(amount) {
  const popup = document.getElementById('xp-popup');
  document.getElementById('xp-popup-val').textContent = amount;
  popup.classList.remove('hidden');
  popup.classList.add('animate');
  setTimeout(() => {
    popup.classList.add('hidden');
    popup.classList.remove('animate');
  }, 1200);
}

function confetti() {
  const colors = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#38bdf8', '#8b5cf6'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const piece = el('div', 'confetti-piece');
      piece.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -20px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${1.5 + Math.random() * 1.5}s;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }, i * 30);
  }
}

function addRipple(btn) {
  btn.addEventListener('click', function(e) {
    const ripple = el('span', 'ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

function addRippleToAll() {
  $$('.btn').forEach(addRipple);
}

// ---- Transition between pages ----
function fadeInPage(container) {
  container.classList.add('page-enter');
  setTimeout(() => container.classList.remove('page-enter'), 400);
}

// ---- Toast / Notification ----
function showToast(icon, title, desc, duration = 4000) {
  const toast = document.getElementById('achievement-toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-desc').textContent = desc;
  toast.classList.remove('hidden');
  toast.style.animation = 'toastSlideIn 0.4s ease';
  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.4s ease forwards';
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, duration);
}

// ---- Progress bar fill animation ----
function animateProgressBar(bar, targetPct, delay = 100) {
  const fill = bar.querySelector('.progress-fill');
  if (!fill) return;
  fill.style.width = '0%';
  setTimeout(() => { fill.style.width = targetPct + '%'; }, delay);
}

// ---- Skill color ----
function skillColor(skill) {
  const map = { grammar: '#6366f1', vocabulary: '#10b981', reading: '#38bdf8', listening: '#f59e0b', speaking: '#f43f5e' };
  return map[skill] || '#6366f1';
}

// ---- Level color ----
function levelColor(lvl) {
  const map = { A1: '#22c55e', A2: '#10b981', B1: '#6366f1', B2: '#8b5cf6', C1: '#ec4899', C2: '#f59e0b' };
  return map[lvl] || '#6366f1';
}

// ---- Speech Synthesis wrapper ----
function speak(text, rate = 0.9, pitch = 1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = rate;
  utter.pitch = pitch;
  // Try to get an English voice
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
                  voices.find(v => v.lang.startsWith('en-US')) ||
                  voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utter.voice = enVoice;
  window.speechSynthesis.speak(utter);
}

// ---- Date formatting ----
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ---- Debounce ----
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ---- Simple chart drawing (Canvas) ----
function drawLineChart(canvas, data, labels, color = '#6366f1') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const padX = 30, padY = 20;
  const chartW = W - 2 * padX, chartH = H - 2 * padY;

  ctx.clearRect(0, 0, W, H);

  if (data.length < 2) {
    ctx.fillStyle = '#6b6b90';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('No hay suficientes datos', W/2, H/2);
    return;
  }

  const max = Math.max(...data, 1);
  const min = 0;
  const range = max - min || 1;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padY + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(padX, y); ctx.lineTo(padX + chartW, y); ctx.stroke();
  }

  // Line
  const points = data.map((v, i) => ({
    x: padX + (i / (data.length - 1)) * chartW,
    y: padY + chartH - ((v - min) / range) * chartH
  }));

  // Fill gradient under line
  const grad = ctx.createLinearGradient(0, padY, 0, padY + chartH);
  grad.addColorStop(0, color + '44');
  grad.addColorStop(1, color + '00');
  ctx.beginPath();
  ctx.moveTo(points[0].x, padY + chartH);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, padY + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Stroke
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();

  // Dots
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#1e1e35';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  if (labels) {
    ctx.fillStyle = '#6b6b90';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    labels.forEach((lbl, i) => {
      const p = points[i];
      if (p) ctx.fillText(lbl, p.x, H - 4);
    });
  }
}

function drawBarChart(canvas, data, labels, color = '#6366f1') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const padX = 30, padY = 20;
  const chartW = W - 2 * padX, chartH = H - 2 * padY;

  ctx.clearRect(0, 0, W, H);
  if (!data.length) return;

  const max = Math.max(...data, 1);
  const barW = (chartW / data.length) * 0.6;
  const gap = (chartW / data.length) * 0.4;

  data.forEach((v, i) => {
    const barH = (v / max) * chartH;
    const x = padX + i * (barW + gap) + gap / 2;
    const y = padY + chartH - barH;

    const grad = ctx.createLinearGradient(x, y, x, padY + chartH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '66');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, 4);
    ctx.fill();

    if (labels && labels[i]) {
      ctx.fillStyle = '#6b6b90';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW / 2, H - 4);
    }
  });
}
