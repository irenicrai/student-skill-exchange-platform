-- =====================================================================
-- DATABASE: Student Skill Exchange Problem Platform
-- Relational Schema, Cyclic Matching Architecture & Time-Bank Token System
-- Target: MySQL 8.0+
-- =====================================================================

DROP DATABASE IF EXISTS student_skill_exchange_db;
CREATE DATABASE student_skill_exchange_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE student_skill_exchange_db;

-- ---------------------------------------------------------------------
-- TABLE 1: students
-- Core entity storing verified student peer profiles & credit balances
-- ---------------------------------------------------------------------
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    university VARCHAR(150) NOT NULL,
    stream VARCHAR(100) NOT NULL,
    graduation_year INT NOT NULL,
    bio TEXT,
    avatar_color VARCHAR(20) DEFAULT '#4f46e5',
    credit_balance DECIMAL(6, 2) DEFAULT 3.00 COMMENT 'Time-bank credits (1 credit = 1 hour taught)',
    reputation_score DECIMAL(3, 2) DEFAULT 5.00 COMMENT 'Weighted peer rating (1.0 to 5.0)',
    total_hours_taught DECIMAL(6, 1) DEFAULT 0.0,
    total_hours_learned DECIMAL(6, 1) DEFAULT 0.0,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 2: skill_categories
-- Broad classification of skill areas (Tech, Languages, Arts, Academics)
-- ---------------------------------------------------------------------
CREATE TABLE skill_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    category_icon VARCHAR(50) DEFAULT 'fa-code',
    description VARCHAR(255)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 3: skills
-- Master catalog of teachable and learnable competencies
-- ---------------------------------------------------------------------
CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    skill_description VARCHAR(255),
    popularity_count INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES skill_categories(category_id) ON DELETE CASCADE,
    UNIQUE KEY uq_skill_category (category_id, skill_name)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 4: student_skills_offered (Out-edges in the Barter Graph)
