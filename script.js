"use strict";

/*
  ============================================
  WEBSITE CONFIGURATION (EDIT THIS BLOCK ONLY)
  ============================================
  Keep these values up to date for your business.
  Most text on the page is populated from this object.
*/
const SITE_CONFIG = {
  businessName: "Stratavon Advisors",
  logoFileName: "assets/logo/company-logo.png",
  headline: "Clarity for Complex Business Decisions",
  subheadline:
    "We help organizations make confident decisions through practical strategy, disciplined execution, and measurable outcomes.",
  contactEmail: "rtimmer@stratavonadvisors.com",
  socialLinks: [
    { label: "Email", url: "mailto:rtimmer@stratavonadvisors.com" }
  ],
  companyDescription:
    "Northbridge Advisory Group partners with leadership teams to solve high-impact challenges in planning, execution, and performance improvement."
};

/**
 * Safe text assignment helper.
 * We centralize these updates to keep the page maintainable and avoid repeating null checks.
 */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

/**
 * Populate static page content from the single config object.
 */
function hydrateSiteContent() {
  setText("business-name", SITE_CONFIG.businessName);
  setText("footer-business-name", SITE_CONFIG.businessName);
  setText("hero-headline", SITE_CONFIG.headline);
  setText("hero-subheadline", SITE_CONFIG.subheadline);
  setText("company-description", SITE_CONFIG.companyDescription);

  const logo = document.getElementById("logo-image");
  if (logo) {
    logo.src = SITE_CONFIG.logoFileName;
    logo.alt = SITE_CONFIG.businessName + " logo";
  }

  const contactLink = document.getElementById("contact-email-link");
  if (contactLink) {
    contactLink.href = "mailto:" + SITE_CONFIG.contactEmail;
    contactLink.textContent = SITE_CONFIG.contactEmail;
  }

  const socialList = document.getElementById("social-links");
  if (socialList) {
    socialList.innerHTML = "";
    SITE_CONFIG.socialLinks.forEach((social) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = social.url;
      a.textContent = social.label;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      socialList.appendChild(li);
    });
  }

  document.title = SITE_CONFIG.businessName + " | Professional Services";
}

/**
 * Add a small reveal animation for sections as they enter the viewport.
 * This is intentionally minimal for performance and readability.
 */
function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Light-touch smooth scrolling enhancement.
 * Browsers already support anchor navigation; this provides a softer transition.
 */
function setupSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId.length < 2) {
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = " | " + new Date().getFullYear() + " All rights reserved.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateSiteContent();
  setupRevealAnimations();
  setupSmoothScroll();
  setFooterYear();
});
