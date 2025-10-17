const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: "localhost",
    user: "webuser",
    password: "webpass",
    database: "sqlinjection_demo",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

app.post("/login-unsafe", async (req, res) => {
    const {username, password} = req.body || {};
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "username and password strings required"});
    }
    const sql = `SELECT id, username FROM users WHERE username = '${username}' AND password_has = '${password}'`;
    console.log("[UNSAFE] Running:", sql);
    try {
        const [rows] = await pool.query(sql);
        if (rows.length > 0) return res.json({ ok: true, user: rows[0] });
        return res.status(401).json({ ok: false, error: "invalid credentials" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "db error"})
    }
});

app.post("/login-safe", async (req, res) => {
    const { username, password } = req.body || {};
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({error: "username and password strings required"});
    }
    
    const sql = "SELECT id, username FROM users WHERE username = ? AND password_hash =?";
    console.log("[SAFE] Running:", sql, " params :", [username, password]);
    try {
        const [rows] = await pool.query(sql, [username, password]);
        if (rows.length > 0) return res.json({ ok: true, user: rows[0] });
        return res.status(401).json({ ok: false, error: "invalid credentials" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "db error" });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});