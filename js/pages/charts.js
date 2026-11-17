const LANG = nbtPageLang();

const I18N = {
  tj: {
    srcNbt:  'Манбаъ: Бонки Миллии Тоҷикистон',
    srcStat: 'Манбаъ: Агентии омори назди Президенти Ҷумҳурии Тоҷикистон',
    srcBoth: 'Манбаъ: Бонки Миллии Тоҷикистон; Агентии омори назди Президенти Ҷумҳурии Тоҷикистон',
    months:  ['Январ','Феврал','Март','Апрел','Май','Июн','Июл','Август','Сентябр','Октябр','Ноябр','Декабр'],
    tInflation: 'Тағйирёбии сатҳи таваррум',
    tSahm:      'Таваррум аз рӯи саҳм',
    tBonds:     'Фоизи қоғазҳои қиматноки БМТ ва қарзҳои байнибонкӣ',
    tMonagg:    'Унсурҳои пулӣ',
    tGroups:    'Таварруми солона аз рӯи гурӯҳҳо',
    nGroups:    'Тағйирёбии нархҳо дар 12 моҳ барои ҳар як гурӯҳи молу хизматрасониҳо',
    secPolicy: "Сиёсати пулию қарзӣ",
    tDecisions: "Қарорҳои Кумитаи сиёсати пулию қарзӣ", tDecisionsShort: "Қарорҳои Кумита", decOne: "Қарори Кумита", tStrip: "Лавҳаи ҳадаф: таваррум моҳ ба моҳ", stripIn: "дар доираи ҳадаф", stripAbove: "аз ҳадаф боло", stripBelow: "аз ҳадаф поён", stripStreak: n => `${n} моҳ пай дар пай дар доираи ҳадаф`, stripShare: (p, y) => `${p}% моҳҳо аз соли ${y} дар доираи ҳадаф`, tDecYears: "Қарорҳои Кумита аз рӯи солҳо", decCount: "шумораи қарорҳо", decNet: "тағйир дар як сол", tPath: "Роҳи сиёсат: таваррум ва меъёри бозтамвил", pathX: "Таварруми солона, %", pathY: "Меъёри бозтамвил, %", pathDiag: "меъёр = таваррум", pathTight: "сиёсати маҳдудкунанда", pathEasy: "сиёсати ҳавасмандкунанда",
    nDecisions: "Ҳар як нуқта — ҷаласаи Кумита: сабз — меъёр паст карда шуд, сурх — баланд, хокистарӣ — бетағйир",
    decCut: "Паст кардан",
    decRaise: "Баланд кардан",
    decHold: "Бетағйир",
    tDeviation: "Фарқияти таваррум аз ҳадаф",
    nDeviation: "Таварруми солона манфии маркази ҳадаф, б.ф. Сутунҳои кабуд — дар доираи ҳадаф, сурх — берун аз он",
    devLabel: "Фарқият аз маркази ҳадаф",
    devBand: "Ҳудуди иҷозатдодашуда",
    devTarget: "ҳадаф",
    devIn: "дар доираи ҳадаф",
    devOut: "берун аз ҳадаф",
    tTransm: "Интиқоли меъёр ба бозор",
    nTransm: "Фарқияти меъёрҳои бозор аз меъёри бозтамвил, б.ф. Наздик ба сифр — бозор аз паи меъёри БМТ меравад",
    spIb: "Байнибонкӣ − меъёри бозтамвил",
    spBonds: "Коғазҳои қиматнок − меъёри бозтамвил",
    secInflation: "Таваррум",
    secRates: "Меъёрҳои фоизӣ",
    secMoney: "Пул ва амалиётҳои БМТ",
    toc: "Бахшҳо",
    nInflation: "Минтақаи сабз — ҳадафи таваррум, ки дар ҳамон давра амал мекард",
    tGroupsM: "Таварруми моҳона аз рӯи гурӯҳҳо",
    nGroupsM: "Тағйирёбии нархҳо дар як моҳ барои ҳар як гурӯҳ",
    tSeason: "Мавсимнокии таваррум",
    nSeason: "Таварруми моҳона аз рӯи солҳо: оё афзоиши нархҳо дар ин моҳ муқаррарист",
    tHeatmap: "Харитаи таварруми моҳона",
    nHeatmap: "Ҳар як хона — таваррум дар моҳ, %. Сурх — нархҳо боло рафтанд, фирӯзаранг — паст шуданд",
    tCore: "Таварруми асосӣ ва умумӣ",
    nCore: "Таварруми асосӣ — бе нархҳое, ки аз мавсим ва танзими давлатӣ вобастаанд; тамоюли устувори нархҳоро нишон медиҳад",
    core: "Таварруми асосӣ",
    tExpect: "Интизориҳои таварруми аҳолӣ",
    nExpect: "Таварруме, ки аҳолӣ дар 12 моҳи оянда интизор аст (аз рӯи назарсанҷии БМТ), дар муқоиса бо таварруми воқеӣ",
    expect: "Интизориҳо",
    tMoneyInfl: "Афзоиши пул ва таваррум",
    nMoneyInfl: "Афзоиши солонаи M2 дар муқоиса бо таварруми солона",
    m2growth: "Афзоиши солонаи M2",
    tDollar: "Долларикунонӣ",
    nDollar: "Ҳиссаи амонатҳо бо асъори хориҷӣ дар массаи пулӣ: (M4 − M2) / M4",
    dollar: "Ҳиссаи амонатҳои асъорӣ",
    tOps: "Амалиётҳои бозори кушоди БМТ",
    nOps: "Бақияи коғазҳои қиматноки БМТ ва амонатҳои ҷалбшуда тавассути музоядаҳо",
    opSecurities: "Коғазҳои қиматноки БМТ",
    opDeposits: "Музоядаҳои амонатӣ",
    demoAll: "Маълумоти намунавӣ",
    demoFromApr: "Апрел–сентябри 2026: маълумоти намунавӣ",
    demoHint: "Ин маълумот муваққатӣ аст ва бо маълумоти воқеӣ иваз карда мешавад",
    seasonAvg: (a, b) => `Миёна ${a}–${b}`,
    tCorridor:  'Коридори меъёри фоизӣ',
    nCorridor:  'Ҳудуди боло — меъёри қарзи шабонарӯзӣ (меъёри бозтамвил +3 б.ф.), ҳудуди поён — меъёри амонати шабонарӯзӣ (−3 б.ф.). Меъёрҳои бозор бояд дар дохили коридор бошанд',
    corrUp:     'Қарзи шабонарӯзӣ (ҳудуди боло)',
    corrLow:    'Амонати шабонарӯзӣ (ҳудуди поён)',
    tReal:      'Меъёри воқеии бозтамвил',
    nReal:      'Меъёри бозтамвил манфии таварруми солона. Аз сифр боло — сиёсати пулӣ маҳдудкунанда, аз сифр поён — ҳавасмандкунанда',
    real:       'Меъёри воқеӣ',
    food: 'Хӯрокворӣ', nonfood: 'Ғайрихӯрокворӣ', services: 'Хизматрасонӣ',
    inflAnnual: 'Таваррум (солона)', inflAnnualFull: 'Таварруми солона', inflMonthly: 'Таварруми моҳона',
    rate: 'Меъёри бозтамвил', bonds: 'Қоғазҳои қиматнок', interbank: 'Байнибонкӣ',
    loading: 'Боркунии маълумот...', loadError: 'Маълумот бор нашуд',
    annual: 'Солона', monthly: 'Моҳона', level: 'Сатҳ', growth: 'Афзоиш %',
    apply: 'Татбиқ', retry: 'Аз нав кӯшиш кардан', reset: 'Аз нав', updated: 'Навсозии охирон',
    pp: 'б.ф.', bn: 'млрд', bnSom: 'млрд сом.', dateCol: 'Сана',
  },
  ru: {
    srcNbt:  'Источник: Национальный банк Таджикистана',
    srcStat: 'Источник: Агентство по статистике при Президенте Республики Таджикистан',
    srcBoth: 'Источник: Национальный банк Таджикистана; Агентство по статистике при Президенте Республики Таджикистан',
    months:  ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    tInflation: 'Изменение уровня инфляции',
    tSahm:      'Инфляция по компонентам',
    tBonds:     'Проценты по ценным бумагам НБТ и межбанковским кредитам',
    tMonagg:    'Денежные агрегаты',
    tGroups:    'Годовая инфляция по группам',
    nGroups:    'Изменение цен за 12 месяцев по каждой группе товаров и услуг',
    secPolicy: "Денежно-кредитная политика",
    tDecisions: "Решения Комитета по денежно-кредитной политике", tDecisionsShort: "Решения Комитета", decOne: "Решение Комитета", tStrip: "Табло цели: инфляция месяц за месяцем", stripIn: "в пределах цели", stripAbove: "выше цели", stripBelow: "ниже цели", stripStreak: n => `${n} ${n % 10 === 1 && n % 100 !== 11 ? "месяц" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "месяца" : "месяцев"} подряд в пределах цели`, stripShare: (p, y) => `${p}% месяцев с ${y} года — в пределах цели`, tDecYears: "Решения Комитета по годам", decCount: "число решений", decNet: "изменение за год", tPath: "Путь политики: инфляция и ставка", pathX: "Годовая инфляция, %", pathY: "Ставка рефинансирования, %", pathDiag: "ставка = инфляция", pathTight: "сдерживающая политика", pathEasy: "стимулирующая политика",
    nDecisions: "Каждая точка — заседание Комитета: зелёная — ставку снизили, красная — повысили, серая — без изменений",
    decCut: "Снижение",
    decRaise: "Повышение",
    decHold: "Без изменений",
    tDeviation: "Отклонение инфляции от цели",
    nDeviation: "Годовая инфляция минус центр цели, п.п. Синие столбцы — в пределах цели, красные — вне её",
    devLabel: "Отклонение от центра цели",
    devBand: "Допустимый диапазон",
    devTarget: "цель",
    devIn: "в пределах цели",
    devOut: "вне цели",
    tTransm: "Передача ставки рынку",
    nTransm: "Насколько рыночные ставки отличаются от ставки рефинансирования, п.п. Ближе к нулю — рынок следует за ставкой НБТ",
    spIb: "Межбанк − ставка рефинансирования",
    spBonds: "Ценные бумаги − ставка рефинансирования",
    secInflation: "Инфляция",
    secRates: "Процентные ставки",
    secMoney: "Деньги и операции НБТ",
    toc: "Разделы",
    nInflation: "Зелёная полоса — цель по инфляции, действовавшая в тот период",
    tGroupsM: "Месячная инфляция по группам",
    nGroupsM: "Изменение цен за месяц по каждой группе",
    tSeason: "Сезонность инфляции",
    nSeason: "Месячная инфляция по годам: обычен ли рост цен в этом месяце",
    tHeatmap: "Карта месячной инфляции",
    nHeatmap: "Каждая клетка — инфляция за месяц, %. Красный — цены выросли, бирюзовый — снизились",
    tCore: "Базовая и общая инфляция",
    nCore: "Базовая инфляция — без цен, которые зависят от сезона и госрегулирования; показывает устойчивую тенденцию цен",
    core: "Базовая инфляция",
    tExpect: "Инфляционные ожидания населения",
    nExpect: "Инфляция, которую население ожидает в ближайшие 12 месяцев (по опросам НБТ), в сравнении с фактической",
    expect: "Ожидания",
    tMoneyInfl: "Рост денег и инфляция",
    nMoneyInfl: "Годовой прирост M2 в сравнении с годовой инфляцией",
    m2growth: "Годовой прирост M2",
    tDollar: "Долларизация",
    nDollar: "Доля депозитов в иностранной валюте в денежной массе: (M4 − M2) / M4",
    dollar: "Доля валютных депозитов",
    tOps: "Операции НБТ на открытом рынке",
    nOps: "Остаток ценных бумаг НБТ и депозитов, привлечённых на аукционах",
    opSecurities: "Ценные бумаги НБТ",
    opDeposits: "Депозитные аукционы",
    demoAll: "Пример данных",
    demoFromApr: "Апрель–сентябрь 2026: пример данных",
    demoHint: "Эти данные временные и будут заменены реальными",
    seasonAvg: (a, b) => `Среднее ${a}–${b}`,
    tCorridor:  'Процентный коридор',
    nCorridor:  'Верхняя граница — ставка по кредиту овернайт (ставка рефинансирования +3 п.п.), нижняя — по депозиту овернайт (−3 п.п.). Рыночные ставки должны находиться внутри коридора',
    corrUp:     'Кредит овернайт (верхняя граница)',
    corrLow:    'Депозит овернайт (нижняя граница)',
    tReal:      'Реальная ставка рефинансирования',
    nReal:      'Ставка рефинансирования минус годовая инфляция. Выше нуля — денежно-кредитная политика сдерживающая, ниже нуля — стимулирующая',
    real:       'Реальная ставка',
    food: 'Продовольственные', nonfood: 'Непродовольственные', services: 'Услуги',
    inflAnnual: 'Инфляция (годовая)', inflAnnualFull: 'Годовая инфляция', inflMonthly: 'Месячная инфляция',
    rate: 'Ставка рефинансирования', bonds: 'Ценные бумаги НБТ', interbank: 'Межбанк',
    loading: 'Загрузка данных...', loadError: 'Ошибка загрузки данных',
    annual: 'Годовая', monthly: 'Ежемесячная', level: 'Уровень', growth: 'Прирост %',
    apply: 'Применить', retry: 'Повторить', reset: 'Сброс', updated: 'Последнее обновление',
    pp: 'п.п.', bn: 'млрд', bnSom: 'млрд сом.', dateCol: 'Дата',
  },
  en: {
    srcNbt:  'Source: National Bank of Tajikistan',
    srcStat: 'Source: Statistics Agency under the President of the Republic of Tajikistan',
    srcBoth: 'Source: National Bank of Tajikistan; Statistics Agency under the President of the Republic of Tajikistan',
    months:  ['January','February','March','April','May','June','July','August','September','October','November','December'],
    tInflation: 'Change in the inflation rate',
    tSahm:      'Inflation by Component',
    tBonds:     'Interest on NBT Securities and Interbank Loans',
    tMonagg:    'Monetary Aggregates',
    tGroups:    'Annual Inflation by Group',
    nGroups:    'Price change over 12 months for each group of goods and services',
    secPolicy: "Monetary policy",
    tDecisions: "Monetary Policy Committee Decisions", tDecisionsShort: "Committee decisions", decOne: "Committee decision", tStrip: "Target board: inflation month by month", stripIn: "within target", stripAbove: "above target", stripBelow: "below target", stripStreak: n => `${n} month${n === 1 ? "" : "s"} in a row within the target`, stripShare: (p, y) => `${p}% of months since ${y} within the target`, tDecYears: "Committee decisions by year", decCount: "number of decisions", decNet: "change over the year", tPath: "Policy path: inflation and the rate", pathX: "Annual inflation, %", pathY: "Refinancing rate, %", pathDiag: "rate = inflation", pathTight: "tight policy", pathEasy: "easy policy",
    nDecisions: "Each dot is a Committee meeting: green — rate cut, red — raised, grey — unchanged",
    decCut: "Cut",
    decRaise: "Raise",
    decHold: "Unchanged",
    tDeviation: "Inflation Deviation from Target",
    nDeviation: "Annual inflation minus the target centre, pp. Blue bars — within the target band, red — outside it",
    devLabel: "Deviation from target centre",
    devBand: "Allowed band",
    devTarget: "target",
    devIn: "within target",
    devOut: "outside target",
    tTransm: "Policy Rate Transmission",
    nTransm: "How far market rates are from the refinancing rate, pp. Close to zero — the market follows the NBT rate",
    spIb: "Interbank − refinancing rate",
    spBonds: "Securities − refinancing rate",
    secInflation: "Inflation",
    secRates: "Interest rates",
    secMoney: "Money and NBT operations",
    toc: "Sections",
    nInflation: "Green band — the inflation target in force at the time",
    tGroupsM: "Monthly Inflation by Group",
    nGroupsM: "Price change over the month for each group",
    tSeason: "Inflation Seasonality",
    nSeason: "Monthly inflation by year: is the price growth in this month usual",
    tHeatmap: "Monthly Inflation Map",
    nHeatmap: "Each cell is monthly inflation, %. Red — prices rose, teal — prices fell",
    tCore: "Core and Headline Inflation",
    nCore: "Core inflation excludes seasonal and regulated prices; it shows the underlying price trend",
    core: "Core inflation",
    tExpect: "Household Inflation Expectations",
    nExpect: "Inflation households expect over the next 12 months (NBT surveys) compared with actual inflation",
    expect: "Expectations",
    tMoneyInfl: "Money Growth and Inflation",
    nMoneyInfl: "Annual M2 growth compared with annual inflation",
    m2growth: "Annual M2 growth",
    tDollar: "Dollarization",
    nDollar: "Share of foreign-currency deposits in broad money: (M4 − M2) / M4",
    dollar: "Foreign-currency deposit share",
    tOps: "NBT Open Market Operations",
    nOps: "Outstanding NBT securities and deposits raised at auctions",
    opSecurities: "NBT securities",
    opDeposits: "Deposit auctions",
    demoAll: "Sample data",
    demoFromApr: "Apr–Sep 2026: sample data",
    demoHint: "These figures are temporary and will be replaced with actual data",
    seasonAvg: (a, b) => `Average ${a}–${b}`,
    tCorridor:  'Interest Rate Corridor',
    nCorridor:  'Upper bound — overnight loan rate (refinancing rate +3 pp), lower bound — overnight deposit rate (−3 pp). Market rates are expected to stay inside the corridor',
    corrUp:     'Overnight loan (upper bound)',
    corrLow:    'Overnight deposit (lower bound)',
    tReal:      'Real Refinancing Rate',
    nReal:      'Refinancing rate minus annual inflation. Above zero — monetary policy is tight, below zero — accommodative',
    real:       'Real rate',
    food: 'Food', nonfood: 'Non-food', services: 'Services',
    inflAnnual: 'Inflation (annual)', inflAnnualFull: 'Annual inflation', inflMonthly: 'Monthly inflation',
    rate: 'Refinancing Rate', bonds: 'NBT Securities', interbank: 'Interbank',
    loading: 'Loading data...', loadError: 'Failed to load data',
    annual: 'Annual', monthly: 'Monthly', level: 'Level', growth: 'Growth %',
    apply: 'Apply', retry: 'Try again', reset: 'Reset', updated: 'Last updated',
    pp: 'pp', bn: 'bln', bnSom: 'bln som.', dateCol: 'Date',
  },
}[LANG];

