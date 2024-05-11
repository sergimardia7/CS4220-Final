import express from 'express';
import * as api from '../services/api.js';
import mongo from '../services/db.js';
//once we create the folders we need to add ../ to the imports above
const router = express.Router();

/**
 * Get search results from the specificed search term
 * 
 * @api {GET} /search
 * @apiQuery {String} searchTerm (required)
 * indicates the search term
 * 
 * @apiExample localhost:8888/search?searchTerm=brewery
 * 
 */


router.get('/', async(req, res) => {
    const {query} = res;

    const breweryName = await api.searchByKeyword();
    
});

/**
 *  Get details for a specific search result
 * 
 * @api {GET} /search/:id/details
 * @apiParam {string} identifier of the search results (required)
 * @apiQuery {boolean} cache (optional)
 * indicates whether the use cache (default: false)
 * 
 * @apiExample localhost:8888/search/xxx/details
 * @apiExample localhost:8888/search/xxx/details?cache=true
 * 
 */
//const brewery = await api.getByIdentifier(brewsId);
router.get('/:id/details', async (req, rest) => {

});

export default router;
