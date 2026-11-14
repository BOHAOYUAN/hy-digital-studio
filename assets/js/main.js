/* HY Digital Studio — hand-written JS, no dependencies */
(() => {
  "use strict";

  const staticMode = /(?:\?|&)static(=1)?(?:&|$)/.test(location.search);
  const reduced = staticMode || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (staticMode) document.documentElement.classList.add("static");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------- language ---------------- */
  const translatable = () => document.querySelectorAll("[data-en][data-zh]");
  const titles = {
    en: "HY Digital Studio — Independent software studio · Haoyuan Bo",
    zh: "HY Digital Studio — 独立软件工作室 · 薄皓元"
  };

  function setLang(lang) {
    const l = lang === "zh" ? "zh" : "en";
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
    translatable().forEach(el => {
      const value = el.getAttribute("data-" + l);
      if (value) el.innerHTML = value;
    });
    document.querySelectorAll(".lang button").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === l));
    });
    document.title = titles[l];
    try { localStorage.setItem("hy-lang", l); } catch (e) {}
  }

  const stored = (() => { try { return localStorage.getItem("hy-lang"); } catch (e) { return null; } })();
  const initial = stored || ((navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en");
  setLang(initial);
  document.querySelectorAll(".lang button").forEach(b => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  /* ---------------- cursor ---------------- */
  if (fine && !reduced) {
    const cursor = document.querySelector(".cursor");
    const dot = cursor.querySelector(".cursor-dot");
    const ring = cursor.querySelector(".cursor-ring");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let shown = false;

    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; cursor.classList.add("on"); rx = mx; ry = my; }
    }, { passive: true });

    const hoverables = "a, button, .work-row, .cap, .contact-mail";
    document.addEventListener("mouseover", e => {
      if (e.target.closest(hoverables)) cursor.classList.add("hover");
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(hoverables)) cursor.classList.remove("hover");
    });

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- scroll progress ---------------- */
  const bar = document.querySelector(".progress span");
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? window.scrollY / h : 0;
    if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- reveal ---------------- */
  const revealSelectors = [
    ".section-head", ".work-item", ".proof-grid li", ".cap",
    ".studio-photo", ".studio-copy > *", ".contact-kicker", ".contact-mail", ".contact-links", ".hero-stats"
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(","));
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (Math.min(i, 6) * 40) + "ms";
  });

  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------------- work: accordion + preview ---------------- */
  const list = document.querySelector(".work-list");
  const preview = document.querySelector(".preview");
  const previewImg = preview ? preview.querySelector("img") : null;

  document.querySelectorAll(".work-item").forEach(item => {
    const row = item.querySelector(".work-row");
    row.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".work-item.open").forEach(o => {
        o.classList.remove("open");
        o.querySelector(".work-row").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        row.setAttribute("aria-expanded", "true");
      }
    });
  });

  if (preview && previewImg && fine && !reduced) {
    let px = 0, py = 0, tx = 0, ty = 0, visible = false;

    list.addEventListener("mouseover", e => {
      const item = e.target.closest(".work-item");
      if (!item) return;
      const src = item.getAttribute("data-preview");
      if (src) previewImg.src = src;
      visible = true;
      preview.classList.add("show");
    });
    list.addEventListener("mouseleave", () => {
      visible = false;
      preview.classList.remove("show");
    });
    window.addEventListener("mousemove", e => {
      if (!visible) return;
      tx = e.clientX + 180;
      ty = e.clientY;
    }, { passive: true });

    const loop = () => {
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      const maxX = window.innerWidth - 340;
      preview.style.transform = "translate(" + Math.min(px, maxX) + "px," + py + "px) translate(-50%,-50%) scale(" + (visible ? 1 : 0.94) + ")";
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------------- magnetic buttons ---------------- */
  if (fine && !reduced) {
    document.querySelectorAll("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.18;
        const dy = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------- clock ---------------- */
  const clock = document.getElementById("clock");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hour12: false
    });
    const update = () => { clock.textContent = "Tianjin " + fmt.format(new Date()) + " CST"; };
    update();
    setInterval(update, 30000);
  }

  /* ---------------- anchor offset for fixed nav ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  });
})();