const tn = v => Number.isInteger(+v) ? String(+v) : num(+v, 1);
const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');

function fmtDate(d){if(!d)return'—';const[y,m]=d.split('-').map(Number);return I18N.months[m-1]+' '+y;}
function fmtUpd(d){const t=fmtDate(d);return LANG==='en'?t:t.toLowerCase();}

const TICKS = window.innerWidth < 640 ? 5 : 10;
function tickLabel(v){
  const l=this.getLabelForValue(v);
  if(!/^\d{4}-\d{2}$/.test(l)) return l;
  const[y,m]=l.split('-').map(Number);
  return I18N.months[m-1].slice(0,3).toLowerCase()+' '+String(y).slice(2);
}


const COLORS = window.NBT_COLORS;


const EXPLAIN = {
  tj: {
    _btn: 'Шарҳи мухтасар',
    inflation: 'Таварруми солона нишон медиҳад, ки нархҳо нисбат ба ҳамон моҳи соли гузашта чанд фоиз боло рафтаанд. Тугмаи «Моҳона» афзоиши нархҳоро дар як моҳ нишон медиҳад.',
    sahm: 'Саҳми гурӯҳҳо дар таварруми умумӣ, бо банди фоизӣ. Саҳм на танҳо аз афзоиши нархҳо дар гурӯҳ, балки аз вазни он дар сабад низ вобаста аст; ҷамъи саҳмҳо ба таварруми умумии солона баробар аст.',
    rate: 'Меъёри бозтамвил — фишанги асосии сиёсати пулию қарзии Бонки миллӣ. Онро Кумитаи сиёсати пулию қарзӣ муқаррар мекунад; ҳар зинаи график — қарори Кумита.',
    bondsinterbank: 'Даромаднокии коғазҳои қиматноки Бонки миллӣ ва меъёри миёнаи бозори байнибонкӣ дар муқоиса бо меъёри бозтамвил. Агар меъёрҳои бозорӣ аз паси меъёри Бонки миллӣ раванд, механизми интиқол кор мекунад.',
  },
  ru: {
    _btn: 'Краткое пояснение',
    inflation: 'Годовая инфляция показывает, на сколько процентов цены выросли по сравнению с тем же месяцем прошлого года. Кнопка «Ежемесячная» показывает рост цен за один месяц.',
    sahm: 'Вклад групп в общую инфляцию, в процентных пунктах. Вклад зависит не только от роста цен в группе, но и от её веса в корзине; сумма вкладов равна общей годовой инфляции.',
    rate: 'Ставка рефинансирования — главный инструмент денежно-кредитной политики Национального банка. Её устанавливает Комитет по денежно-кредитной политике; каждая ступенька на графике — решение Комитета.',
    bondsinterbank: 'Доходность ценных бумаг Национального банка и средняя ставка межбанковского рынка в сравнении со ставкой рефинансирования. Если рыночные ставки идут за ставкой НБТ, механизм передачи работает.',
  },
  en: {
    _btn: 'Short explanation',
    inflation: 'Annual inflation shows by how many percent prices rose compared with the same month a year earlier. The “Monthly” button shows the price change over one month.',
    sahm: 'Contribution of each group to overall inflation, in percentage points. It depends both on price growth in the group and on its weight in the basket; the contributions add up to overall annual inflation.',
    rate: 'The refinancing rate is the National Bank’s main monetary policy instrument. It is set by the Monetary Policy Committee; every step on the chart is a Committee decision.',
    bondsinterbank: 'Yields on National Bank securities and the average interbank rate next to the refinancing rate. When market rates follow the NBT rate, transmission works.',
  },
}[LANG];
const explainBlock = id => EXPLAIN[id]
  ? `<details class="chart-explain"><summary>${EXPLAIN._btn}</summary><p>${EXPLAIN[id]}</p></details>` : '';

