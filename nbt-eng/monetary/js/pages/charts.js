// charts: page script shared by other_links/charts.html, ru/charts_ru.html, eng/charts_eng.html
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
    downloadAll: "Боргирии ҳамаи маълумот (xlsx)",
    copyLink: "Нусхабардории истинод ба ин диаграмма",
    linkCopied: "Истинод нусхабардорӣ шуд",
    colName: "Сутун",
    colDesc: "Тавсиф",
    sheetInfo: "тавсиф",
    cols: {
      date: "Сана (сол-моҳ)",
      inflation: "Таваррум дар моҳ, % (нисбат ба моҳи гузашта)",
      inflation_f: "Таварруми моҳона: маҳсулоти хӯрокворӣ, %",
      inflation_nf: "Таварруми моҳона: маҳсулоти ғайрихӯрокворӣ, %",
      inflation_s: "Таварруми моҳона: хизматрасониҳо, %",
      inflation_y: "Таварруми солона, % (нисбат ба ҳамон моҳи соли гузашта)",
      inflation_y_f: "Таварруми солона: маҳсулоти хӯрокворӣ, %",
      inflation_y_nf: "Таварруми солона: маҳсулоти ғайрихӯрокворӣ, %",
      inflation_y_s: "Таварруми солона: хизматрасониҳо, %",
      inf_sahm_f: "Саҳми маҳсулоти хӯрокворӣ дар таварруми солона, б.ф.",
      inf_sahm_nf: "Саҳми маҳсулоти ғайрихӯрокворӣ дар таварруми солона, б.ф.",
      inf_sahm_s: "Саҳми хизматрасониҳо дар таварруми солона, б.ф.",
      rate_eom: "Меъёри бозтамвил дар охири моҳ, % солона",
      bonds: "Меъёри миёнавазни коғазҳои қиматноки БМТ, %",
      interbank: "Меъёри миёнавазни қарзҳои байнибонкӣ бо пули миллӣ, %",
      m0: "Унсури пулии M0, млн сомонӣ",
      m1: "Унсури пулии M1, млн сомонӣ",
      m2: "Унсури пулии M2, млн сомонӣ",
      m4: "Унсури пулии M4, млн сомонӣ",
      infl_core: "Таварруми асосӣ, % (солона)",
      infl_expect: "Интизориҳои таварруми аҳолӣ барои 12 моҳ, %",
      op_deposits: "Бақияи амонатҳои музоядаҳои БМТ, млн сомонӣ",
      op_securities: "Бақияи коғазҳои қиматноки БМТ, млн сомонӣ",
    },
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
    downloadAll: "Скачать все данные (xlsx)",
    copyLink: "Скопировать ссылку на этот график",
    linkCopied: "Ссылка скопирована",
    colName: "Столбец",
    colDesc: "Описание",
    sheetInfo: "описание",
    cols: {
      date: "Дата (год-месяц)",
      inflation: "Инфляция за месяц, % (к предыдущему месяцу)",
      inflation_f: "Месячная инфляция: продовольственные товары, %",
      inflation_nf: "Месячная инфляция: непродовольственные товары, %",
      inflation_s: "Месячная инфляция: услуги, %",
      inflation_y: "Годовая инфляция, % (к тому же месяцу прошлого года)",
      inflation_y_f: "Годовая инфляция: продовольственные товары, %",
      inflation_y_nf: "Годовая инфляция: непродовольственные товары, %",
      inflation_y_s: "Годовая инфляция: услуги, %",
      inf_sahm_f: "Вклад продовольственных товаров в годовую инфляцию, п.п.",
      inf_sahm_nf: "Вклад непродовольственных товаров в годовую инфляцию, п.п.",
      inf_sahm_s: "Вклад услуг в годовую инфляцию, п.п.",
      rate_eom: "Ставка рефинансирования на конец месяца, % годовых",
      bonds: "Средневзвешенная ставка по ценным бумагам НБТ, %",
      interbank: "Средневзвешенная ставка по межбанковским кредитам в национальной валюте, %",
      m0: "Денежный агрегат M0, млн сомони",
      m1: "Денежный агрегат M1, млн сомони",
      m2: "Денежный агрегат M2, млн сомони",
      m4: "Денежный агрегат M4, млн сомони",
      infl_core: "Базовая инфляция, % (годовая)",
      infl_expect: "Инфляционные ожидания населения на 12 месяцев, %",
      op_deposits: "Остаток депозитов депозитных аукционов НБТ, млн сомони",
      op_securities: "Остаток ценных бумаг НБТ, млн сомони",
    },
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
    downloadAll: "Download all data (xlsx)",
    copyLink: "Copy link to this chart",
    linkCopied: "Link copied",
    colName: "Column",
    colDesc: "Description",
    sheetInfo: "description",
    cols: {
      date: "Date (year-month)",
      inflation: "Monthly inflation, % (vs previous month)",
      inflation_f: "Monthly inflation: food, %",
      inflation_nf: "Monthly inflation: non-food goods, %",
      inflation_s: "Monthly inflation: services, %",
      inflation_y: "Annual inflation, % (vs same month of previous year)",
      inflation_y_f: "Annual inflation: food, %",
      inflation_y_nf: "Annual inflation: non-food goods, %",
      inflation_y_s: "Annual inflation: services, %",
      inf_sahm_f: "Contribution of food to annual inflation, pp",
      inf_sahm_nf: "Contribution of non-food goods to annual inflation, pp",
      inf_sahm_s: "Contribution of services to annual inflation, pp",
      rate_eom: "Refinancing rate at end of month, % per annum",
      bonds: "Weighted average rate on NBT securities, %",
      interbank: "Weighted average rate on interbank loans in national currency, %",
      m0: "Monetary aggregate M0, mln somoni",
      m1: "Monetary aggregate M1, mln somoni",
      m2: "Monetary aggregate M2, mln somoni",
      m4: "Monetary aggregate M4, mln somoni",
      infl_core: "Core inflation, % (annual)",
      infl_expect: "Household inflation expectations for 12 months, %",
      op_deposits: "Outstanding NBT deposit auction deposits, mln somoni",
      op_securities: "Outstanding NBT securities, mln somoni",
    },
  },
}[LANG];

// decimal separator: comma for tj/ru, point for en
const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');

function fmtDate(d){if(!d)return'—';const[y,m]=d.split('-').map(Number);return I18N.months[m-1]+' '+y;}

// x-axis: "янв 14" instead of "2014-01"; fewer labels on phones
const TICKS = window.innerWidth < 640 ? 5 : 10;
function tickLabel(v){
  const l=this.getLabelForValue(v);
  if(!/^\d{4}-\d{2}$/.test(l)) return l;
  const[y,m]=l.split('-').map(Number);
  return I18N.months[m-1].slice(0,3).toLowerCase()+' '+String(y).slice(2);
}



// interest rate corridor: overnight loan = rate + width, overnight deposit = rate − width.
// TODO: ширина ±3 п.п. применена ко всей истории — заменить реальной историей коридора.
const CORRIDOR_WIDTH = 3;

const COLORS = window.NBT_COLORS;

// sections of the page, in order; every chart below names its section
const INFL = () => datasets.find(d => d.id === 'inflation');

const SECTIONS = [
  { id:'sec-inflation', title:I18N.secInflation },
  { id:'sec-policy',    title:I18N.secPolicy },
  { id:'sec-money',     title:I18N.secMoney },
];

