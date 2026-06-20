/* ====================================================================
   Nusantara Kazakhstan — Frontend behaviour
   - Sticky header shadow on scroll
   - Mobile burger menu
   - Reveal-on-scroll (Intersection Observer)
   - Activities carousel navigation
   - Language switcher (EN/RU/KZ) — structure ready, EN is the only
     populated dictionary for now. Extend the i18n object to add RU/KZ.
   - Current-year footer stamp
   ==================================================================== */

(function () {
    "use strict";

    /* -------- Sticky header shadow -------------------------------- */
    const header = document.getElementById("header");
    const onScroll = () => {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* -------- Mobile menu ----------------------------------------- */
    const burger = document.querySelector(".header__burger");
    const mobileNav = document.getElementById("mobileNav");
    if (burger && mobileNav) {
        burger.addEventListener("click", () => {
            const isOpen = mobileNav.classList.toggle("is-open");
            burger.classList.toggle("is-open", isOpen);
            burger.setAttribute("aria-expanded", String(isOpen));
        });
        mobileNav.querySelectorAll("a").forEach((a) =>
            a.addEventListener("click", () => {
                mobileNav.classList.remove("is-open");
                burger.classList.remove("is-open");
                burger.setAttribute("aria-expanded", "false");
            })
        );
    }

    /* -------- Reveal-on-scroll ------------------------------------ */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* -------- Carousel -------------------------------------------- */
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const track = carousel.querySelector("[data-carousel-track]");
        const prev = carousel.querySelector(".carousel__nav--prev");
        const next = carousel.querySelector(".carousel__nav--next");
        if (!track) return;

        const step = () => {
            const firstCard = track.querySelector(".activity-card");
            if (!firstCard) return 320;
            const cardRect = firstCard.getBoundingClientRect();
            const gap = parseFloat(getComputedStyle(track).gap || 24);
            return cardRect.width + gap;
        };

        prev && prev.addEventListener("click", () => {
            track.scrollBy({ left: -step(), behavior: "smooth" });
        });
        next && next.addEventListener("click", () => {
            track.scrollBy({ left: step(), behavior: "smooth" });
        });
    });

    /* -------- Footer year ----------------------------------------- */
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    /* -------- Language switcher (EN/RU/KZ) ------------------------
       Structure is laid out so dictionaries can be added later
       without touching the markup. Mark translatable elements with
       data-i18n="dot.path" and add the corresponding string here.   */
    const i18n = {
        en: {
            "nav.home":         "Home",
            "nav.about":        "About",
            "nav.services":     "Services",
            "nav.partnerships": "Partnerships",
            "nav.activities":   "Activities",
            "nav.contact":      "Contact"
        },
        ru: {
            "nav.home":         "Главная",
            "nav.about":        "О нас",
            "nav.services":     "Услуги",
            "nav.partnerships": "Партнёрства",
            "nav.activities":   "Деятельность",
            "nav.contact":      "Контакты"
        },
        kz: {
            "nav.home":         "Басты бет",
            "nav.about":        "Біз туралы",
            "nav.services":     "Қызметтер",
            "nav.partnerships": "Серіктестіктер",
            "nav.activities":   "Қызмет",
            "nav.contact":      "Байланыс"
        }
    };

    const applyLang = (lang) => {
        const dict = i18n[lang] || i18n.en;
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) el.textContent = dict[key];
        });
        document.documentElement.setAttribute("lang", lang);
    };

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".lang-switch__btn").forEach((b) =>
                b.classList.remove("is-active")
            );
            btn.classList.add("is-active");
            applyLang(btn.dataset.lang);
        });
    });
})();
