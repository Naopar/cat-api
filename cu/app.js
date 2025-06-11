const express = require('express');
const axios = require('axios');
const app = express();
const port = 30074;

app.use(express.static('public'));

// ルートパスのハンドラー
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cat/cat.html'); // index.htmlを返す
});

app.get('/api/random', async (req, res) => {
    try {
        const dogResponse = await axios.get('https://dog.ceo/api/breeds/image/random');
        const catResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
        
        res.json({
            dogImage: dogResponse.data.message,
            catImage: catResponse.data[0].url
        });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
