/* THE 30 — Nav-Verhalten, Reveal-Animationen und DE/EN-Sprachumschalter */
(function () {
  "use strict";

  /* ---- Nav bekommt beim Scrollen einen Hintergrund ---- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- URL sauber halten: sanft scrollen, aber keine #anchor in der Adresszeile ---- */
  const cleanUrl = () => {
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
  };
  if (location.hash) cleanUrl();
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const toTop = id === "top" || id === "";
      const target = toTop ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (toTop) window.scrollTo({ top: 0, behavior: "smooth" });
      else target.scrollIntoView({ behavior: "smooth" });
      cleanUrl();
    });
  });

  /* ---- Sprachumschalter DE / EN ----
     Jedes übersetzbare Element trägt data-en mit der englischen Fassung.
     Die deutsche Originalfassung wird beim Laden gesichert. */
  const LANG_KEY = "the30-lang";
  const nodes = Array.prototype.slice.call(document.querySelectorAll("[data-en]"));
  nodes.forEach((el) => { el.dataset.de = el.innerHTML; });

  function setLang(lang) {
    document.documentElement.lang = lang;
    nodes.forEach((el) => {
      el.innerHTML = lang === "en" ? el.dataset.en : el.dataset.de;
    });
    document.querySelectorAll(".langswitch__btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  document.querySelectorAll(".langswitch__btn").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  let saved = "de";
  try { saved = localStorage.getItem(LANG_KEY) || "de"; } catch (e) {}
  if (saved === "en") setLang("en");

  /* ---- Bild-Slideshows (Line-up): Autoplay alle 4s, Dots, Swipe ---- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const imgs = Array.prototype.slice.call(slider.querySelectorAll(".slider__img"));
    if (imgs.length < 2) return;

    let index = 0;
    let timer = null;

    const dots = document.createElement("div");
    dots.className = "slider__dots";
    imgs.forEach((img, n) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot" + (n === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Bild " + (n + 1) + " von " + imgs.length);
      dot.addEventListener("click", () => { show(n); restart(); });
      dots.appendChild(dot);
    });
    slider.appendChild(dots);
    const dotEls = Array.prototype.slice.call(dots.children);

    function show(n) {
      index = (n + imgs.length) % imgs.length;
      imgs.forEach((img, k) => img.classList.toggle("is-active", k === index));
      dotEls.forEach((d, k) => d.classList.toggle("is-active", k === index));
    }
    function start() { if (!reduceMotion) timer = setInterval(() => show(index + 1), 6000); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    /* Swipe auf Touch-Geräten */
    let startX = null;
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    slider.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      startX = null;
      start();
    });

    start();
  });

  /* ---- Videos starten, sobald sie im Blickfeld sind (auch auf Mobile) ---- */
  const videos = document.querySelectorAll("video[autoplay]");
  if (videos.length && "IntersectionObserver" in window) {
    const vio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            v.muted = true;            /* Pflicht, sonst blockt iOS/Safari das Abspielen */
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    videos.forEach((v) => vio.observe(v));
  }

  /* ---- Sanftes Einblenden der Sektionen beim Scrollen ---- */
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
})();
