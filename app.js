(function () {
  const apps = window.APPS || [];
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const storeView = document.getElementById("store-view");
  const detailView = document.getElementById("detail-view");
  const detail = document.getElementById("detail");
  const shareView = document.getElementById("share-view");
  const shareGrid = document.getElementById("share-grid");
  let activeCategory = "All";

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function iconHtml(app, size) {
    const isImage = /\.(png|jpe?g|svg|webp|gif)$/i.test(app.icon || "");
    const inner = isImage
      ? `<img src="${esc(app.icon)}" alt=""${app.iconScale ? ` style="width:${Number(app.iconScale) * 100}%;height:${Number(app.iconScale) * 100}%;object-fit:contain"` : ""}>`
      : `<span>${esc(app.icon || app.name.charAt(0))}</span>`;
    return `<div class="icon icon-${size}" style="background:${esc(app.color || "#eee")}">${inner}</div>`;
  }

  function renderFilters() {
    const used = new Set(apps.map((a) => a.category).filter(Boolean));
    const ordered = (window.CATEGORIES || []).filter((c) => used.has(c));
    const cats = ["All", ...new Set([...ordered, ...used])];
    if (cats.length <= 2) { filters.hidden = true; return; }
    filters.innerHTML = cats
      .map((c) => `<button class="chip${c === activeCategory ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
      .join("");
  }

  function renderGrid() {
    const list = activeCategory === "All" ? apps : apps.filter((a) => a.category === activeCategory);
    grid.innerHTML = list
      .map(
        (a) => `
      <div class="card">
        ${a.madeByUs ? badgeHtml() : ""}
        <a class="card-link" href="#${esc(a.id)}">
          ${iconHtml(a, "md")}
          <div class="card-body">
            <h2>${esc(a.name)}</h2>
            <p>${esc(a.tagline)}</p>
          </div>
        </a>
        ${ratingHtml(a)}
      </div>`
      )
      .join("");
  }

  function badgeHtml() {
    return `<span class="made-by" title="Made by The Bike Shop">
      <span class="made-by-text">Made by</span>
      <img src="brand/logo-eggshell.png" alt="The Bike Shop">
    </span>`;
  }

  // "Bicycleness" rating: 1–5 stars, saved in this visitor's browser only.
  function getRating(id) {
    try { return Number(localStorage.getItem("bicycleness:" + id)) || 0; } catch (e) { return 0; }
  }
  function setRating(id, value) {
    try { localStorage.setItem("bicycleness:" + id, String(value)); } catch (e) {}
  }

  function ratingHtml(app) {
    const current = getRating(app.id);
    let stars = "";
    for (let n = 1; n <= 5; n++) {
      stars += `<button type="button" class="star${n <= current ? " on" : ""}" data-value="${n}" aria-label="${n} out of 5" aria-pressed="${n === current}">★</button>`;
    }
    return `
      <div class="rating" data-app="${esc(app.id)}" role="group" aria-label="Rate the bicycleness of ${esc(app.name)}">
        <span class="rating-label">Bicycleness</span>
        <span class="stars">${stars}</span>
      </div>`;
  }

  function paintStars(rating, value) {
    rating.querySelectorAll(".star").forEach((s) => {
      s.classList.toggle("on", Number(s.dataset.value) <= value);
    });
  }

  grid.addEventListener("click", (e) => {
    const star = e.target.closest(".star");
    if (!star) return;
    const rating = star.closest(".rating");
    const id = rating.dataset.app;
    let value = Number(star.dataset.value);
    if (value === getRating(id)) value = 0; // click the same star again to clear
    setRating(id, value);
    paintStars(rating, value);
    rating.querySelectorAll(".star").forEach((s) => s.setAttribute("aria-pressed", String(Number(s.dataset.value) === value)));
  });

  // Preview stars on hover
  grid.addEventListener("mouseover", (e) => {
    const star = e.target.closest(".star");
    if (star) paintStars(star.closest(".rating"), Number(star.dataset.value));
  });
  grid.addEventListener("mouseout", (e) => {
    const rating = e.target.closest(".rating");
    if (rating && !rating.contains(e.relatedTarget)) paintStars(rating, getRating(rating.dataset.app));
  });

  function renderDetail(app) {
    const paragraphs = (app.description || "")
      .split(/\n\s*\n/)
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");
    const features = (app.features || []).length
      ? `<h3>Features</h3><ul class="features">${app.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`
      : "";
    const buttons = (app.downloads || [])
      .map((d) => `<a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">Access for ${esc(d.label)}</a>`)
      .join("");
    const source = app.source
      ? `<a class="link" href="${esc(app.source)}" target="_blank" rel="noopener">View source on GitHub</a>`
      : "";

    detail.innerHTML = `
      <div class="detail-head">
        ${iconHtml(app, "lg")}
        <div>
          <h1>${esc(app.name)}</h1>
          <p class="tagline">${esc(app.tagline)}</p>
          <p class="meta">${esc(app.category || "")}${app.version ? " · Version " + esc(app.version) : ""}</p>
        </div>
      </div>
      <div class="downloads">${buttons}</div>
      <div class="detail-body">
        ${window.DETAILS_COMING_SOON
          ? `<h3>Coming soon</h3><p>More about ${esc(app.name)} is on its way.</p>`
          : `<h3>About</h3>${paragraphs}${features}${source}`}
      </div>`;
    document.title = app.name + " · The (Bike Shop)²";
  }

  function renderShare() {
    shareGrid.innerHTML = (window.SHARE_OPTIONS || [])
      .map((o) => {
        const hasUrl = Boolean(o.url);
        const external = hasUrl && !o.url.startsWith("mailto:");
        const attrs = hasUrl
          ? `href="${esc(o.url)}"${external ? ' target="_blank" rel="noopener"' : ""}`
          : `href="#share" aria-disabled="true" title="Link coming soon"`;
        return `
      <a class="share-card" ${attrs}>
        <h2>${esc(o.title)}</h2>
        <p>${esc(o.text)}</p>
        <span class="share-arrow" aria-hidden="true">→</span>
      </a>`;
      })
      .join("");
  }

  function setNav(section) {
    document.querySelectorAll("[data-nav]").forEach((a) => {
      a.classList.toggle("active", a.dataset.nav === section);
    });
  }

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const app = apps.find((a) => a.id === id);
    storeView.hidden = true;
    detailView.hidden = true;
    shareView.hidden = true;
    if (id === "share") {
      document.title = "Share! · The (Bike Shop)²";
      shareView.hidden = false;
      setNav("share");
    } else if (app) {
      renderDetail(app);
      detailView.hidden = false;
      setNav("shop");
    } else {
      document.title = "Apps · The (Bike Shop)²";
      storeView.hidden = false;
      setNav("shop");
    }
    window.scrollTo(0, 0);
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderFilters();
    renderGrid();
  });

  window.addEventListener("hashchange", route);
  renderFilters();
  renderGrid();
  renderShare();
  route();
})();
