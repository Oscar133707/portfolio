# Designreferens: danwikstudio.se

Analyserad 2026-10 genom att läsa sajtens kompilerade CSS och JS-bundles. Den används som **måttstock för professionell nivå**, inte som mall.

> Danwik Studio ligger också i Ljungby och säljer samma tjänster, så de är en **direkt konkurrent**. Vi lånar teknikerna men aldrig deras uttryck: ingen terrakotta, ingen Fraunces-serif, ingen kräm/grön palett och inga kopierade rubriker eller löften.

## Stack
- Next.js (Turbopack) och Tailwind v4.
- **Inga animationsbibliotek**: ingen GSAP, Lenis, Framer Motion eller three.js.
- Allt rörligt är CSS-keyframes och transitions, som triggas av en IntersectionObserver som sätter klassen `.avsloja-synlig` på föräldern.
- Fonter via `next/font`: Fraunces (display) och Inter (brödtext).

## Varför det känns proffsigt

### 1. Ett riktigt token-system
Allt går genom CSS-variabler: `bas`, `bas-djup`, `yta`, `text`, `dump`, `dump-svag`, `linje`, `accent` (+ `djup`, `svag`, `ljus`), `gron` (för "efter"-läge) och `djup` (mörka paneler).

- **Två skuggnivåer:**
  - `upphojd`: `0 1px 2px …0f, 0 6px 16px -6px …1f`
  - `svavande`: tre lager, upp till `0 24px 56px -20px`
- **Spacing-rytm:** `.25 / .5 / 1 / 1.5 / 2.5 / 4 / 6.5rem`
- **Tre easings:**
  - mjuk `cubic-bezier(.22,1,.36,1)` för reveals och fades
  - fjäder `cubic-bezier(.34,1.4,.64,1)` för hover-lyft och pilar (lätt överskjut)
  - panel `cubic-bezier(.32,.72,0,1)` för drawers och paneler
- **Mörkt läge:** `[data-tema=morkt]` byter bara variablerna: bas `#121010`, yta `#25201a`, accent `#e88f70` och kraftigare skuggor med svart alfa. Komponenterna rörs inte.

### 2. Typografi
- Serif-display med `letter-spacing: -.03em` på stora rubriker och Inter som brödtext.
- Rubrikerna är korta och fördelsdrivna, ofta i formen "huvudrad – underrad".

### 3. Texturerade ytor (`.yta-textur`)
- `::before` innehåller 3–4 stora, svaga `radial-gradient` i hörnen (varm uppe till vänster, sval uppe till höger, mörkare botten).
- `::after` är ett `feTurbulence`-SVG-brus på 3,5–5 % opacitet.
- Resultatet är djup och "material" utan synliga blobbar.
- Den mörka varianten lägger till ett mycket svagt 1px-linjerutnät.

### 4. Bento-kort
- 1px-ram, yta i vitt eller glas (mörkt: `backdrop-filter: blur(14px)`, `inset 0 1px` highlight).
- `::before` är en **gradient-hairline** upptill (`transparent → accent → transparent`) på 35 % opacitet som går till 100 % vid hover.
- `::after` är en svävande skugga och en accentram som tonar in vid hover.
- Pil-knappen skalas till `1.08` och ikonen flyttas `translate(1.5px,-1.5px)`.
- `:active { transform: scale(.99) }`, med transform på fjäder-easing.

### 5. Animerade mikro-scener (det som gör störst skillnad)
Små loopande illustrationer i korten, 9–13 s per varv, med stagger via `--i`:
- laddningsstaplar "före" (lång, accent) och "efter" (kort, grön)
- en Google-resultatlista där "din" rad klättrar till topp medan andra glider ner
- besökare som "lämnar" en långsam sida
- en SVG-"ström" (`stroke-dashoffset`) mellan noder, med träff-flash och en kub som pulserar
- en processtidslinje där linjen fylls (`scaleY 0→1`, 1,8 s) och noderna tänds en i taget (`transition-delay: calc(.35s + var(--i) * .4s)`)

Scenerna startar **först när de syns** och stängs av helt vid `prefers-reduced-motion`.

### 6. Reveal
`.avsloja { opacity:0; transform: translateY(18px); transition: .7s mjuk }` → `.avsloja-synlig { opacity:1; transform:none }`. Det är diskret, kort och alltid samma, och just konsekvensen gör att det känns dyrt.

### 7. Case med riktiga skärmdumpar
- Separata desktop- och mobilskärmdumpar.
- Hover på desktop scrollar en lång fullsidesbild (`translate-y(var(--rulla))`, bara med `hover:hover` och `prefers-reduced-motion: no-preference`).

### 8. Säljstruktur
Värdestrip → fördelsdriven hero med två CTA → löfte → tre tjänstekort → målgrupper → process i fyra steg → case med konkreta resultat → gratiserbjudande → utförligt formulär (honeypot och GDPR-samtycke) → footer.

## Så använder vi det på oscarjohansson.eu
- **Egen identitet, mörkt tema:**
  - bas `#0B0D12` (kallt bläck)
  - yta `#12151C` / `#191D26`
  - text `#F2F1EC`
  - accent **kobolt** `#3D5BF0` (text: `#8EA2FF`)
  - sekundär **medaljguld** `#D4A853` (idrottsmeriter och "live"-läge)
- **Typsnitt:** Bricolage Grotesque (display) och Inter.
- **Samma metod:** tokens, `.yta-textur`, `.kort` med hairline och svävskugga, mikro-scener som startar vid scroll, en processtidslinje och ett case med resultat.
- **Inga löften** som Oscar inte har tagit ställning till: inget "48 h-svar", inget "fast pris" och ingen "gratis granskning".
