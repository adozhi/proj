import hashlib
import html
import pathlib
import re
import shutil
import sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
NBT = OUT = None
SCOPE = '.nbt-mp'
LANG = 'ru'

def strip_comments(css):
    out, i, n, q = ([], 0, len(css), None)
    while i < n:
        c = css[i]
        if q:
            out.append(c)
            if c == '\\' and i + 1 < n:
                out.append(css[i + 1])
                i += 2
                continue
            if c == q:
                q = None
        elif c in '"\'':
            q = c
            out.append(c)
        elif css.startswith('/*', i):
            j = css.find('*/', i + 2)
            i = n if j < 0 else j + 2
            continue
        else:
            out.append(c)
        i += 1
    return ''.join(out)

def split_top(text, sep=','):
    parts, depth, q, cur = ([], 0, None, [])
    for c in text:
        if q:
            cur.append(c)
            if c == q:
                q = None
            continue
        if c in '"\'':
            q = c
        elif c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        elif c == sep and depth == 0:
            parts.append(''.join(cur))
            cur = []
            continue
        cur.append(c)
    parts.append(''.join(cur))
    return parts

def scope_selector(sel):
    sel = sel.strip()
    if not sel:
        return sel
    m = re.match('^(:root|html|body)(?![\\w-])((?:[.#:\\[][^\\s>+~]*)?)(.*)$', sel)
    if m:
        rest = m.group(3)
        rest = re.sub('^\\s+(body|html)(?![\\w-])', '', rest)
        return SCOPE + m.group(2) + rest
    return SCOPE + ' ' + sel

def scope_css(css):
    css = strip_comments(css)
    out, i, n = ([], 0, len(css))
    while i < n:
        j = css.find('{', i)
        if j < 0:
            out.append(css[i:])
            break
        prelude = css[i:j].strip()
        depth, k, q = (0, j, None)
        while k < n:
            c = css[k]
            if q:
                if c == '\\':
                    k += 2
                    continue
                if c == q:
                    q = None
            elif c in '"\'':
                q = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    break
            k += 1
        body = css[j + 1:k]
        low = prelude.lower()
        if prelude.startswith('@') and ';' in prelude:
            head, _, prelude = prelude.rpartition(';')
            out.append(head + ';\n')
            low = prelude.lower().strip()
            prelude = prelude.strip()
        if low.startswith(('@media', '@supports', '@container', '@layer')):
            out.append(f'{prelude}{{\n{scope_css(body)}}}\n')
        elif low.startswith('@'):
            out.append(f'{prelude}{{{body}}}\n')
        else:
            sels = ', '.join((scope_selector(s) for s in split_top(prelude)))
            out.append(f'{sels}{{{body}}}\n')
        i = k + 1
    return ''.join(out)

def copy_tree(name):
    src, dst = (ROOT / name, OUT / name)
    if not src.exists():
        return
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst, ignore=shutil.ignore_patterns('.DS_Store', '~$*', 'placeholders.txt', '.gitkeep'))

def write_scoped_css():
    (OUT / 'css' / 'pages').mkdir(parents=True, exist_ok=True)
    extra = f'\n{SCOPE}{{--x-head-top:0px;font-family:"Inter",system-ui,-apple-system,sans-serif;line-height:1.65;color:var(--text,#1e293b);text-align:left}}\n{SCOPE} a:hover{{text-decoration:none}}\n{SCOPE} img{{max-width:100%}}\n{SCOPE} *{{font-family:inherit;transition:none}}\n{SCOPE} header{{background:transparent !important;box-shadow:none;z-index:auto;width:auto}}\n{SCOPE} .x-story .x-block__head{{background:var(--bg,#f1f5f9) !important;z-index:20}}\n{SCOPE}.nbt-mp--page{{font-size:16px}}\n{SCOPE} :is(h1,h2,h3,h4,h5,h6){{line-height:1.65}}\n{SCOPE} button{{line-height:normal}}\n'
    for f in list((ROOT / 'css').glob('*.css')) + list((ROOT / 'css' / 'pages').glob('*.css')):
        rel = f.relative_to(ROOT)
        text = scope_css(f.read_text(encoding='utf-8'))
        if rel.name in ('detail.css', 'styles.css'):
            text += extra
        if rel.name == 'styles.css':
            text += HOME_FIX
        (OUT / rel).write_text(text, encoding='utf-8')
HOME_FIX = f"\n{SCOPE}.nbt-mp--home{{background:transparent;min-height:0;display:block;font-size:16px}}\n{SCOPE}.nbt-mp--home .container{{max-width:none;padding:0}}\n{SCOPE}.nbt-mp--home .stats-wrap{{padding:0 0 8px}}\n"

