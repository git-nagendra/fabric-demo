// ================= Social Icons Toggle =================
(() => {
  const wrapper = document.getElementById("socialWrapper");
  const toggleBtn = document.getElementById("toggleBtn");
  const toggleIcon = document.getElementById("toggleIcon");

  if (wrapper && toggleBtn && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      wrapper.classList.toggle("open");
      toggleBtn.classList.toggle("open");

      const isOpen = wrapper.classList.contains("open");
      toggleIcon.classList.replace(
        isOpen ? "fa-comment-dots" : "fa-times",
        isOpen ? "fa-times" : "fa-comment-dots"
      );
    });
  }
})();

// ================= Loader Text =================
(() => {
  // Phrases
  const texts = [
    "Threads of Tradition",
    "Crafted with Care",
    "Loomed to Perfection",
    "Elegance in Every Fiber"
  ];

  const loader = document.getElementById("loader");
  const textEl = document.getElementById("loading-text");

  // Show immediately (only during load time)
  // If loader is initially display:none in CSS, force it on here
  if (loader) loader.style.display = "flex";

  // Lock scroll while visible (prevents background interaction)
  let scrollYForRestore = 0;
  const lockScroll = () => {
    scrollYForRestore = window.scrollY || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYForRestore}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };
  const unlockScroll = () => {
    const top = parseInt(document.body.style.top || "0", 10) || 0;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, -top);
  };

  if (loader) lockScroll();

  // Start smooth phrase rotation immediately
  if (loader && textEl) {
    const cycleMs = 1000; // per phrase
    const fadeMs  = 500;  // fade duration
    let idx = 0;
    textEl.textContent = texts[idx];
    textEl.style.opacity = "1";

    let startTime = 0;
    let lastSwapCycle = -1;
    let rafId = null;

    function tick(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const cycleNum = Math.floor(elapsed / cycleMs);
      const cycleTime = elapsed % cycleMs;

      if (cycleTime <= fadeMs) {
        const t = cycleTime / fadeMs;
        textEl.style.opacity = String(1 - t);
      } else {
        if (cycleNum !== lastSwapCycle) {
          idx = (idx + 1) % texts.length;
          textEl.textContent = texts[idx];
          lastSwapCycle = cycleNum;
        }
        const tIn = Math.min(cycleTime - fadeMs, fadeMs) / fadeMs;
        textEl.style.opacity = String(tIn);
      }
      rafId = requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Hide strictly on load complete so it only shows during page loading
    window.addEventListener("load", () => {
      if (rafId) cancelAnimationFrame(rafId);
      loader.style.display = "none";
      unlockScroll();
    }, { once: true });
  }
})();

// ================= Mobile Nav Toggle =================
(() => {
  const ham = document.querySelector(".ham");
  const nav = document.querySelector(".nav-bar");

  if (ham && nav) {
    ham.addEventListener("click", () => {
      ham.classList.toggle("span_style");
      nav.classList.toggle("active");
      document.body.style.overflow =
        document.body.style.overflow === "hidden" ? "auto" : "hidden";
    });
  }

  // Submenu
  document.querySelectorAll(".has-submenu > a").forEach((menuLink) => {
    menuLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = menuLink.nextElementSibling;
        if (submenu) {
          submenu.style.display =
            submenu.style.display === "flex" ? "none" : "flex";
        }
      }
    });
  });
})();

// ================= Navbar Sticky =================
(() => {
  const navbar = document.querySelector(".nav-bar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("sticky", window.scrollY > 100);
  });
})();

// ================= Card Technology =================
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card_Technology");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      });
    });
  });
})();

// ================= Counter Animation =================
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
      const target = +counter.dataset.target;
      const duration = 2000;
      const startTime = performance.now();

      const update = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased) + " +";

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + " +";
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  });
})();

// ================= Slider =================
(() => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let index = 0;

  const show = (i) => {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      show(index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      show(index);
    });
  }

  if (slides.length) show(index);
})();

// ================= Certificate Modal =================
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const certModal = document.getElementById("certModal");
    const fullImg = document.getElementById("certFullImg");

    if (!certModal || !fullImg) return;

    certModal.addEventListener("show.bs.modal", (event) => {
      const triggerImg = event.relatedTarget;
      if (!triggerImg) return;

      const fullSrc = triggerImg.dataset.fullsrc || triggerImg.src;
      fullImg.src = fullSrc;
      fullImg.alt = triggerImg.alt || "Certificate fullscreen";
    });

    certModal.addEventListener("hidden.bs.modal", () => {
      fullImg.src = "";
    });
  });
})();
