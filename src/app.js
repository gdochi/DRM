(function () {
  const config = window.DRM_DOCS_CONFIG || {};
  const docsData = window.DRM_DOCS_DATA || {};
  const changelogs = window.DOCHI_CHANGELOGS || [];

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

  const localeKeys = Object.keys(config.locales || {});
  const requestedLocale = new URLSearchParams(location.search).get("lang");
  const state = {
    locale: config.locales?.[requestedLocale] ? requestedLocale : safeGet("drm-docs-locale", config.defaultLocale || "en"),
    localeMenuOpen: false
  };
  let headingObserver = null;
  const searchIndexes = new Map();
  const localeLoads = new Map();
  let localeRequest = 0;
  let booting = true;
  let previousRoute = "";

  function ui(key) {
    const translated = config.translations?.[state.locale]?.ui?.[key];
    if (translated) return translated;
    const copy = {
      ko: {
        search: "문서 검색", searchHint: "기능 이름이나 화면의 버튼명을 입력하세요", allMods: "모든 모드", thisMod: "현재 모드",
        noResults: "일치하는 설명을 찾지 못했습니다. 다른 이름이나 영어 버튼명으로 검색해 보세요.", searchEmpty: "예: 상점, 탄약, 시간표, Save As", results: "검색 결과",
        docsMenu: "문서 목록", toc: "이 페이지 목차", close: "닫기", theme: "밝은 화면 / 어두운 화면", skip: "본문으로 이동",
        chooseMod: "모드 선택", tasks: "무엇을 만들고 싶나요?", homeLead: "만들고 싶은 것을 고르거나, 아래에서 사용하는 모드의 설명을 여세요.",
        history: "변경 기록", guideVersion: "설명 기준", captures: "수록 화면", missing: "문서를 찾을 수 없습니다", missingHint: "주소가 변경되었거나 존재하지 않는 문서입니다.", start: "처음 사용하기",
        zoom: "화면 확대", fit: "전체 보기", actualSize: "원본 크기", original: "원본 열기", zoomIn: "확대", zoomOut: "축소", imageHint: "자세히 볼 곳을 누르세요. 확대한 뒤 끌어서 이동할 수 있습니다.",
        english: "영문 문서", related: "관련 문서", filter: "목록에서 찾기", filterHint: "이름이나 설명으로 찾기", matches: "표시한 항목", section: "항목",
        loading: "언어를 불러오는 중…", loadFailed: "언어를 불러오지 못했습니다. 다시 시도해 주세요.", retry: "다시 시도", sourceEnglish: "영어 원문", assisted: "번역 문서"
      },
      en: {
        search: "Search docs", searchHint: "Search a feature or an in-game button name", allMods: "All mods", thisMod: "This mod",
        noResults: "No matching instructions. Try another name or an in-game button label.", searchEmpty: "Try: shop, ammunition, schedule, Save As", results: "Search results",
        docsMenu: "Documents", toc: "On this page", close: "Close", theme: "Light / dark theme", skip: "Skip to content",
        chooseMod: "Choose a mod", tasks: "What would you like to make?", homeLead: "Choose what you want to make, or open the guide for your mod below.",
        history: "Release history", guideVersion: "Guide version", captures: "Screens shown", missing: "Document not found", missingHint: "This address has changed or does not exist.", start: "Get started",
        zoom: "Enlarge screenshot", fit: "Fit image", actualSize: "Actual size", original: "Open original", zoomIn: "Zoom in", zoomOut: "Zoom out", imageHint: "Click an area to enlarge it. Drag to move when zoomed in.",
        english: "English guide", related: "Related documents", filter: "Find in this list", filterHint: "Find a name or description", matches: "Visible entries", section: "Section",
        loading: "Loading language…", loadFailed: "Could not load this language. Please try again.", retry: "Retry", sourceEnglish: "English original", assisted: "Assisted translation"
      }
    };
    return copy[state.locale]?.[key] || copy.en[key] || key;
  }

  function isHistory(doc) {
    return doc.section === "releases" || /(?:release|current-update|battleworks-update|^version-)/.test(doc.slug);
  }

  function changelogText(key) {
    const copy = {
      en: { title: "Changelog", lead: "Choose a loader, Minecraft version and mod version.", loader: "Mod loader", minecraft: "Minecraft version", versions: "Mod versions", download: "Download", notes: "Published English release notes.", empty: "No published release notes for this version.", select: "Choose a mod" },
      ko: { title: "체인지로그", lead: "로더, 마인크래프트 버전, 모드 버전을 선택하세요.", loader: "모드 로더", minecraft: "마인크래프트 버전", versions: "모드 버전", download: "다운로드", notes: "공개된 영문 릴리스 노트입니다.", empty: "이 버전에 공개된 릴리스 노트가 없습니다.", select: "모드 선택" },
      pt: { title: "Histórico de alterações", lead: "Escolha o carregador, a versão do Minecraft e a versão do mod.", loader: "Carregador", minecraft: "Versão do Minecraft", versions: "Versões do mod", download: "Baixar", notes: "Notas de lançamento publicadas em inglês.", empty: "Não há notas publicadas para esta versão.", select: "Escolher mod" },
      es: { title: "Registro de cambios", lead: "Elige el cargador, la versión de Minecraft y la versión del mod.", loader: "Cargador", minecraft: "Versión de Minecraft", versions: "Versiones del mod", download: "Descargar", notes: "Notas de lanzamiento publicadas en inglés.", empty: "No hay notas publicadas para esta versión.", select: "Elegir mod" },
      fr: { title: "Journal des modifications", lead: "Choisissez le chargeur, la version de Minecraft et la version du mod.", loader: "Chargeur", minecraft: "Version de Minecraft", versions: "Versions du mod", download: "Télécharger", notes: "Notes de version publiées en anglais.", empty: "Aucune note publiée pour cette version.", select: "Choisir un mod" },
      ru: { title: "История изменений", lead: "Выберите загрузчик, версию Minecraft и версию мода.", loader: "Загрузчик", minecraft: "Версия Minecraft", versions: "Версии мода", download: "Скачать", notes: "Опубликованные примечания на английском языке.", empty: "Для этой версии нет опубликованных примечаний.", select: "Выбрать мод" },
      zh: { title: "更新日志", lead: "选择加载器、Minecraft 版本和模组版本。", loader: "模组加载器", minecraft: "Minecraft 版本", versions: "模组版本", download: "下载", notes: "已发布的英文更新说明。", empty: "此版本暂无已发布的更新说明。", select: "选择模组" },
      ja: { title: "更新履歴", lead: "ローダー、Minecraft のバージョン、MOD のバージョンを選択してください。", loader: "MOD ローダー", minecraft: "Minecraft バージョン", versions: "MOD バージョン", download: "ダウンロード", notes: "公開された英語のリリースノートです。", empty: "このバージョンの公開リリースノートはありません。", select: "MOD を選択" }
    };
    return (copy[state.locale] || copy.en)[key];
  }

  function changelogProduct(product) {
    return product === "mwent" ? "dochi-minigames" : productFamily(product);
  }

  function getChangelogReleases(product) {
    const family = changelogProduct(product);
    return changelogs.filter(release => changelogProduct(release.product) === family);
  }

  function changelogLabel(product) {
    const mod = getWikiMods().find(mod => mod.product === changelogProduct(product));
    return modText(mod || {}, "label") || productText(config.products[product], "label");
  }

  function changelogLink(product, loader = "", minecraft = "", version = "") {
    if (!loader && changelogProduct(product) !== product) {
      loader = ["Forge", "NeoForge", "Fabric"].find(loader => changelogs.some(release => release.product === product && release.loader === loader)) || "";
    }
    return `#changelog/${[changelogProduct(product), loader, minecraft, version].filter(Boolean).map(encodeURIComponent).join("/")}`;
  }

  function hasChangelog(product) {
    return getChangelogReleases(product).length > 0;
  }

  function cardHistoryText() {
    return { en: "Card changes by version", ko: "버전별 카드 변경", pt: "Alterações de cartas por versão", es: "Cambios de cartas por versión", fr: "Modifications des cartes par version", ru: "Изменения карт по версиям", zh: "各版本卡牌变更", ja: "バージョン別カード変更" }[state.locale] || "Card changes by version";
  }

  function cardHistoryLink(product) {
    const page = getWikiMods().find(mod => mod.product === product)?.cardHistoryPage;
    const doc = page && isProductOpen(product) ? findDoc(product, page) : null;
    return doc ? linkForDoc(doc) : "";
  }

  function renderProductTabs(product, active) {
    const cardsHref = cardHistoryLink(product);
    return `<nav class="product-tabs" aria-label="${escapeAttr(productText(config.products[product], "shortLabel"))}"><a href="${linkForProduct(product)}"${active === "docs" ? ' aria-current="page"' : ""}>${icon("book")}${escapeHtml(t("openDocs"))}</a>${hasChangelog(product) ? `<a href="${changelogLink(product)}"${active === "changelog" ? ' aria-current="page"' : ""}>${icon("history")}${escapeHtml(changelogText("title"))}</a>` : ""}${cardsHref ? `<a href="${cardsHref}"${active === "cards" ? ' aria-current="page"' : ""}>${icon("cards")}${escapeHtml(cardHistoryText())}</a>` : ""}</nav>`;
  }

  function productFamily(product) {
    return getWikiMods().find(mod => mod.documentVariants?.some(variant => variant.product === product))?.product || product;
  }

  function renderEnvironmentSwitch(product, activeDoc) {
    const mod = getWikiMods().find(mod => mod.product === productFamily(product));
    if (!mod?.documentVariants) return "";
    const label = { ko: "문서 환경", en: "Guide environment", pt: "Ambiente do guia", es: "Entorno de la guía", fr: "Environnement du guide", ru: "Среда руководства", zh: "文档环境", ja: "ガイドの環境" }[state.locale] || "Guide environment";
    return `<nav class="environment-switch" aria-label="${escapeAttr(label)}"><span>${escapeHtml(label)}</span><div>${mod.documentVariants.map(variant => {
      const doc = activeDoc && findDoc(variant.product, activeDoc.slug);
      const href = doc ? linkForDoc(doc) : linkForProduct(variant.product);
      return `<a href="${href}"${variant.product === product ? ' aria-current="page"' : ""}>${escapeHtml(variant.label)}</a>`;
    }).join("")}</div></nav>`;
  }

  if (!config.locales?.[state.locale]) state.locale = config.defaultLocale || localeKeys[0] || "en";
  document.documentElement.lang = config.locales?.[state.locale]?.htmlLang || state.locale;

  const app = document.getElementById("app");
  const guideMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  guideMotion.addEventListener("change", () => {
    if (guideMotion.matches) app.querySelectorAll(".doc-video video").forEach(video => video.pause());
  });

  function icon(name) {
    const icons = {
      // Brand paths from Simple Icons (CC0): https://simpleicons.org/
      curseforge: '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.326 9.2145S23.2261 8.4418 24 6.1882h-7.5066V4.4H0l2.0318 2.3576V9.173s5.1267-.2665 7.1098 1.2372c2.7146 2.516-3.053 5.917-3.053 5.917L5.0995 19.6c1.5465-1.4726 4.494-3.3775 9.8983-3.2857-2.0565.65-4.1245 1.6651-5.7344 3.2857h10.9248l-1.0288-3.2726s-7.918-4.6688-.8336-7.1127z"></path></svg>',
      modrinth: '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73 11 10.999 0 0 0-2.17 3.11 11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02.2-.04.22.1-.26-1.7l-.36-1.37-1.01-.06a8.5 8.489 0 0 1-5.18-1.8 5.34 5.34 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97 2.07-.43 2.06-.43 1.47-1.47c.8-.8 1.48-1.5 1.48-1.52 0-.09-.42-1.63-.46-1.7-.04-.06-.2-.03-1.02.18-.53.13-1.2.3-1.45.4l-.48.15-.53.53-.53.53-.93.1-.93.07-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6.43-.57c.68-.9.68-.9 1.46-1.1.4-.1.65-.2.83-.33.13-.099.65-.579 1.14-1.069l.9-.9-.7-.7-.7-.7-1.95.54c-1.07.3-1.96.53-1.97.53-.03 0-2.23 2.48-2.63 2.97l-.29.35.28 1.03c.16.56.3 1.16.31 1.34l.03.3-.34.23c-.37.23-2.22 1.3-2.84 1.63-.36.2-.37.2-.44.1-.08-.1-.23-.6-.32-1.03-.18-.86-.17-2.75.02-3.73a8.84 8.839 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1.06-.17.5-2.999.47-3.039-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38-.06.23-.46 2.42-.46 2.52 0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2 8.38 8.379 0 0 1 2.16 3.449 6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.37 9.369 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38-.38.32-1.54 1.1-1.7 1.14-.1.03-.1.06-.07.26.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z"></path></svg>',
      history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.5 7"></path><path d="M3 4v7h7M12 7v5l3 2"></path></svg>',
      cards: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="3" width="12" height="17" rx="2"></rect><path d="M5 6H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10M14 7l3 4-3 4-3-4 3-4Z"></path></svg>',
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path></svg>',
      menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
      github: '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3A12 12 0 0 0 8.2 23.7c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C15.2 5.1 16.2 5.4 16.2 5.4c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"></path></svg>',
      external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
      globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 0 20"></path><path d="M12 2a15.3 15.3 0 0 0 0 20"></path></svg>',
      check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"></path></svg>',
      chevronDown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>',
      moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z"></path></svg>',
      sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>',
      discord: '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 2l-.2.4c-.3.5-.5 1-.7 1.5a18.4 18.4 0 0 0-5 0 10 10 0 0 0-.7-1.5L8.6 2a19.7 19.7 0 0 0-4.9 2.4C.6 9 .1 13.4.5 17.7a19.9 19.9 0 0 0 6 3.1l.8-1.3.5-1a12.9 12.9 0 0 1-1.9-.9l.5-.4a14.2 14.2 0 0 0 11.2 0l.5.4c-.6.4-1.2.7-1.9.9l.5 1 .8 1.3a19.9 19.9 0 0 0 6-3.1c.5-5-.8-9.3-3.2-13.3ZM8 15.1c-1.2 0-2.1-1.1-2.1-2.4 0-1.3.9-2.4 2.1-2.4 1.2 0 2.1 1.1 2.1 2.4 0 1.3-.9 2.4-2.1 2.4Zm8 0c-1.2 0-2.1-1.1-2.1-2.4 0-1.3.9-2.4 2.1-2.4 1.2 0 2.1 1.1 2.1 2.4 0 1.3-.9 2.4-2.1 2.4Z"></path></svg>',
      youtube: '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"></path></svg>',
      chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"></path></svg>',
      arrowLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>',
      arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>',
      home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10.5V20h14v-9.5"></path></svg>',
      layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"></path><path d="m3 13 9 5 9-5"></path><path d="m3 18 9 5 9-5"></path></svg>',
      book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4v15.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5"></path></svg>',
      x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
    };
    return icons[name] || "";
  }

  function t(key) {
    const translated = config.translations?.[state.locale]?.common?.[key];
    if (translated) return translated;
    const copy = {
      ko: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "문서 열기",
        curseForge: "CurseForge",
        modrinth: "Modrinth",
        homeTitle: "Dochi's Wiki",
        standaloneMods: "단독 모드",
        addons: "애드온",
        openMenu: "사이드바 열기",
        closeMenu: "사이드바 닫기",
        backToProducts: "Dochi's Wiki",
        previous: "이전",
        next: "다음",
        document: "문서",
        language: "언어",
        selectLanguage: "언어 선택"
      },
      en: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "Open docs",
        curseForge: "CurseForge",
        modrinth: "Modrinth",
        homeTitle: "Dochi's Wiki",
        standaloneMods: "Standalone Mods",
        addons: "Add-ons",
        openMenu: "Open sidebar",
        closeMenu: "Close sidebar",
        backToProducts: "Dochi's Wiki",
        previous: "Previous",
        next: "Next",
        document: "Document",
        language: "Language",
        selectLanguage: "Select language"
      },
      ru: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "Открыть документацию",
        curseForge: "CurseForge",
        modrinth: "Modrinth",
        homeTitle: "Dochi's Wiki",
        standaloneMods: "Самостоятельные моды",
        addons: "Дополнения",
        openMenu: "Открыть боковую панель",
        closeMenu: "Закрыть боковую панель",
        backToProducts: "Dochi's Wiki",
        previous: "Назад",
        next: "Далее",
        document: "Документ",
        language: "Язык",
        selectLanguage: "Выбор языка"
      },
      zh: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "打开文档",
        curseForge: "CurseForge",
        modrinth: "Modrinth",
        homeTitle: "Dochi's Wiki",
        standaloneMods: "独立模组",
        addons: "附加模组",
        openMenu: "打开侧边栏",
        closeMenu: "关闭侧边栏",
        backToProducts: "Dochi's Wiki",
        previous: "上一页",
        next: "下一页",
        document: "文档",
        language: "语言",
        selectLanguage: "选择语言"
      },
      ja: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "ドキュメントを開く",
        curseForge: "CurseForge",
        modrinth: "Modrinth",
        homeTitle: "Dochi's Wiki",
        standaloneMods: "単独MOD",
        addons: "アドオン",
        openMenu: "サイドバーを開く",
        closeMenu: "サイドバーを閉じる",
        backToProducts: "Dochi's Wiki",
        previous: "前へ",
        next: "次へ",
        document: "ドキュメント",
        language: "言語",
        selectLanguage: "言語を選択"
      }
    };
    return (copy[state.locale] && copy[state.locale][key]) || copy.en[key] || key;
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
    const decode = value => { try { return decodeURIComponent(value); } catch { return value; } };
    const [base, rawSection = ""] = raw.split("::");
    if (base.startsWith("changelog/")) {
      const [, product = "", loader = "", minecraft = "", version = "", ...extra] = base.split("/").map(decode);
      return { view: "changelog", product, loader, minecraft, version, doc: "", section: "", invalid: extra.length > 0 };
    }
    const [product = "", doc = ""] = base.split("/").map(decode);
    const section = decode(rawSection);
    if (!product) return { view: "home", product: "", doc: "", section: "" };
    return { view: "doc", product, doc, section };
  }

  function linkForProduct(product) {
    if (!isProductOpen(product)) return "#home";
    const doc = getDefaultDoc(product);
    return `#${escapeAttr(product)}/${escapeAttr(doc ? doc.slug : "")}`;
  }

  function linkForDoc(doc, section) {
    return `#${escapeAttr(doc.product)}/${escapeAttr(doc.slug)}${section ? `::${escapeAttr(section)}` : ""}`;
  }

  function getFallbackLocale() {
    return config.fallbackLocale || config.defaultLocale || "en";
  }

  function getLocaleDocs(locale) {
    return Array.isArray(docsData[locale]) ? docsData[locale] : [];
  }

  function getDocKey(doc) {
    return `${doc.product || "core"}::${doc.slug}`;
  }

  function getAllDocs(includeHidden = false) {
    const merged = new Map();
    const fallbackDocs = getLocaleDocs(getFallbackLocale());
    const activeDocs = getLocaleDocs(state.locale);

    fallbackDocs.forEach((doc) => merged.set(getDocKey(doc), doc));
    activeDocs.forEach((doc) => merged.set(getDocKey(doc), doc));

    if (!merged.size) {
      Object.keys(docsData).some((locale) => {
        const docs = getLocaleDocs(locale);
        docs.forEach((doc) => merged.set(getDocKey(doc), doc));
        return docs.length > 0;
      });
    }

    return Array.from(merged.values())
      .filter((doc) => includeHidden || !doc.hiddenNav)
      .sort((a, b) => a.order - b.order);
  }

  function getProductEntries() {
    return Object.entries(config.products || {});
  }

  function getWikiMods() {
    const mods = Array.isArray(config.wikiMods) ? config.wikiMods.filter((item) => item && !item.hidden) : [];
    if (mods.length) return mods;
    return getProductEntries().map(([key, meta]) => ({ id: key, product: key, ...meta }));
  }

  function getDocsByProduct(product) {
    return getAllDocs().filter((doc) => doc.product === product && doc.section !== "releases")
      .sort((a, b) => Number(isHistory(a)) - Number(isHistory(b)) || a.order - b.order);
  }

  function isProductOpen(product) {
    const meta = config.products?.[product] || {};
    return !meta.disabled && !meta.comingSoon;
  }

  function statusText(meta) {
    return localizedConfigText(meta, "statusText");
  }

  function localizedConfigText(source, field) {
    return source?.[`${field}_${state.locale}`] || config.translations?.[state.locale]?.config?.[source?.[field]] || source?.[`${field}_${getFallbackLocale()}`] || source?.[field] || "";
  }

  function getDefaultDoc(product) {
    const docs = getDocsByProduct(product);
    return docs.find(doc => doc.slug === config.startPages?.[product]) || docs.find(doc => !isHistory(doc)) || docs[0] || null;
  }

  function findDoc(product, slug) {
    return getAllDocs().find((doc) => doc.product === product && doc.slug === slug) || null;
  }

  function productText(meta, field) {
    return localizedConfigText(meta, field);
  }

  function modText(meta, field) {
    return localizedConfigText(meta, field);
  }

  function modDocsLink(meta) {
    const product = meta.product || meta.productId || meta.id;
    if (!product || !isProductOpen(product)) return "";
    const doc = getDefaultDoc(product);
    return doc ? linkForProduct(product) : "";
  }

  function renderModLogo(meta) {
    const src = meta.logo || meta.logoSrc || "";
    const label = modText(meta, "shortLabel") || modText(meta, "label") || meta.id || "";
    if (!src) {
      return `<span class="mod-logo-box mod-logo-fallback" aria-hidden="true">${escapeHtml(String(label).slice(0, 3))}</span>`;
    }
    return `
      <span class="mod-logo-box">
        <img src="${escapeAttr(src)}" alt="${escapeAttr(modText(meta, "logoAlt") || `${label} logo`)}" loading="lazy" />
      </span>
    `;
  }

  function sectionText(section, field) {
    return localizedConfigText(section, field);
  }

  function getProductSections(product) {
    const meta = config.products?.[product] || {};
    const docs = getDocsByProduct(product);
    const configured = Array.isArray(meta.sections) ? meta.sections : [];
    const seen = new Set();
    const sections = [];

    configured.forEach((section) => {
      if (!section?.id || seen.has(section.id)) return;
      const items = docs.filter((doc) => (doc.section || doc.category) === section.id);
      if (!items.length) return;
      sections.push({ ...section, items, firstDoc: items[0] });
      seen.add(section.id);
    });

    docs.forEach((doc) => {
      const id = doc.section || doc.category || "general";
      if (seen.has(id)) return;
      const items = docs.filter((item) => (item.section || item.category || "general") === id);
      sections.push({
        id,
        label: doc.category || id,
        description: doc.description || "",
        items,
        firstDoc: items[0]
      });
      seen.add(id);
    });

    return sections;
  }

  function getNeighborDocs(product, activeDoc) {
    const docs = getDocsByProduct(product);
    const index = docs.findIndex((doc) => doc.slug === activeDoc.slug);
    return {
      prev: index > 0 ? docs[index - 1] : null,
      next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null
    };
  }

  function getLocaleMeta(locale) {
    return config.locales?.[locale] || { label: locale.toUpperCase(), shortLabel: locale.toUpperCase() };
  }

  function renderLocaleSelector() {
    const activeMeta = getLocaleMeta(state.locale);
    const open = state.localeMenuOpen ? " is-open" : "";
    const options = localeKeys.map((locale) => {
      const meta = getLocaleMeta(locale);
      const active = locale === state.locale ? " is-active" : "";
      return `
        <button class="locale-option${active}" data-locale="${escapeAttr(locale)}" type="button" role="menuitemradio" aria-checked="${locale === state.locale ? "true" : "false"}">
          <span class="locale-option-main">${escapeHtml(meta.label || locale)}</span>
          <span class="locale-option-short">${escapeHtml(meta.shortLabel || locale.toUpperCase())}</span>
          ${locale === state.locale ? icon("check") : ""}
        </button>
      `;
    }).join("");

    return `
      <div class="locale-menu${open}" data-locale-menu>
        <button class="locale-trigger" data-locale-toggle type="button" aria-haspopup="menu" aria-expanded="${state.localeMenuOpen ? "true" : "false"}" aria-label="${escapeAttr(t("selectLanguage"))}" title="${escapeAttr(t("language"))}">
          ${icon("globe")}
          <span>${escapeHtml(activeMeta.shortLabel || state.locale.toUpperCase())}</span>
          ${icon("chevronDown")}
        </button>
        <div class="locale-flyout" role="menu" aria-label="${escapeAttr(t("selectLanguage"))}">
          ${options}
        </div>
      </div>
    `;
  }

  function renderSocialLinks() {
    const links = [
      { href: config.repository, label: t("repo"), icon: "github" },
      { href: config.discordUrl, label: t("discord"), icon: "discord" },
      { href: config.youtubeUrl, label: t("youtube"), icon: "youtube" }
    ].filter((item) => item.href);

    return links.map((item) => `<a class="icon-button" href="${escapeAttr(item.href)}" target="_blank" rel="noreferrer" aria-label="${escapeAttr(item.label)}" title="${escapeAttr(item.label)}">${icon(item.icon)}</a>`).join("");
  }

  function renderHomeImage() {
    const media = config.homeImage || {};
    if (!media.src) return "";
    return `
      <figure class="home-media">
        <img src="${escapeAttr(media.src)}" alt="${escapeAttr(localizedConfigText(media, "alt"))}" loading="lazy" />
      </figure>
    `;
  }

  function renderHome() {
    const entries = getWikiMods();

    const renderCards = (groupEntries) => groupEntries.map((meta) => {
      const docsHref = modDocsLink(meta);
      const cardsHref = cardHistoryLink(meta.product);
      const curseForgeHref = meta.curseForgeUrl || meta.url || meta.href || "";
      const modrinthHref = meta.modrinthUrl || "";
      const curseForgeLinks = meta.documentVariants ? meta.documentVariants.map(variant => ({ label: variant.label, href: config.wikiMods.find(mod => mod.product === variant.product)?.curseForgeUrl })).filter(link => link.href) : curseForgeHref ? [{ label: "", href: curseForgeHref }] : [];
      const body = `
          ${renderModLogo(meta)}
          <div class="track-body">
            <h3>${escapeHtml(modText(meta, "label") || meta.id || "")}</h3>
            <p>${escapeHtml(modText(meta, "description") || productText(config.products?.[meta.product || meta.id] || {}, "description"))}</p>
          </div>
      `;
      const actions = `
        <div class="track-actions">
          ${docsHref ? `<div class="track-primary-actions"><a class="track-open track-icon" href="${docsHref}" title="${escapeAttr(t("openDocs"))}" aria-label="${escapeAttr(t("openDocs"))}">${icon("book")}</a>${hasChangelog(meta.product) ? `<a class="track-open track-icon track-changelog" href="${changelogLink(meta.product)}" title="${escapeAttr(changelogText("title"))}" aria-label="${escapeAttr(changelogText("title"))}">${icon("history")}</a>` : ""}${cardsHref ? `<a class="track-open track-icon track-card-history" href="${cardsHref}" title="${escapeAttr(cardHistoryText())}" aria-label="${escapeAttr(cardHistoryText())}">${icon("cards")}</a>` : ""}</div>` : ""}
          ${curseForgeLinks.map(link => `<a class="track-open track-icon external track-curseforge" href="${escapeAttr(link.href)}" target="_blank" rel="noreferrer" title="${escapeAttr(t("curseForge") + (link.label ? ": " + link.label : ""))}" aria-label="${escapeAttr(t("curseForge") + (link.label ? ": " + link.label : ""))}">${icon("curseforge")}${link.label ? `<small>${escapeHtml(link.label.split(" ")[0])}</small>` : ""}</a>`).join("")}
          ${modrinthHref ? `<a class="track-open track-icon external track-modrinth" href="${escapeAttr(modrinthHref)}" target="_blank" rel="noreferrer" title="${escapeAttr(t("modrinth"))}" aria-label="${escapeAttr(t("modrinth"))}">${icon("modrinth")}</a>` : ""}
          ${!docsHref && !curseForgeHref && !modrinthHref ? `<span class="track-status">${escapeHtml(statusText(meta))}</span>` : ""}
        </div>
      `;
      return `<article class="track-card">${body}${actions}</article>`;
    }).join("");


    return `
      <section class="home-shell">
        <header class="home-hero">
          <h1>${t("homeTitle")}</h1>
          <p class="hero-lead">${escapeHtml(ui("homeLead"))}</p>
          ${renderHomeImage()}
        </header>
        ${renderHomeTasks()}
        <div class="track-list">${renderCards(entries)}</div>
      </section>
    `;
  }

  function renderHomeTasks() {
    const tasks = (config.homeTasks || []).map(task => {
      const links = (task.links || []).map(link => ({ ...link, doc: findDoc(link.product, link.doc) })).filter(link => link.doc);
      if (!links.length) return "";
      const doc = links[0].doc;
      const image = doc.html.match(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/);
      return `<article class="task-card">
        ${image ? `<a class="task-preview" href="${linkForDoc(doc)}" tabindex="-1" aria-hidden="true"><img src="${escapeAttr(image[1])}" alt="" loading="lazy" width="480" height="270" /></a>` : ""}
        <div class="task-body"><h3><a href="${linkForDoc(doc)}">${escapeHtml(localizedConfigText(task, "label"))}</a></h3>
        <p>${escapeHtml(localizedConfigText(task, "description"))}</p>
        <div class="task-links">${links.map(link => `<a href="${linkForDoc(link.doc)}">${escapeHtml(localizedConfigText(link, "label") || productText(config.products[link.product], "shortLabel"))}${icon("arrowRight")}</a>`).join("")}</div></div>
      </article>`;
    }).join("");
    return tasks ? `<section class="home-tasks" aria-labelledby="tasks-title"><h2 id="tasks-title">${escapeHtml(ui("tasks"))}</h2><div class="task-grid">${tasks}</div></section>` : "";
  }

  function renderModPicker(product) {
    return `<label class="mod-picker"><span>${escapeHtml(ui("chooseMod"))}</span><select data-mod-picker aria-label="${escapeAttr(ui("chooseMod"))}">
      ${getWikiMods().map(mod => { const key = mod.product || mod.id; return isProductOpen(key) ? `<option value="${escapeAttr(key)}"${key === productFamily(product) ? " selected" : ""}>${escapeHtml(modText(mod, "label"))}</option>` : ""; }).join("")}
    </select></label>`;
  }

  function renderSidebar(product, activeDoc) {
    const sections = getProductSections(product);
    return `
      <aside class="sidebar" id="doc-sidebar" data-sidebar>
        ${renderModPicker(product)}
        ${renderProductTabs(product, activeDoc?.section === "card-history" ? "cards" : "docs")}
        <nav class="doc-nav" aria-label="${escapeAttr(ui("docsMenu"))}">
          ${sections.sort((a, b) => Number(a.items.every(isHistory)) - Number(b.items.every(isHistory))).map(section => {
            const active = !!activeDoc && section.items.some(doc => doc.slug === activeDoc.slug);
            return `<details class="nav-group"${active ? " open" : ""}><summary>${escapeHtml(sectionText(section, "label") || section.id)}<small>${section.items.length}</small></summary>
              <div>${section.items.map(doc => `<a class="doc-nav-link${activeDoc?.slug === doc.slug ? " is-active" : ""}" href="${linkForDoc(doc)}"${activeDoc?.slug === doc.slug ? ' aria-current="page"' : ""}>${escapeHtml(doc.title)}</a>`).join("")}</div></details>`;
          }).join("")}
        </nav>
      </aside>
    `;
  }

  function renderDocFollowNav(product, activeDoc, pageLabel) {
    const { prev, next } = getNeighborDocs(product, activeDoc);
    return `
      <nav class="doc-follow-nav" aria-label="Page navigation">
        <div class="doc-follow-count">${escapeHtml(pageLabel)}</div>
        <div class="doc-follow-links">
          ${prev ? `<a class="doc-follow-link prev" href="${linkForDoc(prev)}"><span>${icon("arrowLeft")} ${t("previous")}</span><strong>${escapeHtml(prev.title)}</strong></a>` : `<span class="doc-follow-link is-disabled"><span>${icon("arrowLeft")} ${t("previous")}</span><strong>-</strong></span>`}
          ${next ? `<a class="doc-follow-link next" href="${linkForDoc(next)}"><span>${t("next")} ${icon("arrowRight")}</span><strong>${escapeHtml(next.title)}</strong></a>` : `<span class="doc-follow-link is-disabled"><span>${t("next")} ${icon("arrowRight")}</span><strong>-</strong></span>`}
        </div>
      </nav>
    `;
  }

  function renderDoc(product, activeDoc) {
    const docs = getDocsByProduct(product);
    const index = docs.findIndex((doc) => doc.slug === activeDoc.slug);
    const pageLabel = `${t("document")} ${index + 1} / ${docs.length}`;
    const meta = config.products[product];
    const section = getProductSections(product).find(item => item.items.some(doc => doc.slug === activeDoc.slug));
    const environments = (activeDoc.captureEnvironments || []).map(env => `${env.loader} ${env.minecraft}`);
    return `
      <div class="doc-shell">
        ${renderToc(activeDoc, true)}
        <article class="doc-page" lang="${escapeAttr(getLocaleMeta(activeDoc.sourcePath?.split("/")[1] || state.locale).htmlLang || activeDoc.sourcePath?.split("/")[1] || state.locale)}" data-doc-page data-product="${escapeAttr(product)}" data-doc="${escapeAttr(activeDoc.slug)}">
          <header class="doc-page-head">
            ${renderEnvironmentSwitch(product, activeDoc)}
            <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#home">Wiki</a>${icon("chevron")}<a href="${linkForProduct(product)}">${escapeHtml(productText(meta, "shortLabel") || productText(meta, "label"))}</a>${section ? `${icon("chevron")}<span>${escapeHtml(sectionText(section, "label"))}</span>` : ""}</nav>
            <h1>${escapeHtml(activeDoc.title)}</h1>
            ${activeDoc.description ? `<p class="doc-description">${escapeHtml(activeDoc.description)}</p>` : ""}
            <div class="doc-context">${activeDoc.version ? `<span>${escapeHtml(ui("guideVersion"))} <strong>${escapeHtml(activeDoc.version)}</strong></span>` : ""}${isHistory(activeDoc) ? `<span class="history-badge">${escapeHtml(ui("history"))}</span>` : ""}${activeDoc.sourcePath?.split("/")[1] !== state.locale ? `<span>${escapeHtml(ui("english"))}</span>` : ""}</div>
            ${activeDoc.translationSource ? `<div class="translation-context"><span>${escapeHtml(ui("assisted"))}</span><button type="button" data-source-locale="${escapeAttr(activeDoc.translationSource)}">${escapeHtml(ui("sourceEnglish"))}${icon("arrowRight")}</button></div>` : ""}
            ${environments.length ? `<p class="capture-context">${escapeHtml(ui("captures"))}: ${environments.map(escapeHtml).join(" · ")}</p>` : ""}
          </header>
          <div class="doc-page-body">${activeDoc.html}</div>
          ${renderRelated(activeDoc)}
          ${renderDocFollowNav(product, activeDoc, pageLabel)}
        </article>
        ${renderToc(activeDoc, false)}
      </div>
    `;
  }

  function renderToc(doc, mobile) {
    const headings = (doc.headings || []).filter(heading => heading.level === 2 || heading.level === 3);
    if (!headings.length) return "";
    const links = `<nav aria-label="${escapeAttr(ui("toc"))}">${headings.map(heading => `<a href="${linkForDoc(doc, heading.id)}" data-toc-link="${escapeAttr(heading.id)}" class="toc-level-${heading.level}">${escapeHtml(heading.text)}</a>`).join("")}</nav>`;
    return mobile ? `<details class="mobile-toc"><summary>${escapeHtml(ui("toc"))}${icon("chevronDown")}</summary>${links}</details>` : `<aside class="page-toc"><h2>${escapeHtml(ui("toc"))}</h2>${links}</aside>`;
  }

  function renderRelated(doc) {
    const links = [];
    const { prev, next } = getNeighborDocs(doc.product, doc);
    const seen = new Set([doc, prev, next].filter(Boolean).map(getDocKey));
    for (const match of doc.html.matchAll(/href="#([^"/:]+)\/([^":]+)(?:::[^"]*)?"/g)) {
      const related = findDoc(match[1], match[2]);
      if (!related || seen.has(getDocKey(related))) continue;
      seen.add(getDocKey(related));
      links.push(related);
    }
    return links.length ? `<nav class="related-docs" aria-label="${escapeAttr(ui("related"))}"><h2>${escapeHtml(ui("related"))}</h2>${links.slice(0, 5).map(item => `<a href="${linkForDoc(item)}">${item.product !== doc.product ? `<small>${escapeHtml(productText(config.products[item.product], "shortLabel"))}</small>` : ""}<span>${escapeHtml(item.title)}${icon("arrowRight")}</span></a>`).join("")}</nav>` : "";
  }

  function renderNotFound(product) {
    const doc = product ? getDefaultDoc(product) : null;
    return `<article class="not-found"><h1>${escapeHtml(ui("missing"))}</h1><p>${escapeHtml(ui("missingHint"))}</p>${doc ? `<a class="primary-action" href="${linkForDoc(doc)}">${escapeHtml(ui("start"))}${icon("arrowRight")}</a>` : `<a class="primary-action" href="#home">${escapeHtml(t("backToProducts"))}</a>`}<button class="ghost-action" data-search-open type="button">${icon("search")}${escapeHtml(ui("search"))}</button></article>`;
  }

  function scrollToSection(section) {
    if (!section) return;
    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: "instant", block: "start" });
  }

  function renderChangelog(route) {
    const { product } = route;
    if (!config.products?.[product] || !isProductOpen(product) || route.invalid) return renderNotFound(product);
    const releases = getChangelogReleases(product);
    const loaders = ["Forge", "NeoForge", "Fabric"].filter(loader => releases.some(release => release.loader === loader));
    const loader = route.loader || loaders[0];
    const minecraftVersions = [...new Set(releases.filter(release => release.loader === loader).map(release => release.minecraft))].sort((a,b) => a.localeCompare(b, undefined, { numeric: true }));
    const minecraft = route.minecraft || minecraftVersions[0];
    const versions = [...new Set(releases.filter(release => release.loader === loader && release.minecraft === minecraft).map(release => release.version))].sort((a,b) => b.localeCompare(a, undefined, { numeric: true }));
    const version = route.version || versions[0];
    const files = releases.filter(release => release.loader === loader && release.minecraft === minecraft && release.version === version).sort((a,b) => (b.publishedAt || b.uploadedAt).localeCompare(a.publishedAt || a.uploadedAt));
    if (!files.length) return renderNotFound(product);
    const release = files[0];
    const date = release.publishedAt || release.uploadedAt;
    const tab = (label, href, active) => `<a href="${href}"${active ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`;
    return `<section class="changelog-shell" data-changelog data-product="${escapeAttr(product)}" data-loader="${escapeAttr(loader)}" data-minecraft="${escapeAttr(minecraft)}" data-version="${escapeAttr(version)}">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#home">Dochi's Wiki</a>${icon("chevron")}<span>${escapeHtml(changelogLabel(product))}</span></nav>
      <header class="changelog-heading"><div><h1>${escapeHtml(changelogText("title"))}</h1><p>${escapeHtml(changelogLabel(product))}</p></div><label class="changelog-mod-picker"><span>${escapeHtml(changelogText("select"))}</span><select data-changelog-mod>${getWikiMods().filter(mod => mod.product !== "mwent" && hasChangelog(mod.product)).map(mod => `<option value="${escapeAttr(mod.product)}"${mod.product === productFamily(product) ? " selected" : ""}>${escapeHtml(modText(mod, "label") || modText(mod, "shortLabel"))}</option>`).join("")}</select></label></header>
      ${renderProductTabs(release.product, "changelog")}
      <p class="changelog-lead">${escapeHtml(changelogText("lead"))}</p>
      <div class="changelog-filters"><div><h2>${escapeHtml(changelogText("loader"))}</h2><nav class="changelog-options" aria-label="${escapeAttr(changelogText("loader"))}">${loaders.map(item => tab(item, changelogLink(product, item), loader === item)).join("")}</nav></div>
      <div><h2>${escapeHtml(changelogText("minecraft"))}</h2><nav class="changelog-options" aria-label="${escapeAttr(changelogText("minecraft"))}">${minecraftVersions.map(item => tab(item, changelogLink(product, loader, item), minecraft === item)).join("")}</nav></div></div>
      <div class="changelog-layout"><aside class="changelog-versions"><h2>${escapeHtml(changelogText("versions"))}</h2><nav aria-label="${escapeAttr(changelogText("versions"))}">${versions.map(item => tab(item, changelogLink(product, loader, minecraft, item), version === item)).join("")}</nav></aside>
      <article class="changelog-release"><header><div class="release-context"><span>${escapeHtml(loader)} ${escapeHtml(minecraft)}</span><time datetime="${escapeAttr(date)}">${escapeHtml(date.slice(0,10))} UTC</time></div><div class="release-title"><h2>${escapeHtml(version)}</h2>${files.filter(file => file.url).map(file => `<a class="track-open" href="${escapeAttr(file.url)}" target="_blank" rel="noreferrer">${escapeHtml(changelogText("download"))}${icon("external")}</a>`).join("")}</div><p>${escapeHtml(changelogText("notes"))}</p></header>
      <div class="doc-page-body changelog-notes" lang="en">${release.html || `<p>${escapeHtml(changelogText("empty"))}</p>`}</div></article></div>
    </section>`;
  }

  function renderPage(options = {}) {
    const route = parseHash();
    const { view, product } = route;
    if (view === "changelog" && config.products?.[product] && !route.invalid && changelogProduct(product) !== product) {
      location.replace(changelogLink(product, route.loader, route.minecraft, route.version));
      return;
    }
    const routeKey = `${state.locale}:${view}/${product}/${route.doc}/${route.loader || ""}/${route.minecraft || ""}/${route.version || ""}/${route.invalid || ""}`;
    if (routeKey === previousRoute && !options.preserveReading) {
      app.querySelector(".mobile-toc")?.removeAttribute("open");
      scrollToSection(route.section);
      return;
    }
    const reading = options.preserveReading ? captureReadingPosition() : null;
    previousRoute = routeKey;
    headingObserver?.disconnect();
    let activeDoc = null;
    if (view === "doc") {
      if (config.products?.[product] && isProductOpen(product)) {
        activeDoc = route.doc ? findDoc(product, route.doc) : getDefaultDoc(product);
        if (activeDoc?.section === "releases") {
          const version = activeDoc.releaseVersion || activeDoc.version;
          const first = changelogs.find(release => release.product === product && release.version === version)
            || getChangelogReleases(product).find(release => release.version === version);
          if (first) { location.replace(changelogLink(product, first.loader, first.minecraft, version)); return; }
        }
      }
    }
    const changelogPage = view === "changelog" ? renderChangelog(route) : "";
    document.title = activeDoc ? `${activeDoc.title} · ${productText(config.products[product], "shortLabel")} · Dochi's Wiki` : view === "changelog" && !changelogPage.includes('class="not-found"') ? `${changelogText("title")} · ${changelogLabel(product)} · Dochi's Wiki` : ui(view === "home" ? "tasks" : "missing") + " · Dochi's Wiki";
    app.innerHTML = `
      <a class="skip-link" href="#main-content">${escapeHtml(ui("skip"))}</a>
      <header class="topbar">
        <a class="site-brand" href="#home">Dochi's <strong>Wiki</strong></a>
        <button class="search-trigger" data-search-open type="button" aria-label="${escapeAttr(ui("search"))}">${icon("search")}<span>${escapeHtml(ui("search"))}</span><kbd>Ctrl K</kbd></button>
        <div class="top-actions">
          ${renderLocaleSelector()}
          <button class="icon-button" data-theme-toggle type="button" aria-label="${escapeAttr(ui("theme"))}">${icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon")}</button>
          ${renderSocialLinks()}
        </div>
      </header>
      ${view === "home" ? `<main class="main-home" id="main-content" tabindex="-1">${renderHome()}</main>` : view === "changelog" ? `<main class="main-home" id="main-content" tabindex="-1">${changelogPage}</main>` : activeDoc ? `<div class="layout"><div class="mobile-doc-bar"><button type="button" data-mobile-menu aria-expanded="false" aria-controls="doc-sidebar">${icon("menu")}${escapeHtml(ui("docsMenu"))}${icon("chevronDown")}</button><span>${escapeHtml(productText(config.products[product], "shortLabel"))}</span></div>${renderSidebar(product, activeDoc)}<main class="content" id="main-content" tabindex="-1">${renderDoc(product, activeDoc)}</main></div>` : `<main class="main-home" id="main-content" tabindex="-1">${renderNotFound(config.products?.[product] ? product : "")}</main>`}
      <footer class="mobile-social-links">${renderSocialLinks()}</footer>
    `;

    bindEvents(view, product, activeDoc);
    if (reading) restoreReadingPosition(reading);
    else {
      window.scrollTo({ top: 0, behavior: "instant" });
      scrollToSection(route.section);
    }
  }

  function bindEvents(view, product, activeDoc, section) {
    app.querySelector("[data-changelog-mod]")?.addEventListener("change", event => { location.hash = changelogLink(event.target.value); });
    app.querySelector("[data-locale-toggle]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      setLocaleMenu(!state.localeMenuOpen);
    });

    app.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        changeLocale(button.dataset.locale);
      });
    });

    app.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      safeSet("drm-docs-theme", next);
      state.localeMenuOpen = false;
      setLocaleMenu(false);
      app.querySelector("[data-theme-toggle]").innerHTML = icon(next === "dark" ? "sun" : "moon");
    });
    app.querySelectorAll("[data-search-open]").forEach(button => button.addEventListener("click", () => openSearch(product)));
    app.querySelector("[data-source-locale]")?.addEventListener("click", event => changeLocale(event.currentTarget.dataset.sourceLocale));
    app.querySelector("[data-mobile-menu]")?.addEventListener("click", event => {
      const button = event.currentTarget;
      const open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      app.querySelector("[data-sidebar]")?.classList.toggle("is-open", open);
    });
    app.querySelector("[data-mod-picker]")?.addEventListener("change", event => { location.hash = linkForProduct(event.target.value); });
    app.querySelectorAll(".doc-nav-link").forEach(link => link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      app.querySelector("[data-sidebar]")?.classList.remove("is-open");
      app.querySelector("[data-mobile-menu]")?.setAttribute("aria-expanded", "false");
      if (location.hash === link.getAttribute("href")) window.scrollTo({ top: 0, behavior: "instant" });
    }));
    app.querySelectorAll(".doc-image a").forEach(link => link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openImage(link);
    }));
    app.querySelectorAll(".doc-image a").forEach(link => { link.setAttribute("aria-label", `${ui("zoom")}: ${link.querySelector("img").alt}`); link.title = ui("zoom"); });
    if (guideMotion.matches) app.querySelectorAll(".doc-video video").forEach(video => {
      video.removeAttribute("autoplay");
      video.pause();
    });
    if (activeDoc) {
      bindToc();
      if (product === "mwent" && activeDoc.slug === "card-catalog") bindCatalogFilter();
    }
  }

  function setLocaleMenu(open) {
    state.localeMenuOpen = open;
    app.querySelector("[data-locale-menu]")?.classList.toggle("is-open", open);
    app.querySelector("[data-locale-toggle]")?.setAttribute("aria-expanded", String(open));
  }

  async function ensureLocale(locale) {
    if (getLocaleDocs(locale).length || !config.localeFiles?.[locale]) return;
    if (localeLoads.has(locale)) return localeLoads.get(locale);
    const pending = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(config.localeFiles[locale], document.baseURI).href;
      script.async = true;
      script.onload = () => {
        script.remove();
        if (getLocaleDocs(locale).length) resolve();
        else reject(new Error("Missing language content"));
      };
      script.onerror = () => { script.remove(); reject(new Error("Language unavailable")); };
      document.head.append(script);
    });
    localeLoads.set(locale, pending);
    try { await pending; } catch (error) { localeLoads.delete(locale); throw error; }
  }

  function languageStatus(message, retryLocale) {
    document.querySelector(".language-status")?.remove();
    const status = document.createElement("div");
    status.className = "language-status";
    status.setAttribute("role", "status");
    status.textContent = message;
    if (retryLocale) {
      const retry = document.createElement("button");
      retry.type = "button";
      retry.textContent = ui("retry");
      retry.addEventListener("click", () => changeLocale(retryLocale));
      status.append(retry);
    }
    document.body.append(status);
  }

  async function changeLocale(locale) {
    if (!config.locales?.[locale]) return;
    const request = ++localeRequest;
    setLocaleMenu(false);
    app.setAttribute("aria-busy", "true");
    languageStatus(ui("loading"));
    try {
      await ensureLocale(locale);
      if (request !== localeRequest) return;
      state.locale = locale;
      safeSet("drm-docs-locale", locale);
      const url = new URL(location.href);
      url.searchParams.set("lang", locale);
      history.replaceState(null, "", url);
      document.documentElement.lang = getLocaleMeta(locale).htmlLang || locale;
      renderPage({ preserveReading: true });
      app.querySelector("[data-locale-toggle]")?.focus({ preventScroll: true });
      document.querySelector(".language-status")?.remove();
    } catch (error) {
      if (request === localeRequest) languageStatus(ui("loadFailed"), locale);
    } finally {
      if (request === localeRequest) app.removeAttribute("aria-busy");
    }
  }

  function captureReadingPosition() {
    const headings = [...app.querySelectorAll(".doc-page-body h2, .doc-page-body h3")];
    let index = -1;
    headings.forEach((heading, i) => { if (heading.getBoundingClientRect().top <= 150) index = i; });
    return { y: scrollY, index, offset: index >= 0 ? headings[index].getBoundingClientRect().top : 0 };
  }

  function restoreReadingPosition(reading) {
    const restore = () => {
      const target = app.querySelectorAll(".doc-page-body h2, .doc-page-body h3")[reading.index];
      window.scrollTo({ top: target ? scrollY + target.getBoundingClientRect().top - reading.offset : reading.y, behavior: "instant" });
    };
    restore();
    requestAnimationFrame(restore);
  }

  function bindToc() {
    const headings = [...app.querySelectorAll(".doc-page-body h2, .doc-page-body h3")];
    const update = () => {
      let active = headings[0]?.id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 180) active = heading.id;
      }
      app.querySelectorAll("[data-toc-link]").forEach(link => {
        const selected = link.dataset.tocLink === active;
        link.classList.toggle("is-active", selected);
        if (selected) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    headingObserver = new IntersectionObserver(update, { rootMargin: "-80px 0px -65% 0px" });
    headings.forEach(heading => headingObserver.observe(heading));
    update();
    app.querySelectorAll("[data-toc-link]").forEach(link => link.addEventListener("click", () => {
      app.querySelector(".mobile-toc")?.removeAttribute("open");
      if (location.hash === link.getAttribute("href")) scrollToSection(link.dataset.tocLink);
    }));
  }

  function bindCatalogFilter() {
    const body = app.querySelector(".doc-page-body");
    const tables = [...body.querySelectorAll(".table-wrap")];
    if (!tables.length) return;
    const controls = document.createElement("div");
    controls.className = "catalog-filter";
    controls.innerHTML = `<label for="catalog-query">${escapeHtml(ui("filter"))}</label><input id="catalog-query" type="search" placeholder="${escapeAttr(ui("filterHint"))}" /><span role="status"></span>`;
    tables[0].before(controls);
    const rows = tables.flatMap(table => [...table.querySelectorAll("tbody tr")]);
    const texts = rows.map(row => normalizeSearch(row.textContent));
    controls.querySelector("input").addEventListener("input", event => {
      const query = normalizeSearch(event.target.value);
      rows.forEach((row, index) => { row.hidden = !texts[index].includes(query); });
      tables.forEach(table => { table.hidden = !table.querySelector("tbody tr:not([hidden])"); });
      controls.querySelector("[role=status]").textContent = `${ui("matches")}: ${rows.filter(row => !row.hidden).length} / ${rows.length}`;
    });
  }

  function normalizeSearch(text) {
    return String(text).normalize("NFKC").toLocaleLowerCase().normalize("NFD").replace(/\p{M}/gu, "").normalize("NFC").replace(/\s+/g, " ").trim();
  }

  function getSearchIndex() {
    if (searchIndexes.has(state.locale)) return searchIndexes.get(state.locale);
    const index = [];
    for (const doc of getAllDocs().filter(doc => isProductOpen(doc.product) && doc.section !== "releases")) {
      const parsed = new DOMParser().parseFromString(doc.html, "text/html");
      let section = { id: "", title: doc.title, text: "" };
      const sections = [section];
      for (const child of parsed.body.children) {
        if (/^H[234]$/.test(child.tagName)) {
          section = { id: child.id, title: child.textContent, text: "" };
          sections.push(section);
        } else section.text += " " + child.textContent;
      }
      for (const section of sections) {
        const text = section.text.replace(/\s+/g, " ").trim();
        index.push({ doc, ...section, text, titleText: normalizeSearch(doc.title + " " + section.title), bodyText: normalizeSearch(text), metaText: normalizeSearch(productText(config.products[doc.product], "label") + " " + (doc.tags || []).join(" ")) });
      }
    }
    searchIndexes.set(state.locale, index);
    return index;
  }

  function queryGroups(value) {
    const aliases = [
      ["상점", "shop", "pokemart", "loja", "tienda", "boutique", "magasin"], ["돈", "화폐", "currency", "dinheiro", "moeda", "moneda", "argent", "monnaie"], ["탄약", "ammo", "ammunition", "munição", "munición", "munition", "munitions"],
      ["시간표", "schedule", "schedules", "horários", "horarios", "horaires"], ["대화", "dialogue", "dialog", "diálogo", "dialogo"], ["적용", "apply", "aplicar", "appliquer"],
      ["저장", "save"], ["스킨", "skin"], ["보상", "reward", "rewards"], ["퀘스트", "quest"],
      ["총", "총기", "gun", "firearm", "arma"], ["스포너", "spawner", "generador", "gerador", "générateur"], ["뭰트", "mwent"], ["엔피시", "npc", "dnpc", "pnj"]
    ];
    const normalized = aliases.map(group => group.map(normalizeSearch));
    return normalizeSearch(value).split(" ").filter(Boolean).map(term => normalized.find(group => group.includes(term)) || [term]);
  }

  function snippet(text, groups) {
    const normalized = normalizeSearch(text);
    const matches = groups.flat().map(term => normalized.indexOf(term)).filter(index => index >= 0);
    const start = matches.length ? Math.max(0, Math.min(...matches) - 42) : 0;
    return `${start ? "…" : ""}${text.slice(start, start + 160)}${text.length > start + 160 ? "…" : ""}`;
  }

  function showDialog(dialog, opener) {
    document.querySelectorAll("dialog[open]").forEach(item => item.close());
    dialog.showModal();
    document.body.classList.add("has-reader-dialog");
    dialog.addEventListener("close", () => {
      if (!document.querySelector("dialog[open]")) document.body.classList.remove("has-reader-dialog");
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      dialog.remove();
    }, { once: true });
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  }

  function openSearch(product = parseHash().product) {
    setLocaleMenu(false);
    const opener = document.activeElement;
    const dialog = document.createElement("dialog");
    dialog.className = "search-dialog";
    dialog.setAttribute("aria-labelledby", "search-title");
    dialog.innerHTML = `<div class="search-panel"><header><h2 id="search-title">${escapeHtml(ui("search"))}</h2><button class="icon-button" data-dialog-close type="button" aria-label="${escapeAttr(ui("close"))}">${icon("x")}</button></header>
      <label class="sr-only" for="docs-query">${escapeHtml(ui("searchHint"))}</label><input id="docs-query" type="search" placeholder="${escapeAttr(ui("searchHint"))}" autocomplete="off" maxlength="160" />
      <label class="search-scope">${escapeHtml(ui("chooseMod"))}<select aria-label="${escapeAttr(ui("chooseMod"))}"><option value="">${escapeHtml(ui("allMods"))}</option>${getProductEntries().filter(([key]) => isProductOpen(key)).map(([key, meta]) => `<option value="${escapeAttr(key)}"${key === product ? " selected" : ""}>${escapeHtml(productText(meta, "label"))}</option>`).join("")}</select></label>
      <p class="search-status" role="status"></p><div class="search-results" aria-label="${escapeAttr(ui("results"))}"></div></div>`;
    document.body.append(dialog);
    showDialog(dialog, opener);
    const input = dialog.querySelector("input");
    const results = dialog.querySelector(".search-results");
    const status = dialog.querySelector(".search-status");
    const scope = dialog.querySelector("select");
    let timer;
    const search = () => {
      const value = normalizeSearch(input.value);
      if (!value) { results.innerHTML = ""; status.textContent = ui("searchEmpty"); return; }
      const groups = queryGroups(value);
      const matches = [];
      for (const entry of getSearchIndex()) {
        if (scope.value && entry.doc.product !== scope.value) continue;
        const haystack = `${entry.titleText} ${entry.bodyText} ${entry.metaText}`;
        if (!groups.every(group => group.some(term => haystack.includes(term)))) continue;
        const score = groups.reduce((sum, group) => sum + Math.max(...group.map(term => entry.titleText.includes(term) ? 12 : entry.bodyText.includes(term) ? 3 : 1)), 0) + (entry.titleText.includes(value) ? 8 : 0) - (isHistory(entry.doc) ? 12 : 0);
        matches.push({ ...entry, score });
      }
      matches.sort((a, b) => b.score - a.score || a.doc.order - b.doc.order);
      const unique = [];
      const counts = new Map();
      for (const entry of matches) {
        const key = getDocKey(entry.doc);
        if ((counts.get(key) || 0) >= 2) continue;
        counts.set(key, (counts.get(key) || 0) + 1);
        unique.push(entry);
      }
      status.textContent = unique.length ? `${ui("results")}: ${unique.length}${unique.length > 40 ? " · 40" : ""}` : ui("noResults");
      results.innerHTML = unique.slice(0, 40).map(entry => `<a class="search-result" href="${linkForDoc(entry.doc, entry.id)}"><small>${escapeHtml(productText(config.products[entry.doc.product], "shortLabel"))}${isHistory(entry.doc) ? ` · ${escapeHtml(ui("history"))}` : ""}</small><strong>${escapeHtml(entry.doc.title)}</strong>${entry.id ? `<span>${escapeHtml(entry.title)}</span>` : ""}<p>${escapeHtml(snippet(entry.text || entry.doc.description, groups))}</p></a>`).join("");
    };
    input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(search, 100); });
    scope.addEventListener("change", search);
    dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
    results.addEventListener("click", event => {
      const link = event.target.closest("a");
      if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        const section = link.hash.split("::")[1];
        dialog.close();
        if (link.hash === location.hash && section) { try { scrollToSection(decodeURIComponent(section)); } catch {} }
      }
    });
    dialog.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        dialog.close();
        return;
      }
      const links = [...results.querySelectorAll("a")];
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        if (event.target === scope) return;
        event.preventDefault();
        const index = links.indexOf(document.activeElement);
        const next = event.key === "ArrowDown" ? index + 1 : index - 1;
        (links[Math.max(0, Math.min(links.length - 1, next))] || input).focus();
      } else if (event.key === "Enter" && event.target === input && links[0]) {
        event.preventDefault(); links[0].click();
      }
    });
    search();
    input.focus();
    dialog.addEventListener("close", () => clearTimeout(timer), { once: true });
  }

  async function openImage(link) {
    const source = link.querySelector("img");
    const dialog = document.createElement("dialog");
    dialog.className = "image-dialog";
    dialog.setAttribute("aria-label", ui("zoom"));
    dialog.innerHTML = `<div class="image-panel"><header class="image-toolbar"><button class="icon-button" data-zoom-out aria-label="${escapeAttr(ui("zoomOut"))}" type="button">−</button><output data-zoom-level></output><button class="icon-button" data-zoom-in aria-label="${escapeAttr(ui("zoomIn"))}" type="button">+</button><button data-image-fit type="button">${escapeHtml(ui("fit"))}</button><button data-image-actual type="button">${escapeHtml(ui("actualSize"))}</button><a href="${escapeAttr(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(ui("original"))}${icon("external")}</a><button class="icon-button" data-dialog-close aria-label="${escapeAttr(ui("close"))}" type="button">${icon("x")}</button></header>
      <div class="image-viewport" tabindex="0" aria-label="${escapeAttr(ui("imageHint"))}"><div class="image-stage"><img src="${escapeAttr(source.currentSrc || source.src)}" alt="${escapeAttr(source.alt)}" draggable="false" /></div></div><footer><p>${escapeHtml(link.closest("figure").querySelector("figcaption")?.textContent || source.alt)}</p><small>${escapeHtml(ui("imageHint"))}</small></footer></div>`;
    document.body.append(dialog);
    showDialog(dialog, link);
    dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
    const image = dialog.querySelector("img");
    try { await image.decode(); } catch { return; }
    if (!dialog.open) return;
    const viewport = dialog.querySelector(".image-viewport");
    const stage = dialog.querySelector(".image-stage");
    let scale = 1;
    let fit = 1;
    const fitScale = () => Math.min(1, (viewport.clientWidth - 24) / image.naturalWidth, (viewport.clientHeight - 24) / image.naturalHeight);
    const zoom = (next, x = viewport.clientWidth / 2, y = viewport.clientHeight / 2) => {
      const rect = image.getBoundingClientRect();
      const box = viewport.getBoundingClientRect();
      const imageX = (box.left + x - rect.left) / scale;
      const imageY = (box.top + y - rect.top) / scale;
      scale = Math.max(fit, Math.min(4, next));
      image.style.width = `${image.naturalWidth * scale}px`;
      image.style.height = `${image.naturalHeight * scale}px`;
      stage.style.width = `${Math.max(viewport.clientWidth, image.naturalWidth * scale + 24)}px`;
      stage.style.height = `${Math.max(viewport.clientHeight, image.naturalHeight * scale + 24)}px`;
      const newRect = image.getBoundingClientRect();
      viewport.scrollLeft += newRect.left - box.left + imageX * scale - x;
      viewport.scrollTop += newRect.top - box.top + imageY * scale - y;
      dialog.querySelector("[data-zoom-level]").textContent = `${Math.round(scale * 100)}%`;
      dialog.querySelector("[data-zoom-out]").disabled = scale <= fit + 0.001;
      dialog.querySelector("[data-zoom-in]").disabled = scale >= 4;
    };
    const reset = () => { fit = fitScale(); zoom(fit); viewport.scrollLeft = 0; viewport.scrollTop = 0; };
    dialog.querySelector("[data-zoom-in]").addEventListener("click", () => zoom(scale * 1.5));
    dialog.querySelector("[data-zoom-out]").addEventListener("click", () => zoom(scale / 1.5));
    dialog.querySelector("[data-image-fit]").addEventListener("click", reset);
    dialog.querySelector("[data-image-actual]").addEventListener("click", () => zoom(1));
    const pointers = new Map();
    let gesture = null;
    const pinch = () => {
      const [a, b] = [...pointers.values()];
      return { distance: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    };
    viewport.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      viewport.setPointerCapture(event.pointerId);
      if (pointers.size === 1) gesture = { type: "pan", x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop, moved: false };
      else if (pointers.size === 2) gesture = { type: "pinch", ...pinch(), scale };
    });
    viewport.addEventListener("pointermove", event => {
      if (!pointers.has(event.pointerId) || !gesture) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (gesture.type === "pinch" && pointers.size >= 2) {
        const current = pinch();
        const box = viewport.getBoundingClientRect();
        viewport.scrollLeft -= current.x - gesture.x;
        viewport.scrollTop -= current.y - gesture.y;
        zoom(gesture.scale * current.distance / Math.max(1, gesture.distance), current.x - box.left, current.y - box.top);
        gesture.x = current.x;
        gesture.y = current.y;
      } else {
        if (Math.abs(event.clientX - gesture.x) + Math.abs(event.clientY - gesture.y) > 5) gesture.moved = true;
        viewport.scrollLeft = gesture.left - (event.clientX - gesture.x);
        viewport.scrollTop = gesture.top - (event.clientY - gesture.y);
      }
    });
    const releasePointer = event => {
      if (gesture?.type === "pan" && !gesture.moved && event.type === "pointerup") {
        const box = viewport.getBoundingClientRect();
        zoom(scale <= fit + 0.001 ? Math.max(1, fit * 2) : fit, event.clientX - box.left, event.clientY - box.top);
      }
      pointers.delete(event.pointerId);
      if (pointers.size === 1) {
        const [point] = pointers.values();
        gesture = { type: "pan", ...point, left: viewport.scrollLeft, top: viewport.scrollTop, moved: true };
      } else if (!pointers.size) gesture = null;
    };
    viewport.addEventListener("pointerup", releasePointer);
    viewport.addEventListener("pointercancel", releasePointer);
    viewport.addEventListener("keydown", event => {
      if (["+", "=", "-", "0"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "0") reset();
        else zoom(event.key === "-" ? scale / 1.5 : scale * 1.5);
      }
    });
    viewport.addEventListener("wheel", event => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const box = viewport.getBoundingClientRect();
      zoom(scale * (event.deltaY < 0 ? 1.12 : 0.89), event.clientX - box.left, event.clientY - box.top);
    }, { passive: false });
    const resize = new ResizeObserver(reset);
    resize.observe(viewport);
    dialog.addEventListener("close", () => resize.disconnect(), { once: true });
    reset();
  }

  document.addEventListener("click", event => {
    if (!event.target.closest("[data-locale-menu]")) setLocaleMenu(false);
  });
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (!document.querySelector(".search-dialog[open]")) openSearch();
    }
    if (event.key === "Escape" && state.localeMenuOpen) {
      setLocaleMenu(false);
      app.querySelector("[data-locale-toggle]")?.focus({ preventScroll: true });
    }
    if (event.key === "Escape" && app.querySelector(".sidebar.is-open")) {
      app.querySelector(".sidebar.is-open").classList.remove("is-open");
      app.querySelector("[data-mobile-menu]")?.setAttribute("aria-expanded", "false");
      app.querySelector("[data-mobile-menu]")?.focus({ preventScroll: true });
    }
  });
  document.addEventListener("click", event => {
    const skip = event.target.closest(".skip-link");
    if (skip) {
      event.preventDefault();
      document.getElementById("main-content")?.focus();
    }
  });
  window.addEventListener("hashchange", () => {
    if (booting) return;
    document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
    renderPage();
  });
  const preferredLocale = state.locale;
  app.innerHTML = `<main class="main-home" role="status">${escapeHtml(ui("loading"))}</main>`;
  ensureLocale(preferredLocale).then(() => {
    booting = false;
    renderPage();
  }).catch(() => {
    state.locale = getFallbackLocale();
    document.documentElement.lang = getLocaleMeta(state.locale).htmlLang || state.locale;
    booting = false;
    renderPage();
    languageStatus(ui("loadFailed"), preferredLocale);
  });
})();
