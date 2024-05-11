import express from 'express';
import { find } from '../services/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        let history;
        if (searchTerm) {
            history = await find('search_history', { searchTerm });
        } else {
            history = await find('search_history');
        }
        res.json({ history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
