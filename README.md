# VibeTask

Lightweight task-tracking prototype and landing page.

This workspace contains a clickable prototype of VibeTask (no backend). It supports:

- Add, edit, and delete tasks
- Tasks persisted in `localStorage` (browser)
- Single-file static site deployable to Vercel

How to run locally

Open `index.html` in a browser or serve the folder with a static server, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, "Import Project" → select the repo and choose the `Deploy` option.
3. For a static site, leave the build settings empty (or set the framework preset to "Other").

Notes

- This prototype stores tasks in the browser only. Remove `localStorage` calls when integrating with a backend.
- The task UI is in the "Prototype" section of `index.html`.

CI / GitHub Actions (optional)

This repo includes an optional GitHub Actions workflow to deploy to Vercel automatically on push to `main`:

- `.github/workflows/deploy-vercel.yml` — uses the `vercel` CLI and requires the repository secret `VERCEL_TOKEN` (and optionally `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`).

To enable automated deploys:

1. Go to your repository Settings → Secrets and create the required secret `VERCEL_TOKEN`.
2. Push to the `main` branch. The workflow will run and deploy if the secret is present.

If you want me to open a PR that only contains the Vercel workflow and config, tell me and I will prepare it.

