/* ===== ПЕРЕКЛЮЧАТЕЛЬ ТЕМ ===== */
(function () {
  const ROOT = document.documentElement;
  const KEY  = 'el-crm-theme';

  const icons = {
    blue:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6a6 6 0 1 0 6 6"/><circle cx="12" cy="12" r="2"/></svg>',
    green: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6a6 6 0 1 0 6 6"/><circle cx="12" cy="12" r="2"/></svg>',
  };

  // Применяем data-theme сразу — до DOMContentLoaded, чтобы не было мигания
  const saved = localStorage.getItem(KEY) || 'blue';
  if (saved === 'green') {
    ROOT.setAttribute('data-theme', 'green');
  } else {
    ROOT.removeAttribute('data-theme');
  }

  function applyTheme(theme) {
    if (theme === 'green') {
      ROOT.setAttribute('data-theme', 'green');
    } else {
      ROOT.removeAttribute('data-theme');
    }
    localStorage.setItem(KEY, theme);

    // Обновляем кнопку — запрашиваем элементы здесь, а не при загрузке скрипта
    const icon  = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    if (icon)  icon.innerHTML    = theme === 'green' ? icons.blue  : icons.green;
    if (label) label.textContent = theme === 'green' ? 'Синяя'    : 'Зелёная';
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Синхронизируем кнопку с текущей темой
    const current = ROOT.getAttribute('data-theme') === 'green' ? 'green' : 'blue';
    applyTheme(current);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const now = ROOT.getAttribute('data-theme') === 'green' ? 'green' : 'blue';
        applyTheme(now === 'green' ? 'blue' : 'green');
      });
    }
  });
})();
