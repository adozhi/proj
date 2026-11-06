(function () {

  function getBaseName() {
    const file = location.pathname.split('/').pop();
    return file.replace(/(_ru|_eng)\.html$/, '.html').replace('.html', '');
  }

  function buildUrl(lang) {
    const base = getBaseName();
    const map = {
      tj: `../other_links/${base}.html`,
      ru: `../ru/${base}_ru.html`,
      en: `../eng/${base}_eng.html`,
    };
    return (map[lang] || map.tj) + location.hash;
  }

  window.setLang = function (lang) {
    document.body.style.opacity = '0.4';
    setTimeout(() => {
      try { localStorage.setItem('lang', lang); } catch (e) {}
      window.location.href = buildUrl(lang);
    }, 150);
  };

  function pageLang() {
    const dir = location.pathname.split('/').slice(-2, -1)[0];
    return dir === 'ru' ? 'ru' : dir === 'eng' ? 'en' : 'tj';
  }
  window.nbtPageLang = pageLang;

  window.nbtMonthTick = function (months) {
    return function (v) {
      const l = this.getLabelForValue(v);
      if (!/^\d{4}-\d{2}$/.test(l)) return l;
      const [y, m] = l.split('-').map(Number);
      return months[m - 1].slice(0, 3).toLowerCase() + ' ' + String(y).slice(2);
    };
  };
  window.nbtTicks = () => (window.innerWidth < 640 ? 5 : 12);

  function initLangButtons() {
    const lang = pageLang();
    try { localStorage.setItem('lang', lang); } catch (e) {}
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      const m = btn.getAttribute('onclick')?.match(/'([a-z]+)'/);
      btn.classList.toggle('active', m?.[1] === lang);
    });
  }

  document.addEventListener('DOMContentLoaded', initLangButtons);

})();
