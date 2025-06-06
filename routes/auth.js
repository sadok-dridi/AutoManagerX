const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {createUser, findUserByEmail} = require('../models/userModel');
const bcrypt = require("bcrypt");
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log("🔔 /register route hit");
    console.log("📦 Body received:", req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing username, email or password" });
    }

    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser){
            console.log("👀 Existing user:", existingUser);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Registering user:", username, email, password);
        const user = await createUser(username, email, hashedPassword);

        res.status(201).json({
            message: 'User created',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
});


router.post('/login',async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({message:'User does not exists'});

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({message:'passwords do not match'});

        const token = jwt.sign({ id: user.id, username: user.username },process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });



    }catch(error){
        res.status(500).json({message:'server error', error: error.message});
    }
});

module.exports = router;