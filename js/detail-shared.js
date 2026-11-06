(function () {

  var LANG = ((window.NBT_EMBED && window.NBT_EMBED.lang) || document.documentElement.lang || 'tg').slice(0, 2);
  var T = {
    tg: { toggle: 'Кушодан / Пӯшидан', expandAll: 'Ҳамаро кушодан', collapseAll: 'Ҳамаро пӯшидан', kb: 'КБ', mb: 'МБ' },
    ru: { toggle: 'Развернуть / Свернуть', expandAll: 'Развернуть все', collapseAll: 'Свернуть все', kb: 'КБ', mb: 'МБ' },
    en: { toggle: 'Expand / Collapse', expandAll: 'Expand all', collapseAll: 'Collapse all', kb: 'KB', mb: 'MB' },
  }[LANG] || null;
  if (!T) T = { toggle: 'Кушодан / Пӯшидан', expandAll: 'Ҳамаро кушодан', collapseAll: 'Ҳамаро пӯшидан', kb: 'КБ', mb: 'МБ' };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var bar = document.getElementById('readProgress');
  if (bar) {
    function updateBar() {
      var doc = document.documentElement;
      var pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
  }

  var btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > window.innerHeight * 0.9);
    }, { passive: true });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  document.querySelectorAll('.instrument-num').forEach(function (el, i) {
    el.textContent = String(i + 1).padStart(2, '0');
  });

  var chevron = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">'
    + '<path d="M4 6l4 4 4-4" stroke="#64748b" stroke-width="2"'
    + ' stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var cardsAll = Array.from(document.querySelectorAll('.instrument-card')).filter(function (c) {
    return c.querySelector('.instrument-card__header') && c.querySelector('.instrument-card__body');
  });

  function bodyOf(card) { return card.querySelector('.instrument-card__body'); }

  function setOpen(card, open, animate) {
    var body = bodyOf(card);
    var btn  = card.querySelector('.card-toggle');
    var isOpen = !card.classList.contains('instrument-card--collapsed');
    if (btn) btn.setAttribute('aria-expanded', String(open));
    if (open === isOpen) return;
    if (!animate || reduceMotion) {
      card.classList.toggle('instrument-card--collapsed', !open);
      return;
    }
    if (open) {
      card.classList.remove('instrument-card--collapsed');
      var h = body.scrollHeight;
      body.style.height = '0px';
      body.classList.add('is-animating');
      requestAnimationFrame(function () { body.style.height = h + 'px'; });
    } else {
      body.style.height = body.scrollHeight + 'px';
      body.classList.add('is-animating');
      requestAnimationFrame(function () { body.style.height = '0px'; });
    }
    body.addEventListener('transitionend', function done() {
      body.removeEventListener('transitionend', done);
      body.classList.remove('is-animating');
      body.style.height = '';
      if (!open) card.classList.add('instrument-card--collapsed');
    });
  }

  cardsAll.forEach(function (card, i) {
    var header = card.querySelector('.instrument-card__header');
    var body   = bodyOf(card);
    if (!body.id) body.id = (card.id || 'card-' + (i + 1)) + '-body';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-toggle';
    btn.setAttribute('aria-label', T.toggle);
    btn.setAttribute('aria-controls', body.id);
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = chevron;
    header.appendChild(btn);

    header.addEventListener('click', function (e) {

      if (String(window.getSelection && window.getSelection()) !== '' && e.target !== btn && !btn.contains(e.target)) return;
      if (e.target.closest('a') && !e.target.closest('.card-toggle')) return;
      setOpen(card, card.classList.contains('instrument-card--collapsed'), true);
    });
  });

  function cardFor(el) { return el && el.closest ? el.closest('.instrument-card') : null; }

  function openTarget(id, scroll) {
    if (!id) return false;
    var el;
    try { el = document.getElementById(decodeURIComponent(id)); } catch (e) { return false; }
    var card = cardFor(el);
    if (!card) return false;
    setOpen(card, true, false);
    if (scroll) el.scrollIntoView({ block: 'start', behavior: 'instant' });
    return true;
  }

  var hashId = location.hash.slice(1);
  if (cardsAll.length > 6) {
    cardsAll.forEach(function (card, i) { if (i >= 2) setOpen(card, false, false); });
  }
  if (hashId && openTarget(hashId, true)) {

    setTimeout(function () { openTarget(hashId, true); }, 0);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').length > 1) openTarget(a.getAttribute('href').slice(1), false);
  });
  window.addEventListener('hashchange', function () { openTarget(location.hash.slice(1), true); });

  if (cardsAll.length > 3) {
    var bar2 = document.createElement('div');
    bar2.className = 'cards-actions';
    var allBtn = document.createElement('button');
    allBtn.type = 'button';
    function syncAllBtn() {
      var anyClosed = cardsAll.some(function (c) { return c.classList.contains('instrument-card--collapsed'); });
      allBtn.textContent = anyClosed ? T.expandAll : T.collapseAll;
      allBtn.dataset.mode = anyClosed ? 'open' : 'close';
    }
    allBtn.addEventListener('click', function () {
      var open = allBtn.dataset.mode === 'open';
      cardsAll.forEach(function (c) { setOpen(c, open, false); });
      syncAllBtn();
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.instrument-card__header')) setTimeout(syncAllBtn, 300);
    });
    bar2.appendChild(allBtn);
    cardsAll[0].parentNode.insertBefore(bar2, cardsAll[0]);
    syncAllBtn();
  }

  document.querySelectorAll('nav[data-toc="auto"]').forEach(function (nav) {
    var scope = nav.parentElement;
    var items = Array.from(scope.querySelectorAll('.x-block')).map(function (sec, i) {
      var h = sec.querySelector('.x-block__head h2');
      if (!h) return '';
      if (!sec.id) sec.id = 'section-' + (i + 1);
      return '<a href="#' + sec.id + '">' + h.textContent.trim().replace(/:$/, '') + '</a>';
    }).join('');
    if (items) nav.innerHTML = items;
  });

  var cards    = Array.from(document.querySelectorAll('.instrument-card[id], .x-block[id]'));
  var navLinks = {};
  document.querySelectorAll('.instrument-nav a').forEach(function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    if (id) navLinks[id] = a;
  });

  if (cards.length && Object.keys(navLinks).length && window.IntersectionObserver) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Object.values(navLinks).forEach(function (a) { a.classList.remove('nav--active'); });
          var link = navLinks[entry.target.id];
          if (link) link.classList.add('nav--active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach(function (card) { io.observe(card); });
  }

  function moveInto(target, cell) { while (cell.firstChild) target.appendChild(cell.firstChild); return target; }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }

  var FIGURE = /^\s*([+−-]?\d+(?:[.,]\d+)?\s*%(?:\s*[±]\s*\d+(?:[.,]\d+)?\s*(?:п\.п\.|б\.ф\.|pp|p\.p\.)?)?)/;
  function liftFigure(box) {
    var m = box.textContent.match(FIGURE);
    if (!m) return;

    var need = m[0].replace(/\s+$/, '').length, got = 0, big = el('span', 'xt-figure');
    while (box.firstChild && got < need) {
      var n = box.firstChild, len = n.textContent.length;
      if (n.nodeType === 3 && got + len > need) { n.splitText(need - got); }
      got += n.textContent.length;
      big.appendChild(n);
    }
    if (big.firstChild && big.firstChild.nodeType === 3) big.firstChild.textContent = big.firstChild.textContent.replace(/^\s+/, '');
    var rest = box.firstChild;
    if (rest && rest.nodeType === 3) rest.textContent = rest.textContent.replace(/^\s*[—–-]?\s*/, ' ');
    box.insertBefore(big, box.firstChild);
  }

  document.querySelectorAll('.page-wrap table.styled-table').forEach(function (table) {
    var head = Array.from(table.querySelectorAll('thead th')).map(function (th) { return th.textContent.trim(); });
    var rows = Array.from(table.querySelectorAll('tbody tr')).filter(function (tr) { return tr.children.length; });
    if (!rows.length) return;
    var box;

    if (table.classList.contains('kv-table')) {

      box = el('dl', 'xt-dossier');
      rows.forEach(function (tr) {
        var item = el('div', 'xt-dossier__item');
        var dt = moveInto(el('dt'), tr.children[0]);
        var dd = moveInto(el('dd'), tr.children[1] || el('td'));
        liftFigure(dd);
        item.appendChild(dt); item.appendChild(dd); box.appendChild(item);
      });
    } else if (head.length === 3) {

      box = el('div', 'xt-shift');
      var top = el('div', 'xt-shift__head');
      top.innerHTML = '<span></span><span class="xt-shift__from"></span><span class="xt-shift__arrow" aria-hidden="true">→</span><span class="xt-shift__to"></span>';
      top.children[1].textContent = head[1]; top.children[3].textContent = head[2];
      box.appendChild(top);
      rows.forEach(function (tr) {
        var row = el('div', 'xt-shift__row');
        row.appendChild(moveInto(el('span', 'xt-shift__what'), tr.children[0]));
        var from = moveInto(el('span', 'xt-shift__from'), tr.children[1]); from.setAttribute('data-label', head[1]);
        var to = moveInto(el('span', 'xt-shift__to'), tr.children[2]); to.setAttribute('data-label', head[2]);
        row.appendChild(from);
        var ar = el('span', 'xt-shift__arrow'); ar.setAttribute('aria-hidden', 'true'); ar.textContent = '→'; row.appendChild(ar);
        row.appendChild(to);
        box.appendChild(row);
      });
    } else if (head.length === 2 || rows[0].children.length === 2) {

      box = el('ol', 'xt-rail');
      rows.forEach(function (tr, i) {
        var li = el('li', 'xt-rail__step');
        var name = moveInto(el('span', 'xt-rail__name'), tr.children[0]);
        var val = moveInto(el('span', 'xt-rail__value'), tr.children[1]);
        liftFigure(val);

        var live = val.querySelector('[id^="corridor-"], [data-nbt^="rate"]');
        if (live && !val.querySelector('.xt-figure')) {
          var fig = el('span', 'xt-figure');
          var sync = function () { fig.textContent = live.textContent.trim() + '%'; };
          sync();
          if (window.MutationObserver) new MutationObserver(sync).observe(live, { childList: true, characterData: true, subtree: true });
          val.insertBefore(fig, val.firstChild);
        }
        if (tr.children[0] && /центр|center|марказ/i.test(name.textContent)) li.classList.add('is-centre');
        li.appendChild(name); li.appendChild(val); box.appendChild(li);
      });
    }
    if (!box) return;
    var wrap = table.closest('.table-wrap') || table;
    wrap.parentNode.replaceChild(box, wrap);
  });

  document.querySelectorAll('.members-table').forEach(function (table) {
    var heads = Array.from(table.querySelectorAll('thead th')).map(function (th) { return th.textContent.trim(); });
    table.querySelectorAll('tbody tr').forEach(function (tr) {
      Array.from(tr.children).forEach(function (td, i) { if (heads[i]) td.setAttribute('data-label', heads[i]); });
    });
  });

  var TOGGLES = '.btn-overlay, .chart-type-btn';
  function syncPressed(el) {
    el.setAttribute('aria-pressed', String(el.classList.contains('btn-overlay--active') || el.classList.contains('active')));
  }
  document.querySelectorAll(TOGGLES).forEach(syncPressed);
  if (window.MutationObserver) {
    new MutationObserver(function (list) {
      list.forEach(function (m) {
        if (m.type === 'attributes' && m.target.matches && m.target.matches(TOGGLES)) syncPressed(m.target);
        if (m.type === 'childList') m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.matches(TOGGLES)) syncPressed(n);
          n.querySelectorAll && n.querySelectorAll(TOGGLES).forEach(syncPressed);
        });
      });
    }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
  }

  var docLinks = Array.from(document.querySelectorAll('a.doc-link[href$=".pdf"], a.doc-link[href*=".pdf?"]'))
    .filter(function (a) { return a.origin === location.origin; });
  if (docLinks.length && docLinks.length <= 40 && window.fetch) {
    docLinks.forEach(function (a) {
      fetch(a.href, { method: 'HEAD' }).then(function (r) {
        var n = +r.headers.get('content-length');
        if (!r.ok || !n) return;
        var size = n >= 1048576 ? (n / 1048576).toFixed(1).replace('.', LANG === 'en' ? '.' : ',') + ' ' + T.mb : Math.round(n / 1024) + ' ' + T.kb;
        var span = document.createElement('span');
        span.className = 'doc-size';
        span.textContent = 'PDF, ' + size;
        a.appendChild(span);
      }).catch(function () {});
    });
  }

})();
