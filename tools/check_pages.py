import pathlib
import re
import sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
LANGS = {'tj': ('other_links', ''), 'ru': ('ru', '_ru'), 'en': ('eng', '_eng')}

def page_names():
    return sorted((p.stem for p in (ROOT / 'other_links').glob('*.html')))

def inspect(path):
    s = path.read_text(encoding='utf-8')
    return {'inline': len(re.findall('<(?:style|script)>', s)), 'assets': re.findall('<(?:link rel="stylesheet" href|script src)="([^"]+)"', s), 'ids': set(re.findall('\\sid="([^"]+)"', s))}

def main():
    problems = []
    for name in page_names():
        info = {}
        for lang, (folder, suffix) in LANGS.items():
            path = ROOT / folder / f'{name}{suffix}.html'
            if not path.exists():
                problems.append(f'{name}: нет файла {path.relative_to(ROOT)}')
                continue
            info[lang] = inspect(path)
        for lang, i in info.items():
            if i['inline']:
                problems.append(f"{name} [{lang}]: встроенные блоки <style>/<script>: {i['inline']}")
        base = info.get('tj')
        if not base:
            continue
        for lang in ('ru', 'en'):
            other = info.get(lang)
            if not other:
                continue
            if other['assets'] != base['assets']:
                problems.append(f"{name} [{lang}]: подключённые файлы отличаются от tj\n    tj: {base['assets']}\n    {lang}: {other['assets']}")
            for missing in sorted(base['ids'] - other['ids']):
                problems.append(f'{name} [{lang}]: id="{missing}" есть только в tj')
            for extra in sorted(other['ids'] - base['ids']):
                problems.append(f'{name} [{lang}]: id="{extra}" нет в tj')
    if problems:
        print('\n'.join(problems))
        sys.exit(1)
    print(f'{len(page_names())} страниц × 3 языка: копии совпадают')
if __name__ == '__main__':
    main()
