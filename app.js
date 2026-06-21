/* ===== Countdown ===== */
const start = new Date("2026-06-21T00:00:00").getTime();
const date = new Date("2026-07-09T00:00:00");
const target = date.getTime();
const totalSpan = target - start;
let celebrated = false;
const dateText = date.toLocaleDateString("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dayText = date.toLocaleDateString("ar-EG", {
  weekday: "long",
});

document.getElementById("dateChip").innerHTML = `
    <span>${dateText}</span>
    <span class="sep"></span>
    <span>${dayText}</span>
  `;
const els = {
  d: document.getElementById("days"),
  h: document.getElementById("hours"),
  m: document.getElementById("minutes"),
  s: document.getElementById("seconds"),
  fill: document.getElementById("fill"),
  pt: document.getElementById("progressText"),
};
const pad = (n, l = 2) => String(n).padStart(l, "0");
let lastMinute = -1;

function tick() {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    els.d.textContent = "000";
    els.h.textContent = "00";
    els.m.textContent = "00";
    els.s.textContent = "00";
    celebrate();
    return;
  }

  // time breakdown
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  setNum(els.d, pad(d, 3));
  setNum(els.h, pad(h));
  setNum(els.m, pad(m));
  setNum(els.s, pad(s));

  // SAFE progress calculation (based on fixed start)
  const elapsed = totalSpan - diff;

  const pct =
    totalSpan > 0 ? Math.max(0, Math.min(100, (elapsed / totalSpan) * 100)) : 0;

  // minute-based trigger optimization (no drift issues)
  if (m !== lastMinute && lastMinute !== -1) {
    burstConfetti(40);
  }

  lastMinute = m;
}
function setNum(el, val) {
  if (el.textContent !== val) {
    el.textContent = val;
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
  }
}
tick();
setInterval(tick, 1000);
/* ===== Celebration ===== */

