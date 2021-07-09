const express = require('express');
const cors = require('cors');
const path = require('path');
const items = require('./routes/api/items.js');
const promocode = require('./routes/api/promocode.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/items', items);
app.use('/api/promocode', promocode);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is running on ${port}`));