const datasets = [
  { id:"inflation", title:I18N.tInflation, note:I18N.nInflation, color:COLORS.inflation, mode:"yearly", source:I18N.srcStat },
  { id:"sahm", title:I18N.tSahm, stacked:true, source:I18N.srcStat,
    lines:[
      { id:"sahm_f",  label:I18N.food, color:COLORS.food },
      { id:"sahm_nf", label:I18N.nonfood, color:COLORS.nonfood },
      { id:"sahm_s",  label:I18N.services, color:COLORS.services },
    ],
    overlays:[
      { id:"inflation", dataKey:"yearly", label:I18N.inflAnnual, color:COLORS.inflationOverlay, tension:0.4 }
    ]
  },
  { id:"rate", title:I18N.rate, color:COLORS.rate, source:I18N.srcBoth,
    overlays:[
      { id:"inflation", dataKey:"yearly", label:I18N.inflAnnual, color:COLORS.inflationOverlay, tension:0.4 }
    ]
  },
  { id:"bondsinterbank", title:I18N.tBonds,
    combined:true, source:I18N.srcNbt,
    lines:[
      { id:"bonds",     label:I18N.bonds, color:COLORS.bonds, tension:0.4 },
      { id:"interbank", label:I18N.interbank, color:COLORS.interbank, tension:0.4 }
    ],
    overlays:[
      { id:"rate", dataKey:"data", label:I18N.rate, color:COLORS.rate, stepped:true, tension:0 }
    ]
  },
];

const charts = {};

document.addEventListener("DOMContentLoaded",()=>{ loadChartData(); });

async function loadChartData(){
  document.getElementById('charts').innerHTML=`<div aria-busy="true" aria-label="${I18N.loading}"><div class="chart-skeleton"></div><div class="chart-skeleton"></div><div class="chart-skeleton"></div></div>`;
  let json;
  try {
    json = await nbtLoadRows({defval:""});
  } catch(err) {
    document.getElementById('charts').innerHTML=`<div class="chart-error" role="alert">${I18N.loadError}<br><button class="btn-chart" onclick="loadChartData()">${I18N.retry}</button></div>`;
    return;
  }

  const parsed={ inflation:[], inflation_y:[], rate:[], bonds:[], interbank:[], sahm_f:[], sahm_nf:[], sahm_s:[] };
  const labels=[];

  json.forEach(row=>{
    const date=row.date; if(!date) return;
    const infl=toNum(row.inflation), infl_y=toNum(row.inflation_y);
    const rate=toNum(row.rate_eom), bonds=toNum(row.bonds), interbank=toNum(row.interbank);
    const sahm_f=toNum(row.inf_sahm_f), sahm_nf=toNum(row.inf_sahm_nf), sahm_s=toNum(row.inf_sahm_s);
    if(infl===null&&infl_y===null&&rate===null&&bonds===null&&interbank===null&&sahm_f===null&&sahm_nf===null&&sahm_s===null) return;
    labels.push(date);
    parsed.inflation.push(infl); parsed.inflation_y.push(infl_y);
    parsed.rate.push(rate); parsed.bonds.push(bonds); parsed.interbank.push(interbank);
    parsed.sahm_f.push(sahm_f); parsed.sahm_nf.push(sahm_nf); parsed.sahm_s.push(sahm_s);
  });

  datasets.forEach(ds=>{
    ds.labels=labels;
    if(ds.id==="inflation"){
      ds.data_monthly=parsed.inflation; ds.data_yearly=parsed.inflation_y; ds.data=ds.data_yearly;
    } else if(ds.stacked){
      ds.lines.forEach(ln=>{ ln.data=parsed[ln.id]; });
      ds.data=ds.lines[0].data;
    } else if(ds.combined){
      ds.lines.forEach(ln=>{ ln.data=parsed[ln.id]; });
      ds.data=ds.lines[0].data;
    } else {
      ds.data=parsed[ds.id];
    }
  });

  datasets.forEach(ds=>{
    let li=-1;
    if(ds.combined||ds.stacked){
      ds.lines.forEach(ln=>{for(let i=ln.data.length-1;i>=0;i--){if(ln.data[i]!==null){if(i>li)li=i;break;}}});
    } else {
      const d=ds.id==='inflation'?ds.data_yearly:ds.data;
      for(let i=d.length-1;i>=0;i--){if(d[i]!==null){li=i;break;}}
    }
    ds.lastDate=li>=0?labels[li]:null;
  });

  initCharts();
  openChartFromHash();
}