def find_cards_ru(s):
    anchor = s.index('Процентные ставки монетарной политики')
    i = s.rindex('<div class="row g-3 g-md-4">', 0, anchor)
    depth = 0
    for m in re.finditer('<(/?)div\\b[^>]*>', s[i:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return (i, i + m.end())
    raise SystemExit('не нашёл конец блока с тремя карточками')

def find_cards_en(s):
    k = s.index('<div class="nbtw-root"')
    i = s.rindex('<!------------->', 0, k)
    j = s.index('<!------------------------>', k) + len('<!------------------------>')
    return (i, j)
SITES = {'ru': dict(dir='nbt', folder='ru', suffix='_ru', menu='Монетарная политика', label=1, cards=find_cards_ru, drop=[]), 'en': dict(dir='nbt-eng', folder='eng', suffix='_eng', menu='Monetary Policy', label=2, cards=find_cards_en, drop=['<script src="js/page_d9354142cd95bbbcddb6bb3b230ae94f_v1.js"></script>'])}
CFG = SITES['ru']

def menu_html(prefix):
    nav = (ROOT / 'js' / 'site-nav.js').read_text(encoding='utf-8')
    k = CFG['label']

    def pages(block):
        return [(m[0], m[1 + k]) for m in re.findall("slug: '([\\w-]+)',\\s*label: L\\('([^']*)', '([^']*)', '([^']*)'\\)", block)]
    top = nav[nav.index('pages: ['):nav.index('groups: [')]
    groups = [(g[k], g[3]) for g in re.findall("\\{ label: L\\('([^']*)', '([^']*)', '([^']*)'\\),\\s*pages: \\[(.*?)\\] \\}", nav, re.S)]
    link = lambda slug: f"{prefix}monetary/{CFG['folder']}/{slug}{CFG['suffix']}.html"
    li = lambda slug, label: f'<li><a href="{link(slug)}" class="nav-link">{html.escape(label)}</a></li>'
    items = [li(s, l) for s, l in pages(top)]
    for g_label, g_body in groups:
        sub = ''.join((li(s, l) for s, l in pages(g_body)))
        items.append(f'<li class="nav-item drop-down"><a href="{link(pages(g_body)[0][0])}" class="nav-link parent-item">{html.escape(g_label)}</a><ul class="sub-menu nav">{sub}</ul></li>')
    return f'''<li class="nav-item drop-down" data-nbt-mp="menu">\n<a href="{link('maksad')}" class="nav-link ">{CFG['menu']}</a>\n<ul class="sub-menu nav">\n{chr(10).join(items)}\n</ul></li>'''

def element_end(s, i, tag):
    depth = 0
    for m in re.finditer(f'<(/?){tag}\\b[^>]*>', s[i:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return i + m.end()
    raise SystemExit(f'не нашёл конец элемента <{tag}>')

def replace_marked(s, name, tag, new, fallback_find):
    key = f'data-nbt-mp="{name.lower()}"'
    if key in s:
        i = s.rindex(f'<{tag}', 0, s.index(key))
        return s[:i] + new + s[element_end(s, i, tag):]
    a, b = (f'<!-- NBT-MP:{name} START -->', f'<!-- NBT-MP:{name} END -->')
    if a in s:
        i = s.index(a)
        j = s.index(b) + len(b)
        return s[:i] + new + s[j:]
    i, j = fallback_find(s)
    return s[:i] + new + s[j:]

ASSET = re.compile('<link[^>]*data-nbt-mp="asset"[^>]*>\\n?|<script[^>]*data-nbt-mp="asset"[^>]*>.*?</script>\\n?|<!-- NBT-MP:ASSETS START -->.*?<!-- NBT-MP:ASSETS END -->', re.S)

def find_menu(s):
    anchor = s.index(f">{CFG['menu']}</a>")
    i = s.rindex('<li class="nav-item drop-down">', 0, anchor)
    depth = 0
    for m in re.finditer('<(/?)li\\b[^>]*>', s[i:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return (i, i + m.end())
    raise SystemExit(f"не нашёл конец пункта меню «{CFG['menu']}»")

def cards_html():
    src = (ROOT / 'index.html').read_text(encoding='utf-8')
    i = src.index('<div class="stats-wrap">')
    j = element_end(src, i, 'div')
    block = src[i:j]
    block = re.sub('href="other_links/([\\w-]+)\\.html', lambda m: f"""href="monetary/{CFG['folder']}/{m.group(1)}{CFG['suffix']}.html""", block)
    return '<div class="nbt-mp nbt-mp--home" data-nbt-mp="cards"><div class="nbt-home view-3">\n' + block + '\n</div></div>'

def home_assets():
    return f"""<link rel="stylesheet" href="monetary/fonts/inter.css" data-nbt-mp="asset">\n<link rel="stylesheet" href="monetary/css/styles.css" data-nbt-mp="asset">\n<link rel="stylesheet" href="monetary/css/home.css" data-nbt-mp="asset">\n<script data-nbt-mp="asset">window.NBT_EMBED = {{ lang: '{LANG}', base: 'monetary/', root: '.nbt-mp--home', view: '3' }};</script>\n""" + ''.join((f'<script src="monetary/{p}" data-nbt-mp="asset"></script>\n' for p in ('js/chart.umd.min.js', 'js/chart-style.js', 'js/palette.js', 'js/data.js', 'js/site-nav.js', 'data/meetings.js', 'data/targets.js', 'js/script.js', 'js/home.js')))
REL = re.compile('(\\b(?:src|href)=")(?!https?:|//|/|#|data:|mailto:|tel:|javascript:|\\.\\./\\.\\./)([^"]+")')

def stamp(text, prefix):
    def one(m):
        f = OUT / m.group(2)
        if not f.exists():
            return m.group(0)
        return f'{m.group(1)}{prefix}{m.group(2)}?v={hashlib.md5(f.read_bytes()).hexdigest()[:8]}"'
    return re.sub('(\\b(?:src|href)=")' + re.escape(prefix) + '((?:css|js|data|fonts)/[^"?]+\\.(?:css|js))(?:\\?v=[0-9a-f]*)?"', one, text)

def host_template(index):
    head_end = index.index('</header>') + len('</header>')
    foot = index.index('<footer>')
    foot = index.rindex('\n', 0, foot) + 1
    fix = lambda part: REL.sub(lambda m: m.group(1) + '../../' + m.group(2), part)
    bottom = ASSET.sub('', index[foot:])
    return (fix(index[:head_end]), fix(bottom))

def page_html(src, top, bottom):
    title = re.search('<title>(.*?)</title>', src, re.S).group(1).strip()
    head = src[:src.index('</head>')]
    head_links = re.findall('<link rel="stylesheet"[^>]*>|<script\\b[^>]*>.*?</script>', head, re.S)
    body = src[src.index('<body>') + len('<body>'):src.rindex('</body>')]
    body = re.sub('<header class="page-header">.*?</header>', '', body, count=1, flags=re.S)
    body = body.replace('href="../index.html"', 'href="../../index.html"')
    page = top.replace(re.search('<title>.*?</title>', top, re.S).group(0), f'<title>{title}</title>', 1) if '<title>' in top else top
    embed = f"<script>window.NBT_EMBED = {{ lang: '{LANG}', home: '../../index.html' }};</script>\n"
    page = page.replace('</head>', embed + '\n'.join(head_links) + '\n</head>', 1)
    return stamp(page + '\n<div class="nbt-mp nbt-mp--page">\n' + body + '\n</div>\n' + bottom, '../')

def export(lang, site_dir):
    global NBT, OUT, CFG, LANG
    CFG, LANG = (SITES[lang], lang)
    NBT = site_dir.resolve()
    OUT = NBT / 'monetary'
    index_path = NBT / 'index.html'
    if not index_path.exists():
        sys.exit(f'нет файла {index_path}')
    original = NBT / 'index.original.html'
    if not original.exists():
        shutil.copy2(index_path, original)
    OUT.mkdir(exist_ok=True)
    for d in ('js', 'data', 'fonts', 'docs', 'img'):
        copy_tree(d)
    write_scoped_css()
    s = index_path.read_text(encoding='utf-8')
    for tag in CFG['drop']:
        s = s.replace(tag, '')
    s = s.replace('<!-- NBT-MP: removed the old demo script -->', '')
    s = replace_marked(s, 'MENU', 'li', menu_html(''), find_menu)
    s = replace_marked(s, 'CARDS', 'div', cards_html(), CFG['cards'])
    s = ASSET.sub('', s)
    k = s.rindex('</body>')
    s = s[:k] + stamp(home_assets(), 'monetary/') + s[k:]
    index_path.write_text(s, encoding='utf-8')
    top, bottom = host_template(s)
    folder = CFG['folder']
    (OUT / folder).mkdir(exist_ok=True)
    pages = sorted((ROOT / folder).glob(f"*{CFG['suffix']}.html"))
    for p in pages:
        (OUT / folder / p.name).write_text(page_html(p.read_text(encoding='utf-8'), top, bottom), encoding='utf-8')
    print(f'Готово ({lang}): главная {index_path.relative_to(NBT.parent)}, страниц {len(pages)} в {(OUT / folder).relative_to(NBT.parent)}')

def main():
    args = sys.argv[1:]
    if args and args[0] in SITES:
        lang = args[0]
        export(lang, pathlib.Path(args[1]) if len(args) > 1 else ROOT.parent / SITES[lang]['dir'])
        return
    done = 0
    for lang, cfg in SITES.items():
        d = ROOT.parent / cfg['dir']
        if (d / 'index.html').exists():
            export(lang, d)
            done += 1
    if not done:
        sys.exit('не нашёл ни ../nbt, ни ../nbt-eng')
if __name__ == '__main__':
    main()
