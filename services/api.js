// the file to interact with the deck of cards api
import axios from 'axios';

const base = 'https://api.openbrewerydb.org/v1/breweries';

/** 
 * @param {string} keyword - the keyword searched for
 * @returns {Promise<Array>} - a promise resolving to the search results list
*/
export const searchByKeyword = async (keyword) => {
    const brewURL = `${base}/search?query=${keyword}`;
    const response = await axios.get(brewURL);

    return response.data;
};


/**
 * 
 * @param {String} breweryID - a unique ID of the breweries
 * @returns {Promise<Array>} - a promise resolving to the details of the brewery
 */
export const getByIdentifier = async (breweryID) => {
    const brewURL = `${base}/${breweryID}`;
    const response = await axios.get(brewURL);

    return response.data;
};

