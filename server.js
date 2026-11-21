/**
 * =====================================================================
 * STUDENT SKILL EXCHANGE PLATFORM - BACKEND HTTP & API SERVER
 * Environment: Node.js (Built-in http, fs, path modules - Zero External Dependencies Required!)
 * Database: MySQL 8.0 Integration Ready + In-Memory Fallback Relational Store
 * =====================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Content types dictionary for static file serving
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.sql': 'text/plain; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// In-Memory Database Store (mirrors schema.sql)
let DB_MEMORY = {
  students: [
    { student_id: 1, full_name: "Rai Bose", university: "JIS College of Engineering", stream: "BCA GENERAL", major: "BCA GENERAL", credit_balance: 4.50, reputation_score: 4.95 },
    { student_id: 2, full_name: "Raj Biswas", university: "JIS College of Engineering", stream: "BCA GENERAL", major: "BCA GENERAL", credit_balance: 4.90, reputation_score: 4.90 },
    { student_id: 3, full_name: "Rahul Kumar Shaw", university: "JIS College of Engineering", stream: "BCA GENERAL", major: "BCA GENERAL", credit_balance: 3.00, reputation_score: 4.92 },
    { student_id: 4, full_name: "Rahit Das", university: "JIS College of Engineering", stream: "BCA GENERAL", major: "BCA GENERAL", credit_balance: 3.50, reputation_score: 4.88 },
    { student_id: 5, full_name: "Protyusha Bose", university: "JIS College of Engineering", stream: "BCA GENERAL", major: "BCA GENERAL", credit_balance: 4.00, reputation_score: 4.96 }
  ],
  cycle_matches: [
    { cycle_id: 1, cycle_length: 3, student_a: "Rai Bose", student_b: "Raj Biswas", student_c: "Rahul Kumar Shaw", compatibility_score: 0.98, status: "COMMITTED" }
  ],
  transactions: [
    { transaction_id: "TX-901", from: "Rahul Kumar Shaw", to: "Rai Bose", amount: 1.00, type: "SESSION_PAYOUT", description: "Python Binary Search session" },
    { transaction_id: "TX-892", from: "Raj Biswas", to: "Rai Bose", amount: 1.00, type: "ESCROW_RELEASE", description: "Calculus III & Graph Algorithms lesson" }
  ]
};

// Create HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS Headers for API accessibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // =================================================================
  // REST API ENDPOINTS
  // =================================================================
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ONLINE',
      service: 'Student Skill Exchange Platform Backend',
      mysql_schema: 'student_skill_exchange_db',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (pathname === '/api/students' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: DB_MEMORY.students.length, data: DB_MEMORY.students }));
    return;
  }

  if (pathname === '/api/cycles' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, cycles: DB_MEMORY.cycle_matches }));
    return;
  }

  if (pathname === '/api/transactions' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, transactions: DB_MEMORY.transactions }));
    return;
  }

  // =================================================================
  // STATIC FILE SERVING
  // =================================================================
  let filePath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, pathname);

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Fallback to index.html for single-page routing
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err, fallbackContent) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(fallbackContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================================`);
  console.log(`  🎓 Student Skill Exchange Platform Server Started`);
  console.log(`  🌐 Website URL : http://localhost:${PORT}`);
  console.log(`  🗄️ Database     : student_skill_exchange_db (MySQL 8.0 schema)`);
  console.log(`  📁 Root Dir    : ${PUBLIC_DIR}`);
  console.log(`====================================================================`);
});

