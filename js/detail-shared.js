// shared UI for all detail pages: progress bar, back-to-top, accordion, nav highlight
(function () {

  // progress bar
  var bar = document.getElementById('readProgress');
  if (bar) {
    function updateBar() {
      var doc = document.documentElement;
      var pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
  }

  // back to top
  var btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // number each card
  document.querySelectorAll('.instrument-num').forEach(function (el, i) {
    el.textContent = String(i + 1).padStart(2, '0');
  });

  // accordion toggle
  var chevron = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">'
    + '<path d="M4 6l4 4 4-4" stroke="#64748b" stroke-width="2"'
    + ' stroke-linecap="round" stroke-linejoin="round"/></svg>';

  document.querySelectorAll('.instrument-card__header').forEach(function (header) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-toggle';
    btn.setAttribute('aria-label', 'Кушодан / Пӯшидан');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = chevron;
    header.appendChild(btn);

    function toggle(e) {
      e.stopPropagation();
      var card = header.closest('.instrument-card');
      var collapsed = card.classList.toggle('instrument-card--collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
    }
    btn.addEventListener('click', toggle);
    header.addEventListener('click', toggle);
  });

  // open card from URL hash
  var hash = window.location.hash;
  if (hash) {
    try {
      var target = document.querySelector(hash + '.instrument-card--collapsed');
      if (target) target.classList.remove('instrument-card--collapsed');
    } catch (e) {}
  }

  // active nav pill via IntersectionObserver
  var cards    = Array.from(document.querySelectorAll('.instrument-card[id]'));
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

})();
