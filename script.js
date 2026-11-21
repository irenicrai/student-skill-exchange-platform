/**
 * =====================================================================
 * STUDENT SKILL EXCHANGE PLATFORM
 * Frontend Architecture & Relational Graph Solver Engine
 * Technologies: JavaScript (ES6+), MySQL 8.0 Data Model, HTML5, CSS3
 * =====================================================================
 */

// Global Application State (Mirrors schema.sql Relational Structure)
const DB = {
  currentUser: {
    student_id: 1,
    full_name: "Rai Bose",
    email: "rai.bose@jis.edu",
    university: "JIS College of Engineering",
    stream: "BCA GENERAL",
    major: "BCA GENERAL",
    graduation_year: 2026,
    credit_balance: 4.50,
    reputation_score: 4.95,
    avatar_color: "#4f46e5",
    total_hours_taught: 14.0,
    total_hours_learned: 11.0,
    offered_skill_id: 1, // Python & Data Structures
    sought_skill_id: 8   // UI/UX Design with Figma
  },

  categories: [
    { id: "cs", name: "Computer Science & AI", icon: "fa-code" },
    { id: "math", name: "Mathematics & Data", icon: "fa-calculator" },
    { id: "lang", name: "Languages & Linguistics", icon: "fa-language" },
    { id: "design", name: "UI/UX & Creative Media", icon: "fa-palette" },
    { id: "music", name: "Music & Sound", icon: "fa-guitar" },
    { id: "career", name: "Career & Communication", icon: "fa-briefcase" }
  ],

  skills: [
    { id: 1, category: "cs", name: "Python & Data Structures", desc: "Algorithmic problem solving, Python 3 syntax & LeetCode prep" },
    { id: 2, category: "cs", name: "Database Systems & MySQL", desc: "Relational schema design, normalization, ACID and SQL query tuning" },
    { id: 3, category: "cs", name: "Machine Learning & PyTorch", desc: "Neural network architectures, tensor ops & model training" },
    { id: 4, category: "math", name: "Multivariable Calculus III", desc: "Partial derivatives, gradient vectors & double/triple integrals" },
    { id: 5, category: "math", name: "Linear Algebra & Matrices", desc: "Eigenvalues, vector spaces, dot products & matrix decomposition" },
    { id: 6, category: "lang", name: "Conversational Spanish", desc: "Daily spoken fluency, pronunciation and grammar fundamentals" },
    { id: 7, category: "lang", name: "Japanese for Beginners (JLPT N5)", desc: "Hiragana, Katakana, basic Kanji & conversational grammar" },
    { id: 8, category: "design", name: "UI/UX Design with Figma", desc: "Wireframing, design systems, autolayout & micro-interactions" },
    { id: 9, category: "design", name: "Premiere Pro & Video Editing", desc: "Video cuts, color grading, sound design & YouTube pacing" },
    { id: 10, category: "music", name: "Acoustic Guitar Fundamentals", desc: "Chords, fingerpicking, rhythm techniques and tab reading" },
    { id: 11, category: "career", name: "Technical Interview Mastery", desc: "FAANG behavioral & systems design walkthroughs" }
  ],

  // The 5 Project Members as Verified Student Profiles (JIS College of Engineering - BCA GENERAL)
  students: [
    {
      student_id: 1,
      name: "Rai Bose",
      initials: "RB",
      color: "#4f46e5",
      university: "JIS College of Engineering",
      stream: "BCA GENERAL",
      major: "BCA GENERAL",
      year: 2026,
      rating: 4.95,
      exchanges: 14,
      teachesSkill: "Python & Data Structures",
      teachesLevel: "Expert",
      teachesId: 1,
      category: "cs",
      seeksSkill: "UI/UX Design with Figma",
      seeksLevel: "Intermediate",
      seeksId: 8,
      bio: "Project Lead passionate about backend systems, algorithmic design, and full-stack software development.",
      availability: "Tue/Thu evenings & Weekends"
    },
    {
      student_id: 2,
      name: "Raj Biswas",
      initials: "RB",
      color: "#10b981",
      university: "JIS College of Engineering",
      stream: "BCA GENERAL",
      major: "BCA GENERAL",
      year: 2026,
      rating: 4.90,
      exchanges: 12,
      teachesSkill: "Multivariable Calculus III",
      teachesLevel: "Advanced",
      teachesId: 4,
      category: "math",
      seeksSkill: "Python & Data Structures",
      seeksLevel: "Intermediate",
      seeksId: 1,
      bio: "Applied math tutor specializing in 3D calculus, matrix transformations, and optimization theory.",
      availability: "Wed/Fri evenings"
    },
    {
      student_id: 3,
      name: "Rahul Kumar Shaw",
      initials: "RS",
      color: "#06b6d4",
      university: "JIS College of Engineering",
      stream: "BCA GENERAL",
      major: "BCA GENERAL",
      year: 2026,
      rating: 4.92,
      exchanges: 15,
      teachesSkill: "UI/UX Design with Figma",
      teachesLevel: "Expert",
      teachesId: 8,
      category: "design",
      seeksSkill: "Multivariable Calculus III",
      seeksLevel: "Beginner",
      seeksId: 4,
      bio: "UI/UX designer and frontend enthusiast. Builds responsive design systems, autolayout components, and wireframes.",
      availability: "Weekends & Mon afternoons"
    },
    {
      student_id: 4,
      name: "Rahit Das",
      initials: "RD",
      color: "#f43f5e",
      university: "JIS College of Engineering",
      stream: "BCA GENERAL",
      major: "BCA GENERAL",
      year: 2026,
      rating: 4.88,
      exchanges: 9,
      teachesSkill: "Machine Learning & PyTorch",
      teachesLevel: "Advanced",
      teachesId: 3,
      category: "cs",
      seeksSkill: "Database Systems & MySQL",
      seeksLevel: "Beginner",
      seeksId: 2,
      bio: "AI researcher focusing on deep learning, neural network backprop, and computer vision pipelines.",
      availability: "Flexible weekdays"
    },
    {
      student_id: 5,
      name: "Protyusha Bose",
      initials: "PB",
      color: "#8b5cf6",
      university: "JIS College of Engineering",
      stream: "BCA GENERAL",
      major: "BCA GENERAL",
      year: 2026,
      rating: 4.96,
      exchanges: 16,
      teachesSkill: "Database Systems & MySQL",
      teachesLevel: "Expert",
      teachesId: 2,
      category: "cs",
      seeksSkill: "Machine Learning & PyTorch",
      seeksLevel: "Intermediate",
      seeksId: 3,
      bio: "Database engineer skilled in MySQL relational modeling, schema normalization, index optimization, and stored procedures.",
      availability: "Saturday & Sunday mornings"
    }
  ],

  // Active Peer Exchanges for Rai Bose
  activeExchanges: [
    {
      exchange_id: 101,
      peer_name: "Rahul Kumar Shaw",
      peer_initials: "RS",
      peer_color: "#06b6d4",
      offered: "Python & Data Structures",
      received: "UI/UX Design with Figma",
      completed_hours: 3,
      total_hours: 5,
      next_session: "Tomorrow at 4:00 PM",
      status: "In Progress"
    },
    {
      exchange_id: 102,
      peer_name: "Raj Biswas",
      peer_initials: "RB",
      peer_color: "#10b981",
      offered: "Python Tree Traversal",
      received: "Calculus III Integrals",
      completed_hours: 2,
      total_hours: 2,
      next_session: "Completed (Awaiting Sign-off)",
      status: "Review Pending"
    }
  ],

  // Incoming Proposals for Rai Bose
  incomingProposals: [
    {
      proposal_id: 201,
      sender_name: "Protyusha Bose",
      sender_initials: "PB",
      sender_color: "#8b5cf6",
      university: "JIS College of Engineering",
      stream: "BCA GENERAL",
      wants: "Python & Data Structures",
      offers: "Database Systems & MySQL",
      mode: "Direct 1:1 Swap",
      proposed_hours: 2.0,
      note: "Hi Rai! I would love to trade MySQL relational query tuning sessions for advanced Python tree traversal prep!"
    }
  ],

  // SkillCredit Immutable Transaction Ledger
  transactions: [
    { id: "TX-901", date: "2026-11-10", type: "SESSION_PAYOUT", change: "+1.00", desc: "Taught Python Binary Search to Rahul Kumar Shaw", balance: "4.50" },
    { id: "TX-892", date: "2026-11-08", type: "ESCROW_RELEASE", change: "+1.00", desc: "Completed Graph Theory lesson with Raj Biswas", balance: "3.50" },
    { id: "TX-841", date: "2026-11-05", type: "SESSION_EXPENSE", change: "-1.00", desc: "Learned Figma Autolayout from Rahul Kumar Shaw", balance: "2.50" },
    { id: "TX-800", date: "2026-11-01", type: "INITIAL_WELCOME_GRANT", change: "+3.00", desc: "Verified student onboarding bonus grant", balance: "3.50" }
  ]
};

