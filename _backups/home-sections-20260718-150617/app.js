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

  const localeKeys = Object.keys(config.locales || {});
  const state = {
    locale: safeGet("drm-docs-locale", config.defaultLocale || "en"),
    localeMenuOpen: false,
    feedbackOpen: false
  };
  let giscusMounted = false;

  if (!config.locales?.[state.locale]) state.locale = config.defaultLocale || localeKeys[0] || "en";
  document.documentElement.lang = state.locale;

  const app = document.getElementById("app");

  function icon(name) {
    const icons = {
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
      message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path><path d="M8 9h8M8 13h5"></path></svg>',
      x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
    };
    return icons[name] || "";
  }

  function t(key) {
    const copy = {
      ko: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "문서 열기",
        curseForge: "CurseForge",
        homeTitle: "DRM WIKI",
        openMenu: "사이드바 열기",
        closeMenu: "사이드바 닫기",
        backToProducts: "DRM WIKI",
        previous: "이전",
        next: "다음",
        document: "문서",
        language: "언어",
        selectLanguage: "언어 선택",
        feedbackButton: "의견",
        feedbackOpen: "의견 남기기",
        feedbackClose: "의견 닫기",
        feedbackTitle: "의견 남기기",
        feedbackDescription: "사이트에 대한 의견, 제안, 오류 제보를 남겨주세요. GitHub 계정으로 로그인하면 작성할 수 있습니다.",
        feedbackTagsAria: "의견 대상 모드 태그",
        feedbackTagsLabel: "의견 대상 태그",
        feedbackTagsHint: "의견을 작성할 때 관련 모드 태그를 함께 적어주세요.",
        feedbackTagCopied: "{tag} 태그를 복사했습니다. 의견 작성란에 붙여넣어 주세요.",
        feedbackTagFallback: "의견 작성 시 {tag} 태그를 함께 적어주세요."
      },
      en: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "Open docs",
        curseForge: "CurseForge",
        homeTitle: "DRM WIKI",
        openMenu: "Open sidebar",
        closeMenu: "Close sidebar",
        backToProducts: "DRM WIKI",
        previous: "Previous",
        next: "Next",
        document: "Document",
        language: "Language",
        selectLanguage: "Select language",
        feedbackButton: "Feedback",
        feedbackOpen: "Leave feedback",
        feedbackClose: "Close feedback",
        feedbackTitle: "Leave feedback",
        feedbackDescription: "Leave comments, suggestions, or bug reports about the site. Sign in with a GitHub account to write.",
        feedbackTagsAria: "Feedback target mod tags",
        feedbackTagsLabel: "Target tags",
        feedbackTagsHint: "Include the related mod tag when writing feedback.",
        feedbackTagCopied: "Copied the {tag} tag. Paste it into the feedback box.",
        feedbackTagFallback: "Include the {tag} tag when writing feedback."
      },
      ru: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "Открыть документацию",
        curseForge: "CurseForge",
        homeTitle: "DRM WIKI",
        openMenu: "Открыть боковую панель",
        closeMenu: "Закрыть боковую панель",
        backToProducts: "DRM WIKI",
        previous: "Назад",
        next: "Далее",
        document: "Документ",
        language: "Язык",
        selectLanguage: "Выбор языка",
        feedbackButton: "Отзыв",
        feedbackOpen: "Оставить отзыв",
        feedbackClose: "Закрыть отзыв",
        feedbackTitle: "Оставить отзыв",
        feedbackDescription: "Оставьте комментарий, предложение или сообщение об ошибке по сайту. Для отправки войдите через GitHub.",
        feedbackTagsAria: "Теги мода для отзыва",
        feedbackTagsLabel: "Теги темы",
        feedbackTagsHint: "При отправке отзыва добавьте тег нужного мода.",
        feedbackTagCopied: "Тег {tag} скопирован. Вставьте его в поле отзыва.",
        feedbackTagFallback: "При отправке отзыва добавьте тег {tag}."
      },
      zh: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "打开文档",
        curseForge: "CurseForge",
        homeTitle: "DRM WIKI",
        openMenu: "打开侧边栏",
        closeMenu: "关闭侧边栏",
        backToProducts: "DRM WIKI",
        previous: "上一页",
        next: "下一页",
        document: "文档",
        language: "语言",
        selectLanguage: "选择语言",
        feedbackButton: "反馈",
        feedbackOpen: "留下反馈",
        feedbackClose: "关闭反馈",
        feedbackTitle: "留下反馈",
        feedbackDescription: "请留下关于网站的意见、建议或错误报告。使用 GitHub 账号登录后即可提交。",
        feedbackTagsAria: "反馈目标模组标签",
        feedbackTagsLabel: "目标标签",
        feedbackTagsHint: "提交反馈时请附上相关模组标签。",
        feedbackTagCopied: "已复制 {tag} 标签。请粘贴到反馈输入框中。",
        feedbackTagFallback: "提交反馈时请附上 {tag} 标签。"
      },
      ja: {
        repo: "GitHub",
        discord: "Discord",
        youtube: "YouTube",
        openDocs: "ドキュメントを開く",
        curseForge: "CurseForge",
        homeTitle: "DRM WIKI",
        openMenu: "サイドバーを開く",
        closeMenu: "サイドバーを閉じる",
        backToProducts: "DRM WIKI",
        previous: "前へ",
        next: "次へ",
        document: "ドキュメント",
        language: "言語",
        selectLanguage: "言語を選択",
        feedbackButton: "意見",
        feedbackOpen: "意見を送る",
        feedbackClose: "意見を閉じる",
        feedbackTitle: "意見を送る",
        feedbackDescription: "サイトへの意見、提案、不具合報告を残してください。GitHub アカウントでログインすると投稿できます。",
        feedbackTagsAria: "意見対象MODタグ",
        feedbackTagsLabel: "対象タグ",
        feedbackTagsHint: "投稿時に関連するMODタグも一緒に書いてください。",
        feedbackTagCopied: "{tag} タグをコピーしました。投稿欄に貼り付けてください。",
        feedbackTagFallback: "投稿時に {tag} タグも一緒に書いてください。"
      }
    };
    return (copy[state.locale] && copy[state.locale][key]) || copy.en[key] || key;
  }

  function tf(key, values = {}) {
    return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), t(key));
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
    return getAllDocs().filter((doc) => doc.product === product);
  }

  function isProductOpen(product) {
    const meta = config.products?.[product] || {};
    return !meta.disabled && !meta.comingSoon;
  }

  function statusText(meta) {
    return meta[`statusText_${state.locale}`] || meta[`statusText_${getFallbackLocale()}`] || meta.statusText || "";
  }

  function localizedConfigText(source, field) {
    return source?.[`${field}_${state.locale}`] || source?.[`${field}_${getFallbackLocale()}`] || source?.[field] || "";
  }

  function getDefaultDoc(product) {
    return getDocsByProduct(product)[0] || null;
  }

  function findDoc(product, slug) {
    return getDocsByProduct(product).find((doc) => doc.slug === slug) || null;
  }

  function productText(meta, field) {
    return meta[`${field}_${state.locale}`] || meta[`${field}_${getFallbackLocale()}`] || meta[field] || "";
  }

  function modText(meta, field) {
    return meta?.[`${field}_${state.locale}`] || meta?.[`${field}_${getFallbackLocale()}`] || meta?.[field] || "";
  }

  function feedbackModLabel(meta) {
    return modText(meta, "label") || modText(meta, "shortLabel") || meta?.id || "";
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
    return section?.[`${field}_${state.locale}`] || section?.[`${field}_${getFallbackLocale()}`] || section?.[field] || "";
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

  function renderFeedbackTagButtons() {
    const tags = getWikiMods()
      .map((meta) => feedbackModLabel(meta))
      .filter(Boolean);
    if (!tags.length) return "";

    return tags.map((tag) => `<button class="feedback-tag" type="button" data-feedback-tag="${escapeAttr(tag)}">#${escapeHtml(tag)}</button>`).join("");
  }

  function renderFeedbackTags() {
    const buttons = renderFeedbackTagButtons();
    if (!buttons) return "";

    return `
      <div class="feedback-tags" data-feedback-tags aria-label="${escapeAttr(t("feedbackTagsAria"))}">
        <span class="feedback-tags__label" data-feedback-tags-label>${escapeHtml(t("feedbackTagsLabel"))}</span>
        <div class="feedback-tags__list" data-feedback-tags-list>
          ${buttons}
        </div>
        <p class="feedback-tags__hint" data-feedback-tag-status>${escapeHtml(t("feedbackTagsHint"))}</p>
      </div>
    `;
  }

  function renderFeedbackSection() {
    return `
      <section id="feedback" class="feedback-section feedback-flyout" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="feedback-title">
        <button class="feedback-flyout__backdrop" data-feedback-close type="button" aria-label="${escapeAttr(t("feedbackClose"))}"></button>
        <div class="feedback-section__inner feedback-flyout__panel" tabindex="-1">
          <div class="feedback-section__header">
            <div>
              <h2 id="feedback-title">${escapeHtml(t("feedbackTitle"))}</h2>
              <p class="feedback-section__description" data-feedback-description>${escapeHtml(t("feedbackDescription"))}</p>
            </div>
            <button class="icon-button feedback-flyout__close" data-feedback-close type="button" aria-label="${escapeAttr(t("feedbackClose"))}">${icon("x")}</button>
          </div>
          ${renderFeedbackTags()}
          <div class="giscus"></div>
        </div>
      </section>
    `;
  }

  function refreshFeedbackSection(section) {
    if (!section) return;

    section.querySelector("#feedback-title").textContent = t("feedbackTitle");
    section.querySelector("[data-feedback-description]").textContent = t("feedbackDescription");
    section.querySelectorAll("[data-feedback-close]").forEach((button) => {
      button.setAttribute("aria-label", t("feedbackClose"));
    });

    const tagBox = section.querySelector("[data-feedback-tags]");
    if (tagBox) tagBox.setAttribute("aria-label", t("feedbackTagsAria"));
    const tagLabel = section.querySelector("[data-feedback-tags-label]");
    const tagList = section.querySelector("[data-feedback-tags-list]");
    const tagStatus = section.querySelector("[data-feedback-tag-status]");
    if (tagLabel) tagLabel.textContent = t("feedbackTagsLabel");
    if (tagList) tagList.innerHTML = renderFeedbackTagButtons();
    if (tagStatus) tagStatus.textContent = t("feedbackTagsHint");
    updateGiscusLanguage();
  }

  function bindFeedbackSection(section) {
    if (!section || section.dataset.feedbackBound === "true") return;
    section.dataset.feedbackBound = "true";
    section.addEventListener("click", (event) => {
      if (event.target.closest("[data-feedback-close]")) {
        closeFeedbackFlyout();
        return;
      }
      const button = event.target.closest("[data-feedback-tag]");
      if (!button) return;
      const tag = `[${button.dataset.feedbackTag || button.textContent.replace(/^#/, "")}]`;
      const status = section.querySelector("[data-feedback-tag-status]");
      const copied = () => {
        if (status) status.textContent = tf("feedbackTagCopied", { tag });
      };
      const fallback = () => {
        if (status) status.textContent = tf("feedbackTagFallback", { tag });
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(tag).then(copied).catch(fallback);
      } else {
        fallback();
      }
    });
    section.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeFeedbackFlyout();
      }
    });
  }

  function giscusLang() {
    return {
      ko: "ko",
      en: "en",
      ru: "ru",
      zh: "zh-CN",
      ja: "ja"
    }[state.locale] || "en";
  }

  function updateGiscusLanguage() {
    const frame = document.querySelector("#feedback iframe.giscus-frame");
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage({ giscus: { setConfig: { lang: giscusLang() } } }, "https://giscus.app");
  }

  function mountGiscus() {
    if (giscusMounted) return;
    const host = document.querySelector("#feedback .giscus");
    if (!host) return;

    // giscus.app에서 repo-id, category-id를 발급받아 교체해야 댓글이 정상 동작합니다.
    const GISCUS_REPO_ID = "REPLACE_WITH_GISCUS_REPO_ID";
    const GISCUS_CATEGORY = "REPLACE_WITH_DISCUSSION_CATEGORY";
    const GISCUS_CATEGORY_ID = "REPLACE_WITH_GISCUS_CATEGORY_ID";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "gdochi/DRM");
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", "DRM-site-feedback");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", giscusLang());
    host.appendChild(script);
    giscusMounted = true;
  }

  function ensureFeedbackSection() {
    let section = document.getElementById("feedback");
    if (!section) {
      document.body.insertAdjacentHTML("beforeend", renderFeedbackSection());
      section = document.getElementById("feedback");
    }
    refreshFeedbackSection(section);
    bindFeedbackSection(section);
    return section;
  }

  function openFeedbackFlyout() {
    const section = ensureFeedbackSection();
    if (!section) return;
    state.feedbackOpen = true;
    state.localeMenuOpen = false;
    section.classList.add("is-open");
    section.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-feedback-flyout");
    app.querySelector("[data-feedback-link]")?.setAttribute("aria-expanded", "true");
    mountGiscus();
    requestAnimationFrame(() => {
      section.querySelector(".feedback-flyout__close")?.focus();
    });
  }

  function closeFeedbackFlyout() {
    const section = document.getElementById("feedback");
    state.feedbackOpen = false;
    if (section) {
      section.classList.remove("is-open");
      section.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("has-feedback-flyout");
    app.querySelector("[data-feedback-link]")?.setAttribute("aria-expanded", "false");
    app.querySelector("[data-feedback-link]")?.focus();
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

    const cards = entries.map((meta) => {
      const docsHref = modDocsLink(meta);
      const curseForgeHref = meta.curseForgeUrl || meta.url || meta.href || "";
      const body = `
          ${renderModLogo(meta)}
          <div class="track-body">
            <h2>${escapeHtml(modText(meta, "label") || meta.id || "")}</h2>
            <p>${escapeHtml(modText(meta, "description"))}</p>
          </div>
      `;
      const actions = `
        <div class="track-actions">
          ${docsHref ? `<a class="track-open" href="${docsHref}">${t("openDocs")}${icon("chevron")}</a>` : ""}
          ${curseForgeHref ? `<a class="track-open external" href="${escapeAttr(curseForgeHref)}" target="_blank" rel="noreferrer">${t("curseForge")}${icon("external")}</a>` : ""}
          ${!docsHref && !curseForgeHref ? `<span class="track-status">${escapeHtml(statusText(meta))}</span>` : ""}
        </div>
      `;
      return `<article class="track-card">${body}${actions}</article>`;
    }).join("");

    return `
      <section class="home-shell">
        <header class="home-hero">
          <h1>${t("homeTitle")}</h1>
          ${renderHomeImage()}
        </header>
        <div class="track-list">${cards}</div>
      </section>
    `;
  }

  function renderSidebar(product, activeDoc) {
    const sections = getProductSections(product);
    return `
      <aside class="sidebar" data-sidebar>
        <div class="sidebar-head">
          <button class="back-link" type="button" data-home-link>${icon("home")} ${t("backToProducts")}</button>
        </div>
        <nav class="doc-nav" aria-label="Documentation">
          ${sections.map((section) => `<a class="doc-nav-link section-nav-link${activeDoc && (activeDoc.section || activeDoc.category) === section.id ? " is-active" : ""}" href="${linkForDoc(section.firstDoc)}"><span>${escapeHtml(sectionText(section, "label") || section.id)}</span><small>${escapeHtml(sectionText(section, "description") || "")}</small></a>`).join("")}
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
    return `
      <div class="doc-shell">
        <article class="doc-page" data-doc-page>
          <header class="doc-page-head">
            <h1>${escapeHtml(activeDoc.title)}</h1>
          </header>
          <div class="doc-page-body">${activeDoc.html}</div>
        </article>
        ${renderDocFollowNav(product, activeDoc, pageLabel)}
      </div>
    `;
  }

  function renderPage() {
    const route = parseHash();
    let view = route.view;
    let product = route.product;
    let activeDoc = null;

    if (view === "doc") {
      if (!config.products?.[product] || !isProductOpen(product)) {
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
        <div class="top-actions">
          <button class="feedback-top-button" data-feedback-link type="button" aria-label="${escapeAttr(t("feedbackOpen"))}" title="${escapeAttr(t("feedbackOpen"))}" aria-controls="feedback" aria-expanded="${state.feedbackOpen ? "true" : "false"}">${icon("message")}<span>${escapeHtml(t("feedbackButton"))}</span></button>
          ${renderLocaleSelector()}
          <button class="icon-button" data-theme-toggle type="button" aria-label="Theme">${icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon")}</button>
          ${renderSocialLinks()}
        </div>
      </header>
      ${view === "home" ? `<main class="main-home">${renderHome()}</main>` : `<div class="layout">${renderSidebar(product, activeDoc)}<main class="content">${renderDoc(product, activeDoc)}</main></div>`}
    `;

    ensureFeedbackSection();
    if (state.feedbackOpen) {
      openFeedbackFlyout();
    }
    bindEvents(view, product, activeDoc, route.section);
  }

  function bindEvents(view, product, activeDoc, section) {
    app.querySelector("[data-feedback-link]")?.addEventListener("click", () => {
      if (state.feedbackOpen) {
        closeFeedbackFlyout();
      } else {
        openFeedbackFlyout();
      }
    });

    app.querySelector("[data-locale-toggle]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      state.localeMenuOpen = !state.localeMenuOpen;
      renderPage();
    });

    app.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        state.locale = button.dataset.locale;
        state.localeMenuOpen = false;
        safeSet("drm-docs-locale", state.locale);
        document.documentElement.lang = state.locale;
        renderPage();
      });
    });

    app.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      safeSet("drm-docs-theme", next);
      state.localeMenuOpen = false;
      renderPage();
    });

    if (state.localeMenuOpen) {
      requestAnimationFrame(() => {
        const closeLocaleMenu = (event) => {
          if (!app.querySelector("[data-locale-menu]")?.contains(event.target)) {
            state.localeMenuOpen = false;
            renderPage();
          }
        };
        const closeOnEscape = (event) => {
          if (event.key === "Escape") {
            state.localeMenuOpen = false;
            renderPage();
          }
        };
        document.addEventListener("click", closeLocaleMenu, { once: true });
        document.addEventListener("keydown", closeOnEscape, { once: true });
      });
    }

    if (view === "doc") {
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
    }
  }

  window.addEventListener("hashchange", renderPage);
  renderPage();
})();