// demo — the series is temporary sample data (listed in data/placeholders.txt); the card shows a warning badge
// "Short explanation" under every chart: what it shows, how to read it, why it matters
const EXPLAIN = {
  tj: {
    _btn: 'Шарҳи мухтасар',
    inflation: 'Таварруми солона нишон медиҳад, ки нархҳо нисбат ба ҳамон моҳи соли гузашта чанд фоиз боло рафтаанд. Минтақаи сабз — ҳадафи Бонки миллӣ: агар хат дар дохили минтақа бошад, таваррум дар доираи ҳадаф аст. Тугмаи «Моҳона» афзоиши нархҳоро дар як моҳ нишон медиҳад.',
    groups: 'Таварруми солона алоҳида аз рӯи се гурӯҳи сабади истеъмолӣ: маҳсулоти хӯрокворӣ, молҳои ғайрихӯрокворӣ ва хизматрасониҳои пулӣ. Ба ин васила маълум мешавад, ки кадом гурӯҳ айни замон нархҳоро бештар боло мебарад.',
    groupsm: 'Ҳамон гурӯҳҳо, вале афзоиши нархҳо дар як моҳ. Қиматҳои аз сифр поён маънои онро доранд, ки нархҳо дар гурӯҳ дар давоми моҳ паст шудаанд — одатан дар тобистон ва тирамоҳ дар маҳсулоти хӯрокворӣ.',
    sahm: 'Саҳми гурӯҳҳо дар таварруми умумӣ, бо банди фоизӣ. Саҳм на танҳо аз афзоиши нархҳо дар гурӯҳ, балки аз вазни он дар сабад низ вобаста аст; ҷамъи саҳмҳо ба таварруми умумии солона баробар аст.',
    season: 'Таварруми моҳона аз рӯи моҳҳои сол: ҳар хат — як сол, хати пунктирӣ — миёнаи солҳои гузашта. Дида мешавад, ки дар кадом моҳҳо нархҳо одатан тезтар меафзоянд (зимистон, баҳор) ва дар кадомашон суст мешаванд (тобистон, тирамоҳ).',
    heatmap: 'Ҷадвали таварруми моҳона: сатрҳо — солҳо, сутунҳо — моҳҳо. Ранги ҳар чашмак нишон медиҳад, ки нархҳо дар он моҳ чӣ қадар тағйир ёфтаанд; ҳамин тавр моҳҳои якхелаи солҳои гуногунро муқоиса кардан осон аст. Сурх — нархҳо боло рафтанд, фирӯзаӣ — паст шуданд.',
    core: 'Таварруми асосӣ — афзоиши нархҳо бе молҳое, ки нархашон аз мавсим ё танзими давлатӣ вобаста аст. Он қисми устувори таваррумро нишон медиҳад, ки ба он сиёсати пулию қарзӣ таъсир мерасонад.',
    expect: 'Интизориҳои таварруми — афзоиши нархҳое, ки аҳолӣ дар 12 моҳи оянда интизор аст (аз рӯи пурсиши семоҳаи Бонки миллӣ). Агар интизориҳо аз ҳадаф баланд бошанд, одамон пулро тезтар харҷ мекунанд ва нархҳо бештар меафзоянд.',
    strip: 'Ҳар чашмак — як моҳ аз соли 2017: сабз — таварруми солона дар доираи ҳадаф, сурх — аз ҳадаф боло, кабуд — аз ҳадаф поён. Дар боло: чанд моҳ пай дар пай таваррум дар доираи ҳадаф аст ва чанд фоизи ҳамаи моҳҳо дар доираи он буданд.',
    decyears: 'Барои ҳар сол: чанд маротиба Кумита меъёрро паст кард (сабз), бетағйир гузошт (хокистарӣ) ё баланд бардошт (сурх). Рақам дар болои сутун — тағйири умумии меъёр дар давоми сол.',
    path: 'Ҳар нуқта — як моҳ: дар тири уфуқӣ таварруми солона, дар тири амудӣ меъёри бозтамвил; нуқтаҳо аз соли 2017 бо тартиби вақт пайваст шудаанд, нуқтаи калон — моҳи охирин. Минтақаи сабз — ҳадафи таваррум. Хати диагоналӣ — ҷое, ки меъёр ба таваррум баробар аст: болотар аз он меъёри воқеӣ мусбат ва сиёсат маҳдудкунанда аст, поёнтар — ҳавасмандкунанда. Бо ин график дида мешавад, ки Бонки миллӣ ба болоравии таваррум чӣ гуна ҷавоб медод.',
    rate: 'Меъёри бозтамвил — фишанги асосии сиёсати пулию қарзии Бонки миллӣ. Онро Кумитаи сиёсати пулию қарзӣ муқаррар мекунад; ҳар зинаи график — қарори Кумита.',
    decisions: 'Қарорҳои Кумита дар ҳар ҷаласа: паст кардан, баланд бардоштан ё бетағйир гузоштани меъёр ва ба чанд банди фоизӣ. Ба ин васила самт ва суръати тағйири сиёсат намоён мешавад.',
    deviation: 'Таварруми солона аз маркази ҳадаф чӣ қадар фарқ мекард, бо банди фоизӣ. Сутунҳои дохили минтақа — таваррум дар доираи фарқияти иҷозатдодашуда; болои сифр — таваррум аз ҳадаф баланд. Сутунҳои кабуд — дар доираи ҳадаф, сурх — берун аз он.',
    corridor: 'Долони фоизӣ: ҳудуди боло — меъёри қарзи овернайт, ҳудуди поён — меъёри пасандози овернайт. Меъёрҳои бозори байнибонкӣ одатан дар дохили долон, наздик ба меъёри бозтамвил қарор доранд.',
    realrate: 'Меъёри воқеӣ — меъёри бозтамвил тарҳи таварруми солона. Меъёри воқеии мусбат маънои онро дорад, ки пасандозҳо бо сомонӣ қобилияти харидро ҳифз мекунанд ва ин таваррумро маҳдуд менамояд.',
    transmission: 'Фарқи байни меъёрҳои бозорӣ (байнибонкӣ ва коғазҳои қиматнок) ва меъёри бозтамвил. Ҳар қадар ба сифр наздиктар бошад, ҳамон қадар қарорҳои Бонки миллӣ ба иқтисодиёт беҳтар интиқол меёбанд.',
    bondsinterbank: 'Даромаднокии коғазҳои қиматноки Бонки миллӣ ва меъёри миёнаи бозори байнибонкӣ дар муқоиса бо меъёри бозтамвил. Агар меъёрҳои бозорӣ аз паси меъёри Бонки миллӣ раванд, механизми интиқол кор мекунад.',
    monagg: 'Ҷамъбасти пулӣ: M0 — пули нақд берун аз бонкҳо, M1, M2 ва M4 — ченакҳои васеътари массаи пулӣ, ки пасандозҳоро дар бар мегиранд (M4 — инчунин бо асъори хориҷӣ).',
    moneyinfl: 'Афзоиши массаи пулӣ дар муқоиса бо таваррум. Афзоиши тези пул бе афзоиши иқтисодиёт бо мурури замон одатан ба болоравии нархҳо меорад.',
    dollar: 'Долларикунонӣ — ҳиссаи пасандозҳо бо асъори хориҷӣ дар массаи пулӣ. Ҳар қадар он паст бошад, ҳамон қадар қарорҳои Бонки миллӣ оид ба меъёр ба иқтисодиёт қавитар таъсир мерасонанд. Ҳисоб: (M4 − M2) / M4.',
    ops: 'Ҳаҷми амалиётҳои Бонки миллӣ оид ба ҷалби пардохтпазирӣ: коғазҳои қиматнок ва пасандозҳои аз музоядаҳо ҷалбшуда. Бо ин роҳ Бонки миллӣ пули зиёдатиро аз бонкҳо ҷалб мекунад, то меъёрҳои бозорӣ дар наздикии меъёри бозтамвил бошанд.',
  },
  ru: {
    _btn: 'Краткое пояснение',
    inflation: 'Годовая инфляция показывает, на сколько процентов цены выросли по сравнению с тем же месяцем прошлого года. Зелёная полоса — цель Национального банка: если линия внутри полосы, инфляция в пределах цели. Кнопка «Ежемесячная» показывает рост цен за один месяц.',
    groups: 'Годовая инфляция отдельно по трём группам потребительской корзины: продовольственные товары, непродовольственные товары и платные услуги. Так видно, какая группа сейчас сильнее всего толкает цены вверх.',
    groupsm: 'Те же группы, но рост цен за один месяц. Значения ниже нуля значат, что цены в группе за месяц снизились — обычно летом и осенью у продовольствия.',
    sahm: 'Вклад групп в общую инфляцию, в процентных пунктах. Вклад зависит не только от роста цен в группе, но и от её веса в корзине; сумма вкладов равна общей годовой инфляции.',
    season: 'Ежемесячная инфляция по месяцам года: каждая линия — отдельный год, пунктир — среднее за прошлые годы. Видно, в какие месяцы цены обычно растут быстрее (зима, весна), а в какие замедляются (лето, осень).',
    heatmap: 'Таблица ежемесячной инфляции: строки — годы, столбцы — месяцы. Цвет клетки показывает, насколько изменились цены в этом месяце; так легко сравнить одинаковые месяцы разных лет. Красный — цены выросли, бирюзовый — снизились.',
    core: 'Базовая инфляция — рост цен без товаров, цены на которые зависят от сезона или регулируются государством. Она показывает устойчивую часть инфляции, на которую влияет денежно-кредитная политика.',
    expect: 'Инфляционные ожидания — рост цен, которого население ждёт в ближайшие 12 месяцев (по ежеквартальному опросу Национального банка). Если ожидания выше цели, люди быстрее тратят деньги, и цены растут сильнее.',
    strip: 'Каждая клетка — месяц с 2017 года: зелёная — годовая инфляция в пределах цели, красная — выше цели, синяя — ниже. Сверху — сколько месяцев подряд инфляция держится в пределах цели и какая доля всех месяцев была в её пределах.',
    decyears: 'По каждому году: сколько раз Комитет снижал ставку (зелёный), оставлял без изменений (серый) и повышал (красный). Число над столбцом — на сколько ставка изменилась за весь год.',
    path: 'Каждая точка — месяц: по горизонтали годовая инфляция, по вертикали ставка рефинансирования; точки соединены по времени с 2017 года, крупная точка — последний месяц. Зелёная полоса — цель по инфляции. Диагональ — там, где ставка равна инфляции: выше неё реальная ставка положительная и политика сдерживающая, ниже — стимулирующая. График показывает, как Национальный банк отвечал на рост инфляции и как инфляция возвращалась к цели.',
    rate: 'Ставка рефинансирования — главный инструмент денежно-кредитной политики Национального банка. Её устанавливает Комитет по денежно-кредитной политике; каждая ступенька на графике — решение Комитета.',
    decisions: 'Решения Комитета на каждом заседании: снижение, повышение или сохранение ставки и на сколько процентных пунктов. Так видно направление и скорость изменения политики.',
    deviation: 'Насколько годовая инфляция отличалась от центра цели, в процентных пунктах. Столбцы внутри полосы — инфляция в пределах допустимого отклонения; выше нуля — инфляция выше цели. Синие столбцы — в пределах цели, красные — вне её.',
    corridor: 'Процентный коридор: верхняя граница — ставка по кредитам овернайт, нижняя — по депозитам овернайт. Ставки межбанковского рынка обычно держатся внутри коридора, ближе к ставке рефинансирования.',
    realrate: 'Реальная ставка — ставка рефинансирования минус годовая инфляция. Положительная реальная ставка значит, что сбережения в сомони сохраняют покупательную способность, и это сдерживает инфляцию.',
    transmission: 'Разница между рыночными ставками (межбанковской и по ценным бумагам) и ставкой рефинансирования. Чем ближе к нулю, тем лучше решения Национального банка передаются в экономику.',
    bondsinterbank: 'Доходность ценных бумаг Национального банка и средняя ставка межбанковского рынка в сравнении со ставкой рефинансирования. Если рыночные ставки идут за ставкой НБТ, механизм передачи работает.',
    monagg: 'Денежные агрегаты: M0 — наличные деньги вне банков, M1, M2 и M4 — более широкие меры денежной массы, включающие депозиты (M4 — ещё и в иностранной валюте).',
    moneyinfl: 'Рост денежной массы в сравнении с инфляцией. Быстрый рост денег без роста экономики со временем обычно ведёт к росту цен.',
    dollar: 'Долларизация — доля депозитов в иностранной валюте в денежной массе. Чем она ниже, тем сильнее решения Национального банка по ставке действуют на экономику. Расчёт: (M4 − M2) / M4.',
    ops: 'Объём операций Национального банка по изъятию ликвидности: ценные бумаги и депозиты, привлечённые на аукционах. Так НБТ забирает у банков лишние деньги, чтобы рыночные ставки держались около ставки рефинансирования.',
  },
  en: {
    _btn: 'Short explanation',
    inflation: 'Annual inflation shows by how many percent prices rose compared with the same month a year earlier. The green band is the National Bank’s target: when the line is inside the band, inflation is on target. The “Monthly” button shows the price change over one month.',
    groups: 'Annual inflation for each of the three groups of the consumer basket: food, non-food goods and paid services. It shows which group is pushing prices up the most right now.',
    groupsm: 'The same groups, but the price change over one month. Values below zero mean prices in the group fell during the month — usually food in summer and autumn.',
    sahm: 'Contribution of each group to overall inflation, in percentage points. It depends both on price growth in the group and on its weight in the basket; the contributions add up to overall annual inflation.',
    season: 'Monthly inflation by month of the year: each line is one year, the dashed line is the average of earlier years. It shows in which months prices usually rise faster (winter, spring) and when they slow down (summer, autumn).',
    heatmap: 'Monthly inflation as a table: rows are years, columns are months. The colour of a cell shows how much prices changed that month, so the same month can easily be compared across years. Red — prices rose, teal — prices fell.',
    core: 'Core inflation is price growth excluding goods whose prices depend on the season or are regulated by the state. It shows the persistent part of inflation that monetary policy influences.',
    expect: 'Inflation expectations are the price growth people expect over the next 12 months (quarterly National Bank survey). When expectations are above the target, people spend faster and prices rise more.',
    strip: 'Each cell is a month since 2017: green — annual inflation within the target, red — above it, blue — below it. On top: how many months in a row inflation has stayed within the target and what share of all months it was within.',
    decyears: 'For each year: how many times the Committee cut the rate (green), kept it (grey) or raised it (red). The number above a bar is the total change of the rate over the year.',
    path: 'Each dot is a month: annual inflation across, the refinancing rate up; the dots are joined in time order since 2017, the large dot is the latest month. The green band is the inflation target. The diagonal is where the rate equals inflation: above it the real rate is positive and policy is tight, below it policy is easy. The chart shows how the National Bank responded to rising inflation and how inflation came back to the target.',
    rate: 'The refinancing rate is the National Bank’s main monetary policy instrument. It is set by the Monetary Policy Committee; every step on the chart is a Committee decision.',
    decisions: 'The Committee’s decision at every meeting: a cut, a hike or no change, and by how many percentage points. It shows the direction and pace of policy changes.',
    deviation: 'How far annual inflation was from the centre of the target, in percentage points. Bars inside the band mean inflation within the tolerance; above zero means inflation above the target. Blue bars are within the target, red ones outside it.',
    corridor: 'The interest rate corridor: the upper bound is the overnight lending rate, the lower bound the overnight deposit rate. Interbank rates usually stay inside the corridor, close to the refinancing rate.',
    realrate: 'The real rate is the refinancing rate minus annual inflation. A positive real rate means savings in somoni keep their purchasing power, which holds inflation back.',
    transmission: 'The gap between market rates (interbank and securities) and the refinancing rate. The closer to zero, the better the National Bank’s decisions pass through to the economy.',
    bondsinterbank: 'Yields on National Bank securities and the average interbank rate next to the refinancing rate. When market rates follow the NBT rate, transmission works.',
    monagg: 'Monetary aggregates: M0 is cash outside banks; M1, M2 and M4 are broader measures of money that include deposits (M4 also in foreign currency).',
    moneyinfl: 'Money supply growth next to inflation. Fast money growth without matching economic growth usually leads to higher prices over time.',
    dollar: 'Dollarization is the share of foreign-currency deposits in the money supply. The lower it is, the stronger the National Bank’s rate decisions affect the economy. Calculation: (M4 − M2) / M4.',
    ops: 'The volume of National Bank liquidity-absorbing operations: securities and deposits placed at auctions. This is how the NBT takes surplus money from banks so that market rates stay near the refinancing rate.',
  },
}[LANG];
const explainBlock = id => EXPLAIN[id]
  ? `<details class="chart-explain"><summary>${EXPLAIN._btn}</summary><p>${EXPLAIN[id]}</p></details>` : '';

