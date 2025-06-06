const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');


const app = express();



app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.get('/' , async (req, res) =>{
   const result = await pool.query('SELECT NOW()');
   res.send(`<h1>DataBase time : ${result.rows[0].now}</h1>`);
});

const PORT = process.env.PORT  ;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));



