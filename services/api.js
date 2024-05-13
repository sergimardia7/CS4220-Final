// the file to interact with the deck of cards api
// don't need to redo this portion
import axios from 'axios';

const base = 'https://api.openbrewerydb.org/v1/breweries';

/** 
 * @param {string} keyword - the keyword searched for
 * @returns {Promise<Array>} - a promise resolving to the search results list
*/
export const searchByKeyword = async (keyword) => {
    try {
        const brewURL = `${base}/search?query=${keyword}`;
        const response = await axios.get(brewURL);

        return response.data;
    } catch (error) {
        return error;
    }
};


/**
 * 
 * @param {String} breweryID - a unique ID of the breweries
 * @returns {Promise<Array>} - a promise resolving to the details of the brewery
 */
export const getByIdentifier = async (breweryID) => {
    try {
        const brewURL = `${base}/${breweryID}`;
        const response = await axios.get(brewURL);

        return response.data;
    } catch (error) {
        return error;
    }
};
