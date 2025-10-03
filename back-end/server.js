const express = require('express');
const cors = require('cors');

const donoRoutes = require('./Routes/dono.js');
const animalRoutes = require('./Routes/animal.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/donos', donoRoutes);
app.use('/animais', animalRoutes);

app.listen(port, () => {
    console.log(`🚀 Servidor backend rodando em http://localhost:${port}`);
});