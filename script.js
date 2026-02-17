// ============================================================================
// THEME TOGGLE
// ============================================================================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Load theme preference from localStorage
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================================================
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero");

const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      navbar.style.background = "rgba(15, 23, 42, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });
}, observerOptions);

if (heroSection) {
  observer.observe(heroSection);
}

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .project-card, .about-stats, .contact-item"
  );

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards";
        elementObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  elements.forEach((el) => {
    el.style.opacity = "0";
    elementObserver.observe(el);
  });
};

// Run animation on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateOnScroll);
} else {
  animateOnScroll();
}

// ============================================================================
// COUNTER ANIMATION FOR STATS
// ============================================================================
const animateCounter = (element, target, duration = 2000) => {
  const isPercentage = element.textContent.includes("%");
  const numberValue = parseInt(element.textContent);
  const stepTime = duration / numberValue;

  let current = 0;
  const timer = setInterval(() => {
    current++;
    element.textContent = current + (isPercentage ? "%" : "+");
    if (current >= numberValue) {
      clearInterval(timer);
    }
  }, stepTime);
};

const startCounterAnimation = () => {
  const stats = document.querySelectorAll(".stat h3");
  const statsSection = document.querySelector(".about-stats");

  if (!statsSection) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.forEach((stat) => {
          if (!stat.hasAttribute("data-animated")) {
            animateCounter(stat);
            stat.setAttribute("data-animated", "true");
          }
        });
        statsObserver.unobserve(statsSection);
      }
    });
  }, {
    threshold: 0.5,
  });

  statsObserver.observe(statsSection);
};

startCounterAnimation();

// ============================================================================
// PARALLAX EFFECT ON MOUSE MOVE
// ============================================================================
const heroContainer = document.querySelector(".hero-container");
if (heroContainer) {
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

      const heroImage = document.querySelector(".hero-image");
      if (heroImage) {
        heroImage.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
      }
    }
  });
}

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any modals if needed
  }

  // Quick navigation with keyboard
  const navLinks = {
    a: "#about",
    s: "#skills",
    p: "#projects",
    c: "#contact",
  };

  if (e.ctrlKey && e.key.toLowerCase() in navLinks) {
    e.preventDefault();
    const target = document.querySelector(navLinks[e.key.toLowerCase()]);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// ============================================================================
// ACTIVE NAV LINK INDICATOR
// ============================================================================
const updateActiveNav = () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = "var(--text-secondary)";
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.style.color = "var(--accent)";
            }
          });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => observer.observe(section));
};

updateActiveNav();

// ============================================================================
// PAGE LOAD ANIMATIONS
// ============================================================================
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// ============================================================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================================================
const createScrollToTop = () => {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 999;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = "1";
      button.style.pointerEvents = "auto";
    } else {
      button.style.opacity = "0";
      button.style.pointerEvents = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-5px)";
    button.style.boxShadow = "0 10px 30px rgba(34, 211, 238, 0.3)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0)";
    button.style.boxShadow = "none";
  });
};

createScrollToTop();

// ============================================================================
// PERFORMANCE OPTIMIZATION - Lazy Loading Images
// ============================================================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================================================
// RESPONSIVE MENU TOGGLE (For mobile)
// ============================================================================
const createMobileMenu = () => {
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu && window.innerWidth <= 768) {
    const hamburger = document.createElement("button");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.className = "hamburger-menu";
    hamburger.style.cssText = `
      background: none;
      border: none;
      color: var(--accent);
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      z-index: 1001;
    `;

    const navContainer = document.querySelector(".nav-container");
    navContainer.insertBefore(hamburger, navContainer.lastChild);

    hamburger.addEventListener("click", () => {
      navMenu.style.display =
        navMenu.style.display === "flex" ? "none" : "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "60px";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.background = "var(--bg-secondary)";
      navMenu.style.padding = "20px";
      navMenu.style.borderBottom = "1px solid rgba(34, 211, 238, 0.1)";
    });
  }
};

// Uncomment if mobile menu is needed
// createMobileMenu();

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================
console.log(
  "%cWelcome to Hafidh's Portfolio! 🚀",
  "color: #22d3ee; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cThank you for visiting. Feel free to explore my projects!",
  "color: #6366f1; font-size: 14px;"
);
