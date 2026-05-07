/* ============================================================
   IoTeams IIUM — Main JavaScript
   assets/js/main.js

   CONTENTS:
   1.  Preloader
   2.  Navbar — scroll shrink + active link
   3.  Navbar — mobile hamburger + keyboard + ARIA
   4.  Scroll to top button
   5.  AOS — Animate on Scroll + resize refresh
   6.  GLightbox — gallery lightbox
   7.  Swiper — carousel / slider
   8.  Scroll reveal — IntersectionObserver
   9.  Smooth scroll — anchor links
   10. Stats counter animation
   11. Reduced motion — respects prefers-reduced-motion
   ============================================================ */

(function () {
  "use strict";

  /* ── Reduced motion check ──────────────────────────────────
     All animations check this. Screen readers and users with
     vestibular disorders benefit from no motion.
  ──────────────────────────────────────────────────────────── */
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ── Add class to <html> so CSS can also target it ────────*/
  if (reducedMotion) document.documentElement.classList.add("reduced-motion");

  /* ============================================================
     1. PRELOADER
  ============================================================ */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      const delay = reducedMotion ? 0 : 300;
      setTimeout(() => {
        preloader.classList.add("hidden");
        setTimeout(() => preloader.remove(), reducedMotion ? 0 : 500);
      }, delay);
    });
  }

  /* ============================================================
     2. NAVBAR — SCROLL SHRINK + ACTIVE LINK
  ============================================================ */
  const navbar = document.querySelector("#navbar");

  // Shrink navbar on scroll
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run immediately on load
  }

  // Active nav link — works from both root and /pages/ subdirectory
  (function highlightActiveLink() {
    const file = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      // Strip any leading ../ or ./ and get just the filename
      const hrefFile = href.replace(/^(\.\.\/|\.\/)+/, "").split("/").pop();

      if (hrefFile === file) {
        // Clear any HTML-set active classes first, then set the correct one
        document.querySelectorAll(".nav-links a.active").forEach((el) =>
          el.classList.remove("active")
        );
        a.classList.add("active");
      }
    });
  })();

  /* ============================================================
     3. NAVBAR — MOBILE HAMBURGER + KEYBOARD + ARIA
  ============================================================ */
  const hamburger = document.querySelector("#hamburger");
  const navMenu   = document.querySelector("#navLinks");

  const openNav  = () => {
    navMenu.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  };

  const closeNav = () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  if (hamburger && navMenu) {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-controls", "navLinks");
    hamburger.setAttribute("role", "button");

    hamburger.addEventListener("click", () =>
      navMenu.classList.contains("open") ? closeNav() : openNav()
    );

    // Close on any link click inside menu
    navMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeNav)
    );

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && navbar && !navbar.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key — return focus to hamburger
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeNav();
        hamburger.focus();
      }
    });
  }

  /* ============================================================
     4. SCROLL TO TOP
  ============================================================ */
  const scrollTopBtn = document.querySelector("#scroll-top");
  if (scrollTopBtn) {
    const toggle = () =>
      scrollTopBtn.classList.toggle("active", window.scrollY > 300);

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  /* ============================================================
     5. AOS — ANIMATE ON SCROLL
     Disabled entirely if user prefers reduced motion.
     Refreshed on resize so positions re-evaluate after layout
     changes (e.g. viewport resize, font load shift).
  ============================================================ */
  window.addEventListener("load", () => {
    if (typeof AOS === "undefined") return;

    AOS.init(
      reducedMotion
        ? { disable: true }
        : { duration: 650, easing: "ease-in-out", once: true, mirror: false, offset: 80 }
    );

    if (!reducedMotion) {
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => AOS.refresh(), 250);
      });
    }
  });

  /* ============================================================
     6. GLIGHTBOX
  ============================================================ */
  window.addEventListener("load", () => {
    if (typeof GLightbox === "undefined") return;
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      openEffect:  reducedMotion ? "none" : "fade",
      closeEffect: reducedMotion ? "none" : "fade",
      slideEffect: reducedMotion ? "none" : "slide",
    });
  });

  /* ============================================================
     7. SWIPER
  ============================================================ */
  window.addEventListener("load", () => {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach((el) => {
      const configEl = el.querySelector(".swiper-config");
      if (!configEl) return;
      try {
        const cfg = JSON.parse(configEl.innerHTML.trim());
        if (reducedMotion && cfg.autoplay) cfg.autoplay = false;
        new Swiper(el, cfg);
      } catch (err) {
        console.warn("[IoTeams] Swiper config error:", err);
      }
    });
  });

  /* ============================================================
     8. SCROLL REVEAL — IntersectionObserver
     Watches .reveal elements. Adds .visible on intersection.
     If reduced motion preferred — show all immediately.
  ============================================================ */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    if (reducedMotion) {
      revealEls.forEach((el) => el.classList.add("visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  }

  /* ============================================================
     9. SMOOTH SCROLL — ANCHOR LINKS
     Offsets by navbar height + 8px so content clears the
     fixed nav. Respects reduced motion.
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id === "#") return; // skip bare "#"

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const offset = (navbar ? navbar.offsetHeight : 72) + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    });
  });

  /* ============================================================
     10. STATS COUNTER ANIMATION
     Counts .stat-number elements up from 0 when visible.
     Supports formats: "120+", "30+", "100%", "15+".
     Skipped if reduced motion preferred (values stay as-is).
  ============================================================ */
  const statEls = document.querySelectorAll(".stat-number");
  if (statEls.length > 0 && !reducedMotion) {

    const countUp = (el) => {
      const raw   = el.textContent.trim();
      const match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;

      const target   = parseInt(match[1]);
      const suffix   = match[2] || "";
      const steps    = 60;
      const duration = 1800;
      let step       = 0;

      // Cubic ease-out — natural deceleration
      const ease = (t) => 1 - Math.pow(1 - t, 3);

      const timer = setInterval(() => {
        step++;
        el.textContent = Math.round(target * ease(step / steps)) + suffix;
        if (step >= steps) {
          el.textContent = target + suffix;
          clearInterval(timer);
        }
      }, duration / steps);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statEls.forEach((el) => statsObserver.observe(el));
  }

})();