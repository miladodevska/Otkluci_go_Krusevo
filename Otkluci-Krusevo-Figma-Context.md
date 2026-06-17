---
name: project-otkluci-krusevo
description: "Active Figma PWA design project — \"Отклучи го Крушево\" urban treasure hunt app for A1 Macedonia"
metadata:
  node_type: memory
  type: project
---

# Отклучи го Крушево — PWA проект (Figma)

Mobile-first PWA "Отклучи го Крушево" — urban treasure hunt низ фасадите на Крушево, дизајниран за A1 Macedonia (мобилни + веб екрани).

**Figma file:** https://www.figma.com/design/4Adq7oDVbpnsRWCBdmZrer
**File key:** `4Adq7oDVbpnsRWCBdmZrer`
**Team plan key:** `team::1637427252116893644` (HID, Full seat)

**Контекст:** A1-sponsored cultural heritage PWA, мобилни екрани 390×844px, веб екрани 1440×900px, сè на македонски јазик. Екраните се распоредени лево-десно на Page 1.

> Кога ќе отвориш ново Claude Code сесија во друга папка за овој проект, само кажи: "прочитај C:\Users\Mila\Desktop\Otkluci-Krusevo-Figma-Context.md и продолжи" — тоа ќе го врати целиот контекст.

---

## 10 мобилни екрани (x позиции)

| ID | Име | x |
|----|------|---|
| 2:2 | 01 – Добредојде | 0 |
| 17:2 | 01b – Внеси прекар | 430 |
| 3:2 | 02 – Карта | 860 |
| 4:2 | 03 – Точка заклучена | 1290 |
| 4:35 | 04 – Во радиус — фотографирање | 1720 |
| 5:2 | 05 – Успешно отклучување | 2150 |
| 5:47 | 06 – Приказна / факт | 2580 |
| 6:2 | 07 – Колекција | 3010 |
| 6:68 | 08 – Завршена потрага | 3440 |
| 7:2 | 09 – Офлајн состојба | 3870 |

## Веб екрани (паралелни верзии, y≈1000)

| ID | Име | соодветствува со мобилен |
|----|------|---|
| 23:2 | WEB 01 – Добредојде | 2:2 |
| 24:2 | WEB 01b – Внеси прекар | 17:2 |
| 27:2 | WEB 03 – Приказна / факт | 5:47 (06) |
| 28:2 | WEB 04 – Колекција | 6:2 (07) |
| 28:75 | WEB 05 – Завршена потрага | 6:68 (08) |

(Имаат и други WEB екрани — не сите се синхронизирани досега.)

---

## Design tokens

- Red: #E3000B (A1 brand)
- Wine/bordeaux: #6B1A2A
- Gold/brass: #C9A84C (unlocked state — сè уште се користи на places каде мобилниот екран нема еквивалент)
- White background, dark text #1A1A1A
- Gray за locked елементи

## Типографија

- Наслови: **Playfair Display Bold** (кориснички побарано да се замени со "A1 Serif" — ВИДИ "Отворени прашања" подолу)
- UI: **Inter** (Regular / Medium / Semi Bold / Bold)
- Сите текстови на македонски

### A1 брендирани фонтови (за React апликацијата)

Фонт фајлови набавени и инсталирани, лоцирани во `src/assets/fonts/`:

| Font family | Style/Weight | Фајл |
|---|---|---|
| A1 Serif | Regular (400) | `A1 Serif/A1Serif-Regular.ttf` |
| A1 Serif | Bold (700) | `A1 Serif/A1Serif-Bold.ttf` |
| A1 Sans | Light (300) | `A1 Sans/A1Sans-Light.ttf` |
| A1 Sans | Regular (400) | `A1 Sans/A1Sans-Regular.ttf` |
| A1 Sans | Medium (500) | `A1 Sans/A1Sans-Medium.ttf` |
| A1 Sans | Bold (700) | `A1 Sans/A1Sans-Bold.ttf` |

`@font-face` декларации за `src/index.css` (или global stylesheet):

