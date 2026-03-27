// 3D Cubes Background — El-crm
(function () {
  if (window.innerWidth <= 768) return;
  const container = document.getElementById('cubes-bg');
  if (!container) return;

  const CONFIGS = [
    { size: 120, x: 8,  y: 12, speed: 22, rotX: 20,  rotY: 45,  depth: .3 },
    { size: 70,  x: 88, y: 8,  speed: 18, rotX: 60,  rotY: 10,  depth: .6 },
    { size: 90,  x: 72, y: 55, speed: 25, rotX: 140, rotY: 80,  depth: .4 },
    { size: 55,  x: 20, y: 70, speed: 15, rotX: 30,  rotY: 200, depth: .7 },
    { size: 110, x: 50, y: 80, speed: 30, rotX: 90,  rotY: 130, depth: .25 },
    { size: 65,  x: 35, y: 25, speed: 20, rotX: 180, rotY: 60,  depth: .55 },
    { size: 80,  x: 95, y: 38, speed: 28, rotX: 45,  rotY: 270, depth: .35 },
    { size: 50,  x: 62, y: 15, speed: 16, rotX: 220, rotY: 100, depth: .65 },
    { size: 100, x: 3,  y: 48, speed: 24, rotX: 70,  rotY: 170, depth: .3  },
    { size: 60,  x: 78, y: 82, speed: 19, rotX: 110, rotY: 40,  depth: .6  },
    { size: 85,  x: 45, y: 45, speed: 27, rotX: 15,  rotY: 320, depth: .45 },
    { size: 45,  x: 15, y: 90, speed: 14, rotX: 260, rotY: 90,  depth: .75 },
  ];

  const cubes = CONFIGS.map(cfg => {
    const el = document.createElement('div');
    el.className = 'cube';
    el.style.cssText = `width:${cfg.size}px;height:${cfg.size}px;left:${cfg.x}%;top:${cfg.y}%;opacity:${.15 + cfg.depth * .35}`;

    const h = cfg.size / 2;
    const faces = [
      `rotateY(0deg) translateZ(${h}px)`,
      `rotateY(180deg) translateZ(${h}px)`,
      `rotateY(-90deg) translateZ(${h}px)`,
      `rotateY(90deg) translateZ(${h}px)`,
      `rotateX(90deg) translateZ(${h}px)`,
      `rotateX(-90deg) translateZ(${h}px)`,
    ];
    faces.forEach(t => {
      const f = document.createElement('div');
      f.className = 'cube-face';
      f.style.cssText = `width:${cfg.size}px;height:${cfg.size}px;transform:${t}`;
      el.appendChild(f);
    });

    container.appendChild(el);
    return { el, ...cfg, floatOff: Math.random() * Math.PI * 2, baseY: cfg.y };
  });

  let scrollY = 0, mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0, t0 = null;

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  document.addEventListener('mousemove', e => {
    tMouseX = (e.clientX / innerWidth - .5) * 18;
    tMouseY = (e.clientY / innerHeight - .5) * 14;
  });

  function tick(ts) {
    if (!t0) t0 = ts;
    const elapsed = (ts - t0) / 1000;
    mouseX += (tMouseX - mouseX) * .04;
    mouseY += (tMouseY - mouseY) * .04;

    cubes.forEach(c => {
      const floatY = Math.sin(elapsed * .45 + c.floatOff) * 16;
      const parY   = scrollY * .04 * (1 - c.depth * .75);
      const parX   = mouseX * (1 - c.depth * .6) * .7;
      const parMY  = mouseY * (1 - c.depth * .6) * .5;
      const rX = c.rotX + elapsed * (180 / c.speed);
      const rY = c.rotY + elapsed * (180 / (c.speed * 1.4));
      const rZ = elapsed * (30 / c.speed);
      c.el.style.transform = `translate(${parX}px,${floatY + parY + parMY}px) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
