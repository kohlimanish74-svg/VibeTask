# VibeTask

Lightweight task-tracking prototype and landing page.

This workspace contains a clickable prototype of VibeTask (no backend). It supports:

- Add, edit, and delete tasks
- Tasks persisted in `localStorage` (browser)
- Single-file static site deployable to Netlify or Vercel

How to run locally

Open `index.html` in a browser or serve the folder with a static server, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploying to Netlify

1. Push this repository to GitHub.
2. In Netlify, "New site from Git" → connect your repo and select the branch `main`.
3. For a plain static site, no build command is required — Netlify will deploy the repo root.

Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, "Import Project" → select the repo and choose the `Deploy` option.
3. For a static site, leave the build settings empty (or set the framework preset to "Other").

Notes

- This prototype stores tasks in the browser only. Remove `localStorage` calls when integrating with a backend.
- The task UI is in the "Prototype" section of `index.html`.

CI / GitHub Actions (optional)

This repo includes optional GitHub Actions workflow templates to deploy automatically on push to `main`:

- `.github/workflows/deploy-netlify.yml` — uses `netlify-cli` and requires these repository secrets: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
- `.github/workflows/deploy-vercel.yml` — uses `vercel` CLI and requires `VERCEL_TOKEN` (and optionally `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`).

To enable automated deploys:

1. Go to your repository Settings → Secrets and create the required secrets.
2. Push to the `main` branch. The corresponding workflow will run and deploy if the secrets are present.

If you want me to create a PR that adds these workflows and config files to the repo, tell me and I will prepare it (you'll still need to add secrets in GitHub).

