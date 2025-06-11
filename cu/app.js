const express = require('express');
const axios = require('axios');
const path = require('path'); // pathモジュールを追加
const app = express();
const port = 30074;

// 静的ファイルの提供
app.use(express.static('cu'));

// ルートパスのハンドラー
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cat/cat.html')); // cat.htmlを返す
});

// APIエンドポイント
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
