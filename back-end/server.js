const express = require('express');
const cors = require('cors');
const conexao = require('./db.js');

const donoRoutes = require('./Routes/dono.js');
const animalRoutes = require('./Routes/animal.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/cadastrar', async (req, res) => {
    const { dono, animal } = req.body;

    try {
        await conexao.beginTransaction();

        const donoSql = 'INSERT INTO dono (nome_completo, cpf, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
        const donoValues = [dono.nome_completo, dono.cpf, dono.email, dono.telefone, dono.endereco];
        const [donoResult] = await conexao.execute(donoSql, donoValues);
        
        const novoDonoId = donoResult.insertId;

        const animalSql = 'INSERT INTO animal (id_dono, nome_pet, especie, raca, data_nascimento, observacoes) VALUES (?, ?, ?, ?, ?, ?)';
        const animalValues = [novoDonoId, animal.nome_pet, animal.especie, animal.raca, animal.data_nascimento, animal.observacoes];
        await conexao.execute(animalSql, animalValues);

        await conexao.commit();

        res.status(201).json({ message: 'Cliente e pet cadastrados com sucesso!' });

    } catch (error) {
        await conexao.rollback();
        console.error('Erro ao cadastrar:', error);
        res.status(500).json({ message: 'Erro ao cadastrar. Por favor, tente novamente.' });
    }
});

app.use('/donos', donoRoutes);
app.use('/animais', animalRoutes);

app.listen(port, () => {
    console.log(`🚀 Servidor backend rodando em http://localhost:${port}`);
});