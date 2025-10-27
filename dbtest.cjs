const mysql = require('mysql2/promise');

(async () => {
    try {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'webuser',
            password: 'webpass',
            database: 'sqlinjection_demo'
        });
        const [rows] = await pool.query('SELECT 1 AS ok');
        console.log('DB test OK:', rows);
        await pool.end();
    } catch (err) {
        console.error('DB test error:', err && err.code ? `${err.code}: ${ err.message}` : err);
        process.exit(1);
    }
})();