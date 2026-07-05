(function () {
  const config = window.DRM_DOCS_CONFIG;
  const docsData = window.DRM_DOCS_DATA;
  const state = {
    locale: localStorage.getItem("drm-docs-locale") || config.defaultLocale || "ko",
    query: "",
    activeId: ""
  };

  const localeKeys = Object.keys(config.locales || {});
  if (!docsData[state.locale]) state.locale = localeKeys[0] || "ko";

  const app = document.getElementById("app");

  function icon(name) {
    const icons = {
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path></svg>',
      menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
      github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-6a5.4 5.4 0 0 0-1.5-3.8A5 5 0 0 0 18.4 1S17.2.6 15 2.5a11.7 11.7 0 0 0-6 0C6.8.6 5.6 1 5.6 1a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 4 8.5c0 4 3 6 6 6a4.8 4.8 0 0 0-1 3.5v4"></path><path d="M9 18c-4.5 2-5-2-7-2"></path></svg>',
      external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
      moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z"></path></svg>',
      sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>'
    };
    return icons[name] || "";
  }

  function t(key) {
    const copy = {
      ko: {
        search: "문서 검색",
        noResults: "검색 결과가 없습니다.",
        feedback: "피드백",
        repo: "GitHub",
        onThisPage: "이 문서에서",
        editHint: "본문은 content 폴더의 Markdown 파일에서 수정합니다.",
        openMenu: "목차 열기",
        closeMenu: "목차 닫기"
      },
      en: {
        search: "Search docs",
        noResults: "No results found.",
        feedback: "Feedback",
        repo: "GitHub",
        onThisPage: "On this page",
        editHint: "Edit content in Markdown files under the content folder.",
        openMenu: "Open menu",
        closeMenu: "Close menu"
      }
    };
    return (copy[state.locale] && copy[state.locale][key]) || copy.ko[key] || key;
  }

  function getDocs() {
    return (docsData[state.locale] || []).slice().sort((a, b) => a.order - b.order);
  }

  function renderLocaleButtons() {
    return localeKeys.map((locale) => {
      const meta = config.locales[locale];
      const active = locale === state.locale ? " is-active" : "";
      return `<button class="locale-button${active}" data-locale="${locale}" type="button">${meta.shortLabel || locale}</button>`;
    }).join("");
  }

  function renderSidebar(docs) {
    return `
      <aside class="sidebar" data-sidebar>
        <div class="sidebar-head">
          <div>
            <p class="eyebrow">Manual</p>
            <strong>${escapeHtml(config.title)}</strong>
          </div>
          <button class="icon-button hide-desktop" data-close-sidebar type="button" aria-label="${t("closeMenu")}">×</button>
        </div>
        <nav class="doc-nav" aria-label="Documentation">
          ${docs.map((doc) => `
            <a class="doc-nav-link" href="#${doc.slug}" data-nav-id="${doc.slug}">
              <span>${escapeHtml(doc.title)}</span>
              <small>${escapeHtml(doc.description || "")}</small>
            </a>
          `).join("")}
        </nav>
      </aside>
    `;
  }

  function renderSearchResults(docs) {
    const query = state.query.trim().toLowerCase();
    if (!query) return "";
    const results = [];
    docs.forEach((doc) => {
      const haystack = `${doc.title} ${doc.description} ${doc.searchText}`.toLowerCase();
      if (haystack.includes(query)) {
        results.push(doc);
        return;
      }
      const heading = doc.headings.find((item) => `${item.text}`.toLowerCase().includes(query));
      if (heading) results.push({ ...doc, heading });
    });

    return `
      <div class="search-results" role="status">
        ${results.length ? results.map((doc) => {
          const target = doc.heading ? doc.heading.id : doc.slug;
          return `
            <a class="search-result" href="#${target}">
              <strong>${escapeHtml(doc.heading ? doc.heading.text : doc.title)}</strong>
              <span>${escapeHtml(doc.description || doc.title)}</span>
            </a>
          `;
        }).join("") : `<p>${t("noResults")}</p>`}
      </div>
    `;
  }

  function renderHero(docs) {
    const localeDescription = config.locales[state.locale]?.description || config.description;
    return `
      <section class="hero" id="top">
        <div class="hero-copy">
          <p class="eyebrow">Dochi RPG Maker</p>
          <h1>${escapeHtml(config.title)}</h1>
          <p>${escapeHtml(localeDescription)}</p>
          <div class="hero-actions">
            <a class="primary-action" href="#${docs[0] ? docs[0].slug : "overview"}">${state.locale === "ko" ? "문서 시작" : "Start reading"}</a>
            <a class="ghost-action" href="${escapeAttr(config.feedbackUrl)}" target="_blank" rel="noreferrer">${t("feedback")} ${icon("external")}</a>
          </div>
        </div>
        <div class="system-card" aria-label="DRM documentation map">
          <div class="system-header">
            <span></span><span></span><span></span>
            <strong>Runtime Map</strong>
          </div>
          <div class="system-grid">
            <div class="system-node node-a">GUI</div>
            <div class="system-node node-b">Dialogue</div>
            <div class="system-node node-c">Shop</div>
            <div class="system-node node-d">Condition</div>
            <div class="system-node node-e">Action</div>
            <div class="system-node node-f">JSON</div>
          </div>
        </div>
      </section>
    `;
  }

  function renderDocs(docs) {
    return docs.map((doc) => `
      <section class="doc-section" id="${doc.slug}" data-doc-id="${doc.slug}">
        <div class="doc-kicker">${String(doc.order).padStart(2, "0")}</div>
        ${doc.html}
      </section>
    `).join("");
  }

  function renderPage() {
    const docs = getDocs();
    app.innerHTML = `
      <header class="topbar">
        <button class="icon-button hide-desktop" data-open-sidebar type="button" aria-label="${t("openMenu")}">${icon("menu")}</button>
        <a class="brand" href="#top" aria-label="${escapeAttr(config.title)}">
          <span class="brand-mark">${escapeHtml(config.brand || "DRM")}</span>
          <span>${escapeHtml(config.title)}</span>
        </a>
        <div class="search-shell">
          ${icon("search")}
          <input data-search type="search" value="${escapeAttr(state.query)}" placeholder="${t("search")}" autocomplete="off" />
          ${renderSearchResults(docs)}
        </div>
        <div class="top-actions">
          <div class="locale-switch" aria-label="Language">${renderLocaleButtons()}</div>
          <button class="icon-button" data-theme-toggle type="button" aria-label="Theme">${icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon")}</button>
          <a class="icon-button" href="${escapeAttr(config.repository)}" target="_blank" rel="noreferrer" aria-label="${t("repo")}">${icon("github")}</a>
        </div>
      </header>
      <div class="layout">
        ${renderSidebar(docs)}
        <main class="content">
          ${renderHero(docs)}
          <div class="edit-hint">${t("editHint")}</div>
          ${renderDocs(docs)}
        </main>
        <aside class="toc" aria-label="${t("onThisPage")}">
          <p class="eyebrow">${t("onThisPage")}</p>
          <div data-toc></div>
        </aside>
      </div>
      <div class="scrim" data-scrim></div>
    `;
    bindEvents();
    updateToc(docs);
    observeSections();
  }

  function bindEvents() {
    const search = app.querySelector("[data-search]");
    search.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderPage();
      const nextSearch = app.querySelector("[data-search]");
      nextSearch.focus();
      nextSearch.setSelectionRange(nextSearch.value.length, nextSearch.value.length);
    });

    app.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", () => {
        state.locale = button.dataset.locale;
        state.query = "";
        localStorage.setItem("drm-docs-locale", state.locale);
        document.documentElement.lang = state.locale;
        renderPage();
      });
    });

    const sidebar = app.querySelector("[data-sidebar]");
    const scrim = app.querySelector("[data-scrim]");
    const openSidebar = () => {
      sidebar.classList.add("is-open");
      scrim.classList.add("is-open");
    };
    const closeSidebar = () => {
      sidebar.classList.remove("is-open");
      scrim.classList.remove("is-open");
    };
    app.querySelector("[data-open-sidebar]")?.addEventListener("click", openSidebar);
    app.querySelector("[data-close-sidebar]")?.addEventListener("click", closeSidebar);
    scrim.addEventListener("click", closeSidebar);

    app.querySelector("[data-theme-toggle]").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("drm-docs-theme", next);
      renderPage();
    });
  }

  function updateToc(docs) {
    const toc = app.querySelector("[data-toc]");
    const headings = docs.flatMap((doc) => doc.headings
      .filter((heading) => heading.level <= 3)
      .map((heading) => ({ ...heading, docTitle: doc.title })));
    toc.innerHTML = headings.map((heading) => `
      <a class="toc-link level-${heading.level}" href="#${heading.id}" data-toc-id="${heading.id}">
        ${escapeHtml(heading.text)}
      </a>
    `).join("");
  }

  function observeSections() {
    const sections = Array.from(app.querySelectorAll("[data-doc-id]"));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      state.activeId = visible.target.id;
      app.querySelectorAll("[data-nav-id]").forEach((link) => {
        link.classList.toggle("is-active", link.dataset.navId === state.activeId);
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  const savedTheme = localStorage.getItem("drm-docs-theme");
  document.documentElement.dataset.theme = savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.lang = state.locale;
  renderPage();
})();