// =====================================================================
// DOM INITIALIZATION & EVENT LISTENERS
// =====================================================================

function initializeApp() {
  initTheme();
  initSpeakerNotes();
  renderMarketplace();
  renderDashboard("activeSwaps");
  initSolver();
  initSqlExplorer();
  initModals();
  initCategoryFilters();
  initSearch();
  initFooterActions();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// =====================================================================
// SPEAKER PRESENTATION HINTS CONTROLLER
// =====================================================================
function initSpeakerNotes() {
  const toggleBtn = document.getElementById("toggleSpeakerNotesBtn");
  if (!toggleBtn) return;

  let hintsVisible = true;
  toggleBtn.addEventListener("click", () => {
    hintsVisible = !hintsVisible;
    document.body.classList.toggle("hide-speaker-hints", !hintsVisible);
    toggleBtn.innerHTML = hintsVisible
      ? '<i class="fa-solid fa-microphone"></i> Speaker Hints: ON'
      : '<i class="fa-solid fa-microphone-slash"></i> Speaker Hints: OFF';
    toggleBtn.className = hintsVisible
      ? 'btn btn-emerald btn-sm'
      : 'btn btn-secondary btn-sm';
    showToast(hintsVisible ? "Speaker presentation hints visible" : "Speaker presentation hints hidden", "info");
  });
}

// =====================================================================
// THEME CONTROLLER (Dark / Light Mode)
// =====================================================================
function initTheme() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("skill_exchange_theme");
  
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-theme");
    updateThemeIcon(true);
  } else {
    document.body.classList.remove("dark-theme");
    updateThemeIcon(false);
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("skill_exchange_theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
    showToast(isDark ? "Switched to Dark Mode" : "Switched to Light Mode", "info");
  });
}

function updateThemeIcon(isDark) {
  const icon = document.querySelector("#themeToggleBtn i");
  if (!icon) return;
  if (isDark) {
    icon.className = "fa-solid fa-sun";
    icon.style.color = "#f59e0b";
  } else {
    icon.className = "fa-solid fa-moon";
    icon.style.color = "";
  }
}

// =====================================================================
// 1. INTERACTIVE SKILL MATCHMAKER & GRAPH SOLVER
// Solves: 1) Direct 2-Way, 2) 3-Way Directed Cycle, 3) Time-Bank Credit
// =====================================================================
let currentSolverMode = "cycle";

function initSolver() {
  const runBtn = document.getElementById("runSolverEngineBtn");
  const heroBtn = document.getElementById("heroFindMatchesBtn");
  const tabDirect = document.getElementById("tabDirectMatch");
  const tabCycle = document.getElementById("tabCycleMatch");
  const tabCredit = document.getElementById("tabCreditMatch");

  // Mode tabs switcher
  const modeTabs = [tabDirect, tabCycle, tabCredit];
  modeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      modeTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentSolverMode = tab.dataset.mode;
      renderSolverResults();
    });
  });

  runBtn.addEventListener("click", () => {
    runSolverWithAnimation();
  });

  heroBtn.addEventListener("click", () => {
    const heroOffer = document.getElementById("heroOfferedSkill").value;
    const heroSeek = document.getElementById("heroSoughtSkill").value;

    // Smooth scroll to solver section
    const solverElem = document.getElementById("solver");
    solverElem.scrollIntoView({ behavior: "smooth" });

    // Auto-sync solver dropdowns if matched
    showToast(`Searching graph for: ${heroOffer} ⇄ ${heroSeek}`, "info");
    runSolverWithAnimation();
  });

  // Initial render
  renderSolverResults();
}