function toNum(v){
  if(v===undefined||v===null||v==="") return null;
  const n=parseFloat(String(v).replace(",","."));
  return isNaN(n)?null:n;
}
function barColors(data){ return data.map(v=>v===null?'transparent':v>=0?nbtAlpha(COLORS.inflation,0.85):nbtAlpha(COLORS.deflation,0.75)); }
function barBorderColors(data){ return data.map(v=>v===null?'transparent':v>=0?COLORS.inflation:COLORS.deflation); }
function computeRangeZero(nums){
  if(!nums.length) return {min:-2,max:2,step:1};
  const lo=Math.min(0,Math.min(...nums)),hi=Math.max(0,Math.max(...nums));
  const range=hi-lo, step=range<3?0.5:range<8?1:range<20?2:5;
  return {min:Math.floor((lo-step)/step)*step,max:Math.ceil((hi+step)/step)*step,step};
}
function computeRange(values){
  const nums=values.filter(v=>v!==null);
  if(!nums.length) return {min:0,max:10,step:2};
  const lo=Math.min(...nums),hi=Math.max(...nums);
  const step=hi-lo<5?1:hi-lo<15?2:5;
  const mid=(lo+hi)/2, half=Math.ceil(((hi-lo)/2+step)/step)*step;
  return {min:Math.max(0,Math.floor((mid-half)/step)*step),max:Math.ceil((mid+half)/step)*step,step};
}
function computeStackedSums(lines,s,e){
  return Array.from({length:e-s},(_,i)=>{
    const vals=lines.map(ln=>ln.data[s+i]).filter(v=>v!==null);
    return vals.length?vals.reduce((a,b)=>a+b,0):null;
  }).filter(v=>v!==null);
}
function computeRangeTight(values){
  const nums=values.filter(v=>v!==null);
  if(!nums.length) return {min:0,max:10,step:2};
  const lo=Math.min(...nums),hi=Math.max(...nums);
  const step=hi-lo<5?1:hi-lo<15?2:5;

  return {min:Math.min(0,Math.floor((lo-step/4)/step)*step),max:Math.max(0,Math.ceil((hi+step/4)/step)*step),step};
}

function fmtVal(val,id){
  return num(val, id==='rate' ? 2 : 1);
}

function initCharts(){
  const container=document.getElementById("charts");
  container.innerHTML='';
  datasets.forEach(ds=>{
    const block=document.createElement("div");
    block.className="chart-card";
    block.id="chart-"+ds.id;

    block.innerHTML=`
      <div class="chart-card__header">
        <div class="chart-card__header-left">
          <h2 class="chart-card__title">${ds.title}</h2>
          ${ds.demo?`<span class="demo-badge" title="${I18N.demoHint}">${ds.demo}</span>`:''}
          ${ds.id==="inflation" ? `
          <div class="chart-type-toggle">
            <button class="chart-type-btn active" id="infl-btn-yearly" onclick="switchInflation('yearly')">${I18N.annual}</button>
            <button class="chart-type-btn" id="infl-btn-monthly" onclick="switchInflation('monthly')">${I18N.monthly}</button>
          </div>` : ""}
        </div>
        <div class="chart-toolbar">
          ${ds.stacked ?
            [...ds.lines.map((ln,i)=>`<button class="btn-overlay btn-overlay--active" id="${ds.id}-line-${i}" style="border-color:${ln.color};color:${ln.color}" onclick="toggleStackedLine('${ds.id}',${i})"><span class="btn-overlay-dot" style="background:${ln.color}"></span>${ln.label}</button>`),
             ...(ds.overlays||[]).map((ov,i)=>`<button class="btn-overlay btn-overlay--active" id="${ds.id}-overlay-${i}" style="border-color:${ov.color};color:${ov.color}" onclick="toggleStackedOverlay('${ds.id}',${i})"><span class="btn-overlay-dot" style="background:${ov.color}"></span>${ov.label}</button>`)
            ].join('')
            : ds.combined ?
            [...(ds.lines||[]).map((ln,i)=>`<button class="btn-overlay btn-overlay--active" id="${ds.id}-line-${i}" style="border-color:${ln.color};color:${ln.color}" onclick="toggleCombinedLine('${ds.id}',${i})"><span class="btn-overlay-dot" style="background:${ln.color}"></span>${ln.label}</button>`),
             ...(ds.overlays||[]).map((ov,i)=>`<button class="btn-overlay" id="${ds.id}-overlay-${i}" onclick="toggleCombinedOverlay('${ds.id}',${i})"><span class="btn-overlay-dot" style="background:${ov.color}"></span>${ov.label}</button>`)
            ].join('')
            :''
             +(ds.overlays||[]).map((ov,i)=>`<button class="btn-overlay" id="${ds.id}-overlay-${i}" onclick="toggleOverlay('${ds.id}',${i})"><span class="btn-overlay-dot" style="background:${ov.color}"></span>${ov.label}</button>`).join('')}
          <div class="date-range-wrap" id="${ds.id}-drwrap">
            <button class="date-range-btn" onclick="toggleDatePicker('${ds.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span id="${ds.id}-range-label"></span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="date-range-dropdown" id="${ds.id}-dropdown">
              <input type="month" id="${ds.id}-start">
              <input type="month" id="${ds.id}-end">
              <button class="btn-chart btn-chart--apply" onclick="applyDateRange('${ds.id}')">${I18N.apply}</button>
            </div>
          </div>
          <button class="btn-chart" id="${ds.id}-reset-btn" onclick="resetChart('${ds.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            <span class="btn-label">${I18N.reset}</span>
          </button>
          <button class="btn-chart" onclick="exportXLS('${ds.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span class="btn-label">xlsx</span>
          </button>
        </div>
      </div>
      <div class="chart-card__body">
        <div class="chart-canvas-wrap">
          <canvas id="${ds.id}Chart"></canvas>
        </div>
        <div class="chart-source" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px"><span>${ds.source||I18N.srcNbt}</span><span>${I18N.updated}: ${fmtUpd(ds.lastDate)}</span></div>
        ${explainBlock(ds.id)}
      </div>
    `;

    container.appendChild(block);
    ds.stacked ? createStackedChart(ds) : ds.combined ? createCombinedChart(ds) : createChart(ds);
  });
}

function updateLastVal(id){
  const ds=datasets.find(d=>d.id===id); if(ds.combined)return;
  const chart=charts[id]; const el=document.getElementById(id+'-lastval');
  if(!el||!chart)return;
  const data=chart.data.datasets[0].data;
  let last=null; for(let i=data.length-1;i>=0;i--){if(data[i]!==null){last=data[i];break;}}
  el.textContent=last!==null?fmtVal(last,id)+'%':'';
}

function getOverlaySlice(ov, labels, globalLabels){
  const srcDs=datasets.find(d=>d.id===ov.id);
  if(!srcDs) return labels.map(()=>null);
  const srcArr=ov.dataKey==='yearly'?srcDs.data_yearly:srcDs.data;
  if(!srcArr) return labels.map(()=>null);
  return labels.map(l=>{const j=globalLabels.indexOf(l);return j>=0?(srcArr[j]??null):null;});
}

