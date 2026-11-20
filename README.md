# Sunbae — Uzbek language model (web)

A responsive React site for **Sunbae** (선배), an Uzbek-language model built from
scratch for Uzbek students in Korea. It explains how the model was built and
offers a playground that talks to the FastAPI backend
([agus787-dev/sunbae](https://github.com/agus787-dev/sunbae)).

The current model is a **base model**: it continues text, it does not chat. The
app is structured so a chat UI can be added after SFT (`HistoryItem` and the
`src/api` layer are designed to be reused).

## Screenshot

_Add a screenshot of the running app here._

## Features

- Playground: write the start of a text and the model continues it.
- Example prompts, sampling settings (max tokens, temperature, top-k, top-p) and
  `Ctrl/⌘ + Enter` to submit.
- Typing animation for the completion (disabled with `prefers-reduced-motion`).
- "Matn" / "Tokenlar" tabs: generated tokens as colored chips, with a leading
  space shown as `␣`.
- Copy button, stats line (new tokens, time, temperature) and history of the
  last 5 generations (click to restore prompt and settings).
- Server status badge and friendly Uzbek error messages.
- Mock mode, so the UI works without a backend.
- Model overview (data, tokenizer, architecture, training, data mix,
  validation loss) and roadmap.
- Light and dark themes.

## Tech stack

- React 19, TypeScript and Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Lucide icons
- FastAPI backend (deployed on Railway)

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Set the variables in `.env.local`:

```env
VITE_API_URL=http://localhost:8000
VITE_USE_MOCK=false
```

## Mock mode

With `VITE_USE_MOCK=true` the app never calls the backend. `/health` and
`/generate` are answered by `src/api/mock.ts` after a 600–1200 ms delay, with
sample Uzbek completions and fake `token_strings`. The status badge shows
"Demo rejim".

```sh
VITE_USE_MOCK=true npm run dev
```

## API contract

The frontend calls `GET /health` on load (and retries every 30 s while the
server is offline):

```json
{ "status": "ok", "parameters": 13800000, "block_size": 256 }
```

Generations are sent as JSON to `POST /generate`:

```json
{
  "prompt": "Seulda talaba bo'lib yashash",
  "max_tokens": 80,
  "temperature": 0.8,
  "top_k": 50,
  "top_p": 0.95
}
```

Validation limits (checked in the frontend, same as the backend): `prompt`
1–1000 characters, `max_tokens` 1–300, `temperature` 0–2, `top_k` 0–500,
`top_p` 0–1.

The response is expected to contain:

```json
{
  "text": "Seulda talaba bo'lib yashash juda qiziqarli...",
  "completion": " juda qiziqarli...",
  "tokens": 40,
  "time_ms": 610,
  "token_strings": [" juda", " qiz", "iqarli", "..."]
}
```

- `text` is prompt + completion, `completion` is only the new part, `tokens` is
  the number of new tokens.
- `token_strings` is **optional**: the new tokens as decoded strings, in order
  (`" juda"`, not the byte-level `"Ġjuda"`). If it is missing, the "Tokenlar"
  tab is disabled with a short hint.
- Requests time out after 20 s (`/health`) and 120 s (`/generate`).

## Deploy to Vercel

1. Import the repository into Vercel (framework preset: Vite).
2. Go to **Settings → Environment Variables**.
3. Add `VITE_API_URL` with the Railway backend URL, e.g.
   `https://sunbae-production.up.railway.app` (no trailing slash).
4. Set `VITE_USE_MOCK` to `false` (or leave it out). Use `true` only for a
   preview without a backend.
5. Apply them to Production and Preview as needed.
6. Redeploy the frontend so the variables take effect.

Vite environment variables are included in the browser bundle. Store only the
public API origin here; never put secrets in a `VITE_*` variable.

The backend must allow cross-origin requests from the deployed Vercel
production domain and any preview domains you use. Add the exact Vercel
origins (e.g. `https://sunbae.vercel.app`) to the backend's comma-separated
`ALLOWED_ORIGINS` setting on Railway and redeploy it; do not use `*` in
production.

## Project structure

```text
src/
  api/
    client.ts              # requestJson, ApiError kinds, Uzbek error messages
    generate.ts            # checkApiHealth, generateText, response validation
    mock.ts                # Mock backend for VITE_USE_MOCK=true
  components/
    demo/                  # PromptInput, ExampleChips, SettingsPanel,
                           # ResultCard, TokenView, TokenChip, HistoryList
    layout/                # Header, Footer, ThemeToggle, StatusBadge
    sections/              # Hero, DemoSection, ModelOverview, Roadmap
    ui/                    # Button, Card, Slider, SectionHeading, GirihPattern
  config/
    site.ts                # All numbers and texts that may change
  hooks/
    useApiHealth.ts        # /health polling: checking / online / offline
    useGenerate.ts         # Request state, errors, last 5 generations
    useTheme.ts
    useTypewriter.ts       # Client-side typing animation
  lib/
    tokens.ts              # Token chip tints and whitespace formatting
  types.ts                 # API and history types
  App.tsx
  index.css                # Design tokens (light + dark)
.env.example
```

To update model numbers, the data mix, loss values or the roadmap, edit
`src/config/site.ts` only.

## Scripts

```sh
npm run dev
npm run build
npm run lint
```
