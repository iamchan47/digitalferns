document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initStickyHeader();
  initMobileMenu();
  initFAQAccordion();
  initLeadForm();
  initNewsletterForm();
  initFadeUpObserver();
  initROICalculator();
});

/* 1. Theme Toggle System */
function initTheme() {
  const toggleBtns = document.querySelectorAll(".theme-toggle");
  
  // Set initial theme (default to dark)
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  
  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    });
  });
}

/* 2. Sticky Header System */
function initStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger immediately in case of page refresh
}

/* 3. Mobile Hamburger Navigation */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    
    if (isExpanded) {
      mobileMenu.style.display = "none";
      hamburger.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    } else {
      mobileMenu.style.display = "block";
      hamburger.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    }
  });
}

/* 4. FAQ Accordion Click and ARIA Handling */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  
  faqItems.forEach(item => {
    const button = item.querySelector(".faq-btn");
    const content = item.querySelector(".faq-content");
    if (!button || !content) return;
    
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close other active items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains("active")) {
          other.classList.remove("active");
          other.querySelector(".faq-btn")?.setAttribute("aria-expanded", "false");
          const otherContent = other.querySelector(".faq-content");
          if (otherContent) otherContent.style.maxHeight = "0px";
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0px";
      } else {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        // Get natural height of inner content
        const inner = content.querySelector(".faq-content-inner");
        if (inner) {
          content.style.maxHeight = inner.offsetHeight + "px";
        }
      }
    });
  });
}

/* 5. Lead Form Submission & Validation Handler */
function initLeadForm() {
  const form = document.getElementById("lead-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.className = "form-feedback";
    feedback.style.display = "none";
    
    // Simple validation checks
    const name = document.getElementById("name")?.value.trim();
    const company = document.getElementById("company")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const website = document.getElementById("website")?.value.trim();
    const service = document.getElementById("service")?.value;
    const budget = document.getElementById("budget")?.value;
    const message = document.getElementById("message")?.value.trim();
    
    if (!name || !company || !email || !phone || !website || !service || !budget || !message) {
      feedback.textContent = "Please fill in all required form fields.";
      feedback.classList.add("error");
      feedback.style.display = "block";
      return;
    }
    
    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.textContent = "Please provide a valid business email address.";
      feedback.classList.add("error");
      feedback.style.display = "block";
      return;
    }
    
    // Simulate loading state
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Recording proposal request...";
    
    setTimeout(() => {
      // Successful submission
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      feedback.textContent = "🎉 Strategy request received! One of our senior growth partners will review your site and contact you within 4 business hours.";
      feedback.classList.add("success");
      feedback.style.display = "block";
      
      console.log("Mock lead recorded successfully:", { name, company, email, phone, website, service, budget, message });
      form.reset();
    }, 1500);
  });
}

/* 6. Newsletter Subscription Mock */
function initNewsletterForm() {
  const nForm = document.getElementById("newsletter-form");
  const nFeedback = document.getElementById("newsletter-feedback");
  if (!nForm || !nFeedback) return;
  
  nForm.addEventListener("submit", (e) => {
    e.preventDefault();
    nFeedback.className = "newsletter-feedback";
    nFeedback.style.display = "none";
    
    const email = nForm.querySelector("input[type='email']")?.value.trim();
    if (!email) return;
    
    const submitBtn = nForm.querySelector("button");
    if (submitBtn) submitBtn.disabled = true;
    
    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      nFeedback.textContent = "Subscribed! Welcome to our inner circle.";
      nFeedback.classList.add("success");
      nFeedback.style.display = "block";
      nForm.reset();
    }, 1000);
  });
}

/* 7. Scroll Fade Up Animation Observer */
function initFadeUpObserver() {
  const animatedElements = document.querySelectorAll(".fade-up");
  if (animatedElements.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

/* 8. Interactive ROI Calculator */
function initROICalculator() {
  const trafficSlider = document.getElementById("traffic-slider");
  const valueSlider = document.getElementById("value-slider");
  
  if (!trafficSlider || !valueSlider) return;

  const trafficVal = document.getElementById("traffic-val");
  const valueVal = document.getElementById("value-val");
  const baselineRev = document.getElementById("baseline-rev");
  const optimizedRev = document.getElementById("optimized-rev");
  const upliftRev = document.getElementById("uplift-rev");

  const formatCurrency = (val) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  const updateCalculations = () => {
    const traffic = parseInt(trafficSlider.value, 10);
    const value = parseInt(valueSlider.value, 10);

    trafficVal.textContent = traffic.toLocaleString("en-IN") + " visitors";
    valueVal.textContent = formatCurrency(value);

    // Baseline Sales (1% Conversion Rate)
    const base = Math.round(traffic * 0.01 * value);
    // Optimized Sales (3.2% Target Conversion Rate)
    const opt = Math.round(traffic * 0.032 * value);
    const uplift = opt - base;

    baselineRev.textContent = formatCurrency(base);
    optimizedRev.textContent = formatCurrency(opt);
    upliftRev.textContent = formatCurrency(uplift) + " / mo";
  };

  trafficSlider.addEventListener("input", updateCalculations);
  valueSlider.addEventListener("input", updateCalculations);
  updateCalculations();
}
