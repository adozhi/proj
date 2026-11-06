import datetime
import json
import pathlib
import sys
import openpyxl
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'data' / 'data.xlsx'
DST = ROOT / 'data' / 'data.json'

def cell(v):
    if isinstance(v, (datetime.date, datetime.datetime)):
        return v.strftime('%Y-%m')
    if isinstance(v, float) and v.is_integer():
        return int(v)
    if isinstance(v, float):
        return round(v, 6)
    if isinstance(v, str):
        v = v.strip()
        return v or None
    return v

def main():
    values = openpyxl.load_workbook(SRC, data_only=True).worksheets[0]
    formulas = openpyxl.load_workbook(SRC).worksheets[0]
    columns = [c.value for c in values[1]]
    if columns[0] != 'date':
        sys.exit(f'первый столбец должен называться "date", а сейчас {columns[0]!r}')
    missing = [f.coordinate for row in formulas.iter_rows(min_row=2) for f in row if isinstance(f.value, str) and f.value.startswith('=') and (values[f.coordinate].value is None)]
    if missing:
        sys.exit('у формул нет вычисленного значения (откройте и сохраните файл в Excel): ' + ', '.join(missing))
    rows = []
    for r in values.iter_rows(min_row=2, values_only=True):
        row = [cell(v) for v in r]
        if row[0] is None:
            continue
        while row and row[-1] is None:
            row.pop()
        rows.append(row)
    data = {'columns': columns, 'rows': rows}
    DST.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'{DST.relative_to(ROOT)}: строк {len(rows)}, последний месяц {rows[-1][0]}, {DST.stat().st_size // 1024} КБ')
if __name__ == '__main__':
    main()
