document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('langSwitch');
    const current = localStorage.getItem('lang') || 'en';
    applyLang(current);
    if (switcher) {
      switcher.addEventListener('click', () => {
        const next = (localStorage.getItem('lang') || 'en') === 'en' ? 'sr' : 'en';
        localStorage.setItem('lang', next);
        applyLang(next);
      });
    }
    async function applyLang(l) {
      const res = await fetch(`data/lang-${l}.json`);
      const dict = await res.json();
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) el.textContent = dict[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
      });
      if (switcher) switcher.textContent = l === 'en' ? 'SR' : 'EN';
      document.documentElement.setAttribute('lang', l);
    }
  });
  
  