```css
@font-face {
  font-family: 'A1 Serif';
  src: url('./assets/fonts/A1 Serif/A1Serif-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'A1 Serif';
  src: url('./assets/fonts/A1 Serif/A1Serif-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'A1 Sans';
  src: url('./assets/fonts/A1 Sans/A1Sans-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'A1 Sans';
  src: url('./assets/fonts/A1 Sans/A1Sans-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'A1 Sans';
  src: url('./assets/fonts/A1 Sans/A1Sans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'A1 Sans';
  src: url('./assets/fonts/A1 Sans/A1Sans-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Употреба: наслови (Playfair Display замена) → `font-family: 'A1 Serif', serif;`, UI текст (Inter замена/дополнување) → `font-family: 'A1 Sans', sans-serif;`

## A1 Лого

- Real 3D лого слика, imageHash: `c8455d13902fc912fb7c72e7d0cebaaeef95dcc3`
- Се појавува на екрани: 01 (голем бедж), 02 header, 08 QR центар, 09 header

## Клучни дизајн одлуки

- Тимпанон (триаголен украс) се повторува како мотив во икони, маркери, прогрес, декорации
- Екран 08 прикажува "Корисничко име: МалиАвантурист" (од прекарот внесен во 01b)
- Екран 04 симплифициран на: viewfinder + back копче + shutter + save + map копчиња
- Bottom nav на екрани 02, 03, 07, 09 (Карта / Колекција / Профил)
- Екран 04: gold focus-bracket векторите (16:8–16:15) рекалорирани во бело

---

## Палета варијабли — "A1 Боја палета" (VariableCollectionId:75:2)

Креирана од кориснички дадена брендирана палета слика. Сите бои се scoped на fills/strokes/effects.

| Variable | Hex | ID |
|---|---|---|
| Red/Red -3 | #FDC9C4 | VariableID:75:3 |
| Red/Red -2 | #FA8A80 | VariableID:75:4 |
| Red/Red -1 | #FF372D | VariableID:75:5 |
| Red/Red | #EB140A | VariableID:75:6 |
| Red/Red +1 | #B90A05 | VariableID:75:7 |
| Red/Red +2 | #820000 | VariableID:75:8 |
| Red/Red +3 | #460000 | VariableID:75:9 |
| Neutral/White | #FFFFFF | VariableID:75:10 |
| Neutral/Grey 1 | #F2F2F2 | VariableID:75:11 |
| Neutral/Grey 2 | #BCBCBC | VariableID:75:12 |
| Neutral/Grey 3 | #999999 | VariableID:75:13 |
| Neutral/Grey 4 | #4F4F4F | VariableID:75:14 |
| Neutral/Grey 5 | #333333 | VariableID:75:15 |
| Neutral/Black | #000000 | VariableID:75:16 |

### Историја на bind-ови
- **Пробан е full bulk bind (813 промени), па е REVERTED** — корисничкиот сметал дека "сè-црвено" изгледа странно. Wine #6B1A2A и gold #C9A84C останаа UNBOUND raw бои.
- Откако е revert-нато, направени се ТАРГЕТИРАНИ per-color bindings:

| Original hex | Bound to variable | Count |
|---|---|---|
| #E3000B (A1 red) | Red/Red (#EB140A) | 32 |
| #BDBDBD | Grey 2 (#BCBCBC) | 34 |
| #9E9E9E | Grey 3 (#999999) | 28 |
| #1A1A1A | Grey 5 (#333333) | 85 |
| #FFFFFF | Neutral/White | 212 |

- **Pattern за future per-color bindings:** најди ги сите SOLID fills/strokes со точна RGB match (само unbound), bind секој преку `figma.variables.setBoundVariableForPaint(f, 'color', targetVar)`, реасајни fills/strokes arrays. Vrati count.
- За GRADIENT stops, `setBoundVariableForPaint` НЕ работи (само SolidPaint) — наместо тоа, конструирај `ColorStop` објекти директно со `boundVariables: { color: { type: 'VARIABLE_ALIAS', id: <varId> } }` заедно со резолвираната RGBA боја.

---

## Tympanon "Triangle" компонента — варијанти

Постои заедничко "Triangle" component family (mainComponent 97:11) со неколку INSTANCE варијанти за различни состојби:

- **97:12** — UNLOCKED варијанта (мобилен screen 07, card 1): layered/faceted триаголник
  - Outer (5:18): fill Red+1 (#B90A05) @ 21% (unbound), stroke Red+1 (75:7)
  - Middle (5:19): fill #E3000B @ 10% (unbound), stroke Red+1 (75:7)
  - Inner (5:20): fill/stroke слично
  - Акценти (5:21-23): solid Red+1 (75:7)
  - Checkmark (5:24): бел stroke (75:10)

- **97:45** — LOCKED/GRAY варијанта: истата структура, но fills/strokes во Grey2 (75:12) / Grey3 (75:13) / black@8% наместо црвено

- **111:98** — декоративен tympanon overlay (мобилен hero screen 01): бел outline (5:21-23 bound White) + transлуцентни red/pink фасети (5:18 #E3000B@31%, 5:19 #E3000B@10%, 5:20 #FDC9C4@20%, сите unbound)

- **112:126** — варијанта со Red+1 stroke (#B90A05, 75:7) за tympanon на screen 06

### Установен "tympanon" стил (3-tone / 2-tone layered facet)
- Outer triangle: light gold #DFCB94, stroke #C9A84C
- Middle triangle: base gold #C9A84C (filled), stroke #C9A84C
- Inner triangle (само 3-tone): dark gold #A1863D fill+stroke
- 2-tone верзија (screen 07 икони): само outer + middle layer
- Замени flat fill + DROP_SHADOW со ова layering за нови tympanon икони

---

## Извршени синхронизации WEB ↔ Mobile (хронолошки)

### Mobile 01 hero gradient (кориснички рачно редизајниран)
- Mobile "01 – Добредојде" hero-bg (2:3): GRADIENT_LINEAR bound Red/Red (#EB140A) → Red+2 (#820000) → Red+3 (#460000) @ 0/0.6/1
- Mobile 01 доби нов "Triangle" instance (111:98) декоративен tympanon overlay на hero-то
- WEB 01 hero gradient (23:3): синхронизиран со истите stops/vars/positions
- WEB 01 hero (23:2): доби клон на 111:98 → нова instance `120:72`, resize на 487x280, позиционирана на x=170,y=483 (792x900 hero), proporcionalno на mobile placement (61.5% width, 31% height, bottom-left)

### WEB 01b ↔ mobile 01b
- Mobile 01b top rectangle (17:3): истиот gradient како mobile 01 hero (Red/Red → Red+2 → Red+3 @ 0/0.6/1, bound 75:6/75:8/75:9)
- WEB 01b (24:2) page background gradient: бил unbound/mismatched (raw #E3000B-ish → wine → dark wine @ 0/0.65/1) → ажуриран да биде истиот kako mobile
- Mobile 01b НЕМА Triangle overlay → не е додаден ни на WEB 01b

### WEB 03 ↔ mobile 06 (Приказна / факт)
- Photo background (27:10, 680x836): бил unbound tan/brown gradient → сега wine gradient (Red+3 → Red+2 → Red+3 @ 0/0.5/1, bound 75:9/75:8/75:9), исто како mobile 5:48
- "4/7" бедж (27:23): бил gold → сега White (75:10), како mobile 20:2
- "Назад кон мапата" копче (27:38/39): бил wine bg + wine текст (invisible contrast bug) → bg сега Red/Red (75:6), текст White (75:10), како mobile 5:75/5:76
- Сите преостанати gold #C9A84C → White (75:10):
  - 27:13 (триаголник/pediment shape во placeholder графика, fill+stroke)
  - 27:27 (икона внатре во "4/7" бедж, fill+stroke)
  - 27:22 текст "Крушево · изградена 1903 г." бил gold → Red+1 (75:7), како mobile 5:64
- НЕ е менувано: 27:20 (црн photo shadow overlay), tag chips 27:30/27:32/27:36 (wine bg + wine текст, пре-постоечки contrast bug, out of scope), "Следна точка" копче 27:40 (веќе red/white)

### WEB 04 ↔ mobile 07 (Колекција)
- WEB 04-ните "unlocked" cards (28:15/27/39) користеле flat gold за триаголник икони, бедж-ови, progress fill, "3/7" counter — mobile 07 користи RED-toned шема (НЕ gold). Корисник потврдил: "Match mobile's red scheme".
- За секоја од 3 unlocked triangle икони (групи: 28:17-21, 28:29-33, 28:41-45):
  - Outer triangle (28:17/29/41): fill → транслуцентен Red+1 (#B90A05 @ 21%, unbound), stroke → Red+1 (75:7) — како mobile I97:12;5:18
  - Middle triangle (28:18/30/42): fill → транслуцентен #E3000B @ 10% (нов, unbound), stroke → Red+1 (75:7) — како mobile I97:12;5:19
  - Small accent vector (28:19/31/43): solid fill → Red+1 (75:7) — како mobile I97:12;5:21-23
  - Checkmark (28:20/32/44) веќе бел, непроменет
  - Number badge bg (28:21/33/45, "01/02/03"): gold → Red/Red (75:6) — како mobile "1/2/3" бедж (6:14); текст веќе бел
- Progress fill bar (28:13): gold → Red/Red (75:6) — нема директен mobile еквивалент, искористена badge accent боја
- "3/7" counter text (28:14): gold → Red/Red (75:6) — иста логика
- НЕ е менувано: progress track (28:12, светло сив)
- Locked card triangle икони (28:51/57/63/69): старите едноставни 2-vector сиви frames (28:52/58/64/70) ОТСТРАНЕТИ и заменети со клонови на mobile-ниот faceted gray "Triangle" instance (97:45 — Grey2/Grey3 варијанта со checkmark), resize 64x54 @ x=118,y=22. Нови instance IDs: `143:79, 143:87, 143:95, 143:103`

### WEB 05 ↔ mobile 08 (Завршена потрага)
- Screen background (28:75): бил unbound dark brown gradient → сега wine-to-black gradient како mobile 6:68 (Red+3 → Red+2 → Black @ 0/0.49/0.947, bound 75:9/75:8/75:16)
- 11 декоративни pediment триаголници (frames 28:78/81/84/87/90/93/96/99/102/105/108, секој со main vector + small accent vector): gold → White (75:10) — како mobile-ниот бел "Stars" sparkle accent (95:10 group)
- 6 "✦" stars (28:111-116): gold → White (75:10) — точно како mobile-ните бели stars
- Title "Ја освои потрагата!" (28:118): gold → White (75:10) — како mobile 6:103
- QR card border stroke (28:120): gold → White (75:10) — mobile-ниот QR card (6:105) нема stroke, бело користено за конзистентност
- Username labels "КОРИСНИЧКО ИМЕ" / "МалАвантурист" (28:154/155): gold → Red-3 (#FDC9C4, 75:3) — како mobile 6:213
- Share копче (28:157/158): bg gold → Red+1 (75:7), текст dark → White (75:10) — како mobile 6:216/6:217
- НЕ е менувано: radial gold glow overlay (28:77, low-opacity gold radial gradient) — одговара на mobile-ниот еквивалент radial glow (6:70), истата unbound gold боја на ниска opacity во двата

---

## Отворени прашања / Pending tasks

1. **Фонт замена "Playfair Display" → "A1 Serif"** — кориснички фонт фајлови (A1 Serif, A1 Sans) се добиени, инсталирани локално и сега видливи во Figma Desktop апликацијата (по инсталирање + restart). Фонт фајловите се додадени и во проектот (`src/assets/fonts/`) и документирани погоре за React. ВИДИ "Типографија" погоре за `@font-face` setup.
   - Сè уште PENDING: самата замена на "Playfair Display Bold" → "A1 Serif Bold" во Figma дизајнот (Figma plugin API сесијата сè уште не ги детектира фонтовите — потребно е да се потврди дека MCP конекцијата гледа исти фонтови како Desktop апликацијата пред да се изврши bulk замена)

2. Други WEB екрани (надвор од WEB 01, 01b, 03, 04, 05) сè уште не се синхронизирани со mobile палетата — можеби ќе се побара продолжување на истата постапка.