function createChart(ds){
  const startIndex=ds.data.findIndex(v=>v!==null);
  const _r=ds.id==='rate';
  const allLabels=ds.labels.slice(startIndex);
  const allData=ds.data.slice(startIndex);
  let labels=allLabels, data=allData;
  if(_r||ds.id==='inflation'){
    const si=allLabels.findIndex(l=>l>='2010-01');
    if(si>0){ labels=allLabels.slice(si); data=allData.slice(si); }
  }

  const bgFill=_r
    ?(ctx2=>{const{ctx:c,chartArea}=ctx2.chart;if(!chartArea)return 'rgba(59,130,246,0.12)';const g=c.createLinearGradient(0,chartArea.top,0,chartArea.bottom);g.addColorStop(0,'rgba(59,130,246,0.22)');g.addColorStop(1,'rgba(59,130,246,0.02)');return g;})
    :(ctx2=>{const{ctx:c,chartArea}=ctx2.chart;if(!chartArea)return ds.color+'33';const g=c.createLinearGradient(0,chartArea.top,0,chartArea.bottom);g.addColorStop(0,ds.color+'99');g.addColorStop(1,ds.color+'00');return g;});
  ds._bgFill=bgFill;

  const chartDatasets=[{
    label:ds.title, data,
    borderColor:ds.color,
    borderWidth:_r?2:1.5,
    backgroundColor:bgFill,
    fill:true, tension:_r?0:0.4, stepped:_r?'before':false,
    pointRadius:0, pointHoverRadius:5,
    pointHoverBackgroundColor:ds.color, pointHoverBorderColor:'#fff', pointHoverBorderWidth:2,
    spanGaps:true
  }];

  (ds.overlays||[]).forEach(ov=>{
    chartDatasets.push({
      label:ov.label, data:getOverlaySlice(ov,labels,ds.labels),
      hidden:true,
      borderColor:ov.color, borderWidth:1.5,
      fill:false, tension:ov.tension??0.4, stepped:ov.stepped?'before':false,
      pointRadius:0, pointHoverRadius:4, spanGaps:true
    });
  });

  const r=_r?{...computeRange(data.filter(v=>v!==null)),min:0}:computeRange(data.filter(v=>v!==null));
  const ctx=document.getElementById(ds.id+"Chart");
  charts[ds.id]=new Chart(ctx,{
    type:"line", plugins:[],
    data:{ labels, datasets:chartDatasets },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        endLabel:{decimals:ds.id==='rate'?2:1},
        tooltip:{callbacks:{
          title:()=>'',
          label:c=>{
            if(c.parsed.y===null)return'';
            const val=c.parsed.y,lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
            const vs=fmtVal(val,ds.id);
            if(_r&&c.datasetIndex===0){
              const pd=c.chart.data.datasets[0].data;
              let prev=null;for(let i=c.dataIndex-1;i>=0;i--){if(pd[i]!==null){prev=pd[i];break;}}
              if(prev!==null&&Math.abs(val-prev)>0.0001){const d=val-prev,s2=d>=0?'+':'−',a=d>=0?'▲':'▼';return`${lbl}: ${vs}% (${a} ${s2}${fmtVal(Math.abs(d),ds.id)} ${I18N.pp})`;}
            }
            return`${lbl}: ${vs}%`;
          },
          labelColor:c=>{const color=c.datasetIndex===0?ds.color:(ds.overlays?.[c.datasetIndex-1]?.color||ds.color);return{borderColor:color,backgroundColor:color};}
        }}
      },
      scales:{
        x:{grid:{display:false},ticks:{color:"#666",padding:6,maxTicksLimit:TICKS,maxRotation:0,minRotation:0,callback:tickLabel}},
        y:{min:r.min,max:r.max,grid:{color:'#e6e6e6'},ticks:{color:"#666",stepSize:r.step,callback:v=>v+'%'}}
      }
    }
  });

  const si=document.getElementById(ds.id+"-start");
  const ei=document.getElementById(ds.id+"-end");
  si.min=allLabels[0]; si.max=allLabels[allLabels.length-1];
  ei.min=allLabels[0]; ei.max=allLabels[allLabels.length-1];
  si.value=labels[0]; ei.value=labels[labels.length-1];
  updateRangeLabel(ds.id);
  updateLastVal(ds.id);
}

function toggleOverlay(chartId, ovIdx){
  const chart=charts[chartId];
  const ds=datasets.find(d=>d.id===chartId);
  const ovDs=chart.data.datasets[ovIdx+1];
  const showing=ovDs.hidden;
  ovDs.hidden=!showing;
  const btn=document.getElementById(`${chartId}-overlay-${ovIdx}`);
  const color=ds.overlays[ovIdx].color;
  if(btn){
    btn.classList.toggle('btn-overlay--active',showing);
    btn.style.borderColor=showing?color:'';
    btn.style.color=showing?color:'';
  }
  const anyOn=chart.data.datasets.slice(1).some(d=>!d.hidden);
  chart.data.datasets[0].fill=!anyOn;
  if(!anyOn) chart.data.datasets[0].backgroundColor=ds._bgFill;
  chart.update();
}

function createStackedChart(ds){
  const indices=ds.lines.map(ln=>ln.data.findIndex(v=>v!==null)).filter(i=>i>=0);
  const startIndex=indices.length?Math.min(...indices):0;
  const labels=ds.labels.slice(startIndex);
  const r=computeRangeZero(computeStackedSums(ds.lines,startIndex,ds.labels.length));
  const nLines=ds.lines.length;
  const chartDatasets=ds.lines.map(ln=>({
    label:ln.label, data:ln.data.slice(startIndex),
    backgroundColor:ln.color+'77', borderColor:ln.color,
    borderWidth:1, borderRadius:3, maxBarThickness:28, stack:'s',
    type:'bar',
  }));
  (ds.overlays||[]).forEach(ov=>{
    chartDatasets.push({
      label:ov.label, data:getOverlaySlice(ov,labels,ds.labels),
      hidden:false, type:'line',
      borderColor:ov.color, borderWidth:2,
      fill:false, tension:ov.tension??0.4,
      pointRadius:0, pointHoverRadius:5,
      pointHoverBackgroundColor:ov.color, pointHoverBorderColor:'#fff', pointHoverBorderWidth:2,
      spanGaps:true, order:-1,
    });
  });
  const ctx=document.getElementById(ds.id+"Chart");
  charts[ds.id]=new Chart(ctx,{
    type:"bar",
    data:{labels, datasets:chartDatasets},
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        endLabel:{decimals:1},
        tooltip:{callbacks:{
          title:()=>'',
          label:c=>{
            if(c.parsed.y===null)return'';
            const lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
            const val=c.parsed.y;
            const isOverlay=c.datasetIndex>=nLines;
            if(!isOverlay&&!val)return'';
            const fmt=isOverlay?num(val,1)+' %':num(val,1)+' '+I18N.pp;
            return`${lbl} · ${c.dataset.label}: ${fmt}`;
          },
          labelColor:c=>{
            const color=c.datasetIndex<nLines?(ds.lines[c.datasetIndex]?.color||'#64748b'):(ds.overlays?.[c.datasetIndex-nLines]?.color||'#64748b');
            return{borderColor:color,backgroundColor:color};
          }
        }}
      },
      scales:{
        x:{stacked:true,grid:{display:false},ticks:{color:"#666",padding:6,maxTicksLimit:TICKS,maxRotation:0,minRotation:0,callback:tickLabel}},
        y:{stacked:true,min:r.min,max:r.max,grid:{color:'#e6e6e6'},ticks:{color:"#666",stepSize:r.step,callback:v=>v}}
      }
    }
  });
  const si=document.getElementById(ds.id+"-start");
  const ei=document.getElementById(ds.id+"-end");
  si.min=ds.labels[startIndex]; si.max=ds.labels[ds.labels.length-1];
  ei.min=ds.labels[startIndex]; ei.max=ds.labels[ds.labels.length-1];
  si.value=labels[0]; ei.value=labels[labels.length-1];
  updateRangeLabel(ds.id);
}

function toggleStackedLine(chartId, lineIdx){
  const chart=charts[chartId];
  const ds=datasets.find(d=>d.id===chartId);
  const wasHidden=chart.data.datasets[lineIdx].hidden;
  chart.data.datasets[lineIdx].hidden=!wasHidden;
  const btn=document.getElementById(`${chartId}-line-${lineIdx}`);
  const color=ds.lines[lineIdx].color;
  if(btn){
    btn.classList.toggle('btn-overlay--active',wasHidden);
    btn.style.borderColor=wasHidden?color:'';
    btn.style.color=wasHidden?color:'';
  }
  chart.update();
}

function toggleStackedOverlay(chartId, ovIdx){
  const chart=charts[chartId];
  const ds=datasets.find(d=>d.id===chartId);
  const dsIdx=ds.lines.length+ovIdx;
  const wasHidden=chart.data.datasets[dsIdx].hidden;
  chart.data.datasets[dsIdx].hidden=!wasHidden;
  const btn=document.getElementById(`${chartId}-overlay-${ovIdx}`);
  const color=ds.overlays[ovIdx].color;
  if(btn){
    btn.classList.toggle('btn-overlay--active',wasHidden);
    btn.style.borderColor=wasHidden?color:'';
    btn.style.color=wasHidden?color:'';
  }
  chart.update();
}

