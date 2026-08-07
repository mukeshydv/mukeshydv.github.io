/* 
   Mukesh Yadav - Portfolio Main JS Logic
   Ultra-Fast Vanilla JS Engine
*/

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTypewriter();
  initStatsCounter();
  initSkillsTabs();
  initProjectsFilter();
  initCodeWidget();
  initModals();
  initContactForm();
  initCopyEmail();
});

/* --- Header Scroll & Mobile Nav --- */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });
}

/* --- Typewriter Effect --- */
function initTypewriter() {
  const words = [
    "Staff Engineer @ Mindtickle",
    "iOS & Kotlin Multiplatform Expert",
    "10+ Years Mobile Architect",
    "SwiftUI, Combine & RxSwift Lead",
    "Go & Backend Services Developer"
  ];
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --- Statistics Counter --- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const step = Math.max(1, Math.ceil(target / (duration / 30)));

          const counter = setInterval(() => {
            count += step;
            if (count >= target) {
              stat.textContent = target + suffix;
              clearInterval(counter);
            } else {
              stat.textContent = count + suffix;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);
}

/* --- Skills Matrix Tabs --- */
function initSkillsTabs() {
  const tabBtns = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Projects Filter --- */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Code Snippet Widget --- */
function initCodeWidget() {
  const codeContent = document.getElementById('code-snippet-content');
  const tabs = document.querySelectorAll('.code-tab-btn');
  if (!codeContent) return;

  const snippets = {
    'developer.json': `{
  <span class="syn-prop">"name"</span>: <span class="syn-string">"Mukesh Yadav"</span>,
  <span class="syn-prop">"role"</span>: <span class="syn-string">"Staff Engineer @ Mindtickle"</span>,
  <span class="syn-prop">"location"</span>: <span class="syn-string">"Pune, Maharashtra, India"</span>,
  <span class="syn-prop">"experience"</span>: <span class="syn-string">"10+ Years in iOS & Mobile Architecture"</span>,
  <span class="syn-prop">"coreTech"</span>: [<span class="syn-string">"Swift"</span>, <span class="syn-string">"Kotlin / KMM"</span>, <span class="syn-string">"Go"</span>, <span class="syn-string">"SwiftUI"</span>, <span class="syn-string">"RxSwift"</span>, <span class="syn-string">"GraphQL"</span>],
  <span class="syn-prop">"currentFocus"</span>: <span class="syn-string">"Leading KMM SDKs, Distributed Tracing & High Scale Architecture"</span>
}`,
    'architecture.ts': `<span class="syn-keyword">interface</span> MindtickleMobileArchitecture {
  <span class="syn-prop">iosStack</span>: <span class="syn-string">"SwiftUI, Swift, Combine, RxSwift, Realm, Clean Architecture"</span>;
  <span class="syn-prop">crossPlatformCore</span>: <span class="syn-string">"Kotlin Multiplatform Mobile (KMM / KMP)"</span>;
  <span class="syn-prop">backendServices</span>: <span class="syn-string">"Go (Gin/Gorilla), Java Play Framework, gRPC & GraphQL"</span>;
  <span class="syn-prop">observability</span>: <span class="syn-string">"Datadog & OpenTelemetry Distributed Tracing"</span>;
  <span class="syn-prop">automation</span>: <span class="syn-string">"GitHub Actions, GitLab CI, Automated KMM Framework Bundling"</span>;
}`,
    'interests.config': `<span class="syn-comment"># Technical Expertise & System Focus</span>
<span class="syn-prop">ios_frameworks</span> = ["SwiftUI", "UIKit", "Combine", "RxSwift", "CoreData", "Realm"]
<span class="syn-prop">security_standards</span> = ["FHIR Standard APIs", "PHI & PII Patient Data Security"]
<span class="syn-prop">telemetry_tools</span> = ["Datadog", "OpenTelemetry Custom Distributed Tracing"]
<span class="syn-prop">backend_tech</span> = ["Golang", "Gin", "MySQL", "RabbitMQ", "Redis"]`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.style.opacity = '0.6');
      tab.style.opacity = '1';
      const file = tab.getAttribute('data-file');
      if (file && snippets[file]) {
        codeContent.innerHTML = snippets[file];
      }
    });
  });
}