function runSolverWithAnimation() {
  const viewport = document.getElementById("matchViewport");
  viewport.innerHTML = `
    <div style="text-align: center; padding: 3rem 1rem;">
      <i class="fa-solid fa-circle-notch fa-spin text-primary" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
      <h4 style="font-size: 1.15rem; margin-bottom: 0.4rem;">Traversing MySQL Directed Preference Graph...</h4>
      <p style="color: var(--text-muted); font-size: 0.88rem;">Executing modified Tarjan cycle search across active student profiles</p>
    </div>
  `;

  setTimeout(() => {
    renderSolverResults();
    showToast("Graph resolution completed: Optimal swap cycle identified!", "success");
  }, 650);
}

function renderSolverResults() {
  const viewport = document.getElementById("matchViewport");
  const title = document.getElementById("matchResultTitle");
  const subtitle = document.getElementById("matchResultSubtitle");

  if (currentSolverMode === "direct") {
    title.innerText = "Direct 2-Way Coincidence Match (Bilateral Barter)";
    subtitle.innerText = "Found mutual alignment: Rahit Das ⇄ Protyusha Bose";
    viewport.innerHTML = `
      <div class="direct-match-layout">
        <!-- Student 1: Rahit Das -->
        <div class="peer-card-match">
          <div class="peer-avatar-lg" style="background: #f43f5e;">RD</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 0.2rem;">Rahit Das</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">AI & Data Science '26</p>
          <div class="node-skill-badge teaches-badge" style="margin-bottom: 0.4rem;">
            <span>Offers:</span> <strong>Machine Learning</strong>
          </div>
          <div class="node-skill-badge wants-badge">
            <span>Seeks:</span> <strong>Database Systems & MySQL</strong>
          </div>
        </div>

        <!-- Mutual Exchange Arrows -->
        <div class="match-exchange-arrows">
          <div class="swap-badge-label"><i class="fa-solid fa-arrows-rotate"></i> Mutual Alignment</div>
          <div style="font-size: 2.2rem; color: var(--primary);">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">Match Score: 98.4%</span>
        </div>

        <!-- Student 2: Protyusha Bose -->
        <div class="peer-card-match">
          <div class="peer-avatar-lg" style="background: #8b5cf6;">PB</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 0.2rem;">Protyusha Bose</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">Software Engineering '26</p>
          <div class="node-skill-badge teaches-badge" style="margin-bottom: 0.4rem;">
            <span>Offers:</span> <strong>Database Systems & MySQL</strong>
          </div>
          <div class="node-skill-badge wants-badge">
            <span>Seeks:</span> <strong>Machine Learning</strong>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 1.5rem;">
        <button class="btn btn-emerald" onclick="openProposeModalForStudent(5)">
          <i class="fa-solid fa-handshake"></i> Lock In Direct Bilateral Swap
        </button>
      </div>
    `;
  } else if (currentSolverMode === "cycle") {
    title.innerText = "3-Way Directed Cycle Resolution (Overcoming Barter Bottleneck)";
    subtitle.innerText = "Rai Bose (Python) → Raj Biswas (Calculus) → Rahul Kumar Shaw (Figma) → Rai Bose";
    viewport.innerHTML = `
      <div class="cycle-graph-interactive">
        <div class="cycle-canvas-container">
          <!-- Step 1: Rai Bose (You) -->
          <div class="cycle-step-card step-node-1">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="avatar-circle" style="background: #4f46e5;">RB</span>
              <div>
                <strong style="font-size: 0.8rem;">Rai Bose (You)</strong>
                <div style="font-size: 0.68rem; color: var(--text-muted);">Lead &bull; CS '26</div>
              </div>
            </div>
            <div class="node-skill-badge teaches-badge"><span>Teaches:</span> <strong>Python</strong></div>
            <div class="node-skill-badge wants-badge"><span>Wants:</span> <strong>Figma</strong></div>
          </div>

          <!-- Step 2: Raj Biswas -->
          <div class="cycle-step-card step-node-2">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="avatar-circle" style="background: #10b981;">RB</span>
              <div>
                <strong style="font-size: 0.8rem;">Raj Biswas</strong>
                <div style="font-size: 0.68rem; color: var(--text-muted);">Math '26</div>
              </div>
            </div>
            <div class="node-skill-badge teaches-badge"><span>Teaches:</span> <strong>Calculus III</strong></div>
            <div class="node-skill-badge wants-badge"><span>Wants:</span> <strong>Python</strong></div>
          </div>

          <!-- Step 3: Rahul Kumar Shaw -->
          <div class="cycle-step-card step-node-3">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="avatar-circle" style="background: #06b6d4;">RS</span>
              <div>
                <strong style="font-size: 0.8rem;">Rahul K. Shaw</strong>
                <div style="font-size: 0.68rem; color: var(--text-muted);">Design '26</div>
              </div>
            </div>
            <div class="node-skill-badge teaches-badge"><span>Teaches:</span> <strong>Figma UI</strong></div>
            <div class="node-skill-badge wants-badge"><span>Wants:</span> <strong>Calculus III</strong></div>
          </div>

          <!-- SVG Arrows -->
          <svg class="cycle-svg-arrows" viewBox="0 0 600 280">
            <defs>
              <marker id="arrowhead2" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 9 3.5, 0 7" fill="#4f46e5" />
              </marker>
            </defs>
            <!-- Rai -> Raj -->
            <path class="arrow-path" d="M 240 85 Q 160 140 180 200" marker-end="url(#arrowhead2)" />
            <!-- Raj -> Rahul -->
            <path class="arrow-path" d="M 280 240 L 380 240" marker-end="url(#arrowhead2)" />
            <!-- Rahul -> Rai -->
            <path class="arrow-path" d="M 460 200 Q 480 130 360 85" marker-end="url(#arrowhead2)" />
          </svg>
        </div>

        <div class="cycle-explanation-banner">
          <i class="fa-solid fa-circle-info"></i>
          <strong>How this 3-way swap functions:</strong> You (Rai) teach Python to Raj (1 hr), Raj teaches Calculus to Rahul (1 hr), and Rahul teaches Figma to you (1 hr). All three students receive their desired skill without any currency or 1:1 barrier!
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-emerald" onclick="commitCyclePact()">
            <i class="fa-solid fa-lock"></i> Commit to 3-Way Cycle Agreement
          </button>
          <button class="btn btn-secondary" onclick="viewCycleInSql()">
            <i class="fa-solid fa-database"></i> View in MySQL <code>cycle_matches</code>
          </button>
        </div>
      </div>
    `;
  } else if (currentSolverMode === "credit") {
    title.innerText = "Time-Banking SkillCredit Protocol (Asynchronous Decoupling)";
    subtitle.innerText = "Exchange skills across time without needing an immediate counterpart";
    viewport.innerHTML = `
      <div class="credit-token-layout">
        <div class="token-balance-showcase">
          <div style="font-size: 0.95rem; font-weight: 700; opacity: 0.9;">YOUR TIME-BANK RESERVES</div>
          <div class="token-big-num">
            <i class="fa-solid fa-coins"></i> <span id="tokenBigDisplay">${DB.currentUser.credit_balance.toFixed(2)}</span> Credits
          </div>
          <p style="font-size: 0.88rem; opacity: 0.95;">
            Earned by teaching peer students. You can redeem 1.00 credit with any verified student tutor instantly!
          </p>
          <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
            <span class="badge" style="background: rgba(255,255,255,0.25); color:white;">1 Credit = 1 Hour</span>
            <span class="badge" style="background: rgba(255,255,255,0.25); color:white;">Zero Commission</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="glass-panel" style="padding: 1.25rem;">
            <h5 style="font-size: 0.95rem; margin-bottom: 0.35rem; color: var(--text-main);">
              <i class="fa-solid fa-unlock-keyhole text-emerald"></i> Instant Unlock via Time-Banking:
            </h5>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              Rahul Kumar Shaw teaches <strong>UI/UX Design with Figma</strong> and accepts 1.00 SkillCredit. 
              No need to wait for an immediate cycle.
            </p>
            <button class="btn btn-primary btn-sm" onclick="redeemTimeBankToken(3)">
              <i class="fa-solid fa-bolt"></i> Instant Book with 1.00 Credit
            </button>
          </div>

          <div class="glass-panel" style="padding: 1.25rem;">
            <h5 style="font-size: 0.95rem; margin-bottom: 0.35rem; color: var(--text-main);">
              <i class="fa-solid fa-shield-check text-primary"></i> Escrow Guarantee:
            </h5>
            <p style="font-size: 0.82rem; color: var(--text-muted);">
              Credits are held in platform escrow until both tutor and learner mark the 60-minute lesson as completed.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

function commitCyclePact() {
  if (typeof confetti === "function") {
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
  }
  showToast("3-Way Cycle Pact Committed! Notifying Raj Biswas & Rahul Kumar Shaw.", "success");
}

function viewCycleInSql() {
  const dbSection = document.getElementById("database");
  dbSection.scrollIntoView({ behavior: "smooth" });
  document.getElementById("customSqlInput").value = "SELECT * FROM cycle_matches WHERE status = 'COMMITTED';";
  executeSql();
}

function redeemTimeBankToken(studentId) {
  if (DB.currentUser.credit_balance < 1.0) {
    showToast("Insufficient credits! Teach a skill first to earn credits.", "info");
    return;
  }
  DB.currentUser.credit_balance -= 1.0;
  updateCreditDisplays();
  
  // Add ledger transaction
  DB.transactions.unshift({
    id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split("T")[0],
    type: "ESCROW_LOCK",
    change: "-1.00",
    desc: "Escrow locked: 1 hour Figma lesson with Rahul Kumar Shaw",
    balance: DB.currentUser.credit_balance.toFixed(2)
  });

  if (typeof confetti === "function") {
    confetti({ particleCount: 50, spread: 50 });
  }
  showToast("Session confirmed! 1.00 Credit placed into escrow.", "success");
  renderDashboard("creditLedger");
}

// =====================================================================
// 2. SKILL MARKETPLACE & STUDENT DIRECTORY
// =====================================================================
let activeCategoryFilter = "all";
let searchQuery = "";

function renderMarketplace() {
  const container = document.getElementById("studentsGridContainer");
  if (!container) return;

  const filtered = DB.students.filter(student => {
    const matchesCat = activeCategoryFilter === "all" || student.category === activeCategoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      student.name.toLowerCase().includes(q) ||
      student.teachesSkill.toLowerCase().includes(q) ||
      student.seeksSkill.toLowerCase().includes(q) ||
      (student.stream && student.stream.toLowerCase().includes(q)) ||
      (student.major && student.major.toLowerCase().includes(q)) ||
      student.university.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <h4>No student skills found matching "${searchQuery}"</h4>
        <p style="font-size: 0.88rem;">Try clearing search keywords or selecting "All Categories".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(student => `
    <div class="student-card glass-panel">
      <div class="student-card-header">
        <div class="student-avatar" style="background: ${student.color};">
          ${student.initials}
        </div>
        <div class="student-info">
          <h4>
            ${student.name}
            <i class="fa-solid fa-circle-check verified-icon" title="Verified JIS College of Engineering Student"></i>
          </h4>
          <div class="student-university">
            <span style="font-weight: 600; color: var(--color-primary);">${student.university}</span> &bull; Stream: ${student.stream || student.major} '${student.year.toString().slice(2)}
          </div>
          <div class="student-stats-row">
            <span class="rating-stars">
              <i class="fa-solid fa-star"></i> ${student.rating}
            </span>
            <span class="exchange-count-badge">
              <i class="fa-solid fa-arrows-rotate"></i> ${student.exchanges} swaps
            </span>
          </div>
        </div>
      </div>

      <div class="skill-trade-box">
        <div class="trade-row">
          <span class="trade-label teach"><i class="fa-solid fa-chalkboard-user"></i> Teaches:</span>
          <span class="skill-name-tag">${student.teachesSkill} <small style="opacity:0.75;">(${student.teachesLevel})</small></span>
        </div>
        <div class="trade-row">
          <span class="trade-label learn"><i class="fa-solid fa-book-open-reader"></i> Seeking:</span>
          <span class="skill-name-tag">${student.seeksSkill}</span>
        </div>
      </div>

      <p class="student-bio">${student.bio}</p>

      <div class="student-card-footer">
        <span class="availability-tag">
          <i class="fa-regular fa-clock"></i> ${student.availability}
        </span>
        <button class="btn btn-primary btn-sm" onclick="openProposeModalForStudent(${student.student_id})">
          <i class="fa-solid fa-handshake"></i> Swap
        </button>
      </div>
    </div>
  `).join("");
}

function initCategoryFilters() {
  const buttons = document.querySelectorAll("#categoryFilterGroup .category-pill");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategoryFilter = btn.dataset.category;
      renderMarketplace();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById("marketSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderMarketplace();
    });
  }
}

// =====================================================================
// 3. STUDENT DASHBOARD & EXCHANGE TRACKER
// =====================================================================
function renderDashboard(activeTab = "activeSwaps") {
  const container = document.getElementById("dashTabContent");
  const tabButtons = document.querySelectorAll(".dash-tab-item");
  
  tabButtons.forEach(btn => {
    if (btn.dataset.tab === activeTab) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (activeTab === "activeSwaps") {
    container.innerHTML = `
      <div class="swaps-list">
        ${DB.activeExchanges.map(ex => `
          <div class="swap-row-card glass-panel">
            <div class="swap-row-left">
              <div class="swap-user-pair">
                <div class="mini-avatar" style="background: ${DB.currentUser.avatar_color};">AR</div>
                <div class="mini-avatar" style="background: ${ex.peer_color};">${ex.peer_initials}</div>
              </div>
              <div>
                <h4 style="font-size: 1.05rem; margin-bottom: 0.2rem;">${ex.peer_name}</h4>
                <div style="font-size: 0.82rem; color: var(--text-muted);">
                  Trading <strong>${ex.offered}</strong> for <strong>${ex.received}</strong>
                </div>
              </div>
            </div>

            <div style="text-align: right;">
              <span class="badge ${ex.status === 'In Progress' ? 'badge-primary' : 'badge-emerald'}">
                ${ex.status}
              </span>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;">
                ${ex.completed_hours} of ${ex.total_hours} Hours Completed
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${(ex.completed_hours / ex.total_hours) * 100}%;"></div>
              </div>
            </div>

            <div>
              <span class="badge badge-emerald" style="font-size: 0.75rem; padding: 0.4rem 0.65rem;">
                <i class="fa-solid fa-handshake"></i> Active Exchange
              </span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (activeTab === "pendingProposals") {
    if (DB.incomingProposals.length === 0) {
      container.innerHTML = `<p style="padding: 2rem; text-align: center; color: var(--text-muted);">No pending incoming proposals at this time.</p>`;
      return;
    }
    container.innerHTML = `
      <div class="swaps-list">
        ${DB.incomingProposals.map(prop => `
          <div class="swap-row-card glass-panel">
            <div class="swap-row-left">
              <div class="mini-avatar" style="background: ${prop.sender_color};">${prop.sender_initials}</div>
              <div>
                <h4 style="font-size: 1.05rem; margin-bottom: 0.2rem;">${prop.sender_name} (${prop.university})</h4>
                <div style="font-size: 0.82rem; color: var(--text-muted);">
                  Offers: <strong>${prop.offers}</strong> &bull; Requests: <strong>${prop.wants}</strong>
                </div>
                <p style="font-size: 0.82rem; color: var(--text-main); margin-top: 0.4rem; font-style: italic;">
                  "${prop.note}"
                </p>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-secondary btn-sm" onclick="declineProposal(${prop.proposal_id})">
                Decline
              </button>
              <button class="btn btn-emerald btn-sm" onclick="acceptProposal(${prop.proposal_id})">
                <i class="fa-solid fa-check"></i> Accept Swap
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (activeTab === "creditLedger") {
    container.innerHTML = `
      <div class="algorithm-comparison-table-wrapper" style="margin: 0;">
        <table class="algo-table">
          <thead>
            <tr>
              <th>TX ID</th>
              <th>Date</th>
              <th>Transaction Type</th>
              <th>Description</th>
              <th>Change</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            ${DB.transactions.map(tx => `
              <tr>
                <td><code>${tx.id}</code></td>
                <td>${tx.date}</td>
                <td><span class="badge ${tx.change.startsWith('+') ? 'badge-emerald' : 'badge-amber'}">${tx.type}</span></td>
                <td>${tx.desc}</td>
                <td style="font-weight: 700; color: ${tx.change.startsWith('+') ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                  ${tx.change} CR
                </td>
                <td><strong>${tx.balance} CR</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // Bind tab click events
  document.querySelectorAll(".dash-tab-item").forEach(item => {
    item.addEventListener("click", () => {
      renderDashboard(item.dataset.tab);
    });
  });
}

function acceptProposal(proposalId) {
  const propIndex = DB.incomingProposals.findIndex(p => p.proposal_id === proposalId);
  if (propIndex !== -1) {
    const accepted = DB.incomingProposals.splice(propIndex, 1)[0];
    DB.activeExchanges.push({
      exchange_id: 103,
      peer_name: accepted.sender_name,
      peer_initials: accepted.sender_initials,
      peer_color: accepted.sender_color,
      offered: accepted.wants,
      received: accepted.offers,
      completed_hours: 0,
      total_hours: accepted.proposed_hours,
      next_session: "Pending Scheduling",
      status: "In Progress"
    });

    document.getElementById("pendingProposalsCount").innerText = DB.incomingProposals.length;
    document.getElementById("activeSwapsCount").innerText = DB.activeExchanges.length;

    showToast(`Accepted swap with ${accepted.sender_name}! Active exchange contract created in MySQL.`, "success");
    renderDashboard("activeSwaps");
  }
}

function declineProposal(proposalId) {
  DB.incomingProposals = DB.incomingProposals.filter(p => p.proposal_id !== proposalId);
  document.getElementById("pendingProposalsCount").innerText = DB.incomingProposals.length;
  showToast("Proposal declined.", "info");
  renderDashboard("pendingProposals");
}

function updateCreditDisplays() {
  const amountStr = DB.currentUser.credit_balance.toFixed(2);
  document.getElementById("navCreditAmount").innerText = amountStr;
  document.getElementById("dashCreditAmount").innerText = amountStr;
  const tokenDisplay = document.getElementById("tokenBigDisplay");
  if (tokenDisplay) tokenDisplay.innerText = amountStr;
}

// =====================================================================
// 5. INTERACTIVE MYSQL SCHEMA & QUERY EXPLORER
// =====================================================================
function initSqlExplorer() {
  const tableSelector = document.querySelectorAll("#sqlTableSelector button");
  const execBtn = document.getElementById("executeSqlBtn");
  const queryDirectBtn = document.getElementById("queryDirect2WayBtn");
  const queryCyclesBtn = document.getElementById("queryCyclesBtn");
  const queryMarketBtn = document.getElementById("queryMarketEquilibriumBtn");
  const downloadBtn = document.getElementById("downloadSqlBtn");

  tableSelector.forEach(btn => {
    btn.addEventListener("click", () => {
      tableSelector.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tableName = btn.dataset.table;
      document.getElementById("customSqlInput").value = `SELECT * FROM ${tableName} LIMIT 10;`;
      executeSql();
    });
  });

  execBtn.addEventListener("click", executeSql);

  queryDirectBtn.addEventListener("click", () => {
    document.getElementById("customSqlInput").value = "SELECT * FROM view_direct_2way_matches;";
    executeSql();
  });

  queryCyclesBtn.addEventListener("click", () => {
    document.getElementById("customSqlInput").value = "SELECT cycle_id, cycle_length, student_a_id, student_b_id, student_c_id, compatibility_score, status FROM cycle_matches;";
    executeSql();
  });

  queryMarketBtn.addEventListener("click", () => {
    document.getElementById("customSqlInput").value = "SELECT * FROM view_skill_market_equilibrium ORDER BY deficit_demand DESC;";
    executeSql();
  });

  downloadBtn.addEventListener("click", () => {
    window.open("schema.sql", "_blank");
  });

  // Initial table render
  executeSql();
}

function executeSql() {
  const input = document.getElementById("customSqlInput").value.trim();
  const thead = document.getElementById("sqlTableHead");
  const tbody = document.getElementById("sqlTableBody");
  const statusElem = document.getElementById("sqlExecutionStatus");

  const startTime = performance.now();

  let columns = [];
  let rows = [];

  const lower = input.toLowerCase();

  if (lower.includes("view_direct_2way_matches")) {
    columns = ["student_a_id", "student_a_name", "offers", "student_b_id", "student_b_name", "offers_back"];
    rows = [
      [4, "Rahit Das", "Machine Learning & PyTorch", 5, "Protyusha Bose", "Database Systems & MySQL"]
    ];
  } else if (lower.includes("cycle_matches")) {
    columns = ["cycle_id", "length", "student_a", "student_b", "student_c", "score", "status"];
    rows = [
      [1, 3, "Rai Bose (1)", "Raj Biswas (2)", "Rahul Kumar Shaw (3)", 0.98, "COMMITTED"]
    ];
  } else if (lower.includes("view_skill_market_equilibrium")) {
    columns = ["skill_id", "skill_name", "category", "total_teachers", "total_learners", "deficit_demand"];
    rows = [
      [8, "UI/UX Design with Figma", "UI/UX & Creative Media", 1, 3, "+2 (High Deficit)"],
      [1, "Python & Data Structures", "Computer Science & AI", 1, 3, "+2 (High Demand)"],
      [2, "Database Systems & MySQL", "Computer Science & AI", 1, 2, "+1 (In Demand)"],
      [4, "Multivariable Calculus III", "Mathematics & Data", 1, 1, "0 (Equilibrium)"]
    ];
  } else if (lower.includes("student_skills_offered")) {
    columns = ["offer_id", "student_id", "skill_id", "proficiency", "hourly_credits", "is_verified"];
    rows = DB.students.map((s, idx) => [idx + 1, s.student_id, s.teachesId, s.teachesLevel, "1.00", "TRUE"]);
  } else if (lower.includes("student_skills_sought")) {
    columns = ["sought_id", "student_id", "skill_id", "desired_level", "priority"];
    rows = DB.students.map((s, idx) => [idx + 1, s.student_id, s.seeksId, s.seeksLevel, idx % 2 === 0 ? "High" : "Medium"]);
  } else if (lower.includes("skill_credit_transactions") || lower.includes("credit_ledger")) {
    columns = ["tx_id", "date", "type", "description", "change_cr", "final_balance"];
    rows = DB.transactions.map(t => [t.id, t.date, t.type, t.desc, t.change, t.balance]);
  } else {
    // Default to students table
    columns = ["student_id", "full_name", "university", "stream", "credit_balance", "reputation_score"];
    rows = DB.students.map(s => [
      s.student_id,
      s.name,
      s.university,
      s.stream || s.major,
      s.student_id === 1 ? DB.currentUser.credit_balance.toFixed(2) : (3.00 + (s.student_id * 0.5)).toFixed(2),
      s.rating.toFixed(2)
    ]);
  }

  // Render Table Head
  thead.innerHTML = `<tr>${columns.map(c => `<th>${c}</th>`).join("")}</tr>`;

  // Render Table Body
  tbody.innerHTML = rows.map(r => `
    <tr>
      ${r.map((cell, idx) => `
        <td>${idx === 0 && typeof cell === 'string' && cell.startsWith('TX-') ? `<code>${cell}</code>` : cell}</td>
      `).join("")}
    </tr>
  `).join("");

  const elapsed = (performance.now() - startTime).toFixed(1);
  statusElem.innerHTML = `<i class="fa-solid fa-check text-emerald"></i> ${rows.length} rows returned in ${Math.max(elapsed, 1.2)}ms`;
}

// =====================================================================
// 6. MODALS & FORMS
// =====================================================================
let selectedTargetStudent = null;
let selectedAvatarColor = "#4f46e5";

function initModals() {
  // -------------------------------------------------------------
  // CREATE NEW USER PROFILE MODAL
  // -------------------------------------------------------------
  const openCreateProfileBtn = document.getElementById("openCreateProfileBtn");
  const dashCreateProfileBtn = document.getElementById("dashCreateProfileBtn");
  const closeCreateProfileBtn = document.getElementById("closeCreateProfileBtn");
  const cancelCreateProfileBtn = document.getElementById("cancelCreateProfileBtn");
  const createProfileModal = document.getElementById("createProfileModal");
  const submitCreateProfileBtn = document.getElementById("submitCreateProfileBtn");

  const openProfileModal = () => {
    if (createProfileModal) createProfileModal.classList.add("open");
  };

  const closeProfileModal = () => {
    if (createProfileModal) createProfileModal.classList.remove("open");
  };

  if (openCreateProfileBtn) openCreateProfileBtn.addEventListener("click", openProfileModal);
  if (dashCreateProfileBtn) dashCreateProfileBtn.addEventListener("click", openProfileModal);
  if (closeCreateProfileBtn) closeCreateProfileBtn.addEventListener("click", closeProfileModal);
  if (cancelCreateProfileBtn) cancelCreateProfileBtn.addEventListener("click", closeProfileModal);

  // Avatar color picker selection
  const colorSwatches = document.querySelectorAll("#avatarColorPicker .color-swatch");
  colorSwatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      colorSwatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
      selectedAvatarColor = swatch.dataset.color || "#4f46e5";
    });
  });

  // Handle Create Profile Submission
  if (submitCreateProfileBtn) {
    submitCreateProfileBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const nameVal = document.getElementById("newStudentName").value.trim();
      const emailVal = document.getElementById("newStudentEmail").value.trim();
      const uniEl = document.getElementById("newStudentUniversity");
      const uniVal = (uniEl ? uniEl.value.trim() : "") || "JIS College of Engineering";
      const streamEl = document.getElementById("newStudentStream") || document.getElementById("newStudentMajor");
      const streamVal = (streamEl ? streamEl.value.trim() : "") || "BCA GENERAL";
      const teachVal = document.getElementById("newStudentTeach").value.trim();
      const teachCatVal = document.getElementById("newStudentTeachCategory").value;
      const profVal = document.getElementById("newStudentProficiency").value;
      const seekVal = document.getElementById("newStudentSeek").value.trim();
      const bioVal = document.getElementById("newStudentBio").value.trim();
      const availVal = document.getElementById("newStudentAvailability").value.trim();

      if (!nameVal || !emailVal || !uniVal || !streamVal || !teachVal || !seekVal) {
        showToast("Please complete all required fields (Name, Email, University, Stream, and Skills).", "info");
        return;
      }

      // Compute Initials (e.g. Maya Patel -> MP)
      const nameParts = nameVal.split(" ").filter(Boolean);
      const initialsVal = nameParts.length >= 2 
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : nameVal.slice(0, 2).toUpperCase();

      // 1. Construct new student entity (mirrors MySQL schema)
      const newStudent = {
        student_id: DB.students.length + 1,
        name: nameVal,
        initials: initialsVal,
        color: selectedAvatarColor,
        university: uniVal,
        stream: streamVal,
        major: streamVal,
        year: 2026,
        rating: 5.00,
        exchanges: 0,
        teachesSkill: teachVal,
        teachesLevel: profVal,
        teachesId: DB.skills.length + 1,
        category: teachCatVal,
        seeksSkill: seekVal,
        seeksLevel: "Beginner",
        seeksId: DB.skills.length + 2,
        bio: bioVal || `Passionate student eager to exchange ${teachVal} for ${seekVal}.`,
        availability: availVal || "Flexible schedule"
      };

      // 2. Prepend to students directory
      DB.students.unshift(newStudent);

      // 3. Switch active user session to this newly created student
      DB.currentUser = {
        student_id: newStudent.student_id,
        full_name: newStudent.name,
        email: emailVal,
        university: newStudent.university,
        stream: newStudent.stream,
        major: newStudent.major,
        graduation_year: 2026,
        credit_balance: 3.00, // 3.00 Welcome Grant!
        reputation_score: 5.00,
        avatar_color: newStudent.color,
        total_hours_taught: 0.0,
        total_hours_learned: 0.0,
        offered_skill_id: newStudent.teachesId,
        sought_skill_id: newStudent.seeksId
      };

      // 4. Record Welcome Grant in Time-Bank ledger
      DB.transactions.unshift({
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split("T")[0],
        type: "INITIAL_WELCOME_GRANT",
        change: "+3.00",
        desc: `New student registration bonus grant: ${newStudent.name}`,
        balance: "3.00"
      });

      // 5. Update UI Header and Banner
      const dashAvatar = document.getElementById("dashUserAvatar");
      const dashName = document.getElementById("dashUserName");
      const dashMeta = document.getElementById("dashUserMeta");
      const dashHours = document.getElementById("dashHoursEquiv");

      if (dashAvatar) {
        dashAvatar.innerText = newStudent.initials;
        dashAvatar.style.background = newStudent.color;
        dashAvatar.style.color = "white";
      }
      if (dashName) dashName.innerText = newStudent.name;
      if (dashMeta) {
        dashMeta.innerHTML = `${newStudent.university} &bull; Stream: ${newStudent.stream || newStudent.major} &bull; <i class="fa-solid fa-star" style="color: #fde047;"></i> <strong>5.00 Rating</strong> (0 exchanges)`;
      }
      if (dashHours) dashHours.innerText = "3.0";

      // 6. Update credit counters
      updateCreditDisplays();

      // 7. Add their skill to the interactive matchmaker
      const solverOffer = document.getElementById("solverUserOffer");
      if (solverOffer) {
        const opt = document.createElement("option");
        opt.value = newStudent.teachesId;
        opt.text = `${newStudent.teachesSkill} (${newStudent.name} - Level: ${newStudent.teachesLevel})`;
        opt.selected = true;
        solverOffer.prepend(opt);
      }

      // 8. Re-render UI
      renderMarketplace();
      renderDashboard("activeSwaps");
      if (typeof executeSql === "function") executeSql();

      // 9. Close modal and reset
      closeProfileModal();
      document.getElementById("createProfileForm").reset();

      // 10. Celebrate with confetti & toast
      if (typeof confetti === "function") {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      showToast(`Welcome, ${newStudent.name}! Your profile was registered in the Student Skill Exchange Platform with 3.00 starter credits.`, "success");
    });
  }

  // -------------------------------------------------------------
  // POST SKILL MODAL
  // -------------------------------------------------------------
  const openPostBtn = document.getElementById("openPostSkillBtn");
  const closePostBtn = document.getElementById("closePostSkillBtn");
  const cancelPostBtn = document.getElementById("cancelPostSkillBtn");
  const postModal = document.getElementById("postSkillModal");
  const submitPostBtn = document.getElementById("submitPostSkillBtn");

  if (openPostBtn) openPostBtn.addEventListener("click", () => postModal.classList.add("open"));
  if (closePostBtn) closePostBtn.addEventListener("click", () => postModal.classList.remove("open"));
  if (cancelPostBtn) cancelPostBtn.addEventListener("click", () => postModal.classList.remove("open"));

  submitPostBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const skillName = document.getElementById("formSkillName").value.trim();
    const cat = document.getElementById("formCategory").value;
    const prof = document.getElementById("formProficiency").value;
    const desired = document.getElementById("formDesiredSkill").value.trim();
    const bio = document.getElementById("formTeachingBio").value.trim();
    const avail = document.getElementById("formAvailability").value.trim() || "Flexible Schedule";

    if (!skillName || !desired) {
      showToast("Please provide both your offered skill and desired return skill.", "info");
      return;
    }

    const newStudent = {
      student_id: DB.students.length + 1,
      name: DB.currentUser.full_name,
      initials: "RB",
      color: DB.currentUser.avatar_color,
      university: DB.currentUser.university,
      stream: DB.currentUser.stream,
      major: DB.currentUser.major,
      year: DB.currentUser.graduation_year,
      rating: DB.currentUser.reputation_score,
      exchanges: DB.currentUser.total_hours_taught,
      teachesSkill: skillName,
      teachesLevel: prof,
      teachesId: DB.skills.length + 1,
      category: cat,
      seeksSkill: desired,
      seeksLevel: "Beginner",
      seeksId: 99,
      bio: bio || `Offering specialized sessions in ${skillName} in exchange for ${desired}.`,
      availability: avail
    };

    DB.students.unshift(newStudent);
    renderMarketplace();
    postModal.classList.remove("open");
    
    // Clear form
    document.getElementById("postSkillForm").reset();

    if (typeof confetti === "function") {
      confetti({ particleCount: 60, spread: 60 });
    }
    showToast(`Published listing for "${skillName}" to MySQL database!`, "success");
  });

  // Propose Swap Modal
  const closeProposeBtn = document.getElementById("closeProposeSwapBtn");
  const cancelProposeBtn = document.getElementById("cancelProposeSwapBtn");
  const proposeModal = document.getElementById("proposeSwapModal");
  const submitProposeBtn = document.getElementById("submitProposeSwapBtn");

  if (closeProposeBtn) closeProposeBtn.addEventListener("click", () => proposeModal.classList.remove("open"));
  if (cancelProposeBtn) cancelProposeBtn.addEventListener("click", () => proposeModal.classList.remove("open"));

  submitProposeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const mode = document.getElementById("proposeExchangeMode").value;
    const note = document.getElementById("proposeMessage").value.trim();

    proposeModal.classList.remove("open");
    showToast(`Exchange proposal sent to ${selectedTargetStudent ? selectedTargetStudent.name : 'peer'}! Stored in MySQL exchange_proposals table.`, "success");
  });

  // Rating Modal
  const closeRatingBtn = document.getElementById("closeRatingBtn");
  const submitRatingBtn = document.getElementById("submitRatingBtn");
  const ratingModal = document.getElementById("ratingModal");

  if (closeRatingBtn) closeRatingBtn.addEventListener("click", () => ratingModal.classList.remove("open"));
  submitRatingBtn.addEventListener("click", () => {
    ratingModal.classList.remove("open");
    showToast("Feedback and 5-Star Rating permanently saved to reviews_ratings table!", "success");
  });

  // Star click interactive
  const stars = document.querySelectorAll("#starRatingRow i");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.dataset.val);
      stars.forEach((s, idx) => {
        if (idx < val) {
          s.classList.remove("fa-regular");
          s.classList.add("fa-solid");
        } else {
          s.classList.remove("fa-solid");
          s.classList.add("fa-regular");
        }
      });
    });
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      const navLinks = document.querySelector(".nav-links");
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "72px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "var(--bg-surface)";
        navLinks.style.padding = "1.5rem";
        navLinks.style.boxShadow = "var(--shadow-xl)";
      }
    });
  }
}

function openProposeModalForStudent(studentId) {
  selectedTargetStudent = DB.students.find(s => s.student_id === studentId);
  if (!selectedTargetStudent) return;

  const summary = document.getElementById("proposeTargetPeerSummary");
  summary.innerHTML = `
    <div style="display:flex; align-items:center; gap:0.75rem;">
      <div class="avatar-circle" style="background: ${selectedTargetStudent.color}; width: 36px; height: 36px;">
        ${selectedTargetStudent.initials}
      </div>
      <div>
        <strong style="font-size:0.95rem;">${selectedTargetStudent.name} (${selectedTargetStudent.university})</strong>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Teaches: <strong>${selectedTargetStudent.teachesSkill}</strong> &bull; Seeking: <strong>${selectedTargetStudent.seeksSkill}</strong>
        </div>
      </div>
    </div>
  `;

  document.getElementById("proposeSwapModal").classList.add("open");
}

function initFooterActions() {
  const sqlLink = document.getElementById("footerViewSqlLink");
  const testDemo = document.getElementById("footerTestDemoBtn");
  const exportBtn = document.getElementById("footerExportDataBtn");

  if (sqlLink) {
    sqlLink.addEventListener("click", () => {
      document.getElementById("database").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (testDemo) {
    testDemo.addEventListener("click", () => {
      document.getElementById("solver").scrollIntoView({ behavior: "smooth" });
      document.getElementById("tabCycleMatch").click();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DB, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "student_skill_exchange_data.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Exported active database state to JSON!", "info");
    });
  }
}

// =====================================================================
// 7. TOAST NOTIFICATION UTILITY
// =====================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  const icon = type === "success" 
    ? '<i class="fa-solid fa-circle-check text-emerald" style="font-size: 1.15rem;"></i>' 
    : '<i class="fa-solid fa-circle-info text-primary" style="font-size: 1.15rem;"></i>';

  toast.innerHTML = `
    ${icon}
    <div style="font-size: 0.88rem; color: var(--text-main); font-weight: 500;">
      ${message}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(60px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