function createCombinedChart(ds){
  let startIndex=ds.labels.length;
  ds.lines.forEach(ln=>{const si=ln.data.findIndex(v=>v!==null);if(si>=0&&si<startIndex)startIndex=si;});
  if(ds.from){
    const si2=ds.labels.findIndex(l=>l>=ds.from);
    if(si2>startIndex) startIndex=si2;
  }
  if(ds.lastMonths) startIndex=Math.max(startIndex, ds.labels.length-ds.lastMonths);
  const labels=ds.labels.slice(startIndex);
  ds.lines.forEach(ln=>{
    ln._bgFill=ctx2=>{const{ctx:c,chartArea}=ctx2.chart;if(!chartArea)return ln.color+'33';const g=c.createLinearGradient(0,chartArea.top,0,chartArea.bottom);g.addColorStop(0,ln.color+'99');g.addColorStop(1,ln.color+'00');return g;};
  });
  const chartDatasets=[];
  ds.lines.forEach(ln=>{
    if(ds.bars){
      chartDatasets.push({ type:'bar', label:ln.label, data:ln.data.slice(startIndex), hidden:false,
        backgroundColor:ln.color+'d9', hoverBackgroundColor:ln.color, borderWidth:0, borderRadius:3,
        maxBarThickness:12, categoryPercentage:0.78, barPercentage:0.92 });
      return;
    }
    chartDatasets.push({
      label:ln.label, data:ln.data.slice(startIndex),
      hidden:false, borderColor:ln.color, borderWidth:ln.width??1.5, borderDash:ln.dash||[],
      backgroundColor:ln.fillTo?ln.fillColor:'transparent', fill:ln.fillTo||false,
      tension:ln.stepped?0:(ln.tension??0.4), stepped:ln.stepped?'before':false,
      pointRadius:0, pointHoverRadius:5,
      pointHoverBackgroundColor:ln.color, pointHoverBorderColor:'#fff', pointHoverBorderWidth:2,
      spanGaps:true
    });
  });
  (ds.overlays||[]).forEach(ov=>{
    chartDatasets.push({
      label:ov.label, data:getOverlaySlice(ov,labels,ds.labels),
      hidden:true, borderColor:ov.color, borderWidth:1.5,
      fill:false, tension:ov.tension??0, stepped:ov.stepped?'before':false,
      pointRadius:0, pointHoverRadius:4, spanGaps:true
    });
  });
  const allVals=ds.lines.flatMap(ln=>ln.data.slice(startIndex)).filter(v=>v!==null);
  const hasNeg=allVals.some(v=>v<0);
  const r=hasNeg?computeRangeTight(allVals):computeRange(allVals);
  const ctx=document.getElementById(ds.id+"Chart");
  charts[ds.id]=new Chart(ctx,{
    type:"line", plugins:[],
    data:{labels, datasets:chartDatasets},
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        endLabel:{suffix:ds.pp?' '+I18N.pp:'%',decimals:1},
        tooltip:{callbacks:{
          title:()=>'',
          label:c=>{
            if(c.parsed.y===null)return'';
            const lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
            const dsLabel=c.chart.data.datasets[c.datasetIndex].label;
            const val=c.parsed.y;
            return`${lbl} · ${dsLabel}: ${num(val,ds.pp?2:1)}${ds.pp?' '+I18N.pp:'%'}`;
          },
          labelColor:c=>{const nLines=ds.lines.length;const color=c.datasetIndex<nLines?ds.lines[c.datasetIndex].color:(ds.overlays?.[c.datasetIndex-nLines]?.color||'#64748b');return{borderColor:color,backgroundColor:color};}
        }}
      },
      scales:{
        x:{offset:!!ds.bars,grid:{display:false},ticks:{color:"#666",padding:6,maxTicksLimit:TICKS,maxRotation:0,minRotation:0,callback:tickLabel}},
        y:{min:r.min,max:r.max,grid:{color:ctx=>ds.zeroLine&&ctx.tick.value===0?'#64748b':'#e6e6e6',lineWidth:ctx=>ds.zeroLine&&ctx.tick.value===0?1.5:1},ticks:{color:"#666",stepSize:r.step,callback:v=>ds.isLarge?(v/1000).toFixed(0)+' '+I18N.bn:ds.pp?(v>0?'+':'')+v:v+'%'}}
      }
    }
  });
  const allLabels=ds.labels;
  let firstDataIdx=ds.labels.length;
  ds.lines.forEach(ln=>{const fi=ln.data.findIndex(v=>v!==null);if(fi>=0&&fi<firstDataIdx)firstDataIdx=fi;});
  const firstDataDate=firstDataIdx<ds.labels.length?ds.labels[firstDataIdx]:ds.labels[0];
  const si=document.getElementById(ds.id+"-start");
  const ei=document.getElementById(ds.id+"-end");
  si.min=firstDataDate; si.max=allLabels[allLabels.length-1];
  ei.min=firstDataDate; ei.max=allLabels[allLabels.length-1];
  si.value=labels[0]; ei.value=labels[labels.length-1];
  updateRangeLabel(ds.id);
}

function updateCombinedFill(chartId){
  const chart=charts[chartId];
  const ds=datasets.find(d=>d.id===chartId);
  if(ds.keepFill||ds.bars) return;
  const nLines=ds.lines.length;
  const lineDs=chart.data.datasets.slice(0,nLines);
  const activeLineCount=lineDs.filter(d=>!d.hidden).length;
  const anyOverlayVisible=(ds.overlays||[]).some((ov,i)=>!chart.data.datasets[nLines+i].hidden);
  lineDs.forEach((d,i)=>{
    if(!d.hidden&&activeLineCount===1&&!anyOverlayVisible){d.fill=true;d.backgroundColor=ds.lines[i]._bgFill;}
    else{d.fill=false;d.backgroundColor='transparent';}
  });
}

function toggleCombinedLine(chartId, lineIdx){
  const chart=charts[chartId];
  const ds=datasets.find(d=>d.id===chartId);
  const lineDs=chart.data.datasets[lineIdx];
  const wasHidden=lineDs.hidden;
  lineDs.hidden=!wasHidden;
  const btn=document.getElementById(`${chartId}-line-${lineIdx}`);
  const color=ds.lines[lineIdx].color;
  if(btn){
    btn.classList.toggle('btn-overlay--active',wasHidden);
    btn.style.borderColor=wasHidden?color:'';
    btn.style.color=wasHidden?color:'';
  }
  updateCombinedFill(chartId);
  chart.update();
}

function toggleCombinedOverlay(chartId, ovIdx){
  const chart=charts[chartId];
  const ds=datasets.find(d=>d.id===chartId);
  const nLines=ds.lines.length;
  const ovDs=chart.data.datasets[nLines+ovIdx];
  const wasHidden=ovDs.hidden;
  ovDs.hidden=!wasHidden;
  const btn=document.getElementById(`${chartId}-overlay-${ovIdx}`);
  const color=ds.overlays[ovIdx].color;
  if(btn){
    btn.classList.toggle('btn-overlay--active',wasHidden);
    btn.style.borderColor=wasHidden?color:'';
    btn.style.color=wasHidden?color:'';
  }
  updateCombinedFill(chartId);
  chart.update();
}

function switchInflation(type){
  const ds=datasets.find(d=>d.id==="inflation");
  const chart=charts["inflation"];
  ds.mode=type;
  const allLabels=ds.labels;
  const curLabels=chart.data.labels;
  const si=allLabels.indexOf(curLabels[0]);
  const ei=allLabels.indexOf(curLabels[curLabels.length-1]);
  const allValues=type==="monthly"?ds.data_monthly:ds.data_yearly;
  const sliced=si>=0&&ei>=0?allValues.slice(si,ei+1):allValues;
  chart.data.datasets[0].data=sliced;
  chart.data.datasets[0].label=type==='monthly'?I18N.inflMonthly+' (%)':I18N.inflAnnualFull+' (%)';

  if(type==='monthly'){
    chart.config.type='bar';
    chart.data.datasets[0].backgroundColor=barColors(sliced);
    chart.data.datasets[0].borderColor=barBorderColors(sliced);
    chart.data.datasets[0].borderWidth=0; chart.data.datasets[0].fill=false;
    chart.data.datasets[0].borderRadius=5; chart.data.datasets[0].maxBarThickness=26; chart.data.datasets[0].categoryPercentage=0.8;
    chart.options.scales.x.ticks.maxTicksLimit=TICKS; chart.options.scales.x.ticks.maxRotation=0; chart.options.scales.x.ticks.minRotation=0;
    chart.options.scales.x.offset=true; chart.options.scales.x.grid={display:false};
    chart.options.scales.y.grid={color:ctx=>ctx.tick.value===0?'#94a3b8':'#f1f5f9'};
    chart.options.plugins.tooltip.callbacks.label=c=>{
      if(c.parsed.y===null)return'';
      const v=c.parsed.y,a=v>=0?'▲':'▼',s=v>=0?'+':'';
      return`${fmtDate(c.chart.data.labels[c.dataIndex])}: ${a} ${s}${num(v,1)}%`;
    };
    const r=computeRangeZero(sliced.filter(v=>v!==null));
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
  } else {
    chart.config.type='line';
    chart.data.datasets[0].backgroundColor=ctx2=>{const{ctx:c,chartArea}=ctx2.chart;if(!chartArea)return ds.color+'33';const g=c.createLinearGradient(0,chartArea.top,0,chartArea.bottom);g.addColorStop(0,ds.color+'99');g.addColorStop(1,ds.color+'00');return g;};
    chart.data.datasets[0].borderColor=ds.color; chart.data.datasets[0].borderWidth=1.5; chart.data.datasets[0].fill=true;
    chart.data.datasets[0].tension=0.4; chart.data.datasets[0].pointRadius=0; chart.data.datasets[0].pointHoverRadius=5;
    chart.data.datasets[0].pointHoverBackgroundColor=ds.color; chart.data.datasets[0].pointHoverBorderColor='#fff'; chart.data.datasets[0].pointHoverBorderWidth=2;
    chart.data.datasets[0].borderRadius=undefined; chart.data.datasets[0].maxBarThickness=undefined;
    chart.options.scales.x.ticks.maxTicksLimit=TICKS; chart.options.scales.x.ticks.maxRotation=0; chart.options.scales.x.ticks.minRotation=0;
    chart.options.scales.x.offset=false; chart.options.scales.x.grid={display:false}; chart.options.scales.y.grid={color:'#e6e6e6'};
    chart.options.plugins.tooltip.callbacks.title=()=>'';
    chart.options.plugins.tooltip.callbacks.label=c=>c.parsed.y!==null?`${fmtDate(c.chart.data.labels[c.dataIndex])}: ${num(c.parsed.y,1)}%`:'';
    const r=computeRange(sliced.filter(v=>v!==null));
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
  }
  document.getElementById('infl-btn-yearly').classList.toggle('active',type==='yearly');
  document.getElementById('infl-btn-monthly').classList.toggle('active',type==='monthly');
  chart.update();
  updateLastVal('inflation');
}