function celebrate() {
  if (celebrated) return;
  celebrated = true;
  document.getElementById("celebrate").classList.add("show");
  const interval = setInterval(() => {
    launchShow(4);
    burstConfetti(120);
  }, 900);
  setTimeout(() => clearInterval(interval), 12000);
}
/* ===== Particles ===== */
const pc = document.getElementById("particles");
const pctx = pc.getContext("2d");
let particles = [];
function resize() {
  [
    pc,
    document.getElementById("fireworks"),
    document.getElementById("confetti"),
  ].forEach((c) => {
    c.width = innerWidth;
    c.height = innerHeight;
  });
}
resize();
addEventListener("resize", resize);
function initParticles() {
  particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * pc.width,
    y: Math.random() * pc.height,
    r: Math.random() * 1.6 + 0.3,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    a: Math.random() * 0.6 + 0.2,
  }));
}
initParticles();
function drawParticles() {
  pctx.clearRect(0, 0, pc.width, pc.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = pc.width;
    if (p.x > pc.width) p.x = 0;
    if (p.y < 0) p.y = pc.height;
    if (p.y > pc.height) p.y = 0;
    pctx.beginPath();
    pctx.fillStyle = `rgba(247,215,116,${p.a})`;
    pctx.shadowColor = "rgba(247,215,116,.8)";
    pctx.shadowBlur = 8;
    pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== Bokeh ===== */
const bokeh = document.getElementById("bokeh");
for (let i = 0; i < 22; i++) {
  const s = document.createElement("span");
  const size = Math.random() * 120 + 40;
  s.style.width = s.style.height = size + "px";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = -Math.random() * 18 + "s";
  s.style.opacity = Math.random() * 0.45 + 0.15;
  bokeh.appendChild(s);
}

/* ===== Hearts ===== */
const hearts = document.getElementById("hearts");
const heartChars = ["♥", "❤", "❥"];
function spawnHeart() {
  const i = document.createElement("i");
  i.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  i.style.left = Math.random() * 100 + "%";
  i.style.fontSize = Math.random() * 16 + 12 + "px";
  const dur = Math.random() * 10 + 10;
  i.style.animationDuration = dur + "s";
  i.style.color = `rgba(${(230 + Math.random() * 25) | 0},${(180 + Math.random() * 30) | 0},${(190 + Math.random() * 30) | 0},.7)`;
  hearts.appendChild(i);
  setTimeout(() => i.remove(), dur * 1000);
}
setInterval(spawnHeart, 900);
for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 300);

/* ===== Lanterns ===== */
const lanterns = document.getElementById("lanterns");
function spawnLantern() {
  const l = document.createElement("div");
  l.className = "lantern";
  l.style.left = Math.random() * 95 + "%";
  const dur = Math.random() * 12 + 18;
  l.style.animationDuration = dur + "s";
  const scale = Math.random() * 0.6 + 0.7;
  l.style.transform = `scale(${scale})`;
  lanterns.appendChild(l);
  setTimeout(() => l.remove(), dur * 1000);
}
setInterval(spawnLantern, 2200);
for (let i = 0; i < 4; i++) setTimeout(spawnLantern, i * 1500);

/* ===== Fireworks (page load + on zero) ===== */
const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");
let fireworks = [];
function firework(x, y, colors) {
  const count = 60;
  for (let i = 0; i < count; i++) {
    const a = (Math.PI * 2 * i) / count;
    const sp = Math.random() * 4 + 2;
    fireworks.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 60 + Math.random() * 30,
      age: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}
function drawFW() {
  fctx.clearRect(0, 0, fw.width, fw.height);
  fireworks.forEach((p) => {
    p.age++;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.vx *= 0.99;
    p.vy *= 0.99;
    const t = 1 - p.age / p.life;
    fctx.globalAlpha = Math.max(0, t);
    fctx.fillStyle = p.color;
    fctx.shadowColor = p.color;
    fctx.shadowBlur = 10;
    fctx.beginPath();
    fctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    fctx.fill();
  });
  fctx.globalAlpha = 1;
  fireworks = fireworks.filter((p) => p.age < p.life);
  requestAnimationFrame(drawFW);
}
drawFW();
function launchShow(times = 5) {
  const colors = ["#f7d774", "#f5e6a8", "#fff", "#e8c5c5", "#d4af37"];
  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      const x = Math.random() * fw.width * 0.8 + fw.width * 0.1;
      const y = Math.random() * fw.height * 0.5 + fw.height * 0.1;
      firework(x, y, colors);
    }, i * 450);
  }
}
window.addEventListener("load", () => launchShow(6));

/* ===== Confetti ===== */
const cf = document.getElementById("confetti");
const cctx = cf.getContext("2d");
let confetti = [];
function burstConfetti(n = 80) {
  const colors = [
    "#f7d774",
    "#f5e6a8",
    "#fff",
    "#e8c5c5",
    "#d4af37",
    "#fffff0",
  ];
  for (let i = 0; i < n; i++) {
    confetti.push({
      x: Math.random() * cf.width,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      s: Math.random() * 6 + 4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 200,
    });
  }
}
function drawCF() {
  cctx.clearRect(0, 0, cf.width, cf.height);
  confetti.forEach((c) => {
    c.x += c.vx;
    c.y += c.vy;
    c.vy += 0.05;
    c.rot += c.vr;
    c.life--;
    cctx.save();
    cctx.translate(c.x, c.y);
    cctx.rotate(c.rot);
    cctx.fillStyle = c.color;
    cctx.fillRect(-c.s / 2, -c.s / 2, c.s, c.s * 0.5);
    cctx.restore();
  });
  confetti = confetti.filter((c) => c.life > 0 && c.y < cf.height + 30);
  requestAnimationFrame(drawCF);
}
drawCF();

/* ===== Music ===== */
const audio = document.getElementById("audio");
const btn = document.getElementById("musicBtn");
audio.volume = 0.4;
btn.addEventListener("click", () => {
  if (audio.paused) {
    audio
      .play()
      .then(() => {
        btn.classList.add("playing");
        btn.textContent = "🎶";
      })
      .catch(() => {});
  } else {
    audio.pause();
    btn.classList.remove("playing");
    btn.textContent = "🎵";
  }
});
