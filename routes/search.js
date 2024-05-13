import express from 'express';
import { searchByKeyword, getByIdentifier } from '../services/api.js';
import { create } from '../services/db.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // const { searchTerm } = req.query;
        // const results = await searchByKeyword(searchTerm);
        // // Process results and send response
        // res.json({ results });
        const { searchTerm } = req.query;
        const results = await searchByKeyword(searchTerm);
        const formattedResults = results.map(result => ({
            name: result.name,
            address: result.address_1,
            website: result.website_url,
            id: result.id
        }));
        res.json(formattedResults);

        // Update or create search history
        await create('search_history', { searchTerm, searchCount: results.length, lastSearched: new Date() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve item details by id from the search_cache collection
        const cachedItem = await find('search_cache', { id });

        if (cachedItem) {
            // If item found in cache, return it
            res.json(cachedItem);
        } else {
            // If item not found in cache, retrieve from API
            const newItem = await getByIdentifier(id);
            // Save to search_cache collection
            await create('search_cache', newItem);
            res.json(newItem);
        }
    } catch (error) {
        console.error('Error fetching brewery details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});;




export default router;
