// ============================================================================
// THEME TOGGLE
// ============================================================================
const themeToggle = document.getElementById("themeToggle");

const applyTheme = (theme) => {
  document.body.classList.toggle("light", theme === "light");
  themeToggle.innerHTML =
    theme === "light" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch (e) {
  /* localStorage unavailable */
}
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  const nextTheme = isLight ? "dark" : "light";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("theme", nextTheme);
  } catch (e) {
    /* localStorage unavailable */
  }
});

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================================================
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.25)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ============================================================================
// ACTIVE NAV LINK INDICATOR
// ============================================================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active-link",
            link.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => navObserver.observe(section));

// ============================================================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// ============================================================================
const revealTargets = document.querySelectorAll(
  ".file-window, .project-card, .stat, .section-title, .skill-category",
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

revealTargets.forEach((el) => revealObserver.observe(el));

// ============================================================================
// COUNTER ANIMATION FOR STATS
// ============================================================================
const animateCounter = (element, target, duration = 1400) => {
  const isPercentage = target === 100 && element.closest(".stat")?.querySelector("p")?.textContent.includes("Dedication");
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    element.textContent = value + (isPercentage ? "%" : "+");
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".stat h3[data-target]").forEach((stat) => {
            if (!stat.hasAttribute("data-animated")) {
              animateCounter(stat, parseInt(stat.dataset.target, 10));
              stat.setAttribute("data-animated", "true");
            }
          });
          statsObserver.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.4 },
  );
  statsObserver.observe(statsSection);
}

// ============================================================================
// PARALLAX ON HERO PROFILE IMAGE
// ============================================================================
const heroImage = document.querySelector(".hero-image");
if (heroImage && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 860) {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 16;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 16;
      heroImage.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    }
  });
}

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================
const createScrollToTop = () => {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.setAttribute("aria-label", "Scroll to top");
  button.style.cssText = `
    position: fixed;
    bottom: 26px;
    right: 26px;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ffb454 0%, #5ee6c9 100%);
    color: #0b0f19;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.1rem;
    z-index: 999;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    const show = window.pageYOffset > 400;
    button.style.opacity = show ? "1" : "0";
    button.style.pointerEvents = show ? "auto" : "none";
  });

  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  button.addEventListener("mouseenter", () => (button.style.transform = "translateY(-5px)"));
  button.addEventListener("mouseleave", () => (button.style.transform = "translateY(0)"));
};

createScrollToTop();

// ============================================================================
// CONTACT FORM
// ============================================================================
// NOTE: This runs entirely in the browser, so it can't call an email API by
// itself. Submitting builds a pre-filled message and opens it in the user's
// default email app. For a "no click-through" experience where messages land
// straight in your inbox without opening a mail client, wire this form up to
// a form backend such as Formspree (formspree.io) or EmailJS (emailjs.com):
// swap the mailto redirect below for a fetch() POST to your form endpoint.
const CONTACT_EMAIL = "hafidhmwita30@gmail.com";
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fields = {
    fromName: contactForm.querySelector("#fromName"),
    fromEmail: contactForm.querySelector("#fromEmail"),
    messageBody: contactForm.querySelector("#messageBody"),
  };
  const statusEl = document.getElementById("formStatus");
  const sendBtn = contactForm.querySelector(".btn-send");
  const sendLabel = sendBtn.querySelector(".btn-send-label");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setInvalid = (input, invalid) => {
    input.closest(".form-row").classList.toggle("invalid", invalid);
  };

  const validate = () => {
    let valid = true;

    if (!fields.fromName.value.trim()) {
      setInvalid(fields.fromName, true);
      valid = false;
    } else {
      setInvalid(fields.fromName, false);
    }

    if (!emailPattern.test(fields.fromEmail.value.trim())) {
      setInvalid(fields.fromEmail, true);
      valid = false;
    } else {
      setInvalid(fields.fromEmail, false);
    }

    if (fields.messageBody.value.trim().length < 10) {
      setInvalid(fields.messageBody, true);
      valid = false;
    } else {
      setInvalid(fields.messageBody, false);
    }

    return valid;
  };

  Object.values(fields).forEach((input) => {
    input.addEventListener("input", () => setInvalid(input, false));
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      statusEl.textContent = "Please fix the highlighted fields.";
      statusEl.classList.add("is-error");
      return;
    }

    sendBtn.classList.add("is-sending");
    sendLabel.textContent = "Opening your email…";
    statusEl.classList.remove("is-error");
    statusEl.textContent = "";

    const name = fields.fromName.value.trim();
    const email = fields.fromEmail.value.trim();
    const message = fields.messageBody.value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      sendBtn.classList.remove("is-sending");
      sendLabel.textContent = "Send message";
      statusEl.textContent = "Your email app should open with the message ready to send.";
      contactForm.reset();
    }, 500);
  });
}

// ============================================================================
// PAGE LOAD
// ============================================================================
window.addEventListener("load", () => {
  document.body.classList.remove("is-loading");
});

// Fallback in case the load event already fired
if (document.readyState === "complete") {
  document.body.classList.remove("is-loading");
}

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================
console.log(
  "%cWelcome to Hafidh's Portfolio 🚀",
  "color: #5ee6c9; font-size: 18px; font-weight: bold;",
);
console.log(
  "%cThanks for peeking at the source. Feel free to explore my projects!",
  "color: #ffb454; font-size: 13px;",
);
