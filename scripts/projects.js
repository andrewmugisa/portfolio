// ===== Project data: add new projects here =====
const projects = [
  {
    title: "Spring Authentication Library",
    brief:
      "A Spring Boot authentication library you can plug into any project.",
    scope:
      "A production-ready library with JWT authentication, token blacklisting, expiring email verification codes, stateless security and a clean layered architecture.",
    tech: ["Java", "Spring Boot", "Spring Security", "JWT"],
    image: "assets/logo.jpeg",
    alt: "Spring_auth preview",
    github: "https://github.com/andrewmugisa/Spring_auth",
    live: "",
    progress: 90,
  },
  {
    title: "WigoEvents",
    brief: "A concerts platform where people buy and sell tickets.",
    scope:
      "Full-stack platform with a Spring Boot REST API backed by PostgreSQL and a React frontend. Includes API documentation and a contribution guide. The repository is currently private (contribution by invite only), and a public repository and live site are coming soon.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "React", "REST API"],
    image: "assets/wigo-logo.svg",
    alt: "WigoEvents preview",
    github: "", // private for now; add the link when it goes public
    live: "",
    progress: 50,
  },
  {
    title: "password Generator Chrome Extension",
    brief: "A Chrome extension that generates strong passwords on demand.",
    scope:
      "Detects password fields on web pages and generates strong, random passwords with clipboard copy support. Nothing is stored, for privacy and security.",
    tech: ["JavaScript", "HTML", "CSS", "Chrome Extension"],
    image: "assets/password-Generator.png",
    alt: "password-generator preview",
    github: "https://github.com/andrewmugisa/password-generator",
    live: "https://andrewmugisa.github.io/password-generator/",
    progress: 90,
  },
  {
    title: "mikrotik setup Automation",
    brief: "A Java tool that makes MikroTik router setup easier.",
    scope:
      "Creates users and fetches live router data through the RouterOS API. The roadmap is router configuration automation, so beginners can set up a router with a few clicks. Contributors are welcome, so take a look at the roadmap.",
    tech: ["Java", "RouterOS API", "MikroTik"],
    image: "assets/logo.jpeg",
    alt: "mikrotik-automation01 preview",
    github: "https://github.com/andrewmugisa/mikrotik-automation01",
    live: "",
    progress: 35,
  },
];
// ===== Helpers =====
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeLink(label, href) {
  const a = el("a", "", label);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

// ===== Build one card =====
function createProjectCard(project, index) {
  const scopeId = `panel-scope-${index}`;
  const techId = `panel-tech-${index}`;

  const card = el("article", "project-card");

  // Image
  const imageBox = el("div", "project-image-container");
  const img = el("img", "project-image");
  img.src = project.image;
  img.alt = project.alt || `${project.title} preview`;
  imageBox.appendChild(img);

  // Content wrapper
  const content = el("div", "project-content");
  content.appendChild(el("h3", "project-title", project.title));
  content.appendChild(el("p", "project-brief", project.brief));

  // Tabs
  const tabs = el("div", "project-tabs");
  tabs.setAttribute("role", "tablist");

  const scopeTab = el("button", "", "Scope");
  scopeTab.setAttribute("role", "tab");
  scopeTab.id = `tab-scope-${index}`;
  scopeTab.setAttribute("aria-controls", scopeId);
  scopeTab.setAttribute("aria-selected", "true");

  const techTab = el("button", "", "Tech");
  techTab.setAttribute("role", "tab");
  techTab.id = `tab-tech-${index}`;
  techTab.setAttribute("aria-controls", techId);
  techTab.setAttribute("aria-selected", "false");
  techTab.tabIndex = -1;

  tabs.append(scopeTab, techTab);
  content.appendChild(tabs);

  // Scope panel
  const scopePanel = el("div", "project-panel project-scope");
  scopePanel.id = scopeId;
  scopePanel.setAttribute("role", "tabpanel");
  scopePanel.setAttribute("aria-labelledby", scopeTab.id);
  scopePanel.appendChild(el("p", "", project.scope));

  // Tech panel
  const techPanel = el("div", "project-panel project-tech");
  techPanel.id = techId;
  techPanel.setAttribute("role", "tabpanel");
  techPanel.setAttribute("aria-labelledby", techTab.id);
  techPanel.hidden = true;
  const list = el("ul");
  project.tech.forEach((item) => list.appendChild(el("li", "", item)));
  techPanel.appendChild(list);

  content.append(scopePanel, techPanel);

  // Tab switching (scoped to this card)
  [scopeTab, techTab].forEach((tab) => {
    tab.addEventListener("click", () => {
      [scopeTab, techTab].forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
      });
      scopePanel.hidden = tab !== scopeTab;
      techPanel.hidden = tab !== techTab;
    });
  });

  // Links (only render the ones that have a URL)
  const links = el("div", "project-links");
  if (project.github) links.appendChild(makeLink("GitHub", project.github));
  if (project.live) links.appendChild(makeLink("Live", project.live));
  if (links.children.length) content.appendChild(links);

  // Progress
  // Progress
  const progress = el("div", "project-progress");
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", `${project.title} progress`);
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  const percent = project.progress ?? 0;
  progress.setAttribute("aria-valuenow", percent);
  progress.dataset.label = `Progress: ${percent}%`;
  progress.tabIndex = 0; // lets keyboard and touch users see the tooltip
  const track = el("div", "progress-track");
  const bar = el("div", "progress-bar");
  bar.style.setProperty("--progress", `${percent}%`);
  track.appendChild(bar);
  progress.appendChild(track);
  content.appendChild(progress);

  card.append(imageBox, content);
  return card;
}

// ===== Render all =====
const container = document.getElementById("projects");
projects.forEach((project, index) => {
  container.appendChild(createProjectCard(project, index));
});
