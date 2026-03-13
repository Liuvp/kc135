# kc135.xyz

Static KC-135 microsite focused on two search intents: the main aircraft guide and the Iraq incident news page.

## Run locally

```powershell
cd "E:\github\kc135"
npm run dev
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

If port `4173` is already in use, an older preview server is still running. Close that process first or reuse the existing preview tab.

## Main files

- `index.html`: homepage
- `kc-135/index.html`: main guide page
- `news/kc-135-iraq-incident-march-2026/index.html`: incident page
- `assets/styles.css`: shared styles
- `preview-server.js`: local static preview server

## Launch note

Before publishing, replace or create the contact mailbox currently shown as `editor@kc135.xyz`.
