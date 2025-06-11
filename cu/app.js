// .envファイルの名前がcat.envの場合
require('dotenv').config({ path: './cat.env' }); // この行をファイルの先頭に置く

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 30074;

app.use(express.static(path.join(__dirname, 'cu')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cu', 'cat', 'cat.html'));
});

// APIエンドポイント
app.get('/api/random', async (req, res) => {
    try {
        // Dog API
        const dogResponse = await axios.get('https://dog.ceo/api/breeds/image/random');

        // YesNo API
        const yesNoResponse = await axios.get('https://yesno.wtf/api');

        // QR Code Generator API (例として、現在のURLをQRコードにする)
        const qrCodeData = encodeURIComponent('http://localhost:3000'); // サーバーのURLを適宜変更してください
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeData}`;

        // The Cat API
        const catApiKey = process.env.CAT_API_KEY; // 環境変数からAPIキーを取得
        let catImage = null;

        try {
            const catResponse = await axios.get('https://api.thecatapi.com/v1/images/search', {
                headers: {
                    'x-api-key': catApiKey
                }
            });
            if (catResponse.data && catResponse.data.length > 0) {
                catImage = catResponse.data[0].url;
            }
        } catch (catError) {
            console.error("Error fetching Cat API data:", catError.message);
        }

        res.json({
            dogImage: dogResponse.data.message,
            yesNo: {
                answer: yesNoResponse.data.answer,
                image: yesNoResponse.data.image
            },
            qrCode: qrCodeUrl,
            catImage: catImage
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