function updateChart(id){
  const chart=charts[id];
  const ds=datasets.find(d=>d.id===id);
  if(ds.stacked){
    const start=document.getElementById(id+"-start").value;
    const end=document.getElementById(id+"-end").value;
    let s=ds.labels.findIndex(l=>l>=start); if(s<0)s=0;
    let e=ds.labels.findIndex(l=>l>end); if(e<0)e=ds.labels.length;
    if(e<=s)e=s+1;
    const newLabels=ds.labels.slice(s,e);
    chart.data.labels=newLabels;
    ds.lines.forEach((ln,i)=>{ chart.data.datasets[i].data=ln.data.slice(s,e); });
    (ds.overlays||[]).forEach((ov,i)=>{
      chart.data.datasets[ds.lines.length+i].data=getOverlaySlice(ov,newLabels,ds.labels);
    });
    const sums=computeStackedSums(ds.lines,s,e);
    if(sums.length){const r=computeRangeZero(sums);chart.options.scales.y.min=r.min;chart.options.scales.y.max=r.max;chart.options.scales.y.ticks.stepSize=r.step;}
    chart.update();
    const rb=document.getElementById(id+'-reset-btn'); if(rb) rb.classList.add('btn-chart--active');
    return;
  }
  if(ds.combined){
    const start=document.getElementById(id+"-start").value;
    const end=document.getElementById(id+"-end").value;
    let s=ds.labels.findIndex(l=>l>=start); if(s<0)s=0;
    let e=ds.labels.findIndex(l=>l>end); if(e<0)e=ds.labels.length;
    if(e<=s)e=s+1;
    chart.data.labels=ds.labels.slice(s,e);
    ds.lines.forEach((ln,i)=>{ chart.data.datasets[i].data=ln.data.slice(s,e); });
    (ds.overlays||[]).forEach((ov,i)=>{
      if(ov.computed==='spread'){
        const l0=ds.lines[0].data.slice(s,e),l1=ds.lines[1].data.slice(s,e);
        chart.data.datasets[ds.lines.length+i].data=l0.map((v,j)=>(v!==null&&l1[j]!==null)?+(v-l1[j]).toFixed(2):null);
      } else {
        const srcDs=datasets.find(d=>d.id===ov.id);
        const srcArr=ov.dataKey==='yearly'?srcDs.data_yearly:srcDs.data;
        if(srcArr) chart.data.datasets[ds.lines.length+i].data=srcArr.slice(s,e);
      }
    });
    const visibleLines=ds.lines.filter((ln,i)=>!chart.data.datasets[i].hidden);
    const allVals=(visibleLines.length?visibleLines:ds.lines).flatMap(ln=>ln.data.slice(s,e)).filter(v=>v!==null);
    const hasNeg=allVals.some(v=>v<0);
    const r=hasNeg?computeRangeTight(allVals):computeRange(allVals);
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
    updateCombinedFill(id);
    chart.update();
    const rb=document.getElementById(id+'-reset-btn'); if(rb) rb.classList.add('btn-chart--active');
    return;
  }
  const start=document.getElementById(id+"-start").value;
  const end=document.getElementById(id+"-end").value;
  let s=ds.labels.findIndex(l=>l>=start); if(s<0)s=0;
  let e=ds.labels.findIndex(l=>l>end); if(e<0)e=ds.labels.length;
  if(e<=s)e=s+1;

  chart.data.labels=ds.labels.slice(s,e);
  let dataSource=id==="inflation"?(ds.mode==="monthly"?ds.data_monthly:ds.data_yearly):ds.data;
  const filteredData=dataSource.slice(s,e);
  chart.data.datasets[0].data=filteredData;
  if(ds.overlays){
    ds.overlays.forEach((ov,i)=>{
      const srcDs=datasets.find(d=>d.id===ov.id);
      const srcArr=ov.dataKey==='yearly'?srcDs.data_yearly:srcDs.data;
      if(srcArr) chart.data.datasets[i+1].data=srcArr.slice(s,e);
    });
  }
  if(id==="inflation"&&ds.mode==="monthly"){
    chart.data.datasets[0].backgroundColor=barColors(filteredData);
    chart.data.datasets[0].borderColor=barBorderColors(filteredData);
    chart.options.scales.y.grid={color:ctx=>ctx.tick.value===0?'#94a3b8':'#f1f5f9'};
    const r=computeRangeZero(filteredData.filter(v=>v!==null));
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
  } else {
    const r=id==='rate'?{...computeRange(filteredData.filter(v=>v!==null)),min:0}:computeRange(filteredData.filter(v=>v!==null));
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
  }
  chart.update();
  const rb=document.getElementById(id+'-reset-btn');
  if(rb) rb.classList.add('btn-chart--active');
  updateLastVal(id);
}

