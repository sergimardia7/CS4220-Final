import * as api from './services/api.js';
import * as db from './services/db.js';

export const brewSearch = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const breweries = await api.searchByKeyword(searchTerm);
        const userChoice = await _brewList(breweries);

        _printConsole(userChoice);

        await db.create('search_history', userChoice);

        res.json({ userChoice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const history = async (req, res) => {
    try {
        const historySearch = await db.find('search_history');
        res.json({ historySearch });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const _printConsole = async (brewsId) => {
    const brewery = await api.getByIdentifier(brewsId);
    
    console.log(`Type: ${brewery.brewery_type}`);
    console.log(`Address: ${brewery.address_1}, ${brewery.city}, ${brewery.state_province} ${brewery.country} ${brewery.postal_code}`);
    console.log(`Website: ${brewery.website_url}`);
    console.log(`Phone: ${brewery.phone}`);
};

const _printHistory = async (brewsId) => {
    const brewery = await api.getByIdentifier(brewsId);
    
    console.log(`Name: ${brewery.name}`);
    console.log('------------------------------------');
};

const _brewList = async (brews) => {
    const displayBrews = brews.map((brew) => {
        return { name: `${brew.name}`, value: brew.id };
    });

    return await select({
        message: 'Select Brewery of Interest for more Information',
        choices: displayBrews,
    });
};
