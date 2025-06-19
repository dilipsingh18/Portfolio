'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}


/**
 * Animated Progress Bars for Skills Section
 */
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const value = bar.getAttribute('data-value');
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = value + '%';
    }, 300);
  });
}

// Trigger animation when skills section is in view
function isInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top < window.innerHeight && rect.bottom > 0
  );
}
const skillsSection = document.querySelector('.skills');
let skillAnimated = false;
window.addEventListener('scroll', function () {
  if (skillsSection && !skillAnimated && isInViewport(skillsSection)) {
    animateSkillBars();
    skillAnimated = true;
  }
});


/**
 * Portfolio Filtering
 */
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const projectItems = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/**
 * Click Project Card to Open Project Page
 */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function (e) {
    // Prevent click on buttons/links inside the card from triggering navigation
    if (
      e.target.closest('a') ||
      e.target.classList.contains('view-details') ||
      e.target.tagName === 'BUTTON'
    ) {
      return;
    }
    const link = card.getAttribute('data-link') || card.querySelector('a')?.href;
    if (link) {
      window.open(link, '_blank');
    }
  });
});

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/**
 * Animated Counter for Stats Section
 */
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = Math.ceil(target / 100);
    function updateCounter() {
      if (count < target) {
        count += increment;
        counter.textContent = count > target ? target : count;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }
    updateCounter();
  });
}
const statsSection = document.querySelector('.stats');
let statsAnimated = false;
window.addEventListener('scroll', function () {
  if (statsSection && !statsAnimated && isInViewport(statsSection)) {
    animateCounters();
    statsAnimated = true;
  }
});


// Text to be typed for title
var titleText = "Hi, I am Dilip";
var titleElement = document.querySelector('.typing-title'); // Selecting the span element with class "typing-title"

// Text to be typed for different roles
var roles = ["a Leader", "a BCA Student", "a Mentor", "an Innovator", "a Problem Solver","a designer"];
var currentIndex = 0; // Initialize index for roles

// Function to type title
function typeTitle() {
  var titleLength = titleText.length;
  var currentCharacter = 0;
  var typingInterval = setInterval(function() {
    titleElement.innerHTML += titleText[currentCharacter];
    currentCharacter++;
    if (currentCharacter === titleLength) {
      clearInterval(typingInterval);
      setTimeout(function() {
        // After typing the title, start typing different roles
        typeRole();
      }, 1000); // Delay before typing roles
    }
  }, 100); // Typing speed for title
}

// Function to type different roles
function typeRole() {
  var role = roles[currentIndex];
  var roleLength = role.length;
  var currentCharacter = 0;
  var typingInterval = setInterval(function() {
    var coloredText = "<span style='color: ";
    // Color roles based on their index
    switch (currentIndex) {
      case 0:
        coloredText += "green;'>"; // Leader in blue
        break;
      case 1:
        coloredText += "green;'>"; // BCA Student in green
        break;
      case 2:
        coloredText += "green;'>"; // Mentor in orange
        break;
      case 3:
        coloredText += "green;'>"; // Innovator in purple
        break;
      case 4:
        coloredText +="green;'>"; // Problem Solver in red
        break;
      default:
        coloredText +="green;'>"; // Default color
        break;
    }
    titleElement.innerHTML = titleText + "   " + coloredText + role.slice(0, currentCharacter + 1) + "</span>";
    currentCharacter++;
    if (currentCharacter === roleLength) {
      clearInterval(typingInterval);
      currentIndex++;
      if (currentIndex === roles.length) {
        currentIndex = 0; // Reset index to loop through roles
      }
      setTimeout(function() {
        // After typing the role, start typing the next role
        typeRole();
      }, 1500); // Delay before typing next role
    }
  }, 100); // Typing speed for roles
}

// Start typing title initially
typeTitle();

/**
 * Add Main Menu Items Dynamically (Professional Sections Only)
 * Sections: Home, About, Skills, Projects, Services, Contact
 */
const mainMenus = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" }
];

const navbarList = document.querySelector('.navbar-list');
if (navbarList) {
  navbarList.innerHTML = ''; // Remove any existing or unnecessary menu items
  mainMenus.forEach(menu => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'navbar-link';
    a.href = menu.href;
    a.textContent = menu.name;
    li.appendChild(a);
    navbarList.appendChild(li);
  });
}

/**
 * Default Photo, Card, and Description for Projects/Profiles
 * If no photo or description is provided, use default values.
 */

// Default image URL (place your default image in assets/images/default.jpg)
const DEFAULT_PHOTO = "assets/images/default.jpg";
const DEFAULT_DESC = "No description available for this item.";

// Utility to set default photo and description for project cards
function setDefaultCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    // Set default image if not present
    const img = card.querySelector('img');
    if (img && (!img.src || img.src.endsWith('/') || img.src.endsWith('default.jpg'))) {
      img.src = DEFAULT_PHOTO;
      img.alt = "Default Project Image";
    }
    // Set default description if not present
    const desc = card.querySelector('.project-desc');
    if (desc && (!desc.textContent.trim())) {
      desc.textContent = DEFAULT_DESC;
    }
  });
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', setDefaultCards);

// Default Page Section (shows if no projects or cards exist)
function showDefaultPageIfEmpty() {
  const projectList = document.querySelector('.project-list');
  if (projectList && projectList.children.length === 0) {
    const defaultSection = document.createElement('section');
    defaultSection.className = 'default-page';
    defaultSection.innerHTML = `
      <div class="container" style="text-align:center; padding:60px 0;">
        <img src="${DEFAULT_PHOTO}" alt="Default" style="width:120px; border-radius:50%; margin-bottom:20px;">
        <h2>No Projects Found</h2>
        <p style="color:var(--color-secondary); max-width:400px; margin:0 auto;">
          There are currently no projects to display. Please check back later or add new projects to your portfolio.
        </p>
      </div>
    `;
    projectList.parentNode.insertBefore(defaultSection, projectList);
    projectList.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', showDefaultPageIfEmpty);