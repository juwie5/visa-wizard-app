# Visa Application Wizard

A responsive multi-step travel visa application built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS. The interface follows the supplied Figma design and loads live country data from REST Countries.

## Features

- Three-step Geography → Identity → Verification flow
- Searchable, keyboard-accessible country selectors
- Fuzzy country search for misspellings such as `Grmany` and `Untd Stats`
- Country flags, capitals, regions, populations, languages, and calling codes
- Hand-written inline validation with state preserved across steps
- Session-persisted application history with fixed random statuses
- Responsive layout, transitions, loading/error/empty states, and retry support
- Unit and interaction tests for utilities, API states, persistence, wizard navigation, review, badges, phone input, and country dropdowns
- Production Docker image and Netlify configuration

## Local development

Requirements: Node.js 20.19+ and npm 10+.

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

Add your REST Countries v5 key to `.env`:

```dotenv
NUXT_REST_COUNTRIES_API_KEY=your_key_here
```

The key stays server-side. Browser requests go through the app's `/api/countries` endpoint. The server adapter normalizes v5 calling codes to the assignment-compatible `idd.root`/`idd.suffixes` structure; the phone selector and international-length validation derive their prefix from that `idd` data.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Docker

```bash
docker build -t visa-application-wizard .
docker run --rm --env-file .env -p 3000:3000 visa-application-wizard
```

## Deployment

The repository includes `netlify.toml` and can be deployed with Netlify's Nuxt auto-detection:

```bash
npx netlify-cli deploy --build
npx netlify-cli deploy --build --prod
```

Configure `NUXT_REST_COUNTRIES_API_KEY` in Netlify under **Site configuration → Environment variables** before deploying. Do not commit a populated `.env` file.

## Architecture

- `app/components/steps` contains each wizard stage.
- `app/composables/useCountries.ts` owns client-side country loading and normalization.
- `server/api/countries.get.ts` securely fetches and paginates REST Countries v5 data.
- `app/composables/useVisaWizard.ts` owns form state and step validation.
- `app/composables/useApplications.ts` creates and session-persists submissions.
- `app/utils` contains pure country formatting, fuzzy search, and validation helpers.
- `tests` covers dropdown keyboard interaction and conflicts, wizard state/reset, review rendering, API loading failures/retry/empty responses, session persistence, all status variants, normalization/search, and validation edge cases.

Applications intentionally use `sessionStorage`: records survive refreshes in the same browser tab and are cleared when that tab's session ends.

## Design and API notes

The desktop layout is based on the supplied 1440px Figma frames, with a centered 880px card and responsive stacking below tablet widths. Flags come from the API rather than static design samples. REST Countries deprecated the assignment's original v3.1 endpoint in April 2026, so the server adapter uses the maintained v5 endpoint and converts its response into the assignment-compatible shape:

```text
https://api.restcountries.com/countries/v5
```