-- What each student is capable of and willing to teach
-- ---------------------------------------------------------------------
CREATE TABLE student_skills_offered (
    offer_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') NOT NULL DEFAULT 'Intermediate',
    hourly_rate_credits DECIMAL(4, 2) DEFAULT 1.00,
    portfolio_url VARCHAR(255),
    teaching_syllabus TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE,
    UNIQUE KEY uq_student_skill_offer (student_id, skill_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 5: student_skills_sought (In-edges in the Barter Graph)
-- What each student desires to learn
-- ---------------------------------------------------------------------
CREATE TABLE student_skills_sought (
    sought_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    desired_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    priority_level ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    preferred_days VARCHAR(100) DEFAULT 'Flexible / Weekends',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE,
    UNIQUE KEY uq_student_skill_sought (student_id, skill_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 6: exchange_proposals
-- Proposals initiated between students (Bilateral or Token-based)
-- ---------------------------------------------------------------------
CREATE TABLE exchange_proposals (
    proposal_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_student_id INT NOT NULL,
    receiver_student_id INT NOT NULL,
    offered_skill_id INT,
    requested_skill_id INT NOT NULL,
    exchange_mode ENUM('DIRECT_2WAY', 'CYCLE_3WAY', 'TIMEBANK_CREDIT') NOT NULL DEFAULT 'DIRECT_2WAY',
    proposed_hours DECIMAL(4, 1) DEFAULT 1.0,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    proposer_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (offered_skill_id) REFERENCES skills(skill_id) ON DELETE SET NULL,
    FOREIGN KEY (requested_skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 7: cycle_matches
-- Computed 3-Way barter cycles: Student A -> Student B -> Student C -> Student A
-- Solves the "Double Coincidence of Wants" where direct 1:1 barter fails!
-- ---------------------------------------------------------------------
CREATE TABLE cycle_matches (
    cycle_id INT AUTO_INCREMENT PRIMARY KEY,
    cycle_length INT DEFAULT 3,
    student_a_id INT NOT NULL,
    student_b_id INT NOT NULL,
    student_c_id INT NOT NULL,
    skill_a_teaches_b INT NOT NULL,
    skill_b_teaches_c INT NOT NULL,
    skill_c_teaches_a INT NOT NULL,
    status ENUM('DISCOVERED', 'NOTIFIED', 'COMMITTED', 'COMPLETED') DEFAULT 'DISCOVERED',
    compatibility_score DECIMAL(4, 2) DEFAULT 0.95,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_a_id) REFERENCES students(student_id),
    FOREIGN KEY (student_b_id) REFERENCES students(student_id),
    FOREIGN KEY (student_c_id) REFERENCES students(student_id),
    FOREIGN KEY (skill_a_teaches_b) REFERENCES skills(skill_id),
    FOREIGN KEY (skill_b_teaches_c) REFERENCES skills(skill_id),
    FOREIGN KEY (skill_c_teaches_a) REFERENCES skills(skill_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 8: exchange_sessions
-- Live or completed scheduled tutoring/collaboration sessions
-- ---------------------------------------------------------------------
CREATE TABLE exchange_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    proposal_id INT,
    tutor_student_id INT NOT NULL,
    learner_student_id INT NOT NULL,
    skill_id INT NOT NULL,
    scheduled_start TIMESTAMP NOT NULL,
    duration_minutes INT DEFAULT 60,
    session_status ENUM('SCHEDULED', 'ACTIVE', 'COMPLETED', 'NO_SHOW', 'CANCELLED') DEFAULT 'SCHEDULED',
    shared_notes TEXT,
    meeting_link VARCHAR(255) DEFAULT 'https://meet.skillswap.edu/room-p2p',
    escrow_credits_held DECIMAL(4, 2) DEFAULT 1.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES exchange_proposals(proposal_id) ON DELETE SET NULL,
    FOREIGN KEY (tutor_student_id) REFERENCES students(student_id),
    FOREIGN KEY (learner_student_id) REFERENCES students(student_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 9: skill_credit_transactions
-- Immutable ledger tracking Time-Bank token movements and escrow releases
-- ---------------------------------------------------------------------
CREATE TABLE skill_credit_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    from_student_id INT,
    to_student_id INT,
    amount DECIMAL(6, 2) NOT NULL,
    transaction_type ENUM('INITIAL_WELCOME_GRANT', 'SESSION_PAYOUT', 'ESCROW_LOCK', 'CYCLE_BONUS', 'ADMIN_ADJUSTMENT') NOT NULL,
    session_id INT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_student_id) REFERENCES students(student_id) ON DELETE SET NULL,
    FOREIGN KEY (to_student_id) REFERENCES students(student_id) ON DELETE SET NULL,
    FOREIGN KEY (session_id) REFERENCES exchange_sessions(session_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- TABLE 10: reviews_ratings
-- Quality control and anti-free-riding feedback system
-- ---------------------------------------------------------------------
CREATE TABLE reviews_ratings (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    reviewer_student_id INT NOT NULL,
    reviewee_student_id INT NOT NULL,
    rating_score TINYINT CHECK (rating_score BETWEEN 1 AND 5),
    punctuality_score TINYINT CHECK (punctuality_score BETWEEN 1 AND 5),
    knowledge_clarity_score TINYINT CHECK (knowledge_clarity_score BETWEEN 1 AND 5),
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES exchange_sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_student_id) REFERENCES students(student_id),
    FOREIGN KEY (reviewee_student_id) REFERENCES students(student_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- USEFUL DATABASE VIEWS FOR ALGORITHMIC MATCHING & ANALYTICS
-- ---------------------------------------------------------------------

-- View 1: Direct 2-Way Coincident Matches (Student A offers what B seeks & vice versa)
CREATE OR REPLACE VIEW view_direct_2way_matches AS
SELECT 
    A.student_id AS student_a_id,
    A.full_name AS student_a_name,
    B.student_id AS student_b_id,
    B.full_name AS student_b_name,
    SA.skill_id AS skill_a_offers_id,
    SA.skill_name AS skill_a_offers,
    SB.skill_id AS skill_b_offers_id,
    SB.skill_name AS skill_b_offers
FROM students A
JOIN student_skills_offered OA ON A.student_id = OA.student_id
JOIN skills SA ON OA.skill_id = SA.skill_id
JOIN student_skills_sought LB ON SA.skill_id = LB.skill_id AND LB.student_id != A.student_id
JOIN students B ON LB.student_id = B.student_id
JOIN student_skills_offered OB ON B.student_id = OB.student_id
JOIN skills SB ON OB.skill_id = SB.skill_id
JOIN student_skills_sought LA ON SB.skill_id = LA.skill_id AND LA.student_id = A.student_id
WHERE A.student_id < B.student_id;

-- View 2: High Demand vs Supply Deficit Analysis
CREATE OR REPLACE VIEW view_skill_market_equilibrium AS
SELECT 
    s.skill_id,
    s.skill_name,
    c.category_name,
    COUNT(DISTINCT o.offer_id) AS total_teachers,
    COUNT(DISTINCT req.sought_id) AS total_learners,
    (COUNT(DISTINCT req.sought_id) - COUNT(DISTINCT o.offer_id)) AS deficit_demand
FROM skills s
JOIN skill_categories c ON s.category_id = c.category_id
LEFT JOIN student_skills_offered o ON s.skill_id = o.skill_id AND o.is_active = TRUE
LEFT JOIN student_skills_sought req ON s.skill_id = req.skill_id
GROUP BY s.skill_id, s.skill_name, c.category_name;

-- ---------------------------------------------------------------------
-- SEED DATA: Populating realistic academic environment
-- ---------------------------------------------------------------------

-- Insert Skill Categories
INSERT INTO skill_categories (category_name, category_icon, description) VALUES
('Computer Science & AI', 'fa-code', 'Programming, Web Dev, Machine Learning & Algorithms'),
('Mathematics & Data', 'fa-calculator', 'Calculus, Linear Algebra, Probability & Statistics'),
('Languages & Linguistics', 'fa-language', 'Conversational Foreign Languages & Accent Coaching'),
('UI/UX & Creative Media', 'fa-palette', 'Figma, Blender 3D, Video Production & Graphic Design'),
('Music & Sound', 'fa-guitar', 'Acoustic Guitar, Piano Theory & Music Production'),
('Career & Communication', 'fa-briefcase', 'Technical Mock Interviews, Resume Review & Public Speaking');

-- Insert Skills
INSERT INTO skills (category_id, skill_name, skill_description, popularity_count) VALUES
(1, 'Python & Data Structures', 'Algorithmic problem solving, Python 3 syntax & LeetCode prep', 48),
(1, 'Full-Stack React & Node', 'Modern component architecture, REST APIs & Tailwind CSS', 56),
(1, 'Machine Learning & PyTorch', 'Neural network architectures, tensor ops & model training', 35),
(2, 'Multivariable Calculus III', 'Partial derivatives, gradient vectors & double/triple integrals', 42),
(2, 'Linear Algebra & Matrices', 'Eigenvalues, vector spaces, dot products & matrix decomposition', 39),
(3, 'Conversational Spanish', 'Daily spoken fluency, pronunciation and grammar fundamentals', 31),
(3, 'Japanese for Beginners (JLPT N5)', 'Hiragana, Katakana, basic Kanji & conversational grammar', 28),
(4, 'UI/UX Design with Figma', 'Wireframing, design systems, autolayout & micro-interactions', 51),
(4, 'Premiere Pro & Video Editing', 'Video cuts, color grading, sound design & YouTube pacing', 34),
(5, 'Acoustic Guitar Fundamentals', 'Chords, fingerpicking, rhythm techniques and tab reading', 22),
(6, 'Technical Interview Mastery', 'FAANG behavioral & systems design walkthroughs', 45);

-- Insert Sample Students (The 5 Project Team Members from JIS College of Engineering, BCA GENERAL)
INSERT INTO students (full_name, email, university, stream, graduation_year, bio, avatar_color, credit_balance, reputation_score, total_hours_taught, total_hours_learned) VALUES
('Rai Bose', 'rai.bose@jis.edu', 'JIS College of Engineering', 'BCA GENERAL', 2026, 'Project Lead passionate about backend systems, algorithmic design, and full-stack software development.', '#4f46e5', 4.50, 4.95, 14.0, 11.0),
('Raj Biswas', 'raj.biswas@jis.edu', 'JIS College of Engineering', 'BCA GENERAL', 2026, 'Applied math tutor specializing in 3D calculus, matrix transformations, and optimization theory.', '#10b981', 4.90, 4.90, 12.0, 10.0),
('Rahul Kumar Shaw', 'rahul.shaw@jis.edu', 'JIS College of Engineering', 'BCA GENERAL', 2026, 'UI/UX designer and frontend enthusiast. Builds responsive design systems, autolayout components, and wireframes.', '#06b6d4', 3.00, 4.92, 15.0, 12.0),
('Rahit Das', 'rahit.das@jis.edu', 'JIS College of Engineering', 'BCA GENERAL', 2026, 'AI researcher focusing on deep learning, neural network backprop, and computer vision pipelines.', '#f43f5e', 3.50, 4.88, 9.0, 8.0),
('Protyusha Bose', 'protyusha.bose@jis.edu', 'JIS College of Engineering', 'BCA GENERAL', 2026, 'Database engineer skilled in MySQL relational modeling, schema normalization, and query optimization.', '#8b5cf6', 4.00, 4.96, 16.0, 13.0);

-- Insert Offered Skills
INSERT INTO student_skills_offered (student_id, skill_id, proficiency_level, hourly_rate_credits, portfolio_url, teaching_syllabus) VALUES
(1, 1, 'Expert', 1.00, 'https://github.com/raibose-cs', 'Binary trees, dynamic programming, time complexity, and clean code'),
(2, 4, 'Advanced', 1.00, 'https://rajmath.edu', '3D surface visualization, double integrals, Stokes theorem'),
(3, 8, 'Expert', 1.00, 'https://behance.net/rahulshaw', 'Auto-layout, design tokens, responsive breakpoints, Figma variables'),
(4, 3, 'Advanced', 1.00, 'https://github.com/rahitdas-ai', 'PyTorch tensors, loss functions, backpropagation & CNN basics'),
(5, 2, 'Expert', 1.00, 'https://protyusha.dev', 'Relational normalization, ACID transactions, B-tree indexes, stored procedures');

-- Insert Sought Skills (Sets up 2-Way and 3-Way Cycle scenarios!)
INSERT INTO student_skills_sought (student_id, skill_id, desired_level, priority_level, preferred_days) VALUES
(1, 8, 'Intermediate', 'High', 'Tuesday/Thursday afternoons'),    -- Rai (offers Python) seeks Figma (offered by Rahul)
(2, 1, 'Intermediate', 'Medium', 'Monday/Wednesday evenings'),    -- Raj (offers Calculus) seeks Python (offered by Rai)
(3, 4, 'Beginner', 'High', 'Weekends'),                          -- Rahul (offers Figma) seeks Calculus (offered by Raj) -> PERFECT 3-WAY CYCLE!
(4, 2, 'Beginner', 'Urgent', 'Flexible'),                         -- Rahit (offers ML) seeks MySQL (offered by Protyusha)
(5, 3, 'Intermediate', 'High', 'Saturday mornings');              -- Protyusha (offers MySQL) seeks ML (offered by Rahit) -> DIRECT 2-WAY MATCH!

-- Insert Discovered 3-Way Cycle Match (Rai -> Raj -> Rahul -> Rai)
INSERT INTO cycle_matches (student_a_id, student_b_id, student_c_id, skill_a_teaches_b, skill_b_teaches_c, skill_c_teaches_a, status, compatibility_score) VALUES
(1, 2, 3, 1, 4, 8, 'COMMITTED', 0.98);

-- Insert Sample Exchange Proposals
INSERT INTO exchange_proposals (sender_student_id, receiver_student_id, offered_skill_id, requested_skill_id, exchange_mode, proposed_hours, status, proposer_note) VALUES
(4, 5, 3, 2, 'DIRECT_2WAY', 2.0, 'ACCEPTED', 'Hi Protyusha! Would love to trade deep learning basics for relational database index tuning!'),
(2, 1, 4, 1, 'CYCLE_3WAY', 1.5, 'IN_PROGRESS', 'Hey Rai, happy to join the 3-way cycle trading Calculus for Python!'),
(5, 1, 2, 1, 'TIMEBANK_CREDIT', 1.0, 'PENDING', 'Would love 1 hour of Python debugging assistance in exchange for 1.0 SkillCredit.');

-- Insert Scheduled & Completed Sessions
INSERT INTO exchange_sessions (proposal_id, tutor_student_id, learner_student_id, skill_id, scheduled_start, duration_minutes, session_status, shared_notes, escrow_credits_held) VALUES
(1, 5, 4, 2, DATE_SUB(NOW(), INTERVAL 2 DAY), 60, 'COMPLETED', 'Covered B-Tree index optimization and foreign key constraints.', 1.00),
(1, 4, 5, 3, DATE_SUB(NOW(), INTERVAL 1 DAY), 60, 'COMPLETED', 'Configured PyTorch neural net tensors and loss optimization.', 1.00),
(2, 2, 1, 4, DATE_ADD(NOW(), INTERVAL 1 DAY), 60, 'SCHEDULED', 'Scheduled session: Matrix eigenvalues and orthogonal bases.', 1.00);

-- Insert Ledger Transactions
INSERT INTO skill_credit_transactions (from_student_id, to_student_id, amount, transaction_type, session_id, description) VALUES
(NULL, 1, 3.00, 'INITIAL_WELCOME_GRANT', NULL, 'New student onboarding credit grant for Rai Bose'),
(NULL, 2, 3.00, 'INITIAL_WELCOME_GRANT', NULL, 'New student onboarding credit grant for Raj Biswas'),
(4, 5, 1.00, 'SESSION_PAYOUT', 1, 'Completed MySQL relational database tuning workshop'),
(5, 4, 1.00, 'SESSION_PAYOUT', 2, 'Completed PyTorch neural network fundamentals');

-- Insert Peer Reviews
INSERT INTO reviews_ratings (session_id, reviewer_student_id, reviewee_student_id, rating_score, punctuality_score, knowledge_clarity_score, feedback_text) VALUES
(1, 4, 5, 5, 5, 5, 'Protyusha is fantastic! Explained complex database concepts so clearly with live SQL demonstrations.'),
(2, 5, 4, 5, 5, 5, 'Rahit explained loss landscapes and gradients without any confusion. Highly recommended!');

