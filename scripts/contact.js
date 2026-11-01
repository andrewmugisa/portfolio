// ===== Contact form validation =====
const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const RECIPIENT = "andr0395@algonquinlive.com";

// Rules for each field (min/max match the minlength/maxlength attributes in the HTML)
const rules = {
  name: { label: "Name" },
  email: { label: "Email address" },
  subject: { label: "Subject", min: 5, max: 100 },
  message: { label: "Message", min: 20, max: 500 },
};

// Returns an error message, or "" when the field is valid
function check(field) {
  const rule = rules[field.name];
  const value = field.value.trim();

  if (value === "") return `${rule.label} is required.`;
  if (rule.min && value.length < rule.min)
    return `${rule.label} must be at least ${rule.min} characters (currently ${value.length}).`;
  if (rule.max && value.length > rule.max)
    return `${rule.label} must be at most ${rule.max} characters.`;
  if (field.type === "email" && !field.checkValidity())
    return "Enter a valid email address, such as name@example.com.";
  return "";
}

function showError(field) {
  const message = check(field);
  document.getElementById(`${field.name}-error`).textContent = message;
  field.classList.toggle("invalid", message !== "");
  field.setAttribute("aria-invalid", message !== "");
  return message === "";
}

// Live character counters for the two long fields
["subject", "message"].forEach((id) => {
  const field = document.getElementById(id);
  const counter = document.getElementById(`${id}-count`);
  field.addEventListener("input", () => {
    counter.textContent = field.value.length;
  });
});

// Validate each field when the user leaves it
Object.keys(rules).forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("blur", (e) => showError(e.target));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  success.textContent = "";

  const fields = Object.keys(rules).map((id) => document.getElementById(id));
  const results = fields.map(showError); // run every check so all errors show at once

  if (results.every(Boolean)) {
    // No server: open the visitor's email app with the message filled in
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    success.textContent = `Opening your email app. If nothing opens, write to ${RECIPIENT} directly.`;
  } else {
    fields[results.indexOf(false)].focus();
  }
});
