// ===== Project data: add or edit projects here =====
// category must match a filter button's data-filter value in projects.html
// completed uses the format "YYYY-MM"

const projects = [
  // ===== ACTIVE / MAJOR PROJECTS =====
  {
    title: "WigoEvents",
    category: "java",
    completed: "2026-05",
    description:
      "A full-stack concerts platform where people buy and sell tickets, with a Spring Boot REST API, PostgreSQL and a React frontend. The repository is currently private.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "React", "Supabase"],
    image: "images/wigo-logo.svg",
    alt: "WigoEvents project preview",
    link: "https://github.com/andrewmugisa/WiGO-EVENTS",
  },
  {
    title: "mikrotik setup automation",
    category: "java",
    completed: "2026-04",
    description:
      "A Java tool that creates users and fetches live data from MikroTik routers through the RouterOS API. The roadmap is one-click router configuration for beginners.",
    tech: ["Java", "React", "tik4j API"],
    image: "images/mikrotik-logo.jpg",
    alt: "mikrotik-automation01 project preview",
    link: "https://github.com/andrewmugisa/mikrotik-automation01",
  },
  {
    title: "Spring Authentication Library",
    category: "java",
    completed: "2026-06",
    description:
      "A production-ready Spring Boot authentication library with JWT, token blacklisting and expiring email verification codes. Built to be plugged into any Spring project.",
    tech: ["Java", "Spring Boot", "Spring Security", "JWT"],
    image: "images/authentication.jpg",
    alt: "Spring_auth project preview",
    link: "https://github.com/andrewmugisa/Spring_auth",
  },

  // ===== COMPLETED PROJECTS =====
  {
    title: "To-Do List",
    category: "java",
    completed: "2026-02",
    description:
      "A task management application with a fully functional backend RESTful API. Provides the foundation for managing, creating, updating, and tracking tasks.",
    tech: ["Java", "Spring Boot", "REST API"],
    image: "images/to-do.jpg",
    alt: "To-Do List project preview",
    link: "",
  },
  {
    title: "Google Chrome password generator",
    category: "javascript",
    completed: "2026-03",
    description:
      "A Chrome extension that detects password fields and generates strong random passwords with clipboard copy. Nothing is stored, for privacy and security.",
    tech: ["JavaScript", "Chrome Extensions API"],
    image: "images/password-generator.jpg",
    alt: "password-generator project preview",
    link: "https://github.com/andrewmugisa/password-generator",
  },
  {
    title: "Personal portfolio",
    category: "html-css",
    completed: "2026-10",
    description:
      "This responsive four-page portfolio, built from scratch with semantic HTML, CSS Grid and Flexbox, and JavaScript for the project filter.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/profile.jpeg",
    alt: "Personal portfolio website preview",
    link: "",
  },

  // ===== SCHEDULED PROJECTS =====
  {
    title: "Mazda Remote starter",
    category: "Python",
    completed: "2027-03",
    description:
      "A remote starter project for a Mazda vehicle, involving hardware integration, embedded programming and a custom control system.",
    tech: ["C", "Python", "React"],
    image: "images/mazda-logo.jpg",
    alt: "Mazda Remote starter project preview",
    link: "",
  },

  // ===== BACKLOG / FUTURE PROJECTS =====
  {
    title: "Bank Statement Analyser",
    category: "fintech",
    completed: "",
    description:
      "A fintech and data analysis project designed to process and analyse bank statements, extract financial information, categorize transactions, and provide useful spending insights. Architectural design is complete.",
    tech: ["Python", "PostgreSQL", "Data Parsing"],
    image: "images/bank.jpg",
    alt: "Bank Statement Analyser project preview",
    link: "",
  },
  {
    title: "Traditional Telephone to Online Call Reception",
    category: "telecom",
    completed: "",
    description:
      "A telecommunications project exploring the integration of traditional telephone systems with online call reception using VoIP and SIP technologies. Currently in the concept phase.",
    tech: ["Python", "VoIP", "SIP", "Networking"],
    image: "images/voip.jpg",
    alt: "Telephone to online call reception project preview",
    link: "",
  },
  {
    title: "Autonomous Car with Obstacle Detection",
    category: "robotics",
    completed: "",
    description:
      "An autonomous robotics project focused on developing a vehicle capable of detecting obstacles and navigating its environment using sensors and embedded systems. Currently in the concept phase.",
    tech: ["C", "C++", "Python", "IoT", "Microcontrollers"],
    image: "images/car.jpg",
    alt: "Autonomous car project preview",
    link: "",
  },

  {
    title: "Tokenized Stock Trading Platform",
    category: "fintech",
    completed: "",
    description:
      "A fintech project focused on tokenized equities, exploring the intersection of traditional stock markets and blockchain technology. The platform aims to track tokenized stocks, analyse market movements, manage investment portfolios, and explore algorithmic trading strategies.",
    tech: [
      "Python",
      "JavaScript",
      "React",
      "PostgreSQL",
      "Blockchain",
      "Financial APIs",
    ],
    image: "images/tokenized-stocks.webp",
    alt: "Tokenized stock trading platform preview",
    link: "",
  },
];

// ===== Grab the elements we need =====
const container = document.getElementById("project-container");
const template = document.getElementById("project-template");
const status = document.getElementById("filter-status");

// "2026-02" -> "February 2026"
function formatDate(yearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });
}

// Find a placeholder inside a cloned card, e.g. field(card, "title")
function field(card, name) {
  return card.querySelector(`[data-field="${name}"]`);
}

// ===== Build the cards: clone the HTML template once per project and fill it in =====
projects.forEach((project) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector(".project-card");

  card.dataset.category = project.category;

  const image = field(clone, "image");
  image.src = project.image;
  image.alt = project.alt;

  field(clone, "title").textContent = project.title;
  field(clone, "description").textContent = project.description;

  const date = field(clone, "date");
  date.textContent = formatDate(project.completed);
  date.dateTime = project.completed;

  // Technologies: reuse the <li> from the template as the pattern for each chip
  const techList = field(clone, "tech");
  const chipPattern = techList.querySelector("li");
  techList.replaceChildren();
  project.tech.forEach((name) => {
    const chip = chipPattern.cloneNode(true);
    chip.textContent = name;
    techList.appendChild(chip);
  });

  // Link: hide it when the project has no public URL
  const link = field(clone, "link");
  if (project.link) {
    link.href = project.link;
    link.setAttribute("aria-label", `View ${project.title} on GitHub`);
  } else {
    link.remove();
  }

  container.appendChild(clone);
});

// ===== Filtering =====
const buttons = document.querySelectorAll(".filter-btn");
const cards = container.querySelectorAll(".project-card");

function applyFilter(filter) {
  let shown = 0;

  cards.forEach((card) => {
    const category = card.dataset.category?.toLowerCase();

    const match = filter === "all" || category === filter.toLowerCase();

    card.classList.toggle("is-hidden", !match);

    if (match) shown++;
  });

  status.textContent = `Showing ${shown} of ${cards.length} projects`;
}

// Filter button events
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    buttons.forEach((b) => {
      const active = b === button;

      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });

    // Apply selected filter
    applyFilter(button.dataset.filter);
  });
});

// Initial filter
applyFilter("all");

applyFilter("all");
