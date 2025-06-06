const pool = require('../config/db');

const createUser = async (username, email, hashedPassword) => {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
            RETURNING *;
    `;
    const values = [username, email, hashedPassword];
    const res = await pool.query(query, values);
    return res.rows[0];
};

const findUserByEmail = async (email) =>{
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
};

module.exports = {createUser, findUserByEmail};