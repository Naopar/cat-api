const express = require('express');
const axios = require('axios');
const app = express();
const port = 30074;

app.use(express.static('public'));

app.get('/api/random', async (req, res) => {
    try {
        const dogResponse = await axios.get('https://dog.ceo/api/breeds/image/random');
        const yesNoResponse = await axios.get('https://yesno.wtf/api');
        const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example';
        
        res.json({
            dogImage: dogResponse.data.message,
            yesNo: yesNoResponse.data,
            qrCode: qrCode
        });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
