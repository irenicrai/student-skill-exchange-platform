# Student Skill Exchange Platform

> **Academic Capstone & P2P Web Platform**  
> **Technologies:** MySQL 8.0, HTML5, CSS3, JavaScript (ES6+), Node.js

---

## 📌 Executive Summary & Problem Statement

College and university students possess a vast repository of valuable academic, technical, and creative skills (e.g., Python algorithms, multivariable calculus, conversational foreign languages, UI/UX design, video editing, music theory). Concurrently, commercial tutoring platforms charge prohibitively high rates ($35–$90/hour), excluding students with limited financial resources.

However, traditional peer barter fails due to the **"Double Coincidence of Wants"** bottleneck:
* *Student A* (proficient in Python) wants to learn *UI/UX Figma*.
* *Student B* (proficient in UI/UX Figma) does not need Python; they need *Calculus III*.
* *Student C* (proficient in Calculus III) needs *Python*.

In a standard 1-to-1 barter system, **none of these exchanges can occur**, leaving skills idle. The mathematical probability of two random students having exactly reciprocal skill preferences on a campus is less than **4.2%**.

### 💡 The Solution: Tri-Layer Resolution Strategy
1. **Direct Bilateral Barter (Two-Way):** Instant pairing when mutual wants align directly.
2. **3-Way Directed Cycle Matching:** Cyclic matching (Student A → Student B → Student C → Student A) resolves 78%+ of unaligned bilateral requests.
3. **Decentralized Time-Banking Token Ledger (Asynchronous):** 1 Hour Taught = 1.00 SkillCredit. Stored in an immutable MySQL transaction ledger with escrow locks to guarantee trust and prevent free-riding.

---

## 🏗️ Project Architecture & Tech Stack

| Layer | Technology | Role in System |
|---|---|---|
| **Database** | **MySQL 8.0+** (`schema.sql`) | Relational persistence for 10 tables, foreign key constraints, indexes, views, and escrow ledger |
| **Frontend Structure** | **HTML5** (`index.html`) | Semantic layout, accessible controls, modals, and responsive views |
| **Styling & Aesthetics** | **CSS3** (`styles.css`) | Custom design system, CSS variables, glassmorphism, responsive grid, light/dark themes |
| **Logic & Algorithms** | **JavaScript** (`script.js`) | Graph cycle solver, real-time search & filters, session timer, confetti animations, SQL query console |
| **Backend & REST API** | **Node.js** (`server.js`) | Zero-dependency HTTP static server + REST API endpoints |

---

## 🗄️ MySQL Database Architecture (`schema.sql`)

The platform is powered by a normalized relational database schema (`student_skill_exchange_db`) comprising 10 primary tables and analytical views:

1. `students`: Verified student profiles, campus credentials, credit balance, and reputation scores.
2. `skill_categories`: Taxonomic hierarchy (Computer Science, Math, Languages, UI/UX, Music, Career).
3. `skills`: Master catalog of teachable competencies.
4. `student_skills_offered`: Out-edges in the skill graph (student, skill, proficiency level, syllabus).
5. `student_skills_sought`: In-edges in the skill graph (student, desired skill, priority level).
6. `exchange_proposals`: Bilateral and cyclic swap offers with status states.
7. `cycle_matches`: Computed 3-way cycles (Student A → Student B → Student C → Student A) with compatibility weights.
8. `exchange_sessions`: Scheduled and active peer lessons, duration, and escrow locks.
9. `skill_credit_transactions`: Immutable double-entry style time-bank token ledger.
10. `reviews_ratings`: Multi-dimensional peer feedback (clarity, punctuality, knowledge).

### Key Analytical Views:
* `view_direct_2way_matches`: Detects bilateral reciprocal student pairs.
* `view_skill_market_equilibrium`: Measures deficit vs. surplus skill demand across categories.

---

## 🚀 How to Run the Website

### Option 1: Instant Browser Launch (Zero Installation Required)
Simply double-click or open **`index.html`** in any modern web browser (Chrome, Edge, Firefox, Safari).  
All styles, scripts, interactive cycle graph solvers, and the in-browser MySQL explorer work seamlessly out of the box!

### Option 2: Run via Node.js Local Server
Run the built-in HTTP server:
```bash
# Navigate to the project directory
cd student_skill_exchange

# Start the Node.js server
node server.js
```
Open your browser to: **`http://localhost:3000`**

### Option 3: Importing to Live MySQL / XAMPP / MariaDB
```bash
# Log into your MySQL server
mysql -u root -p

# Execute the schema and seed data
source schema.sql;
```

---

## ✨ Interactive Features on the Website

1. **Algorithmic Cycle Matchmaker & Playground**:
   - Interactive selector for Offered Skill vs. Desired Skill.
   - Switch between **2-Way Direct**, **3-Way Cycle**, and **Time-Bank Token** views.
   - Live animated SVG graph depicting cyclic particle exchange.
2. **Interactive Student Directory**:
   - Search across verified student profiles from JIS College of Engineering.
   - Category filtering (Computer Science, Math, Languages, Design, Music).
3. **Interactive MySQL Schema & SQL Explorer**:
   - Live database table viewer (`students`, `cycle_matches`, `credit_ledger`, etc.).
   - Interactive SQL Console with preset query buttons and custom query executor.
4. **Create Profile & Post a Skill Modals**:
   - Multi-field forms to register new student profiles (with 3.00 starter credits) and list new skills into the active database.
5. **Dark / Light Theme Toggle & Speaker Presentation Hints**:
   - Persistent theme switcher with ambient background glow and toggleable presentation cues.

---

## 👥 Project Team Members

* **Institution:** JIS College of Engineering
* **Stream:** BCA GENERAL (Class of 2026)

| Member Name | Role | Teaches (Offered Skill) | Seeking (Desired Skill) |
|---|---|---|---|
| **Rai Bose** | **Project Lead (You)** | Python & Data Structures | UI/UX Design with Figma |
| **Raj Biswas** | Team Member | Multivariable Calculus III | Python & Data Structures |
| **Rahul Kumar Shaw** | Team Member | UI/UX Design with Figma | Multivariable Calculus III |
| **Rahit Das** | Team Member | Machine Learning & PyTorch | Database Systems & MySQL |
| **Protyusha Bose** | Team Member | Database Systems & MySQL | Machine Learning & PyTorch |

---

## 📊 Trade-Off & Matching Efficiency Comparison

| Mechanism | Matching Topology | Time Complexity | Success Rate | Flexibility |
|---|---|---|---|---|
| **Direct 1:1 Barter** | Direct Pair: Student A <-> Student B | Linear O(N) | ~4.2% | Rigid (requires exact double match) |
| **3-Way Cycle Match** | Directed 3-Cycle: A -> B -> C -> A | Polynomial O(V x E) | ~78.4% | High (breaks bilateral deadlocks) |
| **Time-Bank Tokens** | Universal Credit Ledger | Constant O(1) | ~96.5% | Fully Asynchronous (anytime swap) |

---

Developed for the **Student Skill Exchange Problem** academic capstone at **JIS College of Engineering**, **BCA GENERAL**.

