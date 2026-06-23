/* =============================================================
   WEEK 6 ASSIGNMENT — "Interactive Portfolio"
   DOM & Events Starter File

   HOW TO USE THIS FILE:
   ✅  index.html and styles/main.css are ALREADY COMPLETE.
       Do not change the id attributes in index.html.

   🔨 PART A: Fill in your own projects array.
       Replace the sample entries with the projects you have built.

   🔨 PART B: Write the template function and render function.

   🔨 PART C: Write the filter function.

   🔨 PART D: Write the event listeners.

   The comments in each section explain exactly what each piece
   should do. Open the browser (F12 → Console) while working —
   console.log() is your best debugging tool.
   ============================================================= */


/* =============================================================
   PART A: YOUR PROJECTS DATA ✏️
   ─────────────────────────────────────────────────────────────
   Replace the sample projects below with YOUR actual projects.

   Each project object must have:
     title  — the project name (string)
     tech   — ONE OF: 'html'  |  'css'  |  'javascript'
     week   — the week number (number)
     desc   — a short description (string)
     link   — your GitHub Pages URL, or '#' as a placeholder

   Minimum 4 projects required. Use ONLY the tech values above —
   they must match exactly so the filter buttons work correctly.
   ============================================================= */
const projects = [
  {
    title: 'Portfolio v1',
    tech: 'html',
    week: 1,
    desc: 'Built and deployed my personal profile page using semantic HTML and version control. This is the structural foundation for the portfolio.',
    link: 'https://safashaikh16.github.io/hello-web/'
  },
  {
    title: 'Styled Profile Page',
    tech: 'css',
    week: 2,
    desc: 'Created an external stylesheet, applied a cohesive color palette, integrated Google Font, and added a polished hover transition on the Week 1 HTML Profile page to make a visual layer on top of it.',
    link: 'https://safashaikh16.github.io/hello-web/'
  },
  {
    title: 'Layout Dashboard',
    tech: 'css',
    week: 3,
    desc: 'Upgraded the styled profile page it with modern CSS layouts. Refactored the navigation using Flexbox, added a new Grid-based section, and created layouts that respond to screen size without any media queries',
    link: 'https://safashaikh16.github.io/hello-web/'
  },
  {
    title: 'Responsive Portfolio',
    tech: 'css',
    week: 4,
    desc: 'Made the portfolio page fully responsive using mobile-first design. Added the viewport meta tag, wrote media queries with min-width breakpoints, used clamp() for fluid typography, and ensured the layouts adapt beautifully from phone to desktop. ',
    link: 'https://safashaikh16.github.io/hello-web/'
  },
  {
    title: 'Interactive Quiz App',
    tech: 'javascript',
    week: 5,
    desc: 'Build a browser-based interactive quiz app using vanilla JavaScript.',
    link: 'https://safashaikh16.github.io/week5/'
  }
  // TIP: add more objects here as you build more projects!
];


/* =============================================================
   PART B: TEMPLATE FUNCTION + RENDER FUNCTION 🔨
   ─────────────────────────────────────────────────────────────

   Step 1 — Write projectCard(p):
   • Takes ONE project object (p)
   • Returns ONE HTML string using a template literal
   • Must include these classes (they are already styled in main.css):
       .week-badge   → shows "Week X"
       .card-title   → the project title
       .card-desc    → the short description
       .card-footer  → row at the bottom with tag + link
       .tech-tag + the tech name as a class  → e.g. class="tech-tag css"
       .card-link    → the "View Demo →" link
   • Add  data-tech="${p.tech}"  on the outer element so filtering works

   Step 2 — Write renderProjects(list):
   • Finds the #project-grid element
   • If list has items: sets innerHTML using list.map(projectCard).join('')
   • If list is empty: sets innerHTML to a friendly empty-state message
     (the .empty-state class is already styled for you in main.css)
   • Also updates #results-count with "Showing X of Y projects"
   ============================================================= */

// STEP 1 — template function
// Takes one project object → returns one card HTML string
const projectCard = (p) => `
 <article class="project-card" data-tech="${p.tech}">
    <span class="week-badge">Week ${p.week}</span>

    <h3 class="card-title">${p.title}</h3>

    <p class="card-desc">${p.desc}</p>

    <div class="card-footer">
      <span class="tech-tag ${p.tech}">${p.tech}</span>
      <a href="${p.link}" class="card-link" target="_blank">View Demo →</a>
    </div>
  </article>
`;


// STEP 2 — render function
// Takes any array of projects → updates the page
function renderProjects(list) {
 const projectGrid = document.getElementById('project-grid');
  const resultsCount = document.getElementById('results-count');

  if (list.length > 0) {
    projectGrid.innerHTML = list.map(projectCard).join('');
  } else {
    projectGrid.innerHTML = `
      <p class="empty-state">No projects found. Try another filter or search term.</p>
    `;
  }

  resultsCount.textContent = `Showing ${list.length} of ${projects.length} projects`;
}


/* =============================================================
   PART C: FILTER FUNCTION 🔨
   ─────────────────────────────────────────────────────────────
   Write getFilteredProjects():

   1. Read the active filter:
      const activeBtn  = document.querySelector('.filter-btn.active');
      const activeTech = activeBtn ? activeBtn.dataset.filter : 'all';

   2. Read the search term:
      const searchTerm = document.getElementById('search-input')
                           .value.toLowerCase().trim();

   3. Return a filtered copy of the projects array. Keep a project if:
      • matchesTech:   activeTech === 'all'  OR  p.tech === activeTech
      • matchesSearch: searchTerm is empty
                       OR p.title.toLowerCase() includes the term
                       OR p.desc.toLowerCase()  includes the term
      • Both conditions must be true (use &&)

   Tip: do NOT modify the original projects array — just return a
   new filtered array with projects.filter(p => ...)
   ============================================================= */

// STEP 3 — filter function
function getFilteredProjects() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeTech = activeBtn ? activeBtn.dataset.filter : 'all';

  const searchTerm = document
    .getElementById('search-input')
    .value
    .toLowerCase()
    .trim();

  return projects.filter((p) => {
    const matchesTech = activeTech === 'all' || p.tech === activeTech;

    const matchesSearch =
      searchTerm === '' ||
      p.title.toLowerCase().includes(searchTerm) ||
      p.desc.toLowerCase().includes(searchTerm);

    return matchesTech && matchesSearch;
  });
}


/* =============================================================
   PART D: EVENT LISTENERS 🔨
   ─────────────────────────────────────────────────────────────
   All your DOM code must go inside DOMContentLoaded so that the
   HTML elements exist before you try to select them.

   1. Initial render — call renderProjects(projects) so cards
      appear immediately when the page loads.

   2. Filter buttons — select all with document.querySelectorAll('.filter-btn')
      then loop with forEach and add a 'click' listener to each one:
        a. Remove 'active' from ALL buttons (forEach again)
        b. Add 'active' to btn (the clicked one)
        c. Call renderProjects(getFilteredProjects())

   3. Live search — add an 'input' listener to #search-input:
        Call renderProjects(getFilteredProjects()) every keystroke.

   4. Escape key — add a 'keydown' listener to #search-input:
        If (e.key === 'Escape') → clear the value, re-render.

   BONUS: Event delegation — add a single 'click' listener to
   #project-grid. Inside, use e.target.closest('.card-link') to
   detect when a "View Demo" link is clicked, and console.log
   the project title. This works even for cards added later!
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Show all projects on page load
  // TODO


  // 2. Filter buttons
  // TODO


  // 3. Live search
  // TODO


  // 4. Escape to clear
  // TODO


  // BONUS: Event delegation on the project grid
  // TODO

});
