import hashlib
import json
import pathlib
import re
import subprocess
import sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
TOOLS = ROOT / 'tools'
LAG_OK = {'date': 99, 'rate_date': 99, 'm0': 1, 'm1': 1, 'm2': 1, 'm4': 1}
MAX_LAG = 1

def step(title):
    print(f'\n== {title}')

def month_index(ym):
    y, m = map(int, ym.split('-'))
    return y * 12 + m

def check_freshness():
    data = json.loads((ROOT / 'data' / 'data.json').read_text(encoding='utf-8'))
    cols, rows = (data['columns'], data['rows'])
    latest = rows[-1][0]
    stale = []
    for i, col in enumerate(cols):
        last = next((r[0] for r in reversed(rows) if i < len(r) and r[i] is not None), None)
        if last is None:
            continue
        lag = month_index(latest) - month_index(last)
        if lag > LAG_OK.get(col, MAX_LAG):
            stale.append(f'  {col:15} последнее значение {last} (отстаёт на {lag} мес. от {latest})')
    print('\n'.join(stale) if stale else f'  все показатели есть по {latest}')

def list_todos():
    found = []
    notes = ROOT / 'data' / 'placeholders.txt'
    if notes.exists():
        found += [f'  {line}' for line in notes.read_text(encoding='utf-8').splitlines() if line.strip() and (not line.startswith('#'))]
    for folder in ('data', 'js'):
        for path in sorted((ROOT / folder).rglob('*.js')):
            if path.name.endswith('.min.js'):
                continue
            for n, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
                if 'TODO' in line:
                    found.append(f"  {path.relative_to(ROOT)}:{n}: {line.strip().lstrip('/ ')}")
    print('\n'.join(found) if found else '  нет')

def stamp_versions():
    pages = [*sorted(ROOT.glob('*.html')), *sorted((ROOT / 'other_links').glob('*.html')), *sorted((ROOT / 'ru').glob('*.html')), *sorted((ROOT / 'eng').glob('*.html'))]
    ref = re.compile('((?:src|href)=")((?!https?:|//|#)[^"?#]+\\.(?:css|js))(?:\\?v=[0-9a-f]*)?(")')
    hashes, changed = ({}, 0)
    for page in pages:
        html = page.read_text(encoding='utf-8')

        def repl(m):
            target = (page.parent / m.group(2)).resolve()
            if not target.exists():
                print(f'  нет файла, на который ссылается {page.relative_to(ROOT)}: {m.group(2)}')
                return m.group(0)
            if target not in hashes:
                hashes[target] = hashlib.md5(target.read_bytes()).hexdigest()[:8]
            return f'{m.group(1)}{m.group(2)}?v={hashes[target]}{m.group(3)}'
        new = ref.sub(repl, html)
        if new != html:
            page.write_text(new, encoding='utf-8')
            changed += 1
    print(f'  метки версий: {len(hashes)} файлов, обновлено страниц: {changed}')

def main():
    sys.stdout.reconfigure(line_buffering=True)
    step('1. Сборка data.json из data.xlsx')
    subprocess.run([sys.executable, '-I', str(TOOLS / 'build_data.py')], check=True)
    step('2. Показатели, отстающие от последнего месяца')
    check_freshness()
    step('3. Временные данные — заменить на реальные')
    list_todos()
    step('4. Метки версий у CSS/JS')
    stamp_versions()
    step('5. Проверка языковых копий страниц')
    ok = subprocess.run([sys.executable, '-I', str(TOOLS / 'check_pages.py')]).returncode == 0
    print('\nГотово к выкладке' if ok else '\nИсправьте ошибки страниц выше перед выкладкой')
    sys.exit(0 if ok else 1)
if __name__ == '__main__':
    main()
