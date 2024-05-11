import express from 'express';
import { searchByKeyword } from '../services/api.js';
import { create } from '../services/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const results = await searchByKeyword(searchTerm);
        // Process results and send response
        res.json({ results });

        // Update or create search history
        await create('search_history', { searchTerm, searchCount: results.length, lastSearched: new Date() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
