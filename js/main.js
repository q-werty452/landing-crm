// El-crm Main JS
document.addEventListener('DOMContentLoaded', () => {

  /* ── HEADER SCROLL ── */
  const header    = document.querySelector('header');
  const scrollTop = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 50;
    header?.classList.toggle('scrolled', s);
    scrollTop?.classList.toggle('on', window.scrollY > 400);
  }, { passive: true });
  scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── BURGER ── */
  const burger    = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobileNav?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger?.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── LANGUAGE ── */
  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    })
  );

  /* ── INTERSECTION OBSERVER ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.anim').forEach(el => io.observe(el));

  /* ── CRM SLIDER ── */
  makeSlider({
    wrap:    '.crm-slider',
    track:   '.crm-track',
    prev:    '.crm-prev',
    next:    '.crm-next',
    dots:    '.s-dot',
    auto:    5000,
  });

  /* ── REVIEWS SLIDER ── */
  makeReviews();

  /* ── FAQ ── */
  document.querySelectorAll('.faq-q').forEach(q =>
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    })
  );

  /* ── PRICING TOGGLE ── */
  const togSwitch  = document.querySelector('.tog-switch');
  const togBadge   = document.querySelector('.tog-badge');
  const lblMonth   = document.querySelector('.tog-month');
  const lblYear    = document.querySelector('.tog-year');
  if (togSwitch) {
    let yearly = false;
    togSwitch.addEventListener('click', () => {
      yearly = !yearly;
      togSwitch.classList.toggle('yearly', yearly);
      togBadge?.classList.toggle('on', yearly);
      lblMonth?.classList.toggle('active', !yearly);
      lblYear?.classList.toggle('active', yearly);
      document.querySelectorAll('.price-amt[data-m]').forEach(el => {
        el.textContent = yearly ? el.dataset.y : el.dataset.m;
      });
    });
    lblMonth?.classList.add('active');
  }

  /* ── NEWS FILTERS ── */
  document.querySelectorAll('.ftag').forEach(tag =>
    tag.addEventListener('click', () => {
      document.querySelectorAll('.ftag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
    })
  );

  /* ── NEWS SEARCH ── */
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('.news-card').forEach(card => {
        const title = card.querySelector('.news-title')?.textContent.toLowerCase() || '';
        card.style.display = title.includes(q) ? '' : 'none';
      });
    });
  }

  /* ── NEWS MODAL ── */
  const overlay    = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.querySelector('.modal-article-title');
  const modalText  = document.querySelector('.modal-article-text');

  const ARTICLES = [
    { title: 'El-crm получил премию «Лучший SaaS-продукт 2025»', date: '15 марта 2025', tag: 'Новости', body: 'Мы рады сообщить, что наша CRM-система El-crm была удостоена премии «Лучший SaaS-продукт 2025» по версии независимого аналитического агентства TechAwards Central Asia. Это признание стало возможным благодаря доверию наших клиентов и непрерывной работе команды над улучшением продукта.\n\nПремия вручается ежегодно компаниям, демонстрирующим выдающиеся результаты в области разработки программного обеспечения для бизнеса. В этом году El-crm обошел 47 конкурентов из 12 стран региона.\n\n«Это не просто награда — это подтверждение того, что мы движемся в правильном направлении. Мы продолжим инвестировать в развитие продукта и поддержку клиентов», — прокомментировал CEO компании.' },
    { title: 'Обновление 3.5: новый модуль аналитики и AI-ассистент', date: '8 марта 2025', tag: 'Обновления', body: 'Мы выпустили крупное обновление платформы El-crm версии 3.5. Главные нововведения включают переработанный модуль аналитики с интерактивными дашбордами, новый AI-ассистент для автоматизации рутинных задач и улучшенный интерфейс управления сделками.\n\nAI-ассистент помогает менеджерам прогнозировать вероятность закрытия сделки, предлагает оптимальное время для следующего контакта и автоматически генерирует отчёты по запросу.\n\nНовый модуль аналитики включает более 50 готовых отчётов, возможность создания кастомных дашбордов и экспорт данных в форматах Excel, PDF и Google Sheets.' },
    { title: 'Интеграция с Telegram Business и WhatsApp API', date: '28 февраля 2025', tag: 'Интеграции', body: 'El-crm теперь поддерживает нативную интеграцию с Telegram Business и WhatsApp Business API. Это позволяет вашей команде вести все переписки с клиентами прямо внутри CRM-системы без переключения между приложениями.\n\nВсе входящие сообщения автоматически привязываются к карточке клиента, история переписки сохраняется в CRM, а менеджеры получают уведомления в режиме реального времени.\n\nДля подключения интеграции перейдите в Настройки → Интеграции → Мессенджеры.' },
    { title: 'Как увеличить конверсию продаж на 35% с помощью CRM', date: '20 февраля 2025', tag: 'Руководства', body: 'В этой статье мы собрали проверенные практики использования El-crm, которые помогли нашим клиентам увеличить конверсию продаж в среднем на 35% за 3 месяца.\n\n1. Настройте автоматические напоминания о follow-up. Исследования показывают, что 80% продаж закрываются после 5-го контакта, но большинство менеджеров прекращают попытки после 2-го.\n\n2. Используйте сегментацию клиентов для персонализированных предложений. Клиенты, получающие персонализированные офферы, конвертируются на 26% лучше.\n\n3. Отслеживайте метрику «время до первого ответа». Чем быстрее вы реагируете на входящий запрос, тем выше вероятность закрытия сделки.' },
    { title: 'El-crm открывает офис в Ташкенте', date: '14 февраля 2025', tag: 'Новости', body: 'Мы рады объявить об открытии нашего нового офиса в Ташкенте, Узбекистан. Это стратегически важный шаг для расширения присутствия El-crm на рынках Центральной Азии.\n\nНовый офис будет выполнять функции регионального центра поддержки, разработки и продаж. Мы планируем нанять более 50 специалистов в течение следующих 12 месяцев.\n\nДля клиентов из Узбекистана, Казахстана и Кыргызстана теперь доступна местная техническая поддержка на русском и узбекском языках.' },
    { title: 'Кейс: Как ритейл-сеть «Маркет Плюс» автоматизировала продажи', date: '5 февраля 2025', tag: 'Кейсы', body: 'Компания «Маркет Плюс» — сеть розничных магазинов с 40 точками продаж — внедрила El-crm для автоматизации работы с корпоративными клиентами. Результаты превзошли ожидания.\n\nДо внедрения: менеджеры тратили до 3 часов в день на ручное заполнение отчётов, сделки терялись из-за отсутствия системы напоминаний, конверсия составляла 12%.\n\nПосле 2 месяцев использования El-crm: время на отчётность сократилось на 80%, конверсия выросла до 19%, среднее время закрытия сделки уменьшилось с 18 до 11 дней.' },
  ];

  document.querySelectorAll('.news-card').forEach((card, i) => {
    card.addEventListener('click', () => {
      const art = ARTICLES[i % ARTICLES.length];
      if (modalTitle) modalTitle.textContent = art.title;
      if (modalText) {
        modalText.innerHTML = art.body.split('\n\n').map(p => `<p>${p}</p>`).join('');
      }
      const metaEl = overlay?.querySelector('.modal-meta');
      if (metaEl) metaEl.innerHTML = `<span>${art.date}</span><span>·</span><span>${art.tag}</span>`;
      overlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── FORMS ── */
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = '✓ Отправлено!';
      btn.style.background = '#3A7D62';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        form.reset();
        // reset floating labels
        form.querySelectorAll('.float-group input, .float-group textarea').forEach(inp => {
          inp.dispatchEvent(new Event('input'));
        });
      }, 3000);
    });
  });

  /* ── ACTIVE NAV ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

}); // end DOMContentLoaded

/* ── GENERIC SLIDER ── */
function makeSlider({ wrap, track, prev, next, dots, auto }) {
  const w = document.querySelector(wrap);
  if (!w) return;
  const tr   = w.querySelector(track);
  const prv  = w.querySelector(prev);
  const nxt  = w.querySelector(next);
  const dts  = w.querySelectorAll(dots);
  const slds = tr?.querySelectorAll('.slide') || [];
  if (!tr || !slds.length) return;

  let cur = 0;
  const total = slds.length;

  function go(idx) {
    cur = ((idx % total) + total) % total;
    tr.style.transform = `translateX(-${cur * 100}%)`;
    dts.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  prv?.addEventListener('click', () => go(cur - 1));
  nxt?.addEventListener('click', () => go(cur + 1));
  dts.forEach((d, i) => d.addEventListener('click', () => go(i)));

  let timer = auto ? setInterval(() => go(cur + 1), auto) : null;
  w.addEventListener('mouseenter', () => { clearInterval(timer); timer = null; });
  w.addEventListener('mouseleave', () => { if (auto) timer = setInterval(() => go(cur + 1), auto); });

  // Touch swipe
  let sx = 0;
  tr.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  tr.addEventListener('touchend',   e => {
    const dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) go(cur + (dx > 0 ? 1 : -1));
  });

  go(0);
}

/* ── REVIEWS SLIDER ── */
function makeReviews() {
  const tr  = document.querySelector('.reviews-track');
  if (!tr) return;
  const cards = [...tr.querySelectorAll('.review-card')];
  if (!cards.length) return;

  let cur = 0;
  const prv = document.querySelector('.reviews-prev');
  const nxt = document.querySelector('.reviews-next');

  function perView() {
    return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }
  function go(idx) {
    const max = cards.length - perView();
    cur = Math.max(0, Math.min(idx, max));
    const w = cards[0].getBoundingClientRect().width + 24;
    tr.style.transform = `translateX(-${cur * w}px)`;
  }
  prv?.addEventListener('click', () => go(cur - 1));
  nxt?.addEventListener('click', () => go(cur + 1));
  window.addEventListener('resize', () => go(cur));
  go(0);
}
