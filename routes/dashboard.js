const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {

    res.json({
        user: {
            id: req.user.id,
            username: req.user.username
        }
    });
});

router.get('/tasks', verifyToken, (req, res) => {
    res.json({
        tasks: [
            { id: 1, title: 'Fetch user metrics', status: 'pending' },
            { id: 2, title: 'Backup database', status: 'done' }
        ]
    });
});

module.exports = router;
