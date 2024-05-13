const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = 'https://api.openbrewerydb.org/breweries';


app.get('/breweries/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(`${API_BASE_URL}?by_city=${city}`);
    const breweries = response.data;
    res.json(breweries);
  } catch (error) {
    console.error('Error fetching breweries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/brewery/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    const brewery = response.data;
    res.json(brewery);
  } catch (error) {
    console.error('Error fetching brewery:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server :)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