function resetChart(id){
  const chart=charts[id];
  const ds=datasets.find(d=>d.id===id);
  if(ds.stacked){
    const indices=ds.lines.map(ln=>ln.data.findIndex(v=>v!==null)).filter(i=>i>=0);
    const startIndex=indices.length?Math.min(...indices):0;
    const labels=ds.labels.slice(startIndex);
    chart.data.labels=labels;
    ds.lines.forEach((ln,i)=>{
      chart.data.datasets[i].data=ln.data.slice(startIndex);
      chart.data.datasets[i].hidden=false;
      const btn=document.getElementById(`${id}-line-${i}`);
      if(btn){btn.classList.add('btn-overlay--active');btn.style.borderColor=ln.color;btn.style.color=ln.color;}
    });
    (ds.overlays||[]).forEach((ov,i)=>{
      chart.data.datasets[ds.lines.length+i].data=getOverlaySlice(ov,labels,ds.labels);
      chart.data.datasets[ds.lines.length+i].hidden=false;
      const btn=document.getElementById(`${id}-overlay-${i}`);
      if(btn){btn.classList.add('btn-overlay--active');btn.style.borderColor=ov.color;btn.style.color=ov.color;}
    });
    const sums=computeStackedSums(ds.lines,startIndex,ds.labels.length);
    if(sums.length){const r=computeRangeZero(sums);chart.options.scales.y.min=r.min;chart.options.scales.y.max=r.max;chart.options.scales.y.ticks.stepSize=r.step;}
    const si2=document.getElementById(id+"-start"); const ei2=document.getElementById(id+"-end");
    if(si2&&ei2){si2.value=labels[0]; ei2.value=labels[labels.length-1]; updateRangeLabel(id);}
    const _dd=document.getElementById(id+'-dropdown'); if(_dd)_dd.classList.remove('open');
    chart.update();
    const rb=document.getElementById(id+'-reset-btn'); if(rb) rb.classList.remove('btn-chart--active');
    return;
  }
  if(ds.combined){
    let startIndex=ds.labels.length;
    ds.lines.forEach(ln=>{const si=ln.data.findIndex(v=>v!==null);if(si>=0&&si<startIndex)startIndex=si;});
    if(ds.from){const si2=ds.labels.findIndex(l=>l>=ds.from);if(si2>startIndex)startIndex=si2;}
    const labels=ds.labels.slice(startIndex);
    chart.data.labels=labels;
    ds.lines.forEach((ln,i)=>{
      chart.data.datasets[i].data=ln.data.slice(startIndex);
      chart.data.datasets[i].hidden=false;
      const btn=document.getElementById(`${id}-line-${i}`);
      if(btn){btn.classList.add('btn-overlay--active');btn.style.borderColor=ln.color;btn.style.color=ln.color;}
    });
    (ds.overlays||[]).forEach((ov,i)=>{
      let ovData;
      if(ov.computed==='spread'){
        const l0=ds.lines[0].data.slice(startIndex),l1=ds.lines[1].data.slice(startIndex);
        ovData=l0.map((v,j)=>(v!==null&&l1[j]!==null)?+(v-l1[j]).toFixed(2):null);
      } else {
        ovData=getOverlaySlice(ov,labels,ds.labels);
      }
      chart.data.datasets[ds.lines.length+i].data=ovData;
      chart.data.datasets[ds.lines.length+i].hidden=true;
      const btn=document.getElementById(`${id}-overlay-${i}`);
      if(btn){btn.classList.remove('btn-overlay--active');btn.style.borderColor='';btn.style.color='';}
    });
    updateCombinedFill(id);
    const si2=document.getElementById(id+"-start"); const ei2=document.getElementById(id+"-end");
    if(si2&&ei2){ si2.value=labels[0]; ei2.value=labels[labels.length-1]; updateRangeLabel(id); }
    const _dd=document.getElementById(id+'-dropdown'); if(_dd)_dd.classList.remove('open');
    const allVals=ds.lines.flatMap(ln=>ln.data.slice(startIndex)).filter(v=>v!==null);
    const hasNeg=allVals.some(v=>v<0);
    const r=hasNeg?computeRangeTight(allVals):computeRange(allVals);
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
    chart.update();
    const rb=document.getElementById(id+'-reset-btn'); if(rb) rb.classList.remove('btn-chart--active');
    return;
  }

  let rawData=ds.data;
  if(id==="inflation"){
    ds.mode="yearly"; rawData=ds.data_yearly;
    chart.config.type='line';
    chart.data.datasets[0].backgroundColor=ctx2=>{const{ctx:c,chartArea}=ctx2.chart;if(!chartArea)return ds.color+'33';const g=c.createLinearGradient(0,chartArea.top,0,chartArea.bottom);g.addColorStop(0,ds.color+'99');g.addColorStop(1,ds.color+'00');return g;};
    chart.data.datasets[0].borderColor=ds.color; chart.data.datasets[0].borderWidth=1.5; chart.data.datasets[0].fill=true;
    chart.data.datasets[0].tension=0.4; chart.data.datasets[0].pointRadius=0; chart.data.datasets[0].pointHoverRadius=5;
    chart.data.datasets[0].pointHoverBackgroundColor=ds.color; chart.data.datasets[0].pointHoverBorderColor='#fff'; chart.data.datasets[0].pointHoverBorderWidth=2;
    chart.data.datasets[0].borderRadius=undefined; chart.data.datasets[0].maxBarThickness=undefined;
    chart.options.scales.x.ticks.maxTicksLimit=TICKS; chart.options.scales.x.ticks.maxRotation=0; chart.options.scales.x.ticks.minRotation=0;
    chart.options.scales.x.offset=false; chart.options.scales.x.grid={display:false}; chart.options.scales.y.grid={color:'#e6e6e6'};
    chart.options.plugins.tooltip.callbacks.title=()=>'';
    chart.options.plugins.tooltip.callbacks.label=c=>c.parsed.y!==null?`${fmtDate(c.chart.data.labels[c.dataIndex])}: ${num(c.parsed.y,1)}%`:'';
    chart.data.datasets[0].label=I18N.inflAnnualFull+' (%)';
    document.getElementById('infl-btn-yearly').classList.add('active');
    document.getElementById('infl-btn-monthly').classList.remove('active');
  }

  const startIndex=rawData.findIndex(v=>v!==null);
  const allLabels2=ds.labels.slice(startIndex), allData2=rawData.slice(startIndex);
  let labels=allLabels2, data=allData2;
  if(id==='rate'||id==='inflation'){
    const si=allLabels2.findIndex(l=>l>='2010-01');
    if(si>0){ labels=allLabels2.slice(si); data=allData2.slice(si); }
  }
  chart.data.labels=labels; chart.data.datasets[0].data=data;
  if(ds.overlays){
    ds.overlays.forEach((ov,i)=>{
      chart.data.datasets[i+1].data=getOverlaySlice(ov,labels,ds.labels);
      chart.data.datasets[i+1].hidden=true;
      const btn=document.getElementById(`${id}-overlay-${i}`);
      if(btn){btn.classList.remove('btn-overlay--active');btn.style.borderColor='';btn.style.color='';}
    });
    chart.data.datasets[0].fill=true;
    chart.data.datasets[0].backgroundColor=ds._bgFill;
  }
  const si2=document.getElementById(id+"-start"); const ei2=document.getElementById(id+"-end");
  if(si2&&ei2){ si2.value=labels[0]; ei2.value=labels[labels.length-1]; updateRangeLabel(id); }
  const _dd=document.getElementById(id+'-dropdown'); if(_dd)_dd.classList.remove('open');
  const r=id==='rate'?{...computeRange(data.filter(v=>v!==null)),min:0}:computeRange(data.filter(v=>v!==null));
  chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
  chart.update();
  const rb=document.getElementById(id+'-reset-btn'); if(rb)rb.classList.remove('btn-chart--active');
  updateLastVal(id);
}

async function exportXLS(id) {
  const XLSX = await nbtLoadXLSX();
  const chart=charts[id];
  const ds=datasets.find(d=>d.id===id);
  if(ds.stacked){
    const rows=[[I18N.dateCol,...ds.lines.map(ln=>ln.label)]];
    chart.data.labels.forEach((l,i)=>{
      rows.push([l,...ds.lines.map((_,li)=>{const v=chart.data.datasets[li].data[i];return v!==null?v:''})]);
    });
    const ws=XLSX.utils.aoa_to_sheet(rows);
    ws['!cols']=[{wch:10},...ds.lines.map(()=>({wch:20}))];
    const wb2=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb2,ws,id);
    XLSX.writeFile(wb2,id+'.xlsx');
    return;
  }
  if(ds.combined){
    const rows=[[I18N.dateCol,...ds.lines.map(ln=>ln.label)]];
    chart.data.labels.forEach((l,i)=>{
      rows.push([l,...ds.lines.map((_,li)=>{const v=chart.data.datasets[li].data[i];return v!==null?v:''})]);
    });
    const ws=XLSX.utils.aoa_to_sheet(rows);
    ws['!cols']=[{wch:10},...ds.lines.map(()=>({wch:18}))];
    const wb2=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb2,ws,id);
    XLSX.writeFile(wb2,id+'.xlsx');
    return;
  }
  const rows=[[I18N.dateCol, ds.title]];
  chart.data.labels.forEach((l,i)=>{
    const v=chart.data.datasets[0].data[i];
    if(v!==null) rows.push([l,v]);
  });
  const ws=XLSX.utils.aoa_to_sheet(rows);
  ws['!cols']=[{wch:10},{wch:16}];
  const wb2=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2,ws,id);
  XLSX.writeFile(wb2,id+'.xlsx');
}

function toggleDatePicker(id){
  const dd=document.getElementById(id+'-dropdown');
  const isOpen=dd.classList.contains('open');
  document.querySelectorAll('.date-range-dropdown.open').forEach(el=>el.classList.remove('open'));
  if(!isOpen) dd.classList.add('open');
}

function applyDateRange(id){
  document.getElementById(id+'-dropdown').classList.remove('open');
  updateChart(id);
  updateRangeLabel(id);
}

function updateRangeLabel(id){
  const s=document.getElementById(id+'-start').value;
  const e=document.getElementById(id+'-end').value;
  const lbl=document.getElementById(id+'-range-label');
  const fmt=v=>v?v.split('-').reverse().join('.'):'?';
  if(lbl) lbl.textContent=fmt(s)+' — '+fmt(e);
}

document.addEventListener('click',e=>{
  if(!e.target.closest('.date-range-wrap')){
    document.querySelectorAll('.date-range-dropdown.open').forEach(el=>el.classList.remove('open'));
  }
});

function openChartFromHash(){
  const [id,from,to]=decodeURIComponent(location.hash.slice(1)).split('/');
  if(!id||!document.getElementById('chart-'+id)) return;
  if(!document.getElementById(id+'-start')){ document.getElementById('chart-'+id).scrollIntoView({block:'start',behavior:'instant'}); return; }
  const valid=v=>/^\d{4}-\d{2}$/.test(v||'');
  if(valid(from)||valid(to)){
    const si=document.getElementById(id+'-start'), ei=document.getElementById(id+'-end');
    if(valid(from)) si.value=from;
    if(valid(to))   ei.value=to;
    applyDateRange(id);
  }
  document.getElementById('chart-'+id).scrollIntoView({block:'start',behavior:'instant'});
}
