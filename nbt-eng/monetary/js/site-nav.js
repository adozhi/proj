(function () {

  const L = (tj, ru, en) => ({ tj, ru, en });

  const NAV = {
    label: L('Сиёсати пулӣ', 'Денежно-кредитная политика', 'Monetary Policy'),
    pages: [
      { slug: 'maksad',     label: L('Мақсад ва вазифаҳо', 'Цели и задачи', 'Goals and Objectives') },
      { slug: 'fishang',    label: L('Фишангҳои сиёсати пулӣ', 'Инструменты денежно-кредитной политики', 'Monetary Policy Instruments') },
      { slug: 'kumita_bmt', label: L('Кумитаи сиёсати пулию қарзӣ', 'Комитет по денежно-кредитной политике', 'Monetary Policy Committee') },
      { slug: 'samtho',     label: L('Самтҳои асосии сиёсати пулию қарзӣ', 'Основные направления денежно-кредитной политики', 'Main Directions of Monetary Policy') },
    ],
    groups: [
      { label: L('Нишондиҳандаҳо', 'Показатели', 'Indicators'),
        pages: [
          { slug: 'policy_rate', label: L('Меъёри бозтамвил', 'Ставка рефинансирования', 'Refinancing Rate') },
          { slug: 'inflation',   label: L('Таваррум', 'Инфляция', 'Inflation') },
          { slug: 'charts',      label: L('Диаграммаҳо', 'Диаграммы', 'Charts') },
        ] },
      { label: L('Шарҳ ва интишорот', 'Обзоры и публикации', 'Reviews and Publications'),
        pages: [
          { slug: 'sharhi_mohonai_tavarrum', label: L('Шарҳи моҳонаи таваррум', 'Ежемесячный обзор инфляции', 'Monthly Inflation Review') },
          { slug: 'shahri-tav',              label: L('Шарҳи таваррум', 'Обзор инфляции', 'Inflation Report') },
          { slug: 'sharhi_monetary',         label: L('Шарҳи монетарӣ', 'Монетарный обзор', 'Monetary Review') },
          { slug: 'macroeconomic',           label: L('Шарҳи макроиқтисодӣ', 'Макроэкономический обзор', 'Macroeconomic Review') },
        ] },
    ],
  };

  const HOME  = L('Асосӣ', 'Главная', 'Home');
  const DIR   = { tj: ['other_links', ''], ru: ['ru', '_ru'], en: ['eng', '_eng'] };

  function href(slug, lang, fromRoot) {
    const [dir, suffix] = DIR[lang] || DIR.tj;
    return (fromRoot ? '' : '../') + `${dir}/${slug}${suffix}.html`;
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  window.nbtRenderMainMenu = function (ul, lang) {
    if (!ul) return;

    const item = p => `<li><a href="${href(p.slug, lang, true)}">${esc(p.label[lang])}</a></li>`;
    ul.innerHTML =
      `<li class="menu-item dropdown">
        <a href="#" role="button" aria-haspopup="true" aria-expanded="false">${esc(NAV.label[lang])}</a>
        <ul class="dropdown-menu">
          ${NAV.pages.map(item).join('')}
          ${NAV.groups.map(g => `
          <li class="dropdown-sub">
            <a href="#" role="button" aria-haspopup="true" aria-expanded="false">${esc(g.label[lang])}</a>
            <ul class="dropdown-menu">${g.pages.map(item).join('')}</ul>
          </li>`).join('')}
        </ul>
      </li>`;
  };

  function renderSectionBar() {

    const header = document.querySelector('.page-header') || document.querySelector('[data-nbt-section-bar]');
    if (!header || typeof window.nbtPageLang !== 'function') return;
    const lang = window.nbtPageLang();
    const file = location.pathname.split('/').pop().replace(/(_ru|_eng)?\.html$/, '');

    let group = null, page = NAV.pages.find(p => p.slug === file), siblings = NAV.pages;
    if (!page) {
      group = NAV.groups.find(g => g.pages.some(p => p.slug === file));
      if (!group) return;
      page = group.pages.find(p => p.slug === file);
      siblings = group.pages;
    }

    const crumbs = [
      `<li><a href="${(window.NBT_EMBED && window.NBT_EMBED.home) || '../index.html'}">${esc(HOME[lang])}</a></li>`,
      `<li>${esc(NAV.label[lang])}</li>`,
      group ? `<li>${esc(group.label[lang])}</li>` : '',
      `<li aria-current="page">${esc(page.label[lang])}</li>`,
    ].join('');
    const tabs = siblings.map(p => p.slug === file
      ? `<li><a class="is-current" aria-current="page" href="${href(p.slug, lang)}">${esc(p.label[lang])}</a></li>`
      : `<li><a href="${href(p.slug, lang)}">${esc(p.label[lang])}</a></li>`).join('');

    const nav = document.createElement('nav');
    nav.className = 'section-nav';
    nav.setAttribute('aria-label', (group || NAV).label[lang]);
    nav.innerHTML =
      `<div class="section-nav__inner">
        <ol class="breadcrumbs">${crumbs}</ol>
        <ul class="section-nav__tabs">${tabs}</ul>
      </div>`;
    header.insertAdjacentElement('afterend', nav);

    const list = nav.querySelector('.section-nav__tabs');
    const cur  = nav.querySelector('.is-current');
    if (list && cur) list.scrollLeft = cur.offsetLeft - (list.clientWidth - cur.offsetWidth) / 2;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderSectionBar);
  else renderSectionBar();

})();
