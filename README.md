<p align="center">
  <img src="assets/banner.png" alt="Victory Independent Living" width="100%">
</p>

# Victory Independent Living

**Web app for housing intake and partner recruitment in Valdosta, Georgia.**

[![License: All Rights Reserved](https://img.shields.io/badge/license-all%20rights%20reserved-lightgrey)](#license)
![Vite](https://img.shields.io/badge/Vite-646CFF&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6&logo=typescript&logoColor=white)

Spearheaded by Valisa Jones and Anthony Jones. Lead capture for tenants (`/apply`) and partners (`/partners`), plus contact and resources pages. Formspree endpoints still need real form IDs in `config.ts`.


## How it works

```mermaid
flowchart LR
  T[Tenant] --> Apply[/apply]
  P[Partner] --> Partners[/partners]
  Apply --> FS[Formspree]
  Partners --> FS
```

Lead capture for housing intake and partner recruitment in Valdosta. Formspree IDs still need real values in `config.ts`.

## Features

- HashRouter static build for Hostinger / any static host
- Tenant and partner flows with UTM helpers
- Optional Gemini "Local Insights" when `VITE_GEMINI_API_KEY` is set
- Contact details in `config.ts`

## Tech stack

- Vite + React + TypeScript
- React Router (HashRouter)
- lucide-react
- Optional Google Gemini

## How to run

```bash
npm install
npm run dev
npm run build
```

Upload `dist/` to the host. Set Formspree endpoints and contact fields in `config.ts`. Optional: `VITE_GEMINI_API_KEY` for Local Insights.

## Environment variables

Names only. Never commit values.

- `VITE_GEMINI_API_KEY`

## Status

Public. Formspree endpoints are still placeholders (`REPLACE_WITH_YOUR_*`).

## License

All rights reserved.
