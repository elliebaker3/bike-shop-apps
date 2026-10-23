# The (Bike Shop)² – Apps

A simple static website for downloading apps from The (Bike Shop)². No build step: just HTML, CSS and JavaScript.

## Add or edit apps

Open `apps.js` and edit the list. Each app gets a card on the home page and its own detail page (`yoursite/#app-id`).

For icons, use an emoji (`"🎨"`) or put an image in `icons/` and set `icon: "icons/my-app.png"`.

For download links, the easiest option is GitHub Releases: upload your app files to a release, then link to
`https://github.com/USER/REPO/releases/latest` or straight to a file, e.g.
`https://github.com/USER/REPO/releases/latest/download/MyApp.dmg`.

## Preview locally

Open `index.html` in your browser.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `app-store`).
2. Push this folder to it:
   ```
   git init
   git add .
   git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/USER/app-store.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**, set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute your site is live at `https://USER.github.io/app-store/`.
