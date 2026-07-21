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
