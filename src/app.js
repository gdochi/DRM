(function () {
  const config = window.DRM_DOCS_CONFIG || {};
  const docsData = window.DRM_DOCS_DATA || {};

  function safeGet(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }

  const state = {
    locale: safeGet("drm-docs-locale", config.defaultLocale || "ko"),
    query: ""
  };

  const localeKeys = Object.keys(config.locales || {});
  if (!docsData[state.locale]) state.locale = localeKeys[0] || "ko";
  document.documentElement.lang = state.locale;

  const app = document.getElementById("app");

  function icon(name) {
    const icons = {
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path></svg>',
      menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
      github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-6a5.4 5.4 0 0 0-1.5-3.8A5 5 0 0 0 18.4 1S17.2.6 15 2.5a11.7 11.7 0 0 0-6 0C6.8.6 5.6 1 5.6 1a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 4 8.5c0 4 3 6 6 6a4.8 4.8 0 0 0-1 3.5v4"></path><path d="M9 18c-4.5 2-5-2-7-2"></path></svg>',
      external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
      moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z"></path></svg>',
      sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>',
      chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"></path></svg>',
      arrowLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>',
      arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>',
      home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10.5V20h14v-9.5"></path></svg>',
      layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"></path><path d="m3 13 9 5 9-5"></path><path d="m3 18 9 5 9-5"></path></svg>',
      book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4v15.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5"></path></svg>'
    };
    return icons[name] || "";
  }

  function t(key) {
    const copy = {
      ko: {
        search: "문서 검색",
        noResults: "검색 결과가 없습니다.",
        repo: "GitHub",
        onThisPage: "이 문서에서",
        products: "문서 분기",
        openDocs: "문서 열기",
        goHome: "홈으로",
        homeTitle: "DRM Docs",
        homeLead: "DRM 문서를 제품 단위로 나누고, 세부 화면은 FTB 문서처럼 읽기 중심으로 정리했습니다.",
        homeHint: "메인에서는 분기만 선택하고, 상세 화면에서 카테고리와 문서를 탐색하는 구조입니다.",
        readingModel: "읽기 구조",
        readingOne: "제품 선택",
        readingTwo: "카테고리 선택",
        readingThree: "문서 읽기",
        featured: "주요 문서",
        categories: "카테고리",
        documents: "문서",
        openMenu: "사이드바 열기",
        closeMenu: "사이드바 닫기",
        backToProducts: "제품 목록",
        status: "상태",
        version: "버전",
        audience: "대상",
        previous: "이전 문서",
        next: "다음 문서",
        editPage: "문서 소스",
        trackSummary: "분기 요약",
        startHere: "추천 시작점"
      },
      en: {
        search: "Search docs",
        noResults: "No results found.",
        repo: "GitHub",
        onThisPage: "On this page",
        products: "Products",
        openDocs: "Open docs",
        goHome: "Back home",
        homeTitle: "DRM Docs",
        homeLead: "DRM documentation is split by product, with FTB-style detail pages optimized for reading.",
        homeHint: "Choose a product on the landing page, then browse categories and documents inside that track.",
        readingModel: "Reading model",
        readingOne: "Choose product",
        readingTwo: "Choose category",
        readingThree: "Read document",
        featured: "Featured docs",
        categories: "Categories",
        documents: "Documents",
        openMenu: "Open sidebar",
        closeMenu: "Close sidebar",
        backToProducts: "Products",
        status: "Status",
        version: "Version",
        audience: "Audience",
        previous: "Previous",
        next: "Next",
        editPage: "Source",
        trackSummary: "Track summary",
        startHere: "Start here"
      }
    };
    return (copy[state.locale] && copy[state.locale][key]) || copy.ko[key] || key;
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

  function parseHash() {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw || raw === "home") return { view: "home", product: "", doc: "", section: "" };
    const [base, section = ""] = raw.split("::");
    const [product = "", doc = ""] = base.split("/");
    if (!product) return { view: "home", product: "", doc: "", section: "" };
    return { view: "doc", product, doc, section };
  }

  function linkForProduct(product) {
    const doc = getDefaultDoc(product);
    return `#${escapeAttr(product)}/${escapeAttr(doc ? doc.slug : "")}`;
  }

  function linkForDoc(doc, section) {
    return `#${escapeAttr(doc.product)}/${escapeAttr(doc.slug)}${section ? `::${escapeAttr(section)}` : ""}`;
  }

  function getAllDocs() {
    return (docsData[state.locale] || []).slice().sort((a, b) => a.order - b.order);
  }

  function getProductEntries() {
    return Object.entries(config.products || {});
  }

  function getDocsByProduct(product) {
    return getAllDocs().filter((doc) => doc.product === product);
  }

  function getDefaultDoc(product) {
    return getDocsByProduct(product)[0] || null;
  }

  function findDoc(product, slug) {
    return getDocsByProduct(product).find((doc) => doc.slug === slug) || null;
  }

  function productText(meta, field) {
    return meta[`${field}_${state.locale}`] || meta[field] || "";
  }

  function groupDocs(docs) {
    const map = new Map();
    docs.forEach((doc) => {
      const key = doc.category || "General";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(doc);
    });
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }

  function getNeighborDocs(product, activeDoc) {
    const docs = getDocsByProduct(product);
    const index = docs.findIndex((doc) => doc.slug === activeDoc.slug);
    return {
      prev: index > 0 ? docs[index - 1] : null,
      next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null
    };
  }

  function renderLocaleButtons() {
    return localeKeys.map((locale) => {
      const meta = config.locales[locale] || {};
      const active = locale === state.locale ? " is-active" : "";
      return `<button class="locale-button${active}" data-locale="${locale}" type="button">${escapeHtml(meta.shortLabel || locale)}</button>`;
    }).join("");
  }

  function renderProductTabs(activeProduct) {
    return `
      <nav class="product-tabs" aria-label="${t("products")}">
        ${getProductEntries().map(([key, meta]) => `<a class="product-tab${key === activeProduct ? " is-active" : ""} accent-${escapeAttr(meta.accent || "blue")}" href="${linkForProduct(key)}">${escapeHtml(meta.shortLabel || meta.label || key)}</a>`).join("")}
      </nav>
    `;
  }

  function renderSearchResults() {
    const query = state.query.trim().toLowerCase();
    if (!query) return "";
    const results = [];
    getAllDocs().forEach((doc) => {
      const productMeta = config.products?.[doc.product] || {};
      const haystack = `${doc.title} ${doc.description} ${doc.searchText} ${doc.category} ${productMeta.label || ""} ${productText(productMeta, "description")}`.toLowerCase();
      if (haystack.includes(query)) {
        results.push({ doc, productMeta, section: "" });
      } else {
        const heading = (doc.headings || []).find((item) => `${item.text}`.toLowerCase().includes(query));
        if (heading) results.push({ doc, productMeta, heading, section: heading.id });
      }
    });

    return `<div class="search-results" role="status">${results.length ? results.slice(0, 12).map((item) => `<a class="search-result" href="${linkForDoc(item.doc, item.section)}"><strong>${escapeHtml(item.heading ? item.heading.text : item.doc.title)}</strong><span>${escapeHtml((item.productMeta.label || item.doc.product) + " · " + (item.doc.category || "General"))}</span></a>`).join("") : `<p>${t("noResults")}</p>`}</div>`;
  }

  function renderHome() {
    const entries = getProductEntries();
    const totalDocs = getAllDocs().length;
    const totalCategories = new Set(getAllDocs().map((doc) => `${doc.product}:${doc.category}`)).size;
    const firstCore = getDefaultDoc("core");

    const cards = entries.map(([key, meta]) => {
      const docs = getDocsByProduct(key);
      const groups = groupDocs(docs);
      const firstDoc = docs[0];
      return `
        <article class="track-card accent-${escapeAttr(meta.accent || "blue")}">
          <div class="track-icon">${escapeHtml(meta.shortLabel || meta.label || key).slice(0, 2)}</div>
          <div class="track-body">
            <div class="track-label-row">
              <p class="eyebrow">${escapeHtml(productText(meta, "eyebrow") || t("products"))}</p>
              <span class="track-count">${docs.length} ${t("documents")}</span>
            </div>
            <h2>${escapeHtml(meta.label || key)}</h2>
            <p>${escapeHtml(productText(meta, "description"))}</p>
            <div class="track-tags">${(meta.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          </div>
          <div class="track-side">
            <div class="track-stats">
              <div><strong>${groups.length}</strong><span>${t("categories")}</span></div>
              <div><strong>${docs.length}</strong><span>${t("documents")}</span></div>
            </div>
            <a class="primary-action" href="#${escapeAttr(key)}/${escapeAttr(firstDoc ? firstDoc.slug : "")}">${t("openDocs")} ${icon("chevron")}</a>
          </div>
        </article>
      `;
    }).join("");

    return `
      <section class="home-shell">
        <div class="home-hero">
          <div class="home-copy">
            <p class="eyebrow">Dochi RPG Maker</p>
            <h1>${t("homeTitle")}</h1>
            <p class="hero-lead">${t("homeLead")}</p>
            <p class="hero-hint">${t("homeHint")}</p>
            <div class="home-metrics">
              <div><strong>${entries.length}</strong><span>${t("products")}</span></div>
              <div><strong>${totalCategories}</strong><span>${t("categories")}</span></div>
              <div><strong>${totalDocs}</strong><span>${t("documents")}</span></div>
            </div>
            <div class="hero-actions">
              <a class="primary-action" href="${firstCore ? linkForDoc(firstCore) : "#home"}">${t("startHere")}</a>
              <a class="ghost-action" href="${escapeAttr(config.repository || "#")}" target="_blank" rel="noreferrer">${t("repo")} ${icon("external")}</a>
            </div>
          </div>
          <aside class="reading-panel">
            <p class="eyebrow">${t("readingModel")}</p>
            <ol class="reading-steps">
              <li><span>01</span><strong>${t("readingOne")}</strong></li>
              <li><span>02</span><strong>${t("readingTwo")}</strong></li>
              <li><span>03</span><strong>${t("readingThree")}</strong></li>
            </ol>
            <div class="reading-note">
              ${icon("layers")}
              <p>${state.locale === "ko" ? "메인 화면은 분기 선택만 남기고, 실제 정보는 제품 내부 문서로 이동시켰습니다." : "The landing page stays focused on product selection; details live inside each product track."}</p>
            </div>
          </aside>
        </div>
        <div class="track-list">${cards}</div>
      </section>
    `;
  }

  function renderSidebar(product, activeDoc) {
    const meta = config.products?.[product] || {};
    const docs = getDocsByProduct(product);
    const groups = groupDocs(docs);
    return `
      <aside class="sidebar" data-sidebar>
        <div class="sidebar-head">
          <button class="back-link" type="button" data-home-link>${icon("home")} ${t("backToProducts")}</button>
          <button class="icon-button hide-desktop" data-close-sidebar type="button" aria-label="${t("closeMenu")}">×</button>
        </div>
        <div class="sidebar-product accent-${escapeAttr(meta.accent || "blue")}">
          <p class="eyebrow">${escapeHtml(productText(meta, "eyebrow") || t("trackSummary"))}</p>
          <strong>${escapeHtml(meta.label || product)}</strong>
          <span>${escapeHtml(productText(meta, "heroText") || productText(meta, "description"))}</span>
        </div>
        <nav class="doc-nav" aria-label="Documentation">
          ${groups.map((group) => `<section class="nav-group"><div class="nav-group-title">${escapeHtml(group.name)}</div>${group.items.map((doc) => `<a class="doc-nav-link${activeDoc && doc.slug === activeDoc.slug ? " is-active" : ""}" href="${linkForDoc(doc)}"><span>${escapeHtml(doc.title)}</span><small>${escapeHtml(doc.description || "")}</small></a>`).join("")}</section>`).join("")}
        </nav>
      </aside>
    `;
  }

  function renderToc(activeDoc) {
    const headings = (activeDoc?.headings || []).filter((heading) => heading.level <= 3);
    return `
      <aside class="toc" aria-label="${t("onThisPage")}">
        <p class="eyebrow">${t("onThisPage")}</p>
        <div class="toc-links">${headings.length ? headings.map((heading) => `<a class="toc-link level-${heading.level}" href="${linkForDoc(activeDoc, heading.id)}">${escapeHtml(heading.text)}</a>`).join("") : `<p class="toc-empty">-</p>`}</div>
      </aside>
    `;
  }

  function renderDocFooter(product, activeDoc) {
    const { prev, next } = getNeighborDocs(product, activeDoc);
    return `
      <footer class="doc-footer-nav">
        ${prev ? `<a class="doc-footer-link prev" href="${linkForDoc(prev)}"><span>${icon("arrowLeft")} ${t("previous")}</span><strong>${escapeHtml(prev.title)}</strong></a>` : `<span></span>`}
        ${next ? `<a class="doc-footer-link next" href="${linkForDoc(next)}"><span>${t("next")} ${icon("arrowRight")}</span><strong>${escapeHtml(next.title)}</strong></a>` : `<span></span>`}
      </footer>
    `;
  }

  function renderDoc(product, activeDoc) {
    const meta = config.products?.[product] || {};
    const sourceUrl = config.repository && activeDoc.sourcePath ? `${config.repository}/blob/main/${activeDoc.sourcePath}` : "";
    return `
      <div class="doc-shell">
        <div class="doc-breadcrumbs">
          <a href="#home">${icon("home")} DRM</a>
          <span>${icon("chevron")}</span>
          <a href="${linkForProduct(product)}">${escapeHtml(meta.label || product)}</a>
          <span>${icon("chevron")}</span>
          <strong>${escapeHtml(activeDoc.title)}</strong>
        </div>
        <article class="doc-page" data-doc-page>
          <header class="doc-page-head accent-${escapeAttr(meta.accent || "blue")}">
            <div class="doc-title-row">
              <div>
                <p class="eyebrow">${escapeHtml(activeDoc.category || "General")}</p>
                <h1>${escapeHtml(activeDoc.title)}</h1>
              </div>
              <span class="product-pill">${escapeHtml(meta.shortLabel || meta.label || product)}</span>
            </div>
            ${activeDoc.description ? `<p class="doc-lead">${escapeHtml(activeDoc.description)}</p>` : ""}
            <div class="doc-meta-row">
              ${activeDoc.status ? `<span><b>${t("status")}</b>${escapeHtml(activeDoc.status)}</span>` : ""}
              ${activeDoc.version ? `<span><b>${t("version")}</b>${escapeHtml(activeDoc.version)}</span>` : ""}
              ${activeDoc.audience ? `<span><b>${t("audience")}</b>${escapeHtml(activeDoc.audience)}</span>` : ""}
              ${sourceUrl ? `<a href="${escapeAttr(sourceUrl)}" target="_blank" rel="noreferrer"><b>${t("editPage")}</b>${icon("external")}</a>` : ""}
            </div>
            <div class="doc-tags">${(activeDoc.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          </header>
          <div class="doc-page-body">${activeDoc.html}</div>
          ${renderDocFooter(product, activeDoc)}
        </article>
      </div>
    `;
  }

  function renderPage() {
    const route = parseHash();
    let view = route.view;
    let product = route.product;
    let activeDoc = null;

    if (view === "doc") {
      if (!config.products?.[product]) {
        view = "home";
        product = "";
      } else {
        activeDoc = findDoc(product, route.doc) || getDefaultDoc(product);
        if (!activeDoc) {
          view = "home";
          product = "";
        }
      }
    }

    app.innerHTML = `
      <header class="topbar">
        <div class="topbar-left">
          ${view === "doc" ? `<button class="icon-button hide-desktop" data-open-sidebar type="button" aria-label="${t("openMenu")}">${icon("menu")}</button>` : ""}
          <a class="brand" href="#home" aria-label="${escapeAttr(config.title)}">
            <span class="brand-mark">${escapeHtml(config.brand || "DRM")}</span>
            <span class="brand-copy"><strong>${escapeHtml(config.title || "DRM")}</strong><small>Documentation</small></span>
          </a>
        </div>
        ${renderProductTabs(product)}
        <div class="search-shell">
          ${icon("search")}
          <input data-search type="search" value="${escapeAttr(state.query)}" placeholder="${t("search")}" autocomplete="off" />
          ${renderSearchResults()}
        </div>
        <div class="top-actions">
          <div class="locale-switch" aria-label="Language">${renderLocaleButtons()}</div>
          <button class="icon-button" data-theme-toggle type="button" aria-label="Theme">${icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon")}</button>
          <a class="icon-button" href="${escapeAttr(config.repository || "#")}" target="_blank" rel="noreferrer" aria-label="${t("repo")}">${icon("github")}</a>
        </div>
      </header>
      ${view === "home" ? `<main class="main-home">${renderHome()}</main>` : `<div class="layout">${renderSidebar(product, activeDoc)}<main class="content">${renderDoc(product, activeDoc)}</main>${renderToc(activeDoc)}<div class="scrim" data-scrim></div></div>`}
    `;

    bindEvents(view, product, activeDoc, route.section);
  }

  function bindEvents(view, product, activeDoc, section) {
    const search = app.querySelector("[data-search]");
    if (search) {
      search.addEventListener("input", (event) => {
        state.query = event.target.value;
        renderPage();
        const nextSearch = app.querySelector("[data-search]");
        if (nextSearch) {
          nextSearch.focus();
          nextSearch.setSelectionRange(nextSearch.value.length, nextSearch.value.length);
        }
      });
    }

    app.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", () => {
        state.locale = button.dataset.locale;
        safeSet("drm-docs-locale", state.locale);
        document.documentElement.lang = state.locale;
        renderPage();
      });
    });

    app.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      safeSet("drm-docs-theme", next);
      renderPage();
    });

    if (view === "doc") {
      const sidebar = app.querySelector("[data-sidebar]");
      const scrim = app.querySelector("[data-scrim]");
      const openSidebar = () => {
        sidebar?.classList.add("is-open");
        scrim?.classList.add("is-open");
      };
      const closeSidebar = () => {
        sidebar?.classList.remove("is-open");
        scrim?.classList.remove("is-open");
      };
      app.querySelector("[data-open-sidebar]")?.addEventListener("click", openSidebar);
      app.querySelector("[data-close-sidebar]")?.addEventListener("click", closeSidebar);
      scrim?.addEventListener("click", closeSidebar);
      app.querySelector("[data-home-link]")?.addEventListener("click", () => {
        window.location.hash = "home";
      });

      if (section) {
        const target = document.getElementById(section);
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      observeHeadings(activeDoc);
    }
  }

  function observeHeadings(activeDoc) {
    const headings = Array.from(app.querySelectorAll(".doc-page-body h2, .doc-page-body h3"));
    if (!headings.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      app.querySelectorAll(".toc-link").forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === linkForDoc(activeDoc, id));
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: [0.2, 0.6] });
    headings.forEach((heading) => observer.observe(heading));
  }

  window.addEventListener("hashchange", renderPage);
  renderPage();
})();
