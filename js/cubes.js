// Анимация 3D кубов на фоне — El-crm
(function () {
  const W         = window.innerWidth;
  const isMobile  = W < 768;
  const isTablet  = W >= 768 && W <= 1024;
  const isDesktop = W > 1024;

  const container = document.getElementById('cubes-bg');
  if (!container) return;

  // Полный набор конфигов (для десктопа, 18 штук)
  const ALL_CONFIGS = [
    // Большие кубы — фоновый слой
    { size: 140, x: 5,  y: 8,  speed: 26, rotX: 20,  rotY: 45,  depth: .15, color: 'c-emerald' },
    { size: 160, x: 82, y: 5,  speed: 32, rotX: 60,  rotY: 10,  depth: .12, color: 'c-teal'    },
    { size: 120, x: 48, y: 78, speed: 28, rotX: 90,  rotY: 130, depth: .18, color: ''           },
    { size: 130, x: 2,  y: 60, speed: 24, rotX: 70,  rotY: 170, depth: .14, color: 'c-mint'    },
    { size: 115, x: 90, y: 72, speed: 30, rotX: 110, rotY: 40,  depth: .16, color: 'c-sage'    },
    // Средние кубы — средний слой
    { size: 85,  x: 22, y: 22, speed: 20, rotX: 180, rotY: 60,  depth: .38, color: 'c-lime'    },
    { size: 95,  x: 68, y: 18, speed: 22, rotX: 45,  rotY: 270, depth: .35, color: 'c-teal'    },
    { size: 75,  x: 38, y: 50, speed: 18, rotX: 15,  rotY: 320, depth: .42, color: ''           },
    { size: 90,  x: 78, y: 42, speed: 25, rotX: 140, rotY: 80,  depth: .36, color: 'c-emerald' },
    { size: 80,  x: 14, y: 85, speed: 21, rotX: 220, rotY: 100, depth: .4,  color: 'c-mint'    },
    { size: 70,  x: 58, y: 35, speed: 17, rotX: 300, rotY: 200, depth: .44, color: 'c-sage'    },
    { size: 100, x: 92, y: 30, speed: 23, rotX: 55,  rotY: 155, depth: .33, color: 'c-lime'    },
    // Маленькие кубы — передний план
    { size: 52,  x: 30, y: 15, speed: 14, rotX: 30,  rotY: 200, depth: .65, color: 'c-emerald' },
    { size: 48,  x: 72, y: 62, speed: 12, rotX: 260, rotY: 90,  depth: .70, color: 'c-mint'    },
    { size: 55,  x: 55, y: 92, speed: 16, rotX: 120, rotY: 240, depth: .62, color: ''           },
    { size: 42,  x: 8,  y: 40, speed: 11, rotX: 195, rotY: 310, depth: .72, color: 'c-teal'    },
    { size: 60,  x: 45, y: 5,  speed: 15, rotX: 75,  rotY: 50,  depth: .58, color: 'c-sage'    },
    { size: 46,  x: 85, y: 88, speed: 13, rotX: 330, rotY: 140, depth: .68, color: 'c-lime'    },
  ];

  // Адаптивный выбор набора конфигов
  let CONFIGS;
  if (isMobile) {
    CONFIGS = [
      { size: 70,  x: 5,  y: 3,  speed: 36, rotX: 20,  rotY: 45,  depth: .7, color: 'c-emerald' },
      { size: 55,  x: 70, y: 2,  speed: 42, rotX: 60,  rotY: 10,  depth: .7, color: 'c-teal'    },
      { size: 48,  x: 85, y: 12, speed: 30, rotX: 110, rotY: 220, depth: .7, color: 'c-mint'    },
      { size: 65,  x: 2,  y: 18, speed: 44, rotX: 70,  rotY: 170, depth: .7, color: 'c-sage'    },
      { size: 52,  x: 45, y: 10, speed: 38, rotX: 180, rotY: 90,  depth: .7, color: 'c-lime'    },
      { size: 42,  x: 25, y: 28, speed: 34, rotX: 260, rotY: 140, depth: .7, color: 'c-emerald' },
      { size: 60,  x: 78, y: 32, speed: 32, rotX: 300, rotY: 60,  depth: .7, color: 'c-teal'    },
      { size: 44,  x: 8,  y: 42, speed: 46, rotX: 45,  rotY: 280, depth: .7, color: 'c-mint'    },
      { size: 58,  x: 60, y: 46, speed: 28, rotX: 130, rotY: 150, depth: .7, color: 'c-sage'    },
      { size: 72,  x: 35, y: 52, speed: 36, rotX: 200, rotY: 320, depth: .7, color: 'c-lime'    },
      { size: 50,  x: 82, y: 58, speed: 40, rotX: 220, rotY: 310, depth: .7, color: 'c-emerald' },
      { size: 46,  x: 15, y: 64, speed: 34, rotX: 80,  rotY: 200, depth: .7, color: 'c-teal'    },
      { size: 62,  x: 55, y: 68, speed: 30, rotX: 160, rotY: 30,  depth: .7, color: 'c-mint'    },
      { size: 38,  x: 5,  y: 76, speed: 44, rotX: 240, rotY: 120, depth: .7, color: 'c-sage'    },
      { size: 54,  x: 72, y: 78, speed: 38, rotX: 50,  rotY: 260, depth: .7, color: 'c-lime'    },
      { size: 40,  x: 88, y: 84, speed: 32, rotX: 320, rotY: 80,  depth: .7, color: 'c-emerald' },
      { size: 66,  x: 30, y: 82, speed: 36, rotX: 100, rotY: 340, depth: .7, color: 'c-teal'    },
      { size: 44,  x: 50, y: 88, speed: 42, rotX: 170, rotY: 190, depth: .7, color: 'c-mint'    },
      { size: 56,  x: 18, y: 92, speed: 30, rotX: 290, rotY: 70,  depth: .7, color: 'c-sage'    },
      { size: 48,  x: 65, y: 94, speed: 38, rotX: 40,  rotY: 230, depth: .7, color: 'c-lime'    },
    ];
  } else if (isTablet) {
    // 9 кубов — каждый второй из полного набора, размер -20%
    CONFIGS = ALL_CONFIGS
      .filter((_, i) => i % 2 === 0)
      .slice(0, 9)
      .map(c => ({ ...c, size: Math.round(c.size * 0.8) }));
  } else {
    CONFIGS = ALL_CONFIGS;
  }

  const cubes = CONFIGS.map(cfg => {
    const el = document.createElement('div');
    el.className = 'cube' + (cfg.color ? ' ' + cfg.color : '');

    const opacity = isMobile
      ? 0.55
      : 0.28 + cfg.depth * 0.52;

    el.style.cssText =
      `width:${cfg.size}px;height:${cfg.size}px;` +
      `left:${cfg.x}%;top:${cfg.y}%;opacity:${opacity}`;

    const h = cfg.size / 2;
    [
      `rotateY(0deg)   translateZ(${h}px)`,
      `rotateY(180deg) translateZ(${h}px)`,
      `rotateY(-90deg) translateZ(${h}px)`,
      `rotateY(90deg)  translateZ(${h}px)`,
      `rotateX(90deg)  translateZ(${h}px)`,
      `rotateX(-90deg) translateZ(${h}px)`,
    ].forEach(t => {
      const f = document.createElement('div');
      f.className = 'cube-face';
      f.style.cssText = `width:${cfg.size}px;height:${cfg.size}px;transform:${t}`;
      el.appendChild(f);
    });

    container.appendChild(el);
    return {
      el,
      ...cfg,
      floatOff:   Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.35,
    };
  });

  let scrollY = 0;
  let mouseX  = 0, mouseY  = 0;
  let tMouseX = 0, tMouseY = 0;
  let t0      = null;

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  // Реакция на курсор только для десктопа
  if (isDesktop) {
    document.addEventListener('mousemove', e => {
      tMouseX = (e.clientX / innerWidth  - 0.5) * 2;
      tMouseY = (e.clientY / innerHeight - 0.5) * 2;
    });
  }

  function tick(ts) {
    if (!t0) t0 = ts;
    const elapsed = (ts - t0) / 1000;

    if (isDesktop) {
      mouseX += (tMouseX - mouseX) * 0.06;
      mouseY += (tMouseY - mouseY) * 0.06;
    }

    cubes.forEach(c => {
      const floatAmp = 18;
      const floatY   = Math.sin(elapsed * c.floatSpeed + c.floatOff) * floatAmp;

      if (isMobile) {
        const parScrollY = scrollY * 0.05 * (1 - c.depth * 0.8);
        const rotMult = 0.8 + c.depth * 0.5;
        const rX = c.rotX + elapsed * (180 / c.speed) * rotMult;
        const rY = c.rotY + elapsed * (180 / (c.speed * 1.3)) * rotMult;
        const rZ = elapsed * (25 / c.speed) * rotMult;
        c.el.style.transform =
          `translate3d(0px,${floatY + parScrollY}px,0px) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`;
      } else {
        const parScrollY = scrollY * 0.05 * (1 - c.depth * 0.8);
        const cursorStr  = isDesktop ? (0.5 + c.depth * 1.5) : 0;
        const parCurX    = mouseX * 40 * cursorStr;
        const parCurY    = mouseY * 30 * cursorStr;
        const rotMult    = 0.8 + c.depth * 0.5;
        const rX = c.rotX + elapsed * (180 / c.speed) * rotMult;
        const rY = c.rotY + elapsed * (180 / (c.speed * 1.3)) * rotMult;
        const rZ = elapsed * (25 / c.speed) * rotMult;
        c.el.style.transform =
          `translate(${parCurX}px,${floatY + parScrollY + parCurY}px) ` +
          `rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`;
      }
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