/* --- Modals Management --- */
function initModals() {
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  const closeBtns = document.querySelectorAll('.modal-close');

  window.openModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalBackdrops.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* --- Real Project Details Data Popup --- */
window.showProjectDetails = function(projectId) {
  const projectData = {
    'mindtickle': {
      title: 'Mindtickle iOS Application & KMM SDK',
      category: 'iOS App & Kotlin Multiplatform',
      description: 'Led requirement gathering to design and production development of the main Mindtickle iOS App. Architected Kotlin Multiplatform (KMM / KMP) SDK for shared core logic between iOS & Android. Implemented mobile backend services with Java Play Framework, integrated Datadog & OpenTelemetry for custom distributed tracing to correlate UI page load times with API latencies.',
      tech: ['Swift', 'SwiftUI', 'Kotlin Multiplatform (KMM)', 'Realm', 'RxSwift', 'Combine', 'Datadog', 'OpenTelemetry', 'Java Play Framework'],
      appStoreUrl: 'https://apps.apple.com/in/app/mindtickle/id965785490'
    },
    'daytoday': {
      title: 'DayToDay Health iOS App',
      category: 'Healthcare & Patient Security (PHI / PII)',
      description: 'End-to-end iOS application for patient care monitoring. Handled sensitive PHI and PII patient data security, integration of FHIR standard health APIs, BLE medical device communication, Core Data persistence, and Firebase dynamic links.',
      tech: ['Swift', 'UIKit', 'BLE Devices', 'Core Data', 'FHIR APIs', 'RxSwift', 'Clean Architecture', 'Firebase Dynamic Links'],
      appStoreUrl: 'https://apps.apple.com/us/app/daytoday-health/id1464676783'
    },
    'chefling': {
      title: 'Chefling Everyday Recipes (App & Backend)',
      category: 'iOS App & Golang Microservices',
      description: 'Designed and built the Chefling iOS application from scratch to App Store launch in Swift with Clean Architecture. Additionally architected and deployed backend services in Golang using Gin, MySQL, RabbitMQ, and Redis.',
      tech: ['Swift', 'UIKit', 'Core Data', 'Golang', 'Gin', 'MySQL', 'RabbitMQ', 'Redis', 'Firebase'],
      appStoreUrl: 'https://itunes.apple.com/in/app/chefling-everyday-recipes/id1047523390?mt=8'
    },
    'oneassist': {
      title: 'OneAssist iOS App',
      category: 'Financial & Protection Services',
      description: 'Comprehensive mobile security and protection app. Features payment gateway integration, Core Data, push notifications, and objective-C to Swift Clean Architecture modernization.',
      tech: ['Swift', 'Objective-C', 'Core Data', 'Payment Gateways', 'Push Notifications', 'UIKit', 'Clean Architecture'],
      appStoreUrl: 'https://itunes.apple.com/in/app/one-assist-for-iphone/id1074619069?mt=8'
    },
    'lovevivah': {
      title: 'LoveVivah Matchmaking App',
      category: 'Social & Matchmaking iOS App',
      description: 'iOS matchmaking application with real-time chat capabilities, In-App Purchases (IAP), custom UI animations, and push notification triggers.',
      tech: ['Swift', 'UIKit', 'In-App Purchase', 'Push Notifications', 'MVC Architecture'],
      appStoreUrl: 'https://itunes.apple.com/us/app/lovevivah/id1239412737?mt=8'
    },
    'waterapp': {
      title: 'WaterApp - Daily Hydration Tracker',
      category: 'Utility & Health iOS App',
      description: 'Daily hydration reminder tracker featuring local notifications, custom iOS UI animations, Core Data persistence, and AdMob integration.',
      tech: ['Swift', 'Core Data', 'Local Notifications', 'UIKit Animations', 'AdMob'],
      appStoreUrl: 'https://itunes.apple.com/us/app/water-app-reminder-tracker/id1199779472'
    }
  };

  const data = projectData[projectId];
  if (!data) return;

  const modalTitle = document.getElementById('project-modal-title');
  const modalBody = document.getElementById('project-modal-body');

  if (modalTitle && modalBody) {
    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <span style="color:var(--accent-cyan); font-weight:700; font-size:0.85rem; text-transform:uppercase;">${data.category}</span>
        <p style="color:var(--text-secondary); line-height:1.7;">${data.description}</p>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-bottom:0.6rem;">Technologies Involved:</strong>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${data.tech.map(t => `<span class="tech-tag" style="padding:0.4rem 0.8rem; font-size:0.85rem;">${t}</span>`).join('')}
          </div>
        </div>
        ${data.appStoreUrl ? `
          <div style="margin-top:0.5rem;">
            <a href="${data.appStoreUrl}" target="_blank" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-apple"></i> View on App Store
            </a>
          </div>
        ` : ''}
      </div>
    `;
    openModal('project-modal');
  }
};

/* --- Contact Form Simulation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      }, 1200);
    });
  }
}

/* --- Copy Email Shortcut --- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'mails4ymukesh@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => copyBtn.innerHTML = originalText, 2000);
      });
    });
  }
}