const datasets = [
  // --- inflation
  { id:"inflation", sec:'sec-inflation', title:I18N.tInflation, note:I18N.nInflation, targetBand:true, color:COLORS.inflation, mode:"yearly", source:I18N.srcStat },
  { id:"groups", sec:'sec-inflation', title:I18N.tGroups, note:I18N.nGroups, combined:true, from:'2010-01', demo:I18N.demoFromApr, source:I18N.srcStat,
    lines:[
      { id:"infl_y_f",  label:I18N.food,     color:COLORS.food, tension:0.3 },
      { id:"infl_y_nf", label:I18N.nonfood,  color:COLORS.nonfood, tension:0.3 },
      { id:"infl_y_s",  label:I18N.services, color:COLORS.services, tension:0.3 }
    ],
    overlays:[
      { id:"inflation", dataKey:"yearly", label:I18N.inflAnnual, color:COLORS.inflationOverlay, tension:0.3 }
    ]
  },
  { id:"groupsm", sec:'sec-inflation', custom:'multiples', title:I18N.tGroupsM, note:I18N.nGroupsM, combined:true, lastMonths:24, zeroLine:true, demo:I18N.demoFromApr, source:I18N.srcStat,
    lines:[
      { id:"infl_f",  label:I18N.food,     color:COLORS.food, tension:0.2 },
      { id:"infl_nf", label:I18N.nonfood,  color:COLORS.nonfood, tension:0.2 },
      { id:"infl_s",  label:I18N.services, color:COLORS.services, tension:0.2 }
    ]
  },
  { id:"sahm", sec:'sec-inflation', title:I18N.tSahm, stacked:true, source:I18N.srcStat,
    lines:[
      { id:"sahm_f",  label:I18N.food, color:COLORS.food },
      { id:"sahm_nf", label:I18N.nonfood, color:COLORS.nonfood },
      { id:"sahm_s",  label:I18N.services, color:COLORS.services },
    ],
    overlays:[
      { id:"inflation", dataKey:"yearly", label:I18N.inflAnnual, color:COLORS.inflationOverlay, tension:0.4 }
    ]
  },
  { id:"season",  sec:'sec-inflation', custom:'season',  title:I18N.tSeason,  note:I18N.nSeason,  source:I18N.srcStat },
  { id:"heatmap", sec:'sec-inflation', custom:'heatmap', title:I18N.tHeatmap, note:I18N.nHeatmap, source:I18N.srcStat },
  { id:"core", sec:'sec-inflation', title:I18N.tCore, note:I18N.nCore, combined:true, from:'2015-01', demo:I18N.demoAll, source:I18N.srcStat,
    lines:[
      { id:"inflation_y", label:I18N.inflAnnual, color:COLORS.inflation, tension:0.3 },
      { id:"infl_core",   label:I18N.core,       color:COLORS.core, tension:0.3 }
    ]
  },
  { id:"expect", sec:'sec-inflation', title:I18N.tExpect, note:I18N.nExpect, combined:true, from:'2019-01', demo:I18N.demoAll, source:I18N.srcNbt,
    lines:[
      { id:"inflation_y", label:I18N.inflAnnual, color:COLORS.inflation, tension:0.3 },
      { id:"infl_expect", label:I18N.expect,     color:COLORS.expect, tension:0.3, dash:[6,4] }
    ]
  },
  // --- monetary policy
  { id:"rate", sec:'sec-policy', title:I18N.rate, color:COLORS.rate, source:I18N.srcBoth,
    overlays:[
      { id:"inflation", dataKey:"yearly", label:I18N.inflAnnual, color:COLORS.inflationOverlay, tension:0.4 }
    ]
  },
  { id:"strip", sec:'sec-policy', custom:'strip', title:I18N.tStrip, source:I18N.srcStat },
  { id:"decyears", sec:'sec-policy', custom:'decyears', title:I18N.tDecYears, source:I18N.srcNbt },
  { id:"path", sec:'sec-policy', custom:'path', title:I18N.tPath, source:I18N.srcBoth },
  { id:"deviation", sec:'sec-policy', custom:'deviation', title:I18N.tDeviation, note:I18N.nDeviation, source:I18N.srcBoth },
  { id:"corridor", sec:'sec-policy', title:I18N.tCorridor, note:I18N.nCorridor, combined:true, from:'2014-01', keepFill:true, source:I18N.srcNbt,
    lines:[
      { id:"corr_low",  label:I18N.corrLow, color:COLORS.corridor, stepped:true, dash:[5,4], width:1 },
      { id:"corr_up",   label:I18N.corrUp,  color:COLORS.corridor, stepped:true, dash:[5,4], width:1, fillTo:'-1', fillColor:nbtAlpha(COLORS.corridor,0.14) },
      { id:"corr_rate", label:I18N.rate,    color:COLORS.rate, stepped:true, width:2 },
      { id:"interbank", label:I18N.interbank, color:COLORS.interbank, tension:0.3 },
      { id:"bonds",     label:I18N.bonds,   color:COLORS.bonds, tension:0.3 }
    ]
  },
  { id:"realrate", sec:'sec-policy', title:I18N.tReal, note:I18N.nReal, combined:true, from:'2010-01', zeroLine:true, source:I18N.srcBoth,
    lines:[
      { id:"realrate", label:I18N.real, color:COLORS.realrate, tension:0.3 }
    ]
  },
  { id:"transmission", sec:'sec-policy', title:I18N.tTransm, note:I18N.nTransm, combined:true, pp:true, from:'2014-01', zeroLine:true, source:I18N.srcNbt,
    lines:[
      { id:"sp_ib",    label:I18N.spIb,    color:COLORS.interbank, tension:0.3 },
      { id:"sp_bonds", label:I18N.spBonds, color:COLORS.bonds, tension:0.3 }
    ]
  },
  // --- interest rates
  { id:"bondsinterbank", sec:'sec-policy', title:I18N.tBonds,
    combined:true, source:I18N.srcNbt,
    lines:[
      { id:"bonds",     label:I18N.bonds, color:COLORS.bonds, tension:0.4 },
      { id:"interbank", label:I18N.interbank, color:COLORS.interbank, tension:0.4 }
    ],
    overlays:[
      { id:"rate", dataKey:"data", label:I18N.rate, color:COLORS.rate, stepped:true, tension:0 }
    ]
  },
  // --- money and NBT operations
  { id:"monagg", sec:'sec-money', title:I18N.tMonagg, combined:true, isLarge:true, from:'2010-01', source:I18N.srcNbt,
    lines:[
      { id:"m4", label:"M4", color:COLORS.m4, tension:0.4 },
      { id:"m2", label:"M2", color:COLORS.m2, tension:0.4 },
      { id:"m1", label:"M1", color:COLORS.m1, tension:0.4 },
      { id:"m0", label:"M0", color:COLORS.m0, tension:0.4 }
    ]
  },
  { id:"moneyinfl", sec:'sec-money', title:I18N.tMoneyInfl, note:I18N.nMoneyInfl, combined:true, from:'2010-01', zeroLine:true, source:I18N.srcBoth,
    lines:[
      { id:"m2_yoy",      label:I18N.m2growth,   color:COLORS.m2, tension:0.3 },
      { id:"inflation_y", label:I18N.inflAnnual, color:COLORS.inflation, tension:0.3 }
    ]
  },
  { id:"dollar", sec:'sec-money', title:I18N.tDollar, note:I18N.nDollar, combined:true, from:'2010-01', source:I18N.srcNbt,
    lines:[
      { id:"dollar", label:I18N.dollar, color:COLORS.dollar, tension:0.3 }
    ]
  },
  { id:"ops", sec:'sec-money', title:I18N.tOps, note:I18N.nOps, combined:true, isLarge:true, from:'2016-01', demo:I18N.demoAll, source:I18N.srcNbt,
    lines:[
      { id:"op_securities", label:I18N.opSecurities, color:COLORS.bonds, tension:0.3 },
      { id:"op_deposits",   label:I18N.opDeposits,   color:COLORS.opDeposits, tension:0.3 }
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

  const parsed={ inflation:[], inflation_y:[], rate:[], bonds:[], interbank:[], m0:[], m1:[], m2:[], m4:[], m2_yoy:[], m4_yoy:[], sahm_f:[], sahm_nf:[], sahm_s:[], infl_y_f:[], infl_y_nf:[], infl_y_s:[], realrate:[], corr_low:[], corr_up:[], corr_rate:[],
    infl_f:[], infl_nf:[], infl_s:[], infl_core:[], infl_expect:[], op_deposits:[], op_securities:[], dollar:[], sp_ib:[], sp_bonds:[] };
  const labels=[];

  json.forEach(row=>{
    const date=row.date; if(!date) return;
    const infl=toNum(row.inflation), infl_y=toNum(row.inflation_y);
    const rate=toNum(row.rate_eom), bonds=toNum(row.bonds), interbank=toNum(row.interbank);
    const m0=toNum(row.m0), m1=toNum(row.m1), m2=toNum(row.m2), m4=toNum(row.m4);
    const sahm_f=toNum(row.inf_sahm_f), sahm_nf=toNum(row.inf_sahm_nf), sahm_s=toNum(row.inf_sahm_s);
    if(infl===null&&infl_y===null&&rate===null&&bonds===null&&interbank===null&&m0===null&&m1===null&&m2===null&&m4===null&&sahm_f===null&&sahm_nf===null&&sahm_s===null) return;
    labels.push(date);
    parsed.inflation.push(infl); parsed.inflation_y.push(infl_y);
    parsed.rate.push(rate); parsed.bonds.push(bonds); parsed.interbank.push(interbank);
    parsed.m0.push(m0); parsed.m1.push(m1); parsed.m2.push(m2); parsed.m4.push(m4);
    parsed.sahm_f.push(sahm_f); parsed.sahm_nf.push(sahm_nf); parsed.sahm_s.push(sahm_s);
    parsed.infl_y_f.push(toNum(row.inflation_y_f)); parsed.infl_y_nf.push(toNum(row.inflation_y_nf)); parsed.infl_y_s.push(toNum(row.inflation_y_s));
    // real (ex-post) refinancing rate: rate minus annual inflation of the same month
    parsed.realrate.push(rate!==null&&infl_y!==null?+(rate-infl_y).toFixed(2):null);
    parsed.corr_rate.push(rate);
    parsed.corr_low.push(rate!==null?+(rate-CORRIDOR_WIDTH).toFixed(2):null);
    parsed.corr_up.push(rate!==null?+(rate+CORRIDOR_WIDTH).toFixed(2):null);
    parsed.infl_f.push(toNum(row.inflation_f)); parsed.infl_nf.push(toNum(row.inflation_nf)); parsed.infl_s.push(toNum(row.inflation_s));
    parsed.infl_core.push(toNum(row.infl_core)); parsed.infl_expect.push(toNum(row.infl_expect));
    parsed.op_deposits.push(toNum(row.op_deposits)); parsed.op_securities.push(toNum(row.op_securities));
    // dollarization: foreign-currency deposits (M4 − M2) as a share of broad money M4
    parsed.dollar.push(m4!==null&&m2!==null&&m4>0?+((m4-m2)/m4*100).toFixed(2):null);
    // transmission: how far market rates are from the policy rate, pp
    parsed.sp_ib.push(interbank!==null&&rate!==null?+(interbank-rate).toFixed(2):null);
    parsed.sp_bonds.push(bonds!==null&&rate!==null?+(bonds-rate).toFixed(2):null);
  });

  const _prevDate=d=>{const[y,m]=d.split('-').map(Number);return`${y-1}-${String(m).padStart(2,'0')}`;};
  for(const k of['m2','m4']){
    parsed[k+'_yoy']=labels.map((d,i)=>{
      const pi=labels.indexOf(_prevDate(d));
      const cur=parsed[k][i],prev=pi>=0?parsed[k][pi]:null;
      return(cur!==null&&prev!==null&&prev>0)?+((cur-prev)/prev*100).toFixed(2):null;
    });
  }

  datasets.forEach(ds=>{
    ds.labels=labels;
    if(ds.custom&&!ds.lines) return;   // seasonality / heatmap read the inflation series directly
    if(ds.id==="inflation"){
      ds.data_monthly=parsed.inflation; ds.data_yearly=parsed.inflation_y; ds.data=ds.data_yearly;
    } else if(ds.stacked){
      ds.lines.forEach(ln=>{ ln.data=parsed[ln.id]; });
      ds.data=ds.lines[0].data;
    } else if(ds.combined){
      ds.lines.forEach(ln=>{ ln.data=parsed[ln.id]; });
      if(ds.id==='monagg'){
        ds.lines[0].yoy_data=parsed.m4_yoy;
        ds.lines[1].yoy_data=parsed.m2_yoy;
        ds.monaggMode='level';
      }
      ds.data=ds.lines[0].data;
    } else {
      ds.data=parsed[ds.id];
    }
  });

  // Compute last data date per dataset
  datasets.forEach(ds=>{
    if(ds.custom) return;
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
function barColors(data){ return data.map(v=>v===null?'transparent':v>=0?nbtAlpha(COLORS.inflation,0.5):nbtAlpha(COLORS.deflation,0.33)); }
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
function computeRangeLarge(values){
  const nums=values.filter(v=>v!==null);
  if(!nums.length) return {min:0,max:10000,step:2000};
  const lo=Math.min(...nums),hi=Math.max(...nums);
  const rawStep=(hi-lo)/5;
  const mag=Math.pow(10,Math.floor(Math.log10(rawStep||1)));
  const n=rawStep/mag;
  const nice=n<1.5?1:n<3.5?2:n<7.5?5:10;
  const step=nice*mag;
  const mid=(lo+hi)/2,half=Math.ceil(((hi-lo)/2+step)/step)*step;
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
  // a quarter-step margin around the data, always including zero
  return {min:Math.min(0,Math.floor((lo-step/4)/step)*step),max:Math.max(0,Math.ceil((hi+step/4)/step)*step),step};
}


function fmtVal(val,id){
  return num(val, id==='rate' ? 2 : 1);
}

function initCharts(){
  const container=document.getElementById("charts");
  container.innerHTML=`<div class="charts-toolbar">
    <nav class="charts-toc" aria-label="${I18N.toc}">${SECTIONS.map(sc=>`<a href="#${sc.id}">${sc.title}</a>`).join('')}</nav>
    <button class="btn-chart" onclick="exportAllData(this)">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      ${I18N.downloadAll}
    </button>
  </div>`;

  let curSec=null;
  datasets.forEach(ds=>{
    if(ds.sec!==curSec){
      curSec=ds.sec;
      const h=document.createElement('h2');
      h.className='charts-section'; h.id=ds.sec;
      h.textContent=SECTIONS.find(sc=>sc.id===ds.sec).title;
      container.appendChild(h);
    }
    if(ds.custom){ container.appendChild(createCustomCard(ds)); return; }
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
          ${ds.id==="monagg" ? `
          <div class="chart-type-toggle">
            <button class="chart-type-btn active" id="monagg-btn-level" onclick="switchMonagg('level')">${I18N.level}</button>
            <button class="chart-type-btn" id="monagg-btn-growth" onclick="switchMonagg('growth')">${I18N.growth}</button>
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
          <button class="btn-chart" onclick="copyChartLink('${ds.id}',this)" title="${I18N.copyLink}" aria-label="${I18N.copyLink}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
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
        <div class="chart-source" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px"><span>${ds.source||I18N.srcNbt}</span><span>${I18N.updated}: ${fmtDate(ds.lastDate)}</span></div>
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

  // the refinancing rate: a light clean blue under the line (the dark navy gradient looked grey-violet)
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
    type:"line", plugins:ds.targetBand?[targetBandPlugin]:[],
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
    if(ds.bars){   // grouped columns: one per group and month
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
  const r=ds.isLarge?computeRangeLarge(allVals):hasNeg?computeRangeTight(allVals):computeRange(allVals);
  const ctx=document.getElementById(ds.id+"Chart");
  charts[ds.id]=new Chart(ctx,{
    type:"line", plugins:[],
    data:{labels, datasets:chartDatasets},
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        endLabel:ds.isLarge?false:{suffix:ds.pp?' '+I18N.pp:'%',decimals:1},
        tooltip:{callbacks:{
          title:()=>'',
          label:c=>{
            if(c.parsed.y===null)return'';
            const lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
            const dsLabel=c.chart.data.datasets[c.datasetIndex].label;
            const val=c.parsed.y;
            if(ds.isLarge) return`${lbl} · ${dsLabel}: ${num(val/1000,1)} ${I18N.bnSom}`;
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
  if(ds.keepFill||ds.bars) return;   // chart with its own fill (corridor band) / columns
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
    chart.data.datasets[0].borderWidth=1; chart.data.datasets[0].fill=false;
    chart.data.datasets[0].borderRadius=4; chart.data.datasets[0].maxBarThickness=20;
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

function switchMonagg(mode){
  const ds=datasets.find(d=>d.id==='monagg');
  const chart=charts['monagg'];
  ds.monaggMode=mode;
  const curLabels=chart.data.labels;
  const si=ds.labels.indexOf(curLabels[0]);
  const ei=ds.labels.indexOf(curLabels[curLabels.length-1]);
  const slice=arr=>(si>=0&&ei>=0)?arr.slice(si,ei+1):arr;

  if(mode==='growth'){
    chart.data.datasets[0].data=slice(ds.lines[0].yoy_data);
    chart.data.datasets[1].data=slice(ds.lines[1].yoy_data);
    chart.data.datasets[2].hidden=true;
    chart.data.datasets[3].hidden=true;
    const b2=document.getElementById('monagg-line-2'); if(b2) b2.style.display='none';
    const b3=document.getElementById('monagg-line-3'); if(b3) b3.style.display='none';
    const allVals=[...chart.data.datasets[0].data,...chart.data.datasets[1].data].filter(v=>v!==null);
    const hasNeg=allVals.some(v=>v<0);
    const r=hasNeg?computeRangeTight(allVals):computeRange(allVals);
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
    chart.options.scales.y.ticks.callback=v=>v+'%';
    chart.options.plugins.tooltip.callbacks.label=c=>{
      if(c.parsed.y===null)return'';
      const lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
      const dsLabel=c.chart.data.datasets[c.datasetIndex].label;
      return`${lbl} · ${dsLabel}: ${num(c.parsed.y,1)}%`;
    };
  } else {
    ds.lines.forEach((ln,i)=>{ chart.data.datasets[i].data=slice(ln.data); chart.data.datasets[i].hidden=false; });
    const b2=document.getElementById('monagg-line-2'); if(b2) b2.style.display='';
    const b3=document.getElementById('monagg-line-3'); if(b3) b3.style.display='';
    const allVals=ds.lines.flatMap(ln=>slice(ln.data)).filter(v=>v!==null);
    const r=computeRangeLarge(allVals);
    chart.options.scales.y.min=r.min; chart.options.scales.y.max=r.max; chart.options.scales.y.ticks.stepSize=r.step;
    chart.options.scales.y.ticks.callback=v=>(v/1000).toFixed(0)+' '+I18N.bn;
    chart.options.plugins.tooltip.callbacks.label=c=>{
      if(c.parsed.y===null)return'';
      const lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
      const dsLabel=c.chart.data.datasets[c.datasetIndex].label;
      return`${lbl} · ${dsLabel}: ${num(c.parsed.y/1000,1)} ${I18N.bnSom}`;
    };
  }
  document.getElementById('monagg-btn-level').classList.toggle('active',mode==='level');
  document.getElementById('monagg-btn-growth').classList.toggle('active',mode==='growth');
  updateCombinedFill('monagg');
  chart.update();
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
    if(id==='monagg'&&ds.monaggMode==='growth'){
      chart.data.datasets[0].data=ds.lines[0].yoy_data.slice(s,e);
      chart.data.datasets[1].data=ds.lines[1].yoy_data.slice(s,e);
    } else {
      ds.lines.forEach((ln,i)=>{ chart.data.datasets[i].data=ln.data.slice(s,e); });
    }
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
    let allVals;
    if(id==='monagg'&&ds.monaggMode==='growth'){
      allVals=[...ds.lines[0].yoy_data.slice(s,e),...ds.lines[1].yoy_data.slice(s,e)].filter(v=>v!==null);
    } else {
      const visibleLines=ds.lines.filter((ln,i)=>!chart.data.datasets[i].hidden);
      const visibleVals=(visibleLines.length?visibleLines:ds.lines).flatMap(ln=>ln.data.slice(s,e)).filter(v=>v!==null);
      allVals=visibleVals;
    }
    const hasNeg=allVals.some(v=>v<0);
    const r=(id==='monagg'&&ds.monaggMode==='growth')
      ?(hasNeg?computeRangeTight(allVals):computeRange(allVals))
      :(ds.isLarge?computeRangeLarge(allVals):hasNeg?computeRangeTight(allVals):computeRange(allVals));
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
    if(id==='monagg'&&ds.monaggMode==='growth'){
      ds.monaggMode='level';
      chart.options.scales.y.ticks.callback=v=>(v/1000).toFixed(0)+' '+I18N.bn;
      chart.options.plugins.tooltip.callbacks.label=c=>{
        if(c.parsed.y===null)return'';
        const lbl=fmtDate(c.chart.data.labels[c.dataIndex]);
        const dsLabel=c.chart.data.datasets[c.datasetIndex].label;
        return`${lbl} · ${dsLabel}: ${num(c.parsed.y/1000,1)} ${I18N.bnSom}`;
      };
      document.getElementById('monagg-btn-level').classList.add('active');
      document.getElementById('monagg-btn-growth').classList.remove('active');
      const b2=document.getElementById('monagg-line-2'); if(b2) b2.style.display='';
      const b3=document.getElementById('monagg-line-3'); if(b3) b3.style.display='';
    }
    updateCombinedFill(id);
    const si2=document.getElementById(id+"-start"); const ei2=document.getElementById(id+"-end");
    if(si2&&ei2){ si2.value=labels[0]; ei2.value=labels[labels.length-1]; updateRangeLabel(id); }
    const _dd=document.getElementById(id+'-dropdown'); if(_dd)_dd.classList.remove('open');
    const allVals=ds.lines.flatMap(ln=>ln.data.slice(startIndex)).filter(v=>v!==null);
    const hasNeg=allVals.some(v=>v<0);
    const r=ds.isLarge?computeRangeLarge(allVals):hasNeg?computeRangeTight(allVals):computeRange(allVals);
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

// links to one chart and period: charts.html#corridor/2018-01/2026-09
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

async function copyChartLink(id,btn){
  const si=document.getElementById(id+'-start'), ei=document.getElementById(id+'-end');
  const hash=si&&ei?[id,si.value,ei.value].join('/'):id;
  const url=location.href.split('#')[0]+'#'+hash;
  history.replaceState(null,'','#'+hash);
  try{
    await navigator.clipboard.writeText(url);
    btn.classList.add('btn-chart--done'); btn.title=I18N.linkCopied;
    setTimeout(()=>{btn.classList.remove('btn-chart--done'); btn.title=I18N.copyLink;},1600);
  }catch(e){ window.prompt(I18N.copyLink,url); }
}

// every column of data.json + a sheet describing them
async function exportAllData(btn){
  btn.disabled=true;
  try{
    const XLSX=await nbtLoadXLSX();
    const rows=await nbtLoadRows({defval:''});
    const cols=Object.keys(I18N.cols);
    const data=[cols,...rows.map(r=>cols.map(c=>r[c]??''))];
    const ws=XLSX.utils.aoa_to_sheet(data);
    ws['!cols']=cols.map(c=>({wch:c==='date'?9:13}));
    const info=XLSX.utils.aoa_to_sheet([[I18N.colName,I18N.colDesc],...cols.map(c=>[c,I18N.cols[c]]),[],[I18N.srcBoth]]);
    info['!cols']=[{wch:16},{wch:90}];
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'data');
    XLSX.utils.book_append_sheet(wb,info,I18N.sheetInfo);
    XLSX.writeFile(wb,'nbt_monetary_data.xlsx');
  } finally { btn.disabled=false; }
}

// green band = inflation target in force in each month (data/targets.js); hidden on the monthly view
const targetBandPlugin={
  id:'targetBand',
  beforeDatasetsDraw(chart){
    const ds=datasets.find(d=>d.id==='inflation');
    if(!ds||ds.mode==='monthly'||!window.nbtTargetFor) return;
    const {ctx:c,chartArea:a,scales:{x,y}}=chart, labels=chart.data.labels;
    if(!labels.length) return;
    const step=labels.length>1?(x.getPixelForValue(1)-x.getPixelForValue(0)):a.width;
    c.save();
    c.beginPath(); c.rect(a.left,a.top,a.width,a.height); c.clip();
    // one rectangle per run of months with the same target (no seams between months)
    const runs=[];
    labels.forEach((l,i)=>{
      const t=nbtTargetFor(l), last=runs[runs.length-1];
      if(!t) return;
      if(last&&last.t===t&&last.end===i-1) last.end=i; else runs.push({t,start:i,end:i});
    });
    // drawn the same way as on the inflation page: light band, thin edges, dashed centre that steps between periods
    runs.forEach(({t,start,end})=>{
      const x0=x.getPixelForValue(start)-step/2, x1=x.getPixelForValue(end)+step/2;
      const top=y.getPixelForValue(t.center+t.band), bot=y.getPixelForValue(t.center-t.band);
      c.fillStyle='rgba(16,185,129,0.08)'; c.fillRect(x0,top,x1-x0,bot-top);
      c.fillStyle='rgba(16,185,129,0.30)'; c.fillRect(x0,top-0.5,x1-x0,1); c.fillRect(x0,bot-0.5,x1-x0,1);
    });
    c.strokeStyle='rgba(5,150,105,0.65)'; c.lineWidth=1.5; c.setLineDash([6,4]);
    c.beginPath();
    runs.forEach(({t,start,end},k)=>{
      const x0=x.getPixelForValue(start)-step/2, x1=x.getPixelForValue(end)+step/2, py=y.getPixelForValue(t.center);
      const prev=runs[k-1];
      if(prev&&prev.end===start-1) c.lineTo(x0,py); else c.moveTo(x0,py);
      c.lineTo(x1,py);
    });
    c.stroke(); c.setLineDash([]);
    c.restore();
  }
};

// colours of Committee decisions (decisions-by-year chart)
const DEC_COLORS={cut:'#15803d',raise:'#c0504d',hold:'#94a3b8'};
// cards that are not a plain time series: seasonality chart and heatmap
function createCustomCard(ds){
  const block=document.createElement('div');
  block.className='chart-card'; block.id='chart-'+ds.id;
  block.innerHTML=`
    <div class="chart-card__header">
      <div class="chart-card__header-left">
        <h2 class="chart-card__title">${ds.title}</h2>
        ${ds.demo?`<span class="demo-badge" title="${I18N.demoHint}">${ds.demo}</span>`:''}
      </div>
      <div class="chart-toolbar">
        <button class="btn-chart" onclick="copyChartLink('${ds.id}',this)" title="${I18N.copyLink}" aria-label="${I18N.copyLink}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </button>
      </div>
    </div>
    <div class="chart-card__body">
      ${ds.custom==='heatmap'||ds.custom==='strip'?`<div class="heatmap-wrap" id="${ds.id}Table"></div>`:ds.custom==='multiples'?`<div class="sm-wrap" id="${ds.id}Multi"></div>`:`<div class="chart-canvas-wrap"><canvas id="${ds.id}Chart"></canvas></div>`}
      <div class="chart-source" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px"><span>${ds.source}</span><span>${I18N.updated}: ${fmtDate(INFL().lastDate)}</span></div>
      ${explainBlock(ds.id)}
    </div>`;
  // draw once the card is in the page (the canvas needs its size)
  setTimeout(()=>({season:createSeasonChart,heatmap:createHeatmap,decisions:createDecisionsChart,deviation:createDeviationChart,path:createPathChart,multiples:createMultiples,strip:createTargetStrip,decyears:createDecisionYears})[ds.custom](ds),0);
  return block;
}

// target board: one cell per month since 2017, coloured by where annual inflation was against the target
function createTargetStrip(ds){
  const host=document.getElementById(ds.id+'Table'); if(!host) return;
  const src=INFL(), FROM=2017, cells={};
  src.labels.forEach((l,i)=>{
    const y=+l.slice(0,4), v=src.data_yearly[i], t=window.nbtTargetFor&&nbtTargetFor(l);
    if(y<FROM||v==null||!t) return;
    (cells[y]=cells[y]||Array(12).fill(null))[+l.slice(5,7)-1]={l,v,t,k:v>t.center+t.band?'above':v<t.center-t.band?'below':'in'};
  });
  const list=Object.values(cells).flat().filter(Boolean);
  if(!list.length) return;
  let streak=0; for(let i=list.length-1;i>=0&&list[i].k==='in';i--) streak++;
  const share=Math.round(list.filter(c=>c.k==='in').length/list.length*100);
  const name={in:I18N.stripIn,above:I18N.stripAbove,below:I18N.stripBelow};
  const years=Object.keys(cells).map(Number).sort((a,b)=>b-a);
  host.innerHTML=`<div class="ts-head">
      <div class="ts-big"><b>${streak}</b><span>${I18N.stripStreak(streak).replace(/^\d+\s*/,'')}</span></div>
      <div class="ts-share">${I18N.stripShare(share,FROM)}</div>
      <ul class="ts-legend"><li><i class="ts-in"></i>${I18N.stripIn}</li><li><i class="ts-above"></i>${I18N.stripAbove}</li><li><i class="ts-below"></i>${I18N.stripBelow}</li></ul>
    </div>
    <table class="heatmap ts-table"><thead><tr><th scope="col"></th>${I18N.months.map(m=>`<th scope="col">${m.slice(0,3)}</th>`).join('')}</tr></thead>
    <tbody>${years.map(y=>`<tr><th scope="row">${y}</th>${cells[y].map(c=>c?`<td class="ts-${c.k}" title="${fmtDate(c.l)}: ${num(c.v,1)}% — ${name[c.k]} (${c.t.center}% ±${c.t.band})">${num(c.v,1)}</td>`:'<td class="hm-empty"></td>').join('')}</tr>`).join('')}</tbody></table>`;
}

// Committee decisions by year: cuts / holds / hikes, and the total change of the rate over the year
function createDecisionYears(ds){
  const src=datasets.find(d=>d.id==='rate'); if(!src||!window.NBT_MEETINGS||!window.nbtDecision) return;
  const byMonth={}; src.labels.forEach((l,i)=>{ if(src.data[i]!=null) byMonth[l]=src.data[i]; });
  const per={};
  [].concat(...Object.values(NBT_MEETINGS)).forEach(m=>{
    const o=nbtDecision(m,byMonth); if(!o) return;
    const y=m.iso.slice(0,4), r=per[y]=per[y]||{cut:0,hold:0,raise:0,net:0};
    r[o.kind]++; r.net+=o.kind==='hold'?0:o.delta;
  });
  const years=Object.keys(per).sort();
  const netPlugin={id:'decNet',afterDatasetsDraw(chart){
    const {ctx:c,scales:{x,y}}=chart;
    c.save(); c.font='700 11px Inter, system-ui, sans-serif'; c.textAlign='center';
    years.forEach((yr,i)=>{
      const r=per[yr], tot=r.cut+r.hold+r.raise, n=+r.net.toFixed(2);
      c.fillStyle=n<0?'#15803d':n>0?'#c0504d':'#64748b';
      c.fillText(n===0?'0':(n<0?'−':'+')+num(Math.abs(n),2), x.getPixelForValue(i), y.getPixelForValue(tot)-6);
    });
    c.restore();
  }};
  const max=Math.max(...years.map(y=>per[y].cut+per[y].hold+per[y].raise));
  charts[ds.id]=new Chart(document.getElementById(ds.id+'Chart'),{
    type:'bar', plugins:[netPlugin],
    data:{labels:years,datasets:[
      {label:I18N.decCut,data:years.map(y=>per[y].cut),backgroundColor:DEC_COLORS.cut,borderRadius:3,maxBarThickness:46},
      {label:I18N.decHold,data:years.map(y=>per[y].hold),backgroundColor:DEC_COLORS.hold,borderRadius:3,maxBarThickness:46},
      {label:I18N.decRaise,data:years.map(y=>per[y].raise),backgroundColor:DEC_COLORS.raise,borderRadius:3,maxBarThickness:46}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{endLabel:false,legend:{display:true,position:'bottom',labels:{boxWidth:10,boxHeight:10,usePointStyle:true,font:{size:11}}},
        tooltip:{mode:'index',intersect:false,callbacks:{title:c=>c[0].label,
          label:c=>`${c.dataset.label}: ${c.parsed.y}`,
          footer:c=>{const n=+per[c[0].label].net.toFixed(2);return `${I18N.decNet}: ${n===0?'0':(n<0?'−':'+')+num(Math.abs(n),2)} ${I18N.pp}`;}}}},
      scales:{x:{stacked:true,grid:{display:false},ticks:{color:'#666'}},
        y:{stacked:true,min:0,max:max+1,grid:{color:'#eef2f7'},ticks:{color:'#666',stepSize:1},title:{display:true,text:I18N.decCount,color:'#64748b',font:{size:11}}}}}
  });
}

// small multiples: one compact bar chart per group, one under another, same months and the same scale
function createMultiples(ds){
  const host=document.getElementById(ds.id+'Multi'); if(!host) return;
  const L=ds.labels, n=ds.lastMonths||24;
  let end=L.length-1; while(end>0&&ds.lines.every(ln=>ln.data[end]==null)) end--;
  const start=Math.max(0,end-n+1), labels=L.slice(start,end+1);
  const rows=ds.lines.map(ln=>ln.data.slice(start,end+1));
  const all=rows.flat().filter(v=>v!=null);
  const lo=Math.min(0,Math.floor(Math.min(...all))), hi=Math.max(1,Math.ceil(Math.max(...all)));
  const lastOf=a=>{for(let i=a.length-1;i>=0;i--) if(a[i]!=null) return a[i]; return null;};
  host.innerHTML=ds.lines.map((ln,i)=>{
    const v=lastOf(rows[i]);
    return `<div class="sm-row">
      <div class="sm-head"><span class="sm-dot" style="background:${ln.color}"></span><b>${ln.label}</b>
        ${v!=null?`<span class="sm-last" style="color:${ln.color}">${v>0?'+':v<0?'−':''}${num(Math.abs(v),1)}%<small>${fmtDate(labels[labels.length-1])}</small></span>`:''}</div>
      <div class="sm-canvas${i===ds.lines.length-1?' sm-canvas--axis':''}"><canvas id="${ds.id}-m${i}"></canvas></div>
    </div>`;
  }).join('');
  ds._multi=ds.lines.map((ln,i)=>new Chart(document.getElementById(`${ds.id}-m${i}`),{
    type:'bar',
    data:{labels,datasets:[{label:ln.label,data:rows[i],
      backgroundColor:rows[i].map(v=>v!=null&&v<0?nbtAlpha(ln.color,0.45):ln.color),
      borderRadius:2,maxBarThickness:16,categoryPercentage:0.82,barPercentage:0.9}]},
    options:{responsive:true,maintainAspectRatio:false,animation:false,
      layout:{padding:{right:8}},
      plugins:{legend:{display:false},endLabel:false,
        tooltip:{callbacks:{title:()=> '',label:c=>`${fmtDate(c.label)} · ${ln.label}: ${num(c.parsed.y,1)}%`}}},
      scales:{
        x:{display:i===ds.lines.length-1,grid:{display:false},ticks:{color:'#666',maxTicksLimit:8,maxRotation:0,callback:tickLabel}},
        y:{min:lo,max:hi,grid:{color:c=>c.tick.value===0?'#94a3b8':'#f1f5f9'},afterBuildTicks:ax=>{ax.ticks=[...new Set([lo,0,hi])].map(v=>({value:v}));},ticks:{color:'#94a3b8',callback:v=>(v>0?'+':v<0?'−':'')+Math.abs(v)+'%'}}}}
  }));
  charts[ds.id]=ds._multi[0];
}

// monthly inflation, Jan–Dec on the x axis: one line per recent year + the average of the ten years before
function monthlyByYear(fromYear){
  const src=INFL(), byYear={};
  src.labels.forEach((l,i)=>{
    const[y,m]=l.split('-').map(Number), v=src.data_monthly[i];
    if(y<fromYear||v==null) return;
    (byYear[y]=byYear[y]||Array(12).fill(null))[m-1]=v;
  });
  return byYear;
}

function createSeasonChart(ds){
  const byYear=monthlyByYear(1995);
  const years=Object.keys(byYear).map(Number).sort((a,b)=>a-b);
  const recent=years.slice(-4);
  const base=years.filter(y=>y>=recent[0]-10&&y<recent[0]);
  const avg=Array.from({length:12},(_,m)=>{const v=base.map(y=>byYear[y][m]).filter(v=>v!=null);return v.length?+(v.reduce((a,b)=>a+b,0)/v.length).toFixed(2):null;});
  const shades=['#cbd5e1','#94a3b8','#64748b',COLORS.inflation].slice(-recent.length);
  const sets=recent.map((y,k)=>({label:String(y),data:byYear[y],borderColor:shades[k],backgroundColor:shades[k],
    borderWidth:k===recent.length-1?2.5:1.5,tension:0.3,pointRadius:k===recent.length-1?3:0,pointHoverRadius:5,spanGaps:false}));
  if(base.length) sets.unshift({label:I18N.seasonAvg(base[0],base[base.length-1]),data:avg,borderColor:COLORS.target,backgroundColor:COLORS.target,
    borderDash:[5,4],borderWidth:1.5,tension:0.3,pointRadius:0});
  const r=computeRangeTight(sets.flatMap(d=>d.data).filter(v=>v!=null));
  charts[ds.id]=new Chart(document.getElementById(ds.id+'Chart'),{
    type:'line',
    data:{labels:I18N.months.map(m=>m.slice(0,3)),datasets:sets},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{endLabel:false,legend:{display:true,position:'bottom',labels:{boxWidth:14,boxHeight:2,font:{size:11}}},
        tooltip:{callbacks:{title:c=>I18N.months[c[0].dataIndex],label:c=>c.parsed.y==null?'':`${c.dataset.label}: ${num(c.parsed.y,1)}%`}}},
      scales:{x:{grid:{display:false},ticks:{color:'#666'}},
        y:{min:r.min,max:r.max,ticks:{color:'#666',stepSize:r.step/2,callback:v=>num(v,1)+'%'},grid:{color:c=>c.tick.value===0?'#64748b':'#e6e6e6'}}}}
  });
}

// years × months table of monthly inflation, colored by size (red — prices up, teal — prices down)
function createHeatmap(ds){
  const byYear=monthlyByYear(2010);
  const years=Object.keys(byYear).map(Number).sort((a,b)=>b-a);
  const cell=v=>{
    if(v==null) return '<td class="hm-empty"></td>';
    const a=Math.min(Math.abs(v)/1.5,1)*0.85+0.08;
    const bg=v>=0?nbtAlpha(COLORS.heatUp,a):nbtAlpha(COLORS.heatDown,a);
    return `<td style="background:${bg};color:${a>0.5?'#fff':'#0f172a'}">${num(v,1)}</td>`;
  };
  document.getElementById(ds.id+'Table').innerHTML=`<table class="heatmap">
    <thead><tr><th scope="col"></th>${I18N.months.map(m=>`<th scope="col">${m.slice(0,3)}</th>`).join('')}</tr></thead>
    <tbody>${years.map(y=>`<tr><th scope="row">${y}</th>${byYear[y].map(cell).join('')}</tr>`).join('')}</tbody>
  </table>`;
}

// ---------- monetary policy: decisions of the Committee on the rate line ----------
// a dot at every meeting since 2017: green — cut, red — raise, grey — unchanged (data/meetings.js)
function createDecisionsChart(ds){
  const src=datasets.find(d=>d.id==='rate');
  const from=src.labels.findIndex(l=>l>='2017-01');
  const labels=src.labels.slice(from), rate=src.data.slice(from);
  const byMonth={}; src.labels.forEach((l,i)=>{ if(src.data[i]!=null) byMonth[l]=src.data[i]; });
  const meetings=[].concat(...Object.values(window.NBT_MEETINGS||{})).filter(m=>m.iso>='2017-01').sort((a,b)=>a.iso<b.iso?-1:1);
  const KIND={cut:'#15803d',raise:'#c0504d',hold:'#94a3b8'};
  const points={cut:[],raise:[],hold:[]};
  meetings.forEach(m=>{
    const o=nbtDecision(m,byMonth); if(!o) return;
    const x=labels.indexOf(o.month); if(x<0) return;
    points[o.kind].push({x:labels[x],y:byMonth[o.month],m,o});
  });
  const kindLabel={cut:I18N.decCut,raise:I18N.decRaise,hold:I18N.decHold};
  charts[ds.id]=new Chart(document.getElementById(ds.id+'Chart'),{
    type:'line',
    data:{labels,datasets:[
      {label:I18N.rate,data:rate,borderColor:COLORS.rate,borderWidth:2,stepped:'before',pointRadius:0,fill:false,order:2},
      ...['cut','raise','hold'].map(k=>({type:'scatter',label:kindLabel[k],data:points[k],backgroundColor:KIND[k],borderColor:'#fff',borderWidth:1.5,
        pointRadius:k==='hold'?4:6,pointHoverRadius:8,order:1}))
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      interaction:{mode:'nearest',intersect:true},
      plugins:{endLabel:{decimals:2},legend:{display:true,position:'bottom',labels:{boxWidth:10,boxHeight:10,usePointStyle:true,font:{size:11}}},
        tooltip:{callbacks:{title:()=>'' ,label:c=>{
          if(c.datasetIndex===0) return `${fmtDate(c.label)}: ${num(c.parsed.y,2)}%`;
          const {m,o}=c.raw, date=m.iso.split('-').reverse().join('.');
          return o.kind==='hold'?`${date}: ${I18N.decHold} — ${num(c.raw.y,2)}%`:`${date}: ${o.delta<0?'−':'+'}${num(Math.abs(o.delta),2)} ${I18N.pp} → ${num(c.raw.y,2)}%`;
        }}}},
      scales:{x:{type:'category',grid:{display:false},ticks:{color:'#666',maxTicksLimit:TICKS,maxRotation:0,callback:tickLabel}},
        y:{grid:{color:'#e6e6e6'},ticks:{color:'#666',callback:v=>v+'%'}}}}
  });
}

// ---------- monetary policy: the policy path — annual inflation (x) against the refinancing rate (y), month by month ----------
function createPathChart(ds){
  const src=INFL(), rateDs=datasets.find(d=>d.id==='rate');
  const rateBy={}; rateDs.labels.forEach((l,i)=>{ if(rateDs.data[i]!=null) rateBy[l]=rateDs.data[i]; });
  const pts=src.labels.map((l,i)=>({l,x:src.data_yearly[i],y:rateBy[l]})).filter(p=>p.l>='2017-01'&&p.x!=null&&p.y!=null);
  if(!pts.length) return;
  const n=pts.length, last=pts[n-1];
  const t=nbtTargetFor(last.l)||{center:5,band:2};
  const xs=pts.map(p=>p.x), ys=pts.map(p=>p.y);
  const lo=Math.floor(Math.min(0,...xs,...ys)), hi=Math.ceil(Math.max(...xs,...ys)+1);
  const shade=k=>{ const a=0.15+0.85*(k/(n-1||1)); return `rgba(30,64,175,${a.toFixed(3)})`; };
  const pathPlugin={
    id:'policyPath',
    beforeDatasetsDraw(chart){
      const {ctx:c,chartArea:a,scales:{x,y}}=chart;
      c.save(); c.beginPath(); c.rect(a.left,a.top,a.width,a.height); c.clip();
      // target band (vertical) and the line where the rate equals inflation
      c.fillStyle='rgba(16,185,129,0.10)';
      c.fillRect(x.getPixelForValue(t.center-t.band),a.top,x.getPixelForValue(t.center+t.band)-x.getPixelForValue(t.center-t.band),a.height);
      c.strokeStyle='rgba(100,116,139,0.55)'; c.setLineDash([5,4]); c.lineWidth=1;
      c.beginPath(); c.moveTo(x.getPixelForValue(lo),y.getPixelForValue(lo)); c.lineTo(x.getPixelForValue(hi),y.getPixelForValue(hi)); c.stroke(); c.setLineDash([]);
      c.font='600 11px Inter, system-ui, sans-serif'; c.fillStyle='#64748b';
      c.textAlign='left'; c.fillText('↖ '+I18N.pathTight, a.left+8, a.top+14);
      c.textAlign='right'; c.fillText(I18N.pathEasy+' ↘', a.right-8, a.bottom-8);
      c.restore();
    },
    afterDatasetsDraw(chart){
      const {ctx:c,scales:{x,y}}=chart;
      c.save(); c.font='700 10.5px Inter, system-ui, sans-serif'; c.fillStyle='#1e3a5f'; c.textAlign='left';
      pts.forEach(p=>{ if(p.l.endsWith('-01')) c.fillText(p.l.slice(0,4), x.getPixelForValue(p.x)+6, y.getPixelForValue(p.y)-6); });
      c.restore();
    }
  };
  charts[ds.id]=new Chart(document.getElementById(ds.id+'Chart'),{
    type:'scatter', plugins:[pathPlugin],
    data:{datasets:[{label:I18N.tPath,data:pts,showLine:true,tension:0,
      borderWidth:2, segment:{borderColor:c=>shade(c.p1DataIndex)},
      pointRadius:c=>c.dataIndex===n-1?7:2.2, pointBackgroundColor:c=>c.dataIndex===n-1?'#1e40af':shade(c.dataIndex),
      pointBorderColor:c=>c.dataIndex===n-1?'#fff':'transparent', pointBorderWidth:2, pointHoverRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{endLabel:false,legend:{display:false},
        tooltip:{callbacks:{title:()=>'' ,label:c=>`${fmtDate(c.raw.l)}: ${I18N.pathX.replace(', %','')} ${num(c.raw.x,1)}%, ${I18N.pathY.replace(', %','')} ${num(c.raw.y,2)}%`}}},
      scales:{
        x:{type:'linear',min:lo,max:hi,title:{display:true,text:I18N.pathX,color:'#64748b',font:{size:11}},grid:{color:'#eef2f7'},ticks:{color:'#666',stepSize:2,callback:v=>v+'%'}},
        y:{type:'linear',min:lo,max:hi,title:{display:true,text:I18N.pathY,color:'#64748b',font:{size:11}},grid:{color:'#eef2f7'},ticks:{color:'#666',stepSize:2,callback:v=>v+'%'}}}}
  });
}

// ---------- monetary policy: annual inflation minus the target centre ----------
// bars inside the allowed band are blue, outside it red; dashed lines = ±band (data/targets.js)
function createDeviationChart(ds){
  const src=INFL();
  const idx=src.labels.map((l,i)=>i).filter(i=>nbtTargetFor(src.labels[i])&&src.data_yearly[i]!=null);
  const labels=idx.map(i=>src.labels[i]);
  const dev=idx.map(i=>{const t=nbtTargetFor(src.labels[i]);return +(src.data_yearly[i]-t.center).toFixed(2);});
  const band=labels.map(l=>nbtTargetFor(l).band);
  const inside=dev.map((v,i)=>Math.abs(v)<=band[i]);
  const r=computeRangeTight([...dev,...band,...band.map(b=>-b)]);
  charts[ds.id]=new Chart(document.getElementById(ds.id+'Chart'),{
    type:'bar',
    data:{labels,datasets:[
      {label:I18N.devLabel,data:dev,backgroundColor:inside.map(ok=>ok?nbtAlpha(COLORS.inflation,0.55):nbtAlpha(COLORS.deflation,0.6)),
        borderColor:inside.map(ok=>ok?COLORS.inflation:COLORS.deflation),borderWidth:1,borderRadius:2,maxBarThickness:10,order:2},
      {type:'line',label:I18N.devBand,data:band,borderColor:COLORS.target,borderDash:[5,4],borderWidth:1.5,pointRadius:0,stepped:'middle',fill:false,order:1},
      {type:'line',label:'',data:band.map(b=>-b),borderColor:COLORS.target,borderDash:[5,4],borderWidth:1.5,pointRadius:0,stepped:'middle',fill:false,order:1}
    ]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{endLabel:false,legend:{display:true,position:'bottom',labels:{boxWidth:12,font:{size:11},filter:i=>i.text!==''}},
        tooltip:{callbacks:{title:c=>fmtDate(c[0].label),label:c=>{
          if(c.datasetIndex!==0) return c.datasetIndex===1?`${I18N.devBand}: ±${num(c.parsed.y,0)} ${I18N.pp}`:'';
          const t=nbtTargetFor(c.label), v=c.parsed.y;
          return `${v>=0?'+':'−'}${num(Math.abs(v),1)} ${I18N.pp} (${I18N.devTarget} ${t.center}%, ${inside[c.dataIndex]?I18N.devIn:I18N.devOut})`;
        }}}},
      scales:{x:{grid:{display:false},ticks:{color:'#666',maxTicksLimit:TICKS,maxRotation:0,callback:tickLabel}},
        y:{min:r.min,max:r.max,ticks:{color:'#666',stepSize:r.step,callback:v=>(v>0?'+':'')+v},grid:{color:c=>c.tick.value===0?'#64748b':'#e6e6e6',lineWidth:c=>c.tick.value===0?1.5:1}}}}
  });
}
