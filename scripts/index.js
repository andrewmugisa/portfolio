// ===== Tech rail: add or remove technologies here =====
// Put one SVG per technology in assets/tech/ (name them to match below).
// If an image is missing, the technology's name is shown instead.
const tech = [
  { name: "Java", icon: "assets/tech/java.png" },
  { name: "Spring Boot", icon: "assets/tech/spring.png" },
  { name: "JavaScript", icon: "assets/tech/javascript.png" },
  { name: "React", icon: "assets/tech/react.png" },
  { name: "PostgreSQL", icon: "assets/tech/postgresql.png" },
  { name: "Git", icon: "assets/tech/git.png" },
];

const track = document.getElementById("tech-track");

if (track) {
  // Render the list twice so the CSS animation can loop without a visible jump
  [...tech, ...tech].forEach((item, i) => {
    const isCopy = i >= tech.length;
    const li = document.createElement("li");
    li.className = "tech-item";
    if (isCopy) li.setAttribute("aria-hidden", "true");

    const img = document.createElement("img");
    img.src = item.icon;
    img.alt = isCopy ? "" : item.name;
    img.title = item.name;
    img.addEventListener("error", () => {
      li.textContent = item.name;
    });

    li.appendChild(img);
    track.appendChild(li);
  });
